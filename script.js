document.addEventListener('DOMContentLoaded', () => {
    // ------------------- Mock Data (ENHANCED WITH NOTES) -------------------
    // Added 'notes' array to each perfume for quiz filtering
    const perfumes = [
        // --- Oud Al Sultan (Men) ---
        {
            id: 'p1',
            name: 'Oud Al Sultan',
            price: 75000, 
            category: 'men',
            description: 'A rich and powerful blend of classic oud with a hint of spicy notes, perfect for a strong statement. A true embodiment of masculinity and luxury.',
            quality: 'Long Lasting',
            sillage: 'Strong',
            image: 'https://source.unsplash.com/400x400/?perfume,oud,men',
            notes: ['spicy', 'woody', 'oud'] // Added for quiz
        },
        // --- Rose & Vanilla (Women) ---
        {
            id: 'p2',
            name: 'Rose & Vanilla',
            price: 60000,
            category: 'women',
            description: 'An elegant and sweet fragrance with the timeless aroma of blooming roses and a warm, comforting vanilla finish. Ideal for a graceful and feminine touch.',
            quality: 'Fresh Scent',
            sillage: 'Moderate',
            image: 'https://source.unsplash.com/400x400/?perfume,rose,vanilla',
            notes: ['sweet', 'floral', 'vanilla'] // Added for quiz
        },
        // --- Aqua Serenity (Men) ---
        {
            id: 'p3',
            name: 'Aqua Serenity',
            price: 55000,
            category: 'men',
            description: 'A fresh and invigorating scent inspired by the ocean breeze, featuring notes of citrus and sea salt. A perfect everyday fragrance for a clean and refreshing feel.',
            quality: 'Daily Wear',
            sillage: 'Light',
            image: 'https://source.unsplash.com/400x400/?perfume,aqua,fresh',
            notes: ['fresh', 'citrus', 'light'] // Added for quiz
        },
        // --- Midnight Jasmine (Women) ---
        {
            id: 'p4',
            name: 'Midnight Jasmine',
            price: 65000,
            category: 'women',
            description: 'A mysterious and seductive fragrance with the intense aroma of jasmine and a subtle hint of musky undertones. Perfect for an evening out or a special occasion.',
            quality: 'Evening',
            sillage: 'Heavy',
            image: 'https://source.unsplash.com/400x400/?perfume,jasmine,night',
            notes: ['floral', 'musk', 'heavy'] // Added for quiz
        },
        // --- Extra Perfume for better quiz results
        {
            id: 'p5',
            name: 'Amber Sunset',
            price: 80000, 
            category: 'unisex',
            description: 'A deep, warm amber base with hints of leather and tobacco. Luxurious, long-lasting, and universally appealing.',
            quality: 'Luxury',
            sillage: 'Strong',
            image: 'https://source.unsplash.com/400x400/?perfume,amber,leather',
            notes: ['spicy', 'woody', 'heavy', 'leather']
        },
        {
            id: 'p6',
            name: 'Pistachio Dream',
            price: 62000, 
            category: 'women',
            description: 'A gourmand, creamy scent with sweet pistachio and almond notes, leading to a buttery vanilla finish. Deliciously feminine.',
            quality: 'Gourmand',
            sillage: 'Moderate',
            image: 'https://source.unsplash.com/400x400/?perfume,pistachio,sweet',
            notes: ['sweet', 'gourmand', 'vanilla']
        },
    ];

    // ------------------- Quiz Data (NEW) -------------------
    const quizQuestions = [
        {
            question: "Who is the fragrance for?",
            key: "category",
            options: [{ label: "Men", value: "men" }, { label: "Women", value: "women" }, { label: "Unisex", value: "all" }],
        },
        {
            question: "Do you prefer Sweet/Creamy or Sharp/Spicy notes?",
            key: "notes",
            options: [{ label: "Sweet/Creamy", value: "sweet" }, { label: "Sharp/Spicy", value: "spicy" }],
        },
        {
            question: "Which primary scent profile do you enjoy?",
            key: "notes",
            options: [{ label: "Oud/Woody", value: "woody" }, { label: "Floral/Fresh", value: "floral" }, { label: "Aqua/Citrus", value: "citrus" }],
        },
        {
            question: "How strong do you want the scent trail (Sillage) to be?",
            key: "sillage",
            options: [{ label: "Heavy / Strong", value: "Strong" }, { label: "Moderate", value: "Moderate" }, { label: "Light / Subtle", value: "Light" }],
        },
    ];

    let currentPerfume = null;
    let currentQuantity = 1;
    let currentQuizStep = 0;
    let quizAnswers = {};

    // ------------------- DOM Elements -------------------
    const perfumeCatalog = document.getElementById('perfume-catalog');
    const navLinks = document.querySelectorAll('.nav-link');
    const searchInput = document.getElementById('search-input');
    const helpMeChooseBtn = document.getElementById('help-me-choose-btn');

    const productModal = document.getElementById('product-modal');
    const productModalCloseBtn = productModal.querySelector('.modal-close-btn');
    const modalImage = document.getElementById('modal-image');
    const modalName = document.getElementById('modal-name');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const modalQuality = document.getElementById('modal-quality');
    const modalSillage = document.getElementById('modal-sillage');
    const orderNowBtn = document.getElementById('order-now-btn');

    const orderModal = document.getElementById('order-modal');
    const orderModalCloseBtn = orderModal.querySelector('.modal-close-btn');
    const orderSummaryName = document.getElementById('order-summary-name');
    const quantityMinusBtn = orderModal.querySelector('.minus-btn');
    const quantityPlusBtn = orderModal.querySelector('.plus-btn');
    const orderQuantitySpan = document.getElementById('order-quantity');
    const orderForm = document.getElementById('order-form');
    const orderCitySelect = document.getElementById('order-city');

    const confirmationModal = document.getElementById('confirmation-modal');
    const closeConfirmBtn = confirmationModal.querySelector('.close-confirm-btn');

    const quizModal = document.getElementById('quiz-modal');
    const quizModalCloseBtn = quizModal.querySelector('.modal-close-btn');
    const quizContent = document.getElementById('quiz-content');
    const quizNextBtn = document.getElementById('quiz-next-btn');
    const quizPrevBtn = document.getElementById('quiz-prev-btn');
    const quizSubmitBtn = document.getElementById('quiz-submit-btn');


    // ------------------- Configuration -------------------
    const TELEGRAM_APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz02WcrKgwzQ48WwMLhXBmyDb7eN-DFKiP8ux7wccG4ssHJiUQOxaaBwkBKs7agi6gT/exec'; // Placeholder URL

    // ------------------- Utility Functions -------------------
    const formatPrice = (price) => `${price.toLocaleString()} IQD`;
    
    const closeModal = (modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    const openModal = (modal) => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const setActiveFilter = (filter) => {
        navLinks.forEach(nav => nav.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-filter="${filter}"]`);
        if (activeLink) activeLink.classList.add('active');
        if (filter === 'quiz') {
            helpMeChooseBtn.classList.add('active');
        }
    };

    const renderPerfumeCards = (filteredPerfumes) => {
        perfumeCatalog.innerHTML = '';
        if (filteredPerfumes.length === 0) {
            perfumeCatalog.innerHTML = '<p class="empty-message">No perfumes found matching your criteria. Try adjusting your filters or search term.</p>'; 
            return;
        }

        filteredPerfumes.forEach(perfume => {
            const card = document.createElement('div');
            card.className = 'perfume-card';
            card.dataset.id = perfume.id;
            card.innerHTML = `
                <img src="${perfume.image}" alt="${perfume.name}" class="perfume-card-img">
                <div class="perfume-card-content">
                    <h3 class="perfume-card-name">${perfume.name}</h3>
                    <p class="perfume-card-price">${formatPrice(perfume.price)}</p>
                </div>
            `;
            perfumeCatalog.appendChild(card);
        });
    };


    // ------------------- Quiz Logic -------------------

    const renderQuizStep = () => {
        const step = quizQuestions[currentQuizStep];
        quizContent.innerHTML = `
            <p class="quiz-question">${step.question}</p>
            <div class="quiz-options">
                ${step.options.map(opt => `
                    <button type="button" class="quiz-option-btn" data-key="${step.key}" data-value="${opt.value}">
                        ${opt.label}
                    </button>
                `).join('')}
            </div>
        `;

        // Highlight previously selected answer
        const selectedValue = quizAnswers[step.key];
        if (selectedValue) {
            const selectedBtn = quizContent.querySelector(`.quiz-option-btn[data-value="${selectedValue}"]`);
            if (selectedBtn) selectedBtn.classList.add('selected');
        }

        // Control buttons visibility
        quizPrevBtn.style.display = currentQuizStep > 0 ? 'block' : 'none';
        quizNextBtn.style.display = currentQuizStep < quizQuestions.length - 1 ? 'block' : 'none';
        quizSubmitBtn.style.display = currentQuizStep === quizQuestions.length - 1 ? 'block' : 'none';
    };

    const filterByQuizAnswers = () => {
        let filtered = perfumes;

        // 1. Filter by Category
        if (quizAnswers.category && quizAnswers.category !== 'all') {
            filtered = filtered.filter(p => p.category === quizAnswers.category);
        }

        // 2. Filter by Sillage
        if (quizAnswers.sillage) {
            filtered = filtered.filter(p => p.sillage === quizAnswers.sillage);
        }

        // 3. Filter by Notes (the last selected note overwrites previous note choices)
        if (quizAnswers.notes) {
            const selectedNote = quizAnswers.notes;
            filtered = filtered.filter(p => p.notes.includes(selectedNote));
        }
        
        // If quiz returned no results, fall back to a broader search (e.g., just category)
        if (filtered.length === 0 && quizAnswers.category && quizAnswers.category !== 'all') {
            filtered = perfumes.filter(p => p.category === quizAnswers.category);
            if (filtered.length > 0) {
                alert(`No exact matches found, but here are all the ${quizAnswers.category}'s fragrances!`);
            }
        }


        return filtered;
    };


    // ------------------- Event Listeners -------------------
    
    // Initial render - Display all
    renderPerfumeCards(perfumes);

    // Filter navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // If the link is "Help me Choose", open the quiz modal
            if (link.id === 'help-me-choose-btn') {
                currentQuizStep = 0; // Reset quiz
                quizAnswers = {};
                renderQuizStep();
                openModal(quizModal);
                return;
            }

            // Standard filtering
            const filter = link.dataset.filter;
            setActiveFilter(filter);
            const filteredPerfumes = filter === 'all' ? perfumes : perfumes.filter(p => p.category === filter);
            renderPerfumeCards(filteredPerfumes);
            searchInput.value = '';
        });
    });

    // Quiz Option Selection
    quizContent.addEventListener('click', (e) => {
        const btn = e.target.closest('.quiz-option-btn');
        if (btn) {
            const key = btn.dataset.key;
            const value = btn.dataset.value;
            quizAnswers[key] = value;
            
            // Update selected state
            quizContent.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Auto-advance to the next step
            setTimeout(() => {
                if (currentQuizStep < quizQuestions.length - 1) {
                    currentQuizStep++;
                    renderQuizStep();
                }
            }, 200); 
        }
    });

    // Quiz Navigation Buttons
    quizPrevBtn.addEventListener('click', () => {
        if (currentQuizStep > 0) {
            currentQuizStep--;
            renderQuizStep();
        }
    });

    quizNextBtn.addEventListener('click', () => {
        const currentKey = quizQuestions[currentQuizStep].key;
        if (quizAnswers[currentKey]) {
            currentQuizStep++;
            renderQuizStep();
        } else {
            alert('Please select an option to continue.');
        }
    });

    // Quiz Submission
    quizSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentKey = quizQuestions[currentQuizStep].key;
        if (quizAnswers[currentKey]) {
            closeModal(quizModal);
            const results = filterByQuizAnswers();
            renderPerfumeCards(results);
            setActiveFilter('quiz');
        } else {
            alert('Please select an option to see your results.');
        }
    });

    quizModalCloseBtn.addEventListener('click', () => closeModal(quizModal));


    // Real-time search
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        // Determine the current filter context
        const activeFilterLink = document.querySelector('.nav-link.active');
        const activeFilter = activeFilterLink ? activeFilterLink.dataset.filter : 'all';

        let basePerfumes = perfumes;
        if (activeFilter !== 'all' && activeFilter !== 'quiz') {
            basePerfumes = perfumes.filter(p => p.category === activeFilter);
        } else if (activeFilter === 'quiz') {
            basePerfumes = filterByQuizAnswers();
        }
        
        const filteredPerfumes = basePerfumes.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query)
        );
        renderPerfumeCards(filteredPerfumes);
    });


    // Open product modal
    perfumeCatalog.addEventListener('click', (e) => {
        const card = e.target.closest('.perfume-card');
        if (card) {
            const perfumeId = card.dataset.id;
            const perfume = perfumes.find(p => p.id === perfumeId);
            if (perfume) {
                currentPerfume = perfume;
                modalImage.src = perfume.image;
                modalImage.alt = perfume.name;
                modalName.textContent = perfume.name;
                modalPrice.textContent = formatPrice(perfume.price);
                modalDescription.textContent = perfume.description;
                modalQuality.textContent = perfume.quality;
                modalSillage.textContent = `Sillage: ${perfume.sillage}`;
                openModal(productModal);
            }
        }
    });

    // Close modals
    productModalCloseBtn.addEventListener('click', () => closeModal(productModal));
    orderModalCloseBtn.addEventListener('click', () => closeModal(orderModal));
    closeConfirmBtn.addEventListener('click', () => {
        closeModal(confirmationModal);
        // Reset state and return to 'All'
        currentPerfume = null;
        currentQuantity = 1;
        orderQuantitySpan.textContent = currentQuantity;
        document.getElementById('order-form').reset();
        setActiveFilter('all');
        renderPerfumeCards(perfumes);
    });

    // Order Now from product modal
    orderNowBtn.addEventListener('click', () => {
        if (currentPerfume) {
            orderSummaryName.textContent = currentPerfume.name;
            currentQuantity = 1; // Reset quantity on new order
            orderQuantitySpan.textContent = currentQuantity;
            closeModal(productModal);
            openModal(orderModal);
        }
    });

    // Quantity control
    quantityPlusBtn.addEventListener('click', () => {
        currentQuantity++;
        orderQuantitySpan.textContent = currentQuantity;
    });

    quantityMinusBtn.addEventListener('click', () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            orderQuantitySpan.textContent = currentQuantity;
        }
    });

    // Handle order submission and send to Google Apps Script
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('order-name').value;
        const phone = document.getElementById('order-phone').value;
        const city = orderCitySelect.value;
        
        if (!currentPerfume) {
            alert('Please select a perfume first.');
            return;
        }

        const orderDetails = {
            customerName: name,
            customerPhone: phone,
            customerCity: city,
            itemName: currentPerfume.name,
            quantity: currentQuantity,
            totalPrice: currentPerfume.price * currentQuantity
        };
        
        const submitBtn = orderForm.querySelector('.place-order-btn');
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        try {
            // SIMULATED FETCH - Replace with actual fetch if needed
            /*
            const response = await fetch(TELEGRAM_APP_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderDetails)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            */
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

            closeModal(orderModal);
            openModal(confirmationModal);

        } catch (error) {
            console.error('Error:', error);
            alert('There was an error placing your order. Please try again.');
        } finally {
            submitBtn.textContent = 'Place Order';
            submitBtn.disabled = false;
        }
    });

    // Close modal on outside click (excluding the quiz which auto-advances)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            const activeModal = document.querySelector('.modal-backdrop.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
});
