// =========================================================================
// --- FRAGRANCE DATA & EASY MANIPULATION ---
// To add or remove fragrances, simply edit the objects in this array.
// To use a custom image, replace the 'image' URL with your image path.
// =========================================================================
const initialPerfumes = [
    { id: 1, name: "Midnight Bloom", priceIQD: 130000, category: "women", notes: "Dark Berries, Jasmine, Vanilla", image: "https://placehold.co/200x280/F0F0F0/000000?text=Midnight+Bloom", description: "A captivating blend of dark berries, jasmine, and vanilla. Perfect for evening wear, offering warmth and sophistication.", longevity: "Long-lasting (8h+)", sillage: "Heavy", profile: "Evening_Floral" },
    { id: 2, name: "Desert Sand", priceIQD: 115000, category: "men", notes: "Amber, Cedarwood, Spice", image: "https://placehold.co/200x280/F0F0F0/000000?text=Desert+Sand", description: "Warm notes of amber, cedarwood, and a hint of spice. A rugged, earthy scent that embodies freedom and adventure.", longevity: "Moderate (4-6h)", sillage: "Medium", profile: "Daytime_Woody" },
    { id: 3, name: "Ocean Breeze", priceIQD: 95000, category: "women", notes: "Sea Salt, Citrus, White Musk", image: "https://placehold.co/200x280/F0F0F0/000000?text=Ocean+Breeze", description: "Fresh and aquatic with notes of sea salt and citrus. Ideal for daytime freshness and a clean, invigorating feeling.", longevity: "Short-lived (2-4h)", sillage: "Light", profile: "Daytime_Aquatic" },
    { id: 4, name: "Smoked Leather", priceIQD: 155000, category: "men", notes: "Leather, Vetiver, Cardamom", image: "https://placehold.co/200x280/F0F0F0/000000?text=Smoked+Leather", description: "Intense scent of tanned leather, smoky vetiver, and cardamom. Bold and distinctive, for the confident modern man.", longevity: "Very Long-lasting (10h+)", sillage: "Heavy", profile: "Evening_Woody" },
    { id: 5, name: "Spiced Vetiver", priceIQD: 140000, category: "men", notes: "Vetiver, Nutmeg, Black Pepper", image: "https://placehold.co/200x280/F0F0F0/000000?text=Spiced+Vetiver", description: "A complex blend of earthy vetiver, warm nutmeg, and a touch of black pepper. Distinguished and comforting.", longevity: "Long-lasting (8h+)", sillage: "Medium", profile: "Anytime_Woody" },
    { id: 6, name: "Lace & Lilac", priceIQD: 110000, category: "women", notes: "Lilac, Iris, Vanilla Powder", image: "https://placehold.co/200x280/F0F0F0/000000?text=Lace+&+Lilac", description: "Delicate florals with a powdery finish. A classic, romantic, and beautifully soft feminine fragrance.", longevity: "Moderate (4-6h)", sillage: "Light", profile: "Daytime_Floral" },
];

// --- STATE MANAGEMENT ---
let currentPerfumes = [...initialPerfumes];
let selectedPerfume = null;
let orderQuantity = 1;
let currentQuizStep = 0;
let quizAnswers = {};


// --- QUIZ DATA (Mapping logic) ---
const quizQuestions = [
    {
        question: "What time of day suits your preferred fragrance intensity?",
        key: "time_of_day",
        options: [
            { text: "Daytime (Light, Fresh)", value: "Daytime", profiles: ["Daytime_Woody", "Daytime_Aquatic", "Daytime_Floral"] },
            { text: "Evening (Rich, Intense)", value: "Evening", profiles: ["Evening_Floral", "Evening_Woody"] },
            { text: "Anytime (Versatile, Moderate)", value: "Anytime", profiles: ["Anytime_Woody"] }
        ]
    },
    {
        question: "Which primary scent profile are you drawn to?",
        key: "scent_profile",
        options: [
            { text: "Citrus/Aquatic (Clean, Zesty)", value: "Aquatic", profiles: ["Daytime_Aquatic"] },
            { text: "Woody/Spicy (Earthy, Warm)", value: "Woody", profiles: ["Daytime_Woody", "Evening_Woody", "Anytime_Woody"] },
            { text: "Floral/Sweet (Romantic, Soft)", value: "Floral", profiles: ["Evening_Floral", "Daytime_Floral"] }
        ]
    }
];

// --- UI ELEMENT GETTERS ---
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const elements = {
    catalog: $('#perfume-catalog'),
    navLinks: $$('.nav-link'),
    searchInput: $('#search-input'),
    orderSummaryName: $('#order-summary-name'),
    orderQuantityValue: $('#order-quantity'),
    orderForm: $('#order-form'),
    quizContent: $('#quiz-content'),
    quizNextBtn: $('#quiz-next-btn'),
    quizPrevBtn: $('#quiz-prev-btn'),
};

