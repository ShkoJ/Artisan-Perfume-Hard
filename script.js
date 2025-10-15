// =========================================================================
// --- FRAGRANCE DATA & EASY MANIPULATION ---
// To add or remove fragrances, simply edit the objects in this array.
// To use a custom image, replace the 'image' URL with your image path.
// =========================================================================

// --- 1. GLOBAL IMAGE REPLACEMENT ---
const TEST_IMAGE_PATH = "fattan.jpeg"; // Use fattan.jpeg for all fragrances

const initialPerfumes = [
    // Updated image property to use the test image path
    { id: 1, name: "Midnight Bloom", priceIQD: 130000, category: "women", notes: "Dark Berries, Jasmine, Vanilla", image: TEST_IMAGE_PATH, description: "A captivating blend of dark berries, jasmine, and vanilla. Perfect for evening wear, offering warmth and sophistication.", longevity: "Long-lasting (8h+)", sillage: "Heavy", profile: "Evening_Floral" },
    { id: 2, name: "Desert Sand", priceIQD: 115000, category: "men", notes: "Amber, Cedarwood, Spice", image: TEST_IMAGE_PATH, description: "Warm notes of amber, cedarwood, and a hint of spice. A rugged, earthy scent that embodies freedom and adventure.", longevity: "Moderate (4-6h)", sillage: "Medium", profile: "Daytime_Woody" },
    { id: 3, name: "Ocean Breeze", priceIQD: 95000, category: "women", notes: "Sea Salt, Citrus, White Musk", image: TEST_IMAGE_PATH, description: "Fresh and aquatic with notes of sea salt and citrus. Ideal for daytime freshness and a clean, invigorating feeling.", longevity: "Short-lived (2-4h)", sillage: "Light", profile: "Daytime_Aquatic" },
    { id: 4, name: "Smoked Leather", priceIQD: 155000, category: "men", notes: "Leather, Vetiver, Cardamom", image: TEST_IMAGE_PATH, description: "Intense scent of tanned leather, smoky vetiver, and cardamom. Bold and distinctive, for the confident modern man.", longevity: "Very Long-lasting (10h+)", sillage: "Heavy", profile: "Evening_Woody" },
    { id: 5, name: "Spiced Vetiver", priceIQD: 140000, category: "men", notes: "Vetiver, Nutmeg, Black Pepper", image: TEST_IMAGE_PATH, description: "A complex blend of earthy vetiver, warm nutmeg, and a touch of black pepper. Distinguished and comforting.", longevity: "Long-lasting (8h+)", sillage: "Medium", profile: "Anytime_Woody" },
    { id: 6, name: "Lace & Lilac", priceIQD: 110000, category: "women", notes: "Lilac, Iris, Vanilla Powder", image: TEST_IMAGE_PATH, description: "Delicate florals with a powdery finish. A classic, romantic, and beautifully soft feminine fragrance.", longevity: "Moderate (4-6h)", sillage: "Light", profile: "Daytime_Floral" },
];

// --- STATE MANAGEMENT ---
let currentPerfumes = [...initialPerfumes];
let selectedPerfume = null;
let orderQuantity = 1;
let currentQuizStep = 0;
let quizAnswers = {};

// =========================================================================
// --- TELEGRAM SETUP ---
// Configuration using your provided Bot Token and Channel ID
// =========================================================================
const BOT_TOKEN = '8276122717:AAG4UVrd_BgLVZDtS7UP7_jXBvSiAoHYiBk'; 
const CHAT_ID = '-1002969971930'; // Your actual ARTISAN ORDERS channel ID
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
// =========================================================================

// --- ORDER TRACKING COUNTER ---
// Retrieves the last order number or starts at 0. Stores in browser's local storage.
let orderCounter = parseInt(localStorage.getItem('artisanOrderCounter') || 0);

// --- 2. EXPANDED QUIZ DATA (Includes Gender and Season) ---
// NOTE: Profiles for options are derived from the initial data set
const quizQuestions = [
    {
        question: "Is this for a Man or a Woman?",
        key: "gender",
        options: [
            { text: "Man", value: "men", profiles: initialPerfumes.filter(p => p.category === 'men').map(p => p.profile) },
            { text: "Woman", value: "women", profiles: initialPerfumes.filter(p => p.category === 'women').map(p => p.profile) },
            { text: "Unisex/Either", value: "unisex", profiles: initialPerfumes.map(p => p.profile) }
        ]
    },
    {
        question: "Which Season is the Scent Intended for?",
        key: "season",
        options: [
            { text: "Spring/Summer (Fresh, Light)", value: "summer", profiles: ["Daytime_Woody", "Daytime_Aquatic", "Daytime_Floral"] },
            { text: "Autumn/Winter (Warm, Heavy)", value: "winter", profiles: ["Evening_Floral", "Evening_Woody", "Anytime_Woody"] },
            { text: "All Year Round (Versatile)", value: "all", profiles: initialPerfumes.map(p => p.profile) }
        ]
    },
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
    orderError: $('#order-error'),
    quizContent: $('#quiz-content'),
    quizPrevBtn: $('#quiz-prev-btn'), 
    quizControlsFooter: $('#quiz-controls-footer'),
};

