// =========================================================================
// --- SCRIPT FILE: HANDLES LOGIC, UI, QUIZ SCORING, TELEGRAM, & FILTERS ---
// =========================================================================

import { initialPerfumes } from './data.js';

let currentPerfumes = [...initialPerfumes];
let selectedPerfume = null;
let orderQuantity = 1;
let currentQuizStep = 0;
let quizAnswers = {};

// --- GLOBAL FILTER STATE ---
let activeCategory = 'all'; // 'all', 'men', 'women'
let selectedBrands = [];    // Array of strings, e.g., ['Lattafa', 'AFNAN']
let searchTerm = '';

// --- TELEGRAM CONFIGURATION ---
const BOT_TOKEN = '8276122717:AAG4UVrd_BgLVZDtS7UP7_jXBvSiAoHYiBk'; 
const CHAT_ID = '-1002969971930';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
let orderCounter = parseInt(localStorage.getItem('artisanOrderCounter') || 0);

// --- QUIZ QUESTIONS ---
const quizQuestions = [
    {
        question: "Which scent do you prefer?",
        key: "gender",
        options: [
            { text: "Masculine", value: "men" },
            { text: "Feminine", value: "women" },
            { text: "Unisex", value: "unisex" }
        ]
    },
    {
        question: "Which season do you plan to wear it the most?",
        key: "season",
        options: [
            { text: "Summer", value: "summer" },
            { text: "Winter", value: "winter" },
            { text: "Autumn", value: "autumn" },
            { text: "Spring", value: "spring" },
            { text: "All year round", value: "all_year" }
        ]
    },
    {
        question: "Where do you plan to wear it the most?",
        key: "occasion",
        options: [
            { text: "Office / Work", value: "office" },
            { text: "Event / Parties", value: "party" },
            { text: "Casual", value: "casual" },
            { text: "Signature Scent", value: "signature" }
        ]
    },
    {
        question: "Which group of scents do you prefer?",
        key: "family",
        options: [
            { text: "🍋 Citrus, Sea & Fruits (Energetic)", value: "citrus_fruit" },
            { text: "🍦 Vanilla, Caramel & Sweets (Gourmand)", value: "sweet" },
            { text: "🪵 Oud, Leather & Spices (Intense)", value: "woody_spicy" },
            { text: "🌹 Flowers & Soft Musk (Elegant)", value: "floral" }
        ]
    }
];

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
    quizModalTitle: document.querySelector('.quiz-modal .modal-title'),
    // New Filter Elements
    filterBtn: $('#filter-btn'),
    brandDropdown: $('#brand-dropdown')
};

function validatePhoneNumber(phone) {
    const cleaned = phone.replace(/\s/g, '');
    return cleaned.length >= 10; 
}

function formatCurrency(amount) {
    const formattedNumber = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(amount);
    return `${formattedNumber} IQD`;
}

// --- INIT & BRAND FILTER LOGIC ---
function initBrandFilter() {
    // 1. Get unique brands
    const brands = [...new Set(initialPerfumes.map(p => p.brand))].sort();
    
    // 2. Populate Dropdown
    elements.brandDropdown.innerHTML = '';
    brands.forEach(brand => {
        const label = document.createElement('label');
        label.className = 'brand-checkbox-label';
        label.innerHTML = `
            <input type="checkbox" value="${brand}" class="brand-checkbox">
            ${brand}
        `;
        elements.brandDropdown.appendChild(label);
    });

    // 3. Add Event Listeners to Checkboxes
    const checkboxes = elements.brandDropdown.querySelectorAll('.brand-checkbox');
    checkboxes.forEach(box => {
        box.addEventListener('change', () => {
            // Update selected brands array
            selectedBrands = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            
            applyAllFilters();
        });
    });
}

// --- TOGGLE DROPDOWN ---
elements.filterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    elements.brandDropdown.classList.toggle('show');
});