// --- CORE UI FUNCTIONS ---

/**
 * Formats a number to English comma-separated format followed by "IQD".
 * E.g., 130000 -> "130,000 IQD"
 */
function formatCurrency(amount) {
    const formattedNumber = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(amount);
    return `${formattedNumber} IQD`;
}

/**
 * Renders the current list of perfumes to the catalog section.
 */
function renderCatalog(perfumesToRender) {
    elements.catalog.innerHTML = '';
    if (perfumesToRender.length === 0) {
        elements.catalog.innerHTML = `<p class="empty-message" style="text-align: center; color: #555; padding: 40px;">No fragrances found matching your search. Try different keywords or filters.</p>`;
        return;
    }

    perfumesToRender.forEach(perfume => {
        const card = document.createElement('div');
        card.classList.add('perfume-card');
        card.setAttribute('data-id', perfume.id);
        card.innerHTML = `
            <img src="${perfume.image}" alt="Bottle of ${perfume.name}" class="perfume-card-img" 
                onerror="this.onerror=null; this.src='https://placehold.co/200x280/F0F0F0/000000?text=Image';" />
            <div class="perfume-card-content">
                <p class="perfume-card-notes">${perfume.notes}</p>
                <p class="perfume-card-price">${formatCurrency(perfume.priceIQD)}</p>
            </div>
        `;
        card.addEventListener('click', () => openProductModal(perfume));
        elements.catalog.appendChild(card);
    });
}

/**
 * Opens a specific modal.
 */
function openModal(modalId) {
    document.getElementById(modalId)?.classList.add('active');
}

/**
 * Closes a specific modal.
 */
function closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove('active');
}

/**
 * Populates and opens the product detail modal.
 */
function openProductModal(perfume) {
    selectedPerfume = perfume;
    $('#modal-image').src = perfume.image;
    $('#modal-image').alt = `${perfume.name} Perfume Bottle`;
    $('#modal-name').textContent = perfume.name;
    $('#modal-notes').textContent = `Top Notes: ${perfume.notes}`; 
    $('#modal-description').textContent = perfume.description;
    $('#modal-longevity').textContent = `Longevity: ${perfume.longevity}`;
    $('#modal-sillage').textContent = `Sillage: ${perfume.sillage}`;
    $('#modal-price').textContent = formatCurrency(perfume.priceIQD);
    openModal('product-modal');
}

// --- EVENT HANDLERS ---

// Filtering and Navigation
elements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        if(link.id === 'help-me-choose-btn') return; // Handled separately

        elements.navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        elements.searchInput.value = ''; // Clear search when filtering
        const filter = link.getAttribute('data-filter');

        let filtered;
        if (filter === 'all') {
            filtered = initialPerfumes;
        } else {
            filtered = initialPerfumes.filter(p => p.category === filter);
        }
        currentPerfumes = filtered;
        renderCatalog(currentPerfumes);
    });
});

// Search Functionality (Includes notes)
elements.searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    elements.navLinks.forEach(l => l.classList.remove('active')); // Deactivate filter buttons

    const searched = initialPerfumes.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.notes.toLowerCase().includes(searchTerm) || // Search by notes!
        p.description.toLowerCase().includes(searchTerm)
    );
    currentPerfumes = searched;
    renderCatalog(currentPerfumes);
});


// Modal Close Buttons 
$$('.modal-close-btn, .close-confirm-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const modalId = e.target.getAttribute('data-modal') || e.target.closest('.modal-backdrop').id;
        closeModal(modalId);
        if (modalId === 'quiz-modal') resetQuiz();
        if (modalId === 'confirmation-modal') elements.navLinks[0].click(); // Reset to "All" view
    });
});


// Product Modal to Order Modal flow
$('#order-now-btn').addEventListener('click', () => {
    if (!selectedPerfume) return;
    orderQuantity = 1;
    elements.orderSummaryName.textContent = selectedPerfume.name;
    elements.orderQuantityValue.textContent = orderQuantity;
    closeModal('product-modal');
    openModal('order-modal');
    $('#order-error').style.display = 'none';
});


// Order Quantity Control
const updateQuantity = (delta) => {
    orderQuantity = Math.max(1, orderQuantity + delta);
    elements.orderQuantityValue.textContent = orderQuantity;
};
$('#minus-qty').addEventListener('click', () => updateQuantity(-1));
$('#plus-qty').addEventListener('click', () => updateQuantity(1));


// --- ORDER SUBMISSION (Placeholder) ---