// --- CORE UI FUNCTIONS ---

/**
 * Formats a number to English comma-separated format followed by "IQD".
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
                onerror="this.onerror=null; this.src='${TEST_IMAGE_PATH}';" /> 
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
    // MODAL IMAGE UPDATE: Ensure modal image uses the test image
    $('#modal-image').src = TEST_IMAGE_PATH; 
    $('#modal-image').alt = `${perfume.name} Perfume Bottle`;
    $('#modal-name').textContent = perfume.name;
    $('#modal-notes').textContent = `Top Notes: ${perfume.notes}`; 
    $('#modal-description').textContent = perfume.description;
    $('#modal-longevity').textContent = `Longevity: ${perfume.longevity}`;
    $('#modal-sillage').textContent = `Sillage: ${perfume.sillage}`;
    $('#modal-price').textContent = formatCurrency(perfume.priceIQD);
    openModal('product-modal');
}

// --- QUIZ LOGIC FUNCTIONS ---

function resetQuiz() {
    currentQuizStep = 0;
    quizAnswers = {};
    elements.quizContent.innerHTML = '';
    elements.quizPrevBtn.style.display = 'none';
    
    // Ensure "Help me Choose" link is un-highlighted after quiz close
    const helpMeChooseLink = $('#help-me-choose-btn');
    if(helpMeChooseLink.classList.contains('active')) {
        helpMeChooseLink.classList.remove('active');
        elements.navLinks[0].click(); // Go back to 'All' filter
    }
}

function startQuiz() {
    currentQuizStep = 0;
    quizAnswers = {};
    renderQuizStep();
    openModal('quiz-modal');
}

function renderQuizStep() {
    elements.quizContent.innerHTML = '';
    
    if (currentQuizStep >= quizQuestions.length) {
        // Quiz is finished, show results
        elements.quizContent.innerHTML = `
            <div>
                <h3 class="modal-title" style="margin-bottom: 1rem;">Quiz Complete!</h3>
                <p>Thank you for completing the quiz. Your preferences have been recorded:</p>
                <ul style="list-style: none; padding: 0; margin: 1rem 0;">
                    ${Object.entries(quizAnswers).map(([key, value]) => `
                        <li style="margin-bottom: 0.5rem; font-size: 0.95rem;">
                            <strong>${key.replace(/_/g, ' ').toUpperCase()}:</strong> ${value}
                        </li>
                    `).join('')}
                </ul>
                <p style="font-weight: 600; color: #E74C3C;">The final result recommendation section will be implemented in the next step.</p>
                <button type="button" class="modal-btn" data-modal="quiz-modal">Close Quiz</button>
            </div>
        `;
        elements.quizPrevBtn.style.display = 'none';
        
    } else {
        const step = quizQuestions[currentQuizStep];
        const questionHtml = document.createElement('div');
        questionHtml.innerHTML = `
            <h3 style="margin-bottom: 1.5rem;">${step.question}</h3>
            <div class="quiz-options">
                ${step.options.map(option => `
                    <button type="button" class="quiz-option-btn ${quizAnswers[step.key] === option.value ? 'selected' : ''}" data-value="${option.value}">
                        ${option.text}
                    </button>
                `).join('')}
            </div>
        `;
        elements.quizContent.appendChild(questionHtml);

        // --- INTERACTIVE QUIZ LOGIC: AUTO-PROGRESSION ---
        $$('.quiz-option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedValue = e.target.getAttribute('data-value');
                const key = quizQuestions[currentQuizStep].key;

                // 1. Record Answer
                quizAnswers[key] = selectedValue;
                
                // Optional: Visually mark selected option
                $$('.quiz-option-btn').forEach(o => o.classList.remove('selected'));
                e.target.classList.add('selected');

                // 2. Automatically go to the next step
                setTimeout(nextQuizStep, 300); // Small delay for visual feedback
            });
        });
        // End of Auto-Progression Logic

        // Update control visibility
        elements.quizPrevBtn.style.display = currentQuizStep > 0 ? 'inline-block' : 'none';
    }
}

function nextQuizStep() {
    if (currentQuizStep < quizQuestions.length) {
        currentQuizStep++;
        renderQuizStep();
    }
}

function prevQuizStep() {
    if (currentQuizStep > 0) {
        currentQuizStep--;
        // Remove the answer for the step we're going back from
        delete quizAnswers[quizQuestions[currentQuizStep].key]; 
        renderQuizStep();
    }
}

// --- EVENT HANDLERS ---

// Filtering and Navigation
elements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        if(link.id === 'help-me-choose-btn') {
            elements.navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            elements.searchInput.value = '';
            startQuiz(); // Start quiz instead of filtering
            return;
        }

        elements.navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        elements.searchInput.value = ''; 
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
    elements.navLinks.forEach(l => l.classList.remove('active')); 

    const searched = initialPerfumes.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.notes.toLowerCase().includes(searchTerm) || 
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
        if (modalId === 'confirmation-modal') elements.navLinks[0].click(); 
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
    elements.orderError.style.display = 'none';
});


// Order Quantity Control
const updateQuantity = (delta) => {
    orderQuantity = Math.max(1, orderQuantity + delta);
    elements.orderQuantityValue.textContent = orderQuantity;
};
$('#minus-qty').addEventListener('click', () => updateQuantity(-1));
$('#plus-qty').addEventListener('click', () => updateQuantity(1));


/**
 * Sends the order data as a Telegram message via the Bot API.
 */