// Close dropdown if clicked outside
document.addEventListener('click', (e) => {
    if (!elements.brandDropdown.contains(e.target) && e.target !== elements.filterBtn) {
        elements.brandDropdown.classList.remove('show');
    }
});

// --- MAIN FILTERING FUNCTION ---
function applyAllFilters() {
    // 1. Start with full list
    let filtered = initialPerfumes;

    // 2. Filter by Category (Nav Tabs)
    if (activeCategory !== 'all') {
        filtered = filtered.filter(p => p.category === activeCategory);
    }

    // 3. Filter by Selected Brands
    if (selectedBrands.length > 0) {
        filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    // 4. Filter by Search Term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term) ||
            p.topNotes.toLowerCase().includes(term) || 
            p.middleNotes.toLowerCase().includes(term) ||
            p.bottomNotes.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
    }

    currentPerfumes = filtered;
    renderCatalog(currentPerfumes);
}

// --- CATALOG RENDERING ---
function renderCatalog(perfumesToRender) {
    elements.catalog.innerHTML = '';
    if (perfumesToRender.length === 0) {
        elements.catalog.innerHTML = `<p class="empty-message" style="text-align: center; color: #555; padding: 40px;">No fragrances found matching your search.</p>`;
        return;
    }

    perfumesToRender.forEach(perfume => {
        const card = document.createElement('div');
        card.classList.add('perfume-card');
        card.setAttribute('data-id', perfume.id);
        
        let imgSrc = perfume.image && perfume.image.trim() !== "" ? perfume.image : "fattan.jpeg";

        card.innerHTML = `
            <img src="${imgSrc}" alt="Bottle of ${perfume.name}" class="perfume-card-img" 
                onerror="this.onerror=null; this.src='fattan.jpeg';" /> 
            <div class="perfume-card-content">
                <h4 class="perfume-card-name">${perfume.name}</h4>
                <p class="perfume-card-brand">${perfume.brand}</p>
                <p class="perfume-card-notes">${perfume.shortDescription}</p>
                <p class="perfume-card-price">${formatCurrency(perfume.priceIQD)}</p>
            </div>
        `;
        card.addEventListener('click', () => openProductModal(perfume));
        elements.catalog.appendChild(card);
    });
}

function openModal(modalId) {
    const backdrop = document.getElementById(modalId);
    if (!backdrop) return;
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const backdrop = document.getElementById(modalId);
    if (!backdrop) return;
    backdrop.classList.remove('active');
    const anyActive = document.querySelectorAll('.modal-backdrop.active').length > 0;
    if (!anyActive) document.body.style.overflow = '';
}

function openProductModal(perfume) {
    selectedPerfume = perfume;
    let imgSrc = perfume.image && perfume.image.trim() !== "" ? perfume.image : "fattan.jpeg";
    
    $('#modal-image').src = imgSrc; 
    $('#modal-image').alt = `${perfume.name} Perfume Bottle`;
    $('#modal-name').textContent = perfume.name;
    $('#modal-brand').textContent = perfume.brand;
    
    $('#modal-top-notes').textContent = perfume.topNotes;
    $('#modal-middle-notes').textContent = perfume.middleNotes;
    $('#modal-bottom-notes').textContent = perfume.bottomNotes;
    
    $('#modal-description').textContent = perfume.description;
    $('#modal-longevity').textContent = `Longevity: ${perfume.longevity}`;
    $('#modal-sillage').textContent = `Sillage: ${perfume.sillage}`;
    $('#modal-price').textContent = formatCurrency(perfume.priceIQD);
    openModal('product-modal');
}

// --- QUIZ FUNCTIONS ---
function resetQuiz() {
    currentQuizStep = 0;
    quizAnswers = {};
    elements.quizContent.innerHTML = '';
    elements.quizPrevBtn.style.display = 'none';
    if(elements.quizModalTitle) elements.quizModalTitle.style.display = 'block'; 
    
    const helpMeChooseLink = $('#help-me-choose-btn');
    if(helpMeChooseLink.classList.contains('active')) {
        helpMeChooseLink.classList.remove('active');
        elements.navLinks[0].click();
        activeCategory = 'all'; // reset main view
        applyAllFilters();
    }
}