elements.orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const customerName = $('#order-name').value;
    const customerPhone = $('#order-phone').value;
    const totalAmount = selectedPerfume.priceIQD * orderQuantity;

    const orderData = {
        timestamp: new Date().toISOString(),
        customerName,
        customerPhone,
        perfumeName: selectedPerfume.name,
        quantity: orderQuantity,
        totalPrice: formatCurrency(totalAmount)
    };
    
    // In a real application, you would send orderData to a backend/database (like Firestore) here.
    console.log("Order Submitted:", orderData);
    
    // Show confirmation modal
    closeModal('order-modal');
    $('#confirmation-message').innerHTML = `
        Thank you, <b>${customerName}</b>! Your order for ${orderQuantity} x ${selectedPerfume.name} has been placed.
        <br>Total: <b>${formatCurrency(totalAmount)}</b>. We will contact you at <b>${customerPhone}</b> shortly.
    `;
    openModal('confirmation-modal');

    // Clear form and state
    elements.orderForm.reset();
    selectedPerfume = null;
});


// --- MAPPING QUIZ LOGIC ---

function resetQuiz() {
    currentQuizStep = 0;
    quizAnswers = {};
    renderQuizStep();
}

function renderQuizStep() {
    const container = elements.quizContent;
    container.innerHTML = '';
    
    const questionData = quizQuestions[currentQuizStep];
    const isFinalStep = currentQuizStep === quizQuestions.length;

    elements.quizPrevBtn.style.display = currentQuizStep > 0 && !isFinalStep ? 'inline-block' : 'none';
    elements.quizNextBtn.textContent = isFinalStep ? 'See Results' : 'Next';
    elements.quizNextBtn.style.display = 'inline-block';
    
    if (isFinalStep) {
        elements.quizNextBtn.textContent = 'See Results';
        elements.quizPrevBtn.style.display = 'inline-block'; 
        return;
    }

    // --- QUESTION STEP ---
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
        button.textContent = option.text;
        
        if (quizAnswers[questionData.key] === option.value) {
            button.classList.add('selected');
        }

        button.addEventListener('click', () => {
            quizAnswers[questionData.key] = option.value;
            optionsDiv.querySelectorAll('.quiz-option-btn').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
        optionsDiv.appendChild(button);
    });
    container.appendChild(optionsDiv);
}

elements.quizNextBtn.addEventListener('click', () => {
    const currentQuestion = quizQuestions[currentQuizStep];
    if (currentQuestion && !quizAnswers[currentQuestion.key]) {
        alert("Please select an option before proceeding!");
        return;
    }

    if (currentQuizStep < quizQuestions.length) {
        currentQuizStep++;
        renderQuizStep();
    } 
    
    if (currentQuizStep === quizQuestions.length) {
        displayQuizResults();
    }
});

elements.quizPrevBtn.addEventListener('click', () => {
    currentQuizStep--;
    renderQuizStep();
});

function displayQuizResults() {
    const container = elements.quizContent;
    container.innerHTML = `<h2 class="modal-title">Your Perfect Match</h2>`;

    elements.quizNextBtn.style.display = 'none'; // Hide next button on results page

    // 1. Determine the target profile key (e.g., "Evening_Floral")
    const timeOfDay = quizAnswers.time_of_day || '';
    const scentProfile = quizAnswers.scent_profile || '';
    const targetProfile = `${timeOfDay}_${scentProfile}`;

    // 2. Filter perfumes for a direct match
    let matchedPerfumes = initialPerfumes.filter(p => p.profile.includes(targetProfile));

    // Fallback logic for better user experience if no perfect match is found
    if (matchedPerfumes.length === 0) {
        matchedPerfumes = initialPerfumes.filter(p => p.profile.includes(scentProfile));
        container.innerHTML += `<p style="text-align:center; color:#e74c3c; font-size:0.85rem;">No perfect match found, showing suggestions based on your profile type.</p>`;
    }
    
    // 3. Render the results
    if (matchedPerfumes.length > 0) {
        matchedPerfumes.forEach(p => {
            const resultCard = document.createElement('div');
            resultCard.classList.add('quiz-result-card');
            resultCard.innerHTML = `
                <h4>${p.name}</h4>
                <p>(${p.notes}) - ${p.description.substring(0, 70)}...</p>
                <p style="font-weight: bold; margin-top: 5px;">${formatCurrency(p.priceIQD)}</p>
            `;
            // Clicking the result card opens the product details
            resultCard.addEventListener('click', () => {
                closeModal('quiz-modal');
                openProductModal(p);
            });
            container.appendChild(resultCard);
        });
    } else {
        container.innerHTML += `<p style="text-align:center;">We couldn't find a direct match, but please browse our full catalog to discover a scent you love!</p>`;
    }
}

$('#help-me-choose-btn').addEventListener('click', (e) => {
    e.preventDefault();
    // Reset all nav links (important for mobile UI consistency)
    $$('.nav-link').forEach(l => l.classList.remove('active'));
    // Open the quiz
    resetQuiz();
    openModal('quiz-modal');
});

// --- INITIALIZATION ---
window.addEventListener('load', () => {
    renderCatalog(initialPerfumes);
    // Ensure the initial "All Fragrances" filter is active
    elements.navLinks[0].classList.add('active');
});
