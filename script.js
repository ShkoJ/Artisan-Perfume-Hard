import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import {
            getAuth,
            signInAnonymously,
            signInWithCustomToken,
            onAuthStateChanged,
        } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import {
            getFirestore,
            collection,
            addDoc,
            serverTimestamp,
            onSnapshot,
            query,
            doc,
            setDoc,
            setLogLevel
        } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // Firebase Configuration and Globals
        setLogLevel('Debug');
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

        let app;
        let db;
        let auth;
        let userId = null;

        // State Management
        let currentPerfumes = [];
        let selectedPerfume = null;
        let orderQuantity = 1;
        let currentQuizStep = 0;
        let quizAnswers = {};

        // API Key for Gemini (Leave as empty string for Canvas environment)
        const API_KEY = "";
        const API_URL_BASE = "https://generativelanguage.googleapis.com/v1beta/models/";
        const MODEL_NAME = "gemini-2.5-flash-preview-05-20";

        // --- PRODUCT DATA (Add new products here) ---
        const initialPerfumes = [
            { id: 1, name: "Midnight Bloom", price: 89.99, category: "women", image: "https://placehold.co/400x400/0A192F/FFC107?text=Midnight%20Bloom", description: "A captivating blend of dark berries, jasmine, and vanilla. Perfect for evening wear, offering warmth and sophistication.", quality: "Long-lasting (8h+)", sillage: "Heavy" },
            { id: 2, name: "Desert Sand", price: 79.99, category: "men", image: "https://placehold.co/400x400/FFC107/0A192F?text=Desert%20Sand", description: "Warm notes of amber, cedarwood, and a hint of spice. A rugged, earthy scent that embodies freedom and adventure.", quality: "Moderate (4-6h)", sillage: "Medium" },
            { id: 3, name: "Ocean Breeze", price: 65.50, category: "women", image: "https://placehold.co/400x400/00AABB/FFFFFF?text=Ocean%20Breeze", description: "Fresh and aquatic with notes of sea salt and citrus. Ideal for daytime freshness and a clean, invigorating feeling.", quality: "Short-lived (2-4h)", sillage: "Light" },
            { id: 4, name: "Smoked Leather", price: 105.00, category: "men", image: "https://placehold.co/400x400/8B4513/FFFFFF?text=Smoked%20Leather", description: "Intense scent of tanned leather, smoky vetiver, and cardamom. Bold and distinctive, for the confident modern man.", quality: "Very Long-lasting (10h+)", sillage: "Heavy" },
            // --- New Fragrance Added Here ---
            { id: 5, name: "Spiced Vetiver", price: 95.00, category: "men", image: "https://placehold.co/400x400/5C7C5C/FFFFFF?text=Spiced%20Vetiver", description: "A complex blend of earthy vetiver, warm nutmeg, and a touch of black pepper. Distinguished and comforting.", quality: "Long-lasting (8h+)", sillage: "Medium" },
            { id: 6, name: "Lace & Lilac", price: 75.00, category: "women", image: "https://placehold.co/400x400/A020F0/FFFFFF?text=Lace%20%26%20Lilac", description: "Delicate florals with a powdery finish. A classic, romantic, and beautifully soft feminine fragrance.", quality: "Moderate (4-6h)", sillage: "Light" },
        ];
        currentPerfumes = [...initialPerfumes];


        // --- UI ELEMENT GETTERS ---
        const $ = (selector) => document.querySelector(selector);
        const $$ = (selector) => document.querySelectorAll(selector);

        const elements = {
            catalog: $('#perfume-catalog'),
            navLinks: $$('.nav-link'),
            searchInput: $('#search-input'),
            productModal: $('#product-modal'),
            orderModal: $('#order-modal'),
            quizModal: $('#quiz-modal'),
            confirmationModal: $('#confirmation-modal'),
            orderSummaryName: $('#order-summary-name'),
            orderQuantityValue: $('#order-quantity'),
            orderForm: $('#order-form'),
            quizContent: $('#quiz-content'),
            quizNextBtn: $('#quiz-next-btn'),
            quizPrevBtn: $('#quiz-prev-btn'),
            quizSubmitBtn: $('#quiz-submit-btn'),
            orderError: $('#order-error')
        };


        // --- FIREBASE INITIALIZATION AND AUTH ---
        if (Object.keys(firebaseConfig).length > 0) {
            app = initializeApp(firebaseConfig);
            db = getFirestore(app);
            auth = getAuth(app);

            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    userId = user.uid;
                } else {
                    try {
                        // Sign in anonymously if no user is signed in
                        const anonUser = await signInAnonymously(auth);
                        userId = anonUser.user.uid;
                    } catch (error) {
                        console.error("Anonymous sign-in failed:", error);
                        // Fallback to a random ID if Firebase fails entirely
                        userId = crypto.randomUUID();
                    }
                }
                console.log("Firebase initialized. User ID:", userId);

                // Try to use custom token if available (Canvas environment)
                if (typeof __initial_auth_token !== 'undefined' && !user) {
                    try {
                        await signInWithCustomToken(auth, __initial_auth_token);
                    } catch (error) {
                        console.error("Custom token sign-in failed, continuing anonymously.", error);
                    }
                }
            });
        } else {
            console.error("Firebase config is missing.");
            userId = crypto.randomUUID();
        }

        // --- CORE UI FUNCTIONS ---

        /**
         * Renders the current list of perfumes to the catalog section.
         * @param {Array} perfumesToRender - The array of perfume objects.
         */
        function renderCatalog(perfumesToRender) {
            elements.catalog.innerHTML = '';
            if (perfumesToRender.length === 0) {
                elements.catalog.innerHTML = `<p class="empty-message">No fragrances found matching your criteria. Try adjusting your search or filter.</p>`;
                return;
            }

            perfumesToRender.forEach(perfume => {
                const card = document.createElement('div');
                card.classList.add('perfume-card');
                card.setAttribute('data-id', perfume.id);
                card.innerHTML = `
                    <img src="${perfume.image}" alt="${perfume.name} Perfume Bottle" class="perfume-card-img" onerror="this.onerror=null; this.src='https://placehold.co/400x400/999/fff?text=Image+Not+Found';" />
                    <div class="perfume-card-content">
                        <h3 class="perfume-card-name">${perfume.name}</h3>
                        <p class="perfume-card-price">$${perfume.price.toFixed(2)}</p>
                    </div>
                `;
                card.addEventListener('click', () => openProductModal(perfume));
                elements.catalog.appendChild(card);
            });
        }

        /**
         * Opens a specific modal.
         * @param {string} modalId - The ID of the modal to open (e.g., 'product-modal').
         */
        function openModal(modalId) {
            document.getElementById(modalId)?.classList.add('active');
        }

        /**
         * Closes a specific modal.
         * @param {string} modalId - The ID of the modal to close.
         */
        function closeModal(modalId) {
            document.getElementById(modalId)?.classList.remove('active');
        }

        /**
         * Populates and opens the product detail modal.
         * @param {Object} perfume - The selected perfume object.
         */
        function openProductModal(perfume) {
            selectedPerfume = perfume;
            $('#modal-image').src = perfume.image;
            $('#modal-image').alt = `${perfume.name} Perfume Bottle`;
            $('#modal-name').textContent = perfume.name;
            $('#modal-description').textContent = perfume.description;
            $('#modal-quality').textContent = `Longevity: ${perfume.quality}`;
            $('#modal-sillage').textContent = `Sillage: ${perfume.sillage}`;
            $('#modal-price').textContent = `$${perfume.price.toFixed(2)}`;
            openModal('product-modal');
        }

        /**
         * Populates and opens the order form modal.
         */
        function openOrderModal() {
            if (!selectedPerfume) return;
            orderQuantity = 1;
            elements.orderSummaryName.textContent = selectedPerfume.name;
            elements.orderQuantityValue.textContent = orderQuantity;
            closeModal('product-modal');
            openModal('order-modal');
            elements.orderError.style.display = 'none';
        }

        // --- EVENT HANDLERS ---

        // Filtering and Navigation
        elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                elements.navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                elements.searchInput.value = ''; // Clear search when filtering
                const filter = link.getAttribute('data-filter');

                let filtered;
                if (filter === 'all') {
                    filtered = initialPerfumes;
                } else if (filter === 'men' || filter === 'women') {
                    filtered = initialPerfumes.filter(p => p.category === filter);
                }
                currentPerfumes = filtered;
                renderCatalog(currentPerfumes);
            });
        });

        // Search Functionality
        elements.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            elements.navLinks.forEach(l => l.classList.remove('active')); // Deactivate filter buttons

            const searched = initialPerfumes.filter(p =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm)
            );
            currentPerfumes = searched;
            renderCatalog(currentPerfumes);
        });


        // Modal Close Buttons (Handles all modals)
        $$('.modal-close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalId = e.target.getAttribute('data-modal') || e.target.closest('.modal-backdrop').id;
                closeModal(modalId);
                // Reset quiz if closed
                if (modalId === 'quiz-modal') resetQuiz();
            });
        });
        $$('.close-confirm-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                closeModal('confirmation-modal');
                // Reset to default filter
                elements.navLinks[0].click();
            });
        });


        // Product Modal to Order Modal flow
        $('#order-now-btn').addEventListener('click', openOrderModal);


        // Order Quantity Control
        const updateQuantity = (delta) => {
            orderQuantity = Math.max(1, orderQuantity + delta);
            elements.orderQuantityValue.textContent = orderQuantity;
        };
        $('#minus-qty').addEventListener('click', () => updateQuantity(-1));
        $('#plus-qty').addEventListener('click', () => updateQuantity(1));


        // --- ORDER SUBMISSION (FIRESTORE) ---

        elements.orderForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!selectedPerfume || !userId) {
                console.error("Order attempted without selected perfume or user ID.");
                elements.orderError.style.display = 'block';
                return;
            }

            const customerName = $('#order-name').value;
            const customerPhone = $('#order-phone').value;
            const customerCity = $('#order-city').value;

            const orderData = {
                appId: appId,
                timestamp: serverTimestamp(),
                customerName,
                customerPhone,
                customerCity,
                perfumeId: selectedPerfume.id,
                perfumeName: selectedPerfume.name,
                quantity: orderQuantity,
                totalPrice: (selectedPerfume.price * orderQuantity).toFixed(2),
                status: 'New'
            };

            const ordersCollectionPath = `/artifacts/${appId}/users/${userId}/orders`;

            try {
                // Save the order to Firestore
                await addDoc(collection(db, ordersCollectionPath), orderData);
                console.log("Order placed successfully:", orderData);

                // Show confirmation modal
                closeModal('order-modal');
                $('#confirmation-message').innerHTML = `
                    Thank you, <b>${customerName}</b>! Your order for ${orderQuantity} x ${selectedPerfume.name} has been placed.
                    <br>Our team will contact you at <b>${customerPhone}</b> shortly.
                `;
                openModal('confirmation-modal');

                // Clear form
                elements.orderForm.reset();
                selectedPerfume = null;
                orderQuantity = 1;

            } catch (error) {
                console.error("Error placing order:", error);
                elements.orderError.textContent = "Failed to place order. Check console for details.";
                elements.orderError.style.display = 'block';
            }
        });


        // --- QUIZ DATA & LOGIC (LLM INTEGRATION) ---

        const quizQuestions = [
            {
                question: "What time of day do you primarily wear perfume?",
                key: "time_of_day",
                options: ["Daytime (Fresh, Light)", "Evening (Rich, Heavy)", "Anytime (Versatile)"]
            },
            {
                question: "Which scent profile do you prefer?",
                key: "scent_profile",
                options: ["Citrus/Aquatic (Clean, Zesty)", "Woody/Spicy (Earthy, Warm)", "Floral/Sweet (Romantic, Soft)"]
            },
            {
                question: "What is your main personality trait when choosing a fragrance?",
                key: "personality",
                options: ["Subtle and Elegant", "Bold and Confident", "Relaxed and Easygoing"]
            }
        ];

        function resetQuiz() {
            currentQuizStep = 0;
            quizAnswers = {};
            elements.quizSubmitBtn.style.display = 'none';
            elements.quizNextBtn.style.display = 'block';
            renderQuizStep();
        }

        function renderQuizStep() {
            const container = elements.quizContent;
            container.innerHTML = '';
            const questionData = quizQuestions[currentQuizStep];

            if (!questionData) {
                // Show final result (or loading spinner)
                container.innerHTML = `<div class="loading-spinner"></div><p style="text-align:center; margin-top: 15px;">Analyzing your preferences...</p>`;
                runPerfumeQuiz();
                return;
            }

            // Update button visibility
            elements.quizPrevBtn.style.display = currentQuizStep > 0 ? 'inline-block' : 'none';
            elements.quizNextBtn.style.display = 'inline-block';
            elements.quizSubmitBtn.style.display = 'none';

            if (currentQuizStep === quizQuestions.length - 1) {
                elements.quizNextBtn.style.display = 'none';
                elements.quizSubmitBtn.style.display = 'inline-block';
            }

            // Render content
            const questionElement = document.createElement('p');
            questionElement.classList.add('quiz-question');
            questionElement.textContent = `Q${currentQuizStep + 1}: ${questionData.question}`;
            container.appendChild(questionElement);

            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('quiz-options');

            questionData.options.forEach(option => {
                const button = document.createElement('button');
                button.type = 'button';
                button.classList.add('quiz-option-btn');
                button.textContent = option;
                button.setAttribute('data-value', option);
                if (quizAnswers[questionData.key] === option) {
                    button.classList.add('selected');
                }

                button.addEventListener('click', () => {
                    // Select logic
                    quizAnswers[questionData.key] = option;
                    optionsDiv.querySelectorAll('.quiz-option-btn').forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                });
                optionsDiv.appendChild(button);
            });
            container.appendChild(optionsDiv);
        }

        elements.quizNextBtn.addEventListener('click', () => {
            const currentKey = quizQuestions[currentQuizStep].key;
            if (!quizAnswers[currentKey]) {
                return; // Prevent moving forward without selection
            }
            currentQuizStep++;
            renderQuizStep();
        });

        elements.quizPrevBtn.addEventListener('click', () => {
            currentQuizStep--;
            renderQuizStep();
        });

        elements.quizSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentKey = quizQuestions[currentQuizStep].key;
            if (!quizAnswers[currentKey]) {
                return; // Prevent submitting without last selection
            }
            currentQuizStep++; // Move to the result step
            renderQuizStep();
        });

        $('#help-me-choose-btn').addEventListener('click', (e) => {
            e.preventDefault();
            resetQuiz();
            openModal('quiz-modal');
        });

        // --- GEMINI LLM API CALL FOR QUIZ RECOMMENDATION ---

        async function runPerfumeQuiz() {
            let retryCount = 0;
            const maxRetries = 3;

            // Prepare the list of available perfumes for the model
            const perfumeList = initialPerfumes.map(p => {
                return `Name: ${p.name} | Category: ${p.category} | Description: ${p.description}`;
            }).join('\n');

            const systemPrompt = `You are a professional, luxury perfume sommelier. Your goal is to recommend the single best-fitting perfume from the provided list based on the user's quiz answers. Write a concise, 100-word personalized description explaining why that specific perfume is a perfect match for the user's expressed preferences and personality. Do not mention the perfume list itself.`;

            const userQuery = `The user completed the quiz with the following answers: ${JSON.stringify(quizAnswers)}. \n\nBased on these answers, recommend the single best match from the following list of perfumes: \n\n--- Available Perfumes ---\n${perfumeList}`;

            const payload = {
                contents: [{ parts: [{ text: userQuery }] }],
                tools: [{ "google_search": {} }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
            };

            while (retryCount < maxRetries) {
                try {
                    const response = await fetch(`${API_URL_BASE}${MODEL_NAME}:generateContent?key=${API_KEY}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) {
                        // Check for rate limiting or other recoverable errors
                        if (response.status === 429) {
                            throw new Error('Rate limit exceeded');
                        }
                        throw new Error(`API call failed with status: ${response.status}`);
                    }

                    const result = await response.json();
                    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

                    if (text) {
                        displayQuizResults(text);
                        return;
                    } else {
                        throw new Error('Received empty response text from Gemini.');
                    }
                } catch (error) {
                    retryCount++;
                    console.error(`Gemini API call failed (Attempt ${retryCount}):`, error);
                    if (retryCount >= maxRetries) {
                        displayQuizError("I'm sorry, I couldn't process your request right now. Please try again later.");
                        return;
                    }
                    // Exponential backoff
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
                }
            }
        }

        function displayQuizResults(resultText) {
            elements.quizContent.innerHTML = `
                <h2 class="modal-title">Your Perfect Match</h2>
                <div class="quiz-result">
                    <p>${resultText.replace(/\n/g, '<br>')}</p>
                </div>
                <button type="button" class="modal-btn" onclick="document.getElementById('quiz-modal').classList.remove('active');">Got it!</button>
            `;
            elements.quizControls.style.display = 'none';
        }

        function displayQuizError(message) {
             elements.quizContent.innerHTML = `
                <h2 class="modal-title" style="color: #e74c3c;">Quiz Error</h2>
                <div class="quiz-result">
                    <p style="color: #e74c3c;">${message}</p>
                </div>
                <button type="button" class="modal-btn" onclick="document.getElementById('quiz-modal').classList.remove('active');">Close</button>
            `;
            elements.quizControls.style.display = 'none';
        }

        // --- INITIALIZATION ---
        window.addEventListener('load', () => {
            renderCatalog(initialPerfumes);
            // Since the nav links have event listeners, we need to manually trigger the 'All' filter on load
            elements.navLinks[0].classList.add('active');
        });