function startQuiz() {
    currentQuizStep = 0;
    quizAnswers = {};
    if(elements.quizModalTitle) elements.quizModalTitle.style.display = 'none';
    renderQuizStep();
    openModal('quiz-modal');
}

function getQuizRecommendations() {
    const { gender, season, occasion, family } = quizAnswers;
    
    let candidates = initialPerfumes.filter(p => {
        if (gender === 'men') return p.category === 'men' || p.category === 'unisex';
        if (gender === 'women') return p.category === 'women' || p.category === 'unisex';
        return true; 
    });

    candidates = candidates.map(p => {
        let score = 0;
        const fullText = (p.description + " " + p.topNotes + " " + p.middleNotes + " " + p.bottomNotes + " " + p.shortDescription + " " + p.profile).toLowerCase();

        // Season Scoring
        if (season === 'summer' || season === 'spring') {
            if (fullText.includes('citrus') || fullText.includes('sea') || fullText.includes('water') || fullText.includes('fresh') || fullText.includes('mint') || fullText.includes('ginger')) score += 5;
            if (p.profile.includes('Daytime') || p.profile.includes('Aquatic')) score += 5;
            if (fullText.includes('tobacco') || fullText.includes('incense')) score -= 2;
        } 
        else if (season === 'winter' || season === 'autumn') {
            if (fullText.includes('vanilla') || fullText.includes('oud') || fullText.includes('tobacco') || fullText.includes('leather') || fullText.includes('amber') || fullText.includes('cinnamon') || fullText.includes('warm')) score += 5;
            if (p.profile.includes('Evening') || p.profile.includes('Woody')) score += 5;
        } 
        else if (season === 'all_year') {
            if (p.profile.includes('Anytime') || p.profile.includes('Daytime_Woody') || p.profile.includes('Daytime_Aquatic')) score += 5;
            if (fullText.includes('blue') || fullText.includes('versatile')) score += 3;
        }

        // Occasion Scoring
        if (occasion === 'office') {
            if (fullText.includes('clean') || fullText.includes('fresh') || fullText.includes('soap') || fullText.includes('citrus') || fullText.includes('white musk')) score += 5;
            if (fullText.includes('intense') || fullText.includes('beast')) score -= 3;
        }
        else if (occasion === 'party') {
            if (fullText.includes('sweet') || fullText.includes('vanilla') || fullText.includes('bubblegum') || fullText.includes('fruit') || fullText.includes('club') || p.name.toLowerCase().includes('9 pm') || p.name.toLowerCase().includes('hawas')) score += 7;
            if (p.sillage.includes('Strong')) score += 3;
        }
        else if (occasion === 'casual') {
            if (p.profile.includes('Anytime') || p.profile.includes('Daytime')) score += 4;
        }
        else if (occasion === 'signature') {
            if (fullText.includes('oud') || fullText.includes('leather') || fullText.includes('saffron') || fullText.includes('unique') || p.brand === 'Lattafa') score += 4;
        }

        // Family Scoring
        if (family === 'citrus_fruit') {
            if (fullText.includes('lemon') || fullText.includes('bergamot') || fullText.includes('apple') || fullText.includes('pineapple') || fullText.includes('grapefruit')) score += 8;
            if (p.profile.includes('Aquatic')) score += 4;
        }
        else if (family === 'sweet') {
            if (fullText.includes('vanilla') || fullText.includes('caramel') || fullText.includes('tonka') || fullText.includes('honey') || fullText.includes('praline') || fullText.includes('chocolate')) score += 8;
        }
        else if (family === 'woody_spicy') {
            if (fullText.includes('oud') || fullText.includes('leather') || fullText.includes('tobacco') || fullText.includes('wood') || fullText.includes('incense') || fullText.includes('pepper')) score += 8;
        }
        else if (family === 'floral') {
            if (fullText.includes('rose') || fullText.includes('jasmine') || fullText.includes('floral') || fullText.includes('lavender') || fullText.includes('violet')) score += 8;
        }

        return { ...p, score };
    });

    candidates.sort((a, b) => b.score - a.score);
    return candidates.slice(0, 3);
}