async function sendTelegramNotification(orderData) {
    if (CHAT_ID === '-1002969971930') {
        // Check is safe, proceed
    } 

    const message = `
🚨 **NEW ARTISAN ORDER #${orderData.orderId}** 🚨
 
Perfume: **${orderData.perfumeName}**
Quantity: ${orderData.quantity}
Total Price: ${orderData.totalPrice}
 
---
 
Customer: ${orderData.customerName}
Phone: **${orderData.customerPhone}**
City: Erbil (FIXED)
Time: ${new Date(orderData.timestamp).toLocaleString()}
    `;

    const payload = {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
    };

    try {
        const response = await fetch(TELEGRAM_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        if (!response.ok || !data.ok) {
            console.error('Telegram API Error:', data);
            return { ok: false, error: data.description || "Unknown Telegram error" };
        }
        return { ok: true };

    } catch (error) {
        console.error('Network or Telegram request failed:', error);
        return { ok: false, error: error.message };
    }
}


// --- ORDER SUBMISSION (Now sends to Telegram) ---

elements.orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate input fields manually as required attribute might be bypassed
    const customerName = $('#order-name').value.trim();
    const customerPhone = $('#order-phone').value.trim();

    if (!customerName || !customerPhone || !selectedPerfume) {
        elements.orderError.textContent = "Please fill in your name and phone number and ensure a perfume is selected.";
        elements.orderError.style.display = 'block';
        return;
    }

    // Increment counter and save it immediately
    orderCounter++;
    localStorage.setItem('artisanOrderCounter', orderCounter);

    const totalAmount = selectedPerfume.priceIQD * orderQuantity;

    const orderData = {
        orderId: orderCounter, // Added Order ID
        timestamp: new Date().toISOString(),
        customerName,
        customerPhone,
        perfumeName: selectedPerfume.name,
        quantity: orderQuantity,
        totalPrice: formatCurrency(totalAmount)
    };
    
    // Attempt to send notification via Telegram API
    const notificationResult = await sendTelegramNotification(orderData);

    if (notificationResult.ok) {
        // Successful notification: Show confirmation modal
        console.log(`Order #${orderCounter} Submitted and Telegram Notification Sent:`, orderData);
        closeModal('order-modal');
        $('#confirmation-message').innerHTML = `
            Thank you, <b>${customerName}</b>! Your order **#${orderCounter}** for ${orderQuantity} x ${selectedPerfume.name} has been placed.
            <br>Total: <b>${orderData.totalPrice}</b>. We will contact you at <b>${customerPhone}</b> shortly.
        `;
        openModal('confirmation-modal');

        // Clear form and state
        elements.orderForm.reset();
        selectedPerfume = null;
        elements.orderError.style.display = 'none';
        
    } else {
        // Failed notification: Show error
        elements.orderError.textContent = notificationResult.error || "There was an issue placing your order. Please try again.";
        elements.orderError.style.display = 'block';
        // Decrement counter as the order didn't go through
        orderCounter--;
        localStorage.setItem('artisanOrderCounter', orderCounter);
    }
});


// Quiz Previous Button Control
elements.quizPrevBtn.addEventListener('click', prevQuizStep);


// INITIAL LOAD
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog(initialPerfumes);
});