function renderQuizStep() {
    elements.quizContent.innerHTML = '';
    
    if (currentQuizStep >= quizQuestions.length) {
        const recommendations = getQuizRecommendations();
        elements.quizContent.innerHTML = `
            <div class="quiz-results-container">
                <h3 class="modal-title" style="margin-bottom: 1rem;">Your Perfect Match!</h3>
                <p style="margin-bottom: 1.5rem; color: #666;">Based on your choices, we recommend:</p>
                
                <div class="quiz-recommendations">
                    ${recommendations.map((perfume, index) => {
                        let imgSrc = perfume.image && perfume.image.trim() !== "" ? perfume.image : "fattan.jpeg";
                        return `
                        <div class="quiz-recommendation-card" data-perfume-id="${perfume.id}" style="cursor: pointer;">
                            <div class="recommendation-content">
                                <img src="${imgSrc}" alt="${perfume.name}" class="recommendation-image" 
                                     onerror="this.onerror=null; this.src='fattan.jpeg';" />
                                <div class="recommendation-details">
                                    <h4 class="recommendation-name">${perfume.name}</h4>
                                    <p class="recommendation-brand">${perfume.brand}</p>
                                    <p class="recommendation-description">${perfume.description}</p>
                                    <div class="recommendation-specs">
                                        <span class="spec-badge">${perfume.longevity}</span>
                                    </div>
                                    <p class="recommendation-price">${formatCurrency(perfume.priceIQD)}</p>
                                </div>
                            </div>
                        </div>
                    `}).join('')}
                </div>
                
                <div class="quiz-results-actions">
                    <button type="button" class="modal-btn ghost-btn" data-modal="quiz-modal">Close Quiz</button>
                </div>
            </div>
        `;
        elements.quizPrevBtn.style.display = 'none';
        
        document.querySelectorAll('.quiz-recommendation-card').forEach(card => {
            card.addEventListener('click', () => {
                const perfumeId = parseInt(card.getAttribute('data-perfume-id'));
                const perfume = initialPerfumes.find(p => p.id === perfumeId);
                if (perfume) {
                    closeModal('quiz-modal');
                    resetQuiz();
                    openProductModal(perfume);
                }
            });
        });
        
    } else {
        const step = quizQuestions[currentQuizStep];
        const questionHtml = document.createElement('div');
        questionHtml.innerHTML = `
            <h3 class="quiz-question">${step.question}</h3>
            <div class="quiz-options">
                ${step.options.map(option => `
                    <button type="button" class="quiz-option-btn" data-value="${option.value}">
                        ${option.text}
                    </button>
                `).join('')}
            </div>
        `;
        elements.quizContent.appendChild(questionHtml);

        $$('.quiz-option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedValue = e.target.getAttribute('data-value');
                const key = quizQuestions[currentQuizStep].key;

                quizAnswers[key] = selectedValue;
                
                $$('.quiz-option-btn').forEach(o => o.classList.remove('selected'));
                e.target.classList.add('selected');

                setTimeout(nextQuizStep, 300);
            });
        });

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
        delete quizAnswers[quizQuestions[currentQuizStep].key]; 
        renderQuizStep();
    }
}

// --- EVENT LISTENERS ---

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop') && e.target.classList.contains('active')) {
        const modalId = e.target.id;
        closeModal(modalId);
        if (modalId === 'quiz-modal') resetQuiz();
        if (modalId === 'confirmation-modal') elements.navLinks[0].click(); 
    }
});

elements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        if(link.id === 'help-me-choose-btn') {
            elements.navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            elements.searchInput.value = '';
            searchTerm = '';
            startQuiz();
            return;
        }

        elements.navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        elements.searchInput.value = ''; 
        searchTerm = '';
        
        activeCategory = link.getAttribute('data-filter');
        applyAllFilters();
    });
});

elements.searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value.trim();
    applyAllFilters();
});

$$('.modal-close-btn, .close-confirm-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const modalId = e.target.getAttribute('data-modal') || e.target.closest('.modal-backdrop').id;
        closeModal(modalId);
        if (modalId === 'quiz-modal') resetQuiz();
        if (modalId === 'confirmation-modal') elements.navLinks[0].click(); 
    });
});

document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-modal]');
    if (!el) return;
    if (el.classList.contains('modal-close-btn') || el.classList.contains('close-confirm-btn')) return;

    const modalId = el.getAttribute('data-modal');
    if (!modalId) return;
    closeModal(modalId);
    if (modalId === 'quiz-modal') resetQuiz();
    if (modalId === 'confirmation-modal') elements.navLinks[0].click();
});

$('#order-now-btn').addEventListener('click', () => {
    if (!selectedPerfume) return;
    orderQuantity = 1;
    elements.orderSummaryName.textContent = selectedPerfume.name;
    elements.orderQuantityValue.textContent = orderQuantity;
    closeModal('product-modal');
    openModal('order-modal');
    elements.orderError.style.display = 'none';
});

const updateQuantity = (delta) => {
    orderQuantity = Math.max(1, orderQuantity + delta);
    elements.orderQuantityValue.textContent = orderQuantity;
};
$('#minus-qty').addEventListener('click', () => updateQuantity(-1));
$('#plus-qty').addEventListener('click', () => updateQuantity(1));

elements.orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const customerName = $('#order-name').value.trim();
    const customerPhone = $('#order-phone').value.trim();
    
    if (!validatePhoneNumber(customerPhone)) {
        elements.orderError.textContent = "Please enter a valid phone number.";
        elements.orderError.style.display = 'block';
        return;
    }

    orderCounter++;
    localStorage.setItem('artisanOrderCounter', orderCounter);

    const totalAmount = selectedPerfume.priceIQD * orderQuantity;

    const orderData = {
        orderId: orderCounter,
        timestamp: new Date().toISOString(),
        customerName,
        customerPhone,
        perfumeName: selectedPerfume.name,
        quantity: orderQuantity,
        totalPrice: formatCurrency(totalAmount)
    };
    
    const notificationResult = await sendTelegramNotification(orderData);

    if (notificationResult.ok) {
        console.log(`Order #${orderCounter} Submitted:`, orderData);
        closeModal('order-modal');
        $('#confirmation-message').innerHTML = `
            Thank you, <b>${customerName}</b>! Your order **#${orderCounter}** for ${orderQuantity} x ${selectedPerfume.name} has been placed.
            <br>Total: <b>${orderData.totalPrice}</b>. We will contact you at <b>${customerPhone}</b> shortly.
        `;
        openModal('confirmation-modal');

        elements.orderForm.reset();
        selectedPerfume = null;
        elements.orderError.style.display = 'none';
        
    } else {
        elements.orderError.textContent = notificationResult.error || "There was an issue placing your order. Please try again.";
        elements.orderError.style.display = 'block';
        orderCounter--;
        localStorage.setItem('artisanOrderCounter', orderCounter);
    }
});

elements.quizPrevBtn.addEventListener('click', prevQuizStep);

async function sendTelegramNotification(orderData) {
    const message = `
    🚨 **NEW ARTISAN ORDER #${orderData.orderId}** 🚨
    
    Perfume: **${orderData.perfumeName}**
    Quantity: ${orderData.quantity}
    Total Price: ${orderData.totalPrice}
    
    ---
    
    Customer: ${orderData.customerName}
    Phone: **${orderData.customerPhone}**
    City: Erbil
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
            headers: {'Content-Type': 'application/json'},
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

document.addEventListener('DOMContentLoaded', () => {
    initBrandFilter();
    applyAllFilters();
});
