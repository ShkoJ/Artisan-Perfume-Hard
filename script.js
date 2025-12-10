import { initialPerfumes } from './data.js';

let currentPerfumes = [...initialPerfumes];
let selectedPerfume = null;
let orderQuantity = 1;
let currentQuizStep = 0;
let quizAnswers = {};

// --- GLOBAL FILTER STATE ---
let activeCategory = 'all'; 
let selectedBrands = [];    
let searchTerm = '';

// --- CONFIG ---
const BOT_TOKEN = '8276122717:AAG4UVrd_BgLVZDtS7UP7_jXBvSiAoHYiBk'; 
const CHAT_ID = '-1002969971930';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
let orderCounter = parseInt(localStorage.getItem('artisanOrderCounter') || 0);

// --- DOM ELEMENTS ---
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const elements = {
    catalog: $('#perfume-catalog'),
    navLinks: $$('.nav-link'),
    searchInput: $('#search-input'),
    searchIconBtn: $('#search-icon-btn'),
    searchIconSvg: $('#search-icon-svg'),
    orderSummaryName: $('#order-summary-name'),
    orderQuantityValue: $('#order-quantity'),
    orderForm: $('#order-form'),
    orderError: $('#order-error'),
    quizContent: $('#quiz-content'),
    quizPrevBtn: $('#quiz-prev-btn'), 
    filterBtn: $('#filter-btn'),
    brandDropdown: $('#brand-dropdown'),
    logoContainer: $('.logo-container')
};

// --- LOGO CLICK TO TOP ---
elements.logoContainer.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function validatePhoneNumber(phone) {
    const cleaned = phone.replace(/\s/g, '');
    return cleaned.length >= 10; 
}

function formatCurrency(amount) {
    const formattedNumber = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(amount);
    return `${formattedNumber} IQD`;
}

// --- BRAND FILTER ---
function initBrandFilter() {
    const brands = [...new Set(initialPerfumes.map(p => p.brand))].sort();
    elements.brandDropdown.innerHTML = '';
    brands.forEach(brand => {
        const label = document.createElement('label');
        label.className = 'brand-checkbox-label';
        const displayBrand = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
        label.innerHTML = `
            <input type="checkbox" value="${brand}" class="brand-checkbox">
            ${displayBrand}
        `;
        elements.brandDropdown.appendChild(label);
    });

    const checkboxes = elements.brandDropdown.querySelectorAll('.brand-checkbox');
    checkboxes.forEach(box => {
        box.addEventListener('change', () => {
            selectedBrands = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
            applyAllFilters();
        });
    });
}

elements.filterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    elements.brandDropdown.classList.toggle('show');
});

// FIX 6: Generic Click Outside logic
document.addEventListener('click', (e) => {
    // Brand dropdown close
    if (!elements.brandDropdown.contains(e.target) && e.target !== elements.filterBtn) {
        elements.brandDropdown.classList.remove('show');
    }
    
    // Modal close when clicking backdrop
    if (e.target.classList.contains('modal-backdrop')) {
        closeModal(e.target.id);
        if(e.target.id === 'quiz-modal') resetQuiz();
    }
});

// --- FILTERING LOGIC ---
function applyAllFilters() {
    let filtered = initialPerfumes;

    if (activeCategory === 'men') {
        filtered = filtered.filter(p => p.category === 'men' || p.category === 'unisex');
    } else if (activeCategory === 'women') {
        filtered = filtered.filter(p => p.category === 'women' || p.category === 'unisex');
    } 

    if (selectedBrands.length > 0) {
        filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term) ||
            p.shortDescription.toLowerCase().includes(term)
        );
    }

    currentPerfumes = filtered;
    renderCatalog(currentPerfumes);
}

// --- RENDER CATALOG ---
function renderCatalog(perfumesToRender) {
    elements.catalog.innerHTML = '';
    if (perfumesToRender.length === 0) {
        elements.catalog.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No fragrances found.</p>`;
        return;
    }

    perfumesToRender.forEach(perfume => {
        const card = document.createElement('div');
        card.classList.add('perfume-card');
        
        let imgSrc = perfume.image && perfume.image.trim() !== "" ? perfume.image : "fattan.jpeg";

        // FIX 4: Layout changes - Price left, Button right
        card.innerHTML = `
            <img src="${imgSrc}" alt="${perfume.name}" class="perfume-card-img" 
                onerror="this.onerror=null; this.src='fattan.jpeg';" /> 
            <div class="perfume-card-content">
                <div>
                    <h4 class="perfume-card-name">${perfume.name}</h4>
                    <p class="perfume-card-brand">${perfume.brand}</p>
                    <p class="perfume-card-notes">${perfume.shortDescription}</p>
                </div>
                <div class="card-footer-row">
                    <p class="perfume-card-price">${formatCurrency(perfume.priceIQD)}</p>
                    <button class="card-order-btn" data-id="${perfume.id}">Order Now</button>
                </div>
            </div>
        `;
        
        // Add listener to the whole card for Details
        card.addEventListener('click', (e) => {
            // Prevent opening details if Order button was clicked
            if(!e.target.classList.contains('card-order-btn')) {
                openProductModal(perfume);
            }
        });

        // Add listener specific to Order Button
        const orderBtn = card.querySelector('.card-order-btn');
        orderBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop bubble up
            openOrderModalDirectly(perfume);
        });

        elements.catalog.appendChild(card);
    });
}

// --- MODAL FUNCTIONS ---
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
    document.body.style.overflow = ''; 
}

function openProductModal(perfume) {
    selectedPerfume = perfume;
    let imgSrc = perfume.image && perfume.image.trim() !== "" ? perfume.image : "fattan.jpeg";
    
    $('#modal-image').src = imgSrc; 
    $('#modal-name').textContent = perfume.name;
    $('#modal-brand').textContent = perfume.brand;
    
    $('#modal-top-notes').textContent = perfume.topNotes;
    $('#modal-middle-notes').textContent = perfume.middleNotes;
    $('#modal-bottom-notes').textContent = perfume.bottomNotes;
    
    $('#modal-description').textContent = perfume.description;
    $('#modal-longevity').textContent = perfume.longevity;
    $('#modal-sillage').textContent = perfume.sillage;
    $('#modal-price').textContent = formatCurrency(perfume.priceIQD);
    openModal('product-modal');
}

// Helper to open order modal directly
function openOrderModalDirectly(perfume) {
    selectedPerfume = perfume;
    orderQuantity = 1;
    elements.orderSummaryName.textContent = selectedPerfume.name;
    elements.orderQuantityValue.textContent = 1;
    openModal('order-modal');
}

// --- QUIZ FUNCTIONS ---
const quizQuestions = [
    { question: "Which scent do you prefer?", key: "gender", options: [{ text: "Masculine", value: "men" }, { text: "Feminine", value: "women" }, { text: "Unisex", value: "unisex" }] },
    { question: "Which season?", key: "season", options: [{ text: "Summer", value: "summer" }, { text: "Winter", value: "winter" }, { text: "All Year", value: "all_year" }] },
    // Updated options: Office -> Formal, Signature -> Signature Scent
    { question: "Occasion?", key: "occasion", options: [{ text: "Formal", value: "office" }, { text: "Party", value: "party" }, { text: "Signature Scent", value: "signature" }] },
    { question: "Scent Family?", key: "family", options: [{ text: "Fresh/Citrus", value: "citrus_fruit" }, { text: "Sweet/Vanilla", value: "sweet" }, { text: "Oud/Spicy", value: "woody_spicy" }] }
];

function resetQuiz() {
    currentQuizStep = 0;
    quizAnswers = {};
    elements.quizContent.innerHTML = '';
    elements.quizPrevBtn.style.display = 'none';
    const helpMeChooseLink = $('#help-me-choose-btn');
    if(helpMeChooseLink.classList.contains('active')) {
        helpMeChooseLink.classList.remove('active');
        elements.navLinks[0].click();
    }
}

function startQuiz() {
    currentQuizStep = 0;
    quizAnswers = {};
    renderQuizStep();
    openModal('quiz-modal');
}

// NEW SCORING ALGORITHM
function getQuizRecommendations() {
    const { gender, season, occasion, family } = quizAnswers;

    // 1. Strict Filter by Gender/Category
    let candidates = initialPerfumes.filter(p => {
        if (gender === 'unisex') return true; 
        if (gender === 'men') return p.category === 'men' || p.category === 'unisex';
        if (gender === 'women') return p.category === 'women' || p.category === 'unisex';
        return true;
    });

    // 2. Scoring System
    candidates = candidates.map(p => {
        let score = 0;
        // Combine all text data to search for keywords
        const fullText = (p.description + " " + p.shortDescription + " " + p.topNotes + " " + p.middleNotes + " " + p.bottomNotes + " " + p.profile).toLowerCase();

        // --- SCENT FAMILY SCORING ---
        if (family === 'citrus_fruit') {
            if (fullText.includes('citrus') || fullText.includes('lemon') || fullText.includes('bergamot') || fullText.includes('grapefruit') || p.profile.includes('Aquatic')) score += 10;
            if (p.profile.includes('Daytime')) score += 2;
        }
        if (family === 'sweet') {
            if (fullText.includes('vanilla') || fullText.includes('caramel') || fullText.includes('sweet') || fullText.includes('gourmand') || fullText.includes('fruit')) score += 10;
        }
        if (family === 'woody_spicy') {
            if (fullText.includes('wood') || fullText.includes('oud') || fullText.includes('spice') || fullText.includes('leather') || fullText.includes('tobacco')) score += 10;
        }

        // --- SEASON SCORING ---
        if (season === 'summer') {
            if (p.profile.includes('Daytime') || p.profile.includes('Aquatic')) score += 5;
            if (fullText.includes('fresh') || fullText.includes('blue') || fullText.includes('ice')) score += 3;
        }
        if (season === 'winter') {
            if (p.profile.includes('Evening') || p.profile.includes('Woody')) score += 5;
            if (fullText.includes('warm') || fullText.includes('intense') || fullText.includes('dark')) score += 3;
        }

        // --- OCCASION SCORING ---
        if (occasion === 'office') {
            if (p.sillage.includes('Moderate')) score += 5;
            if (fullText.includes('fresh') || fullText.includes('clean')) score += 3;
        }
        if (occasion === 'party') {
            if (p.sillage.includes('Strong')) score += 5;
            if (fullText.includes('club') || fullText.includes('party') || fullText.includes('sexy')) score += 3;
        }
        
        return { ...p, score };
    });

    // 3. Sort by Score (High to Low)
    candidates.sort((a, b) => b.score - a.score);

    // Return top 3
    return candidates.slice(0, 3);
}

function renderQuizStep() {
    elements.quizContent.innerHTML = '';
    
    if (currentQuizStep >= quizQuestions.length) {
        const recommendations = getQuizRecommendations();
        elements.quizContent.innerHTML = `
            <div class="quiz-results-container">
                <h3 style="margin-bottom: 10px;">We Recommend:</h3>
                <div class="quiz-recommendations">
                    ${recommendations.map(p => `
                        <div class="quiz-recommendation-card" data-id="${p.id}">
                            <div class="recommendation-content">
                                <img src="${p.image || 'fattan.jpeg'}" class="recommendation-image">
                                <div class="recommendation-details">
                                    <h4>${p.name}</h4>
                                    <p>${p.brand}</p>
                                    <p class="recommendation-price">${formatCurrency(p.priceIQD)}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button type="button" class="modal-btn ghost-btn" style="margin-top:15px;" data-modal="quiz-modal">Close</button>
            </div>
        `;
        
        $$('.quiz-recommendation-card').forEach(card => {
            card.addEventListener('click', () => {
                const pid = parseInt(card.dataset.id);
                const p = initialPerfumes.find(x => x.id === pid);
                if(p) {
                    closeModal('quiz-modal');
                    resetQuiz();
                    openProductModal(p);
                }
            });
        });
        
        // Listener for the close button inside results
        const closeBtn = elements.quizContent.querySelector('.ghost-btn');
        if(closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal('quiz-modal');
                resetQuiz();
            });
        }
        elements.quizPrevBtn.style.display = 'none';

    } else {
        const step = quizQuestions[currentQuizStep];
        // FIX 1: Added type="button" to prevent form submit
        const html = `
            <h3 style="text-align:center; margin-bottom:15px;">${step.question}</h3>
            <div class="quiz-options">
                ${step.options.map(opt => `<button type="button" class="quiz-option-btn" data-val="${opt.value}">${opt.text}</button>`).join('')}
            </div>
        `;
        elements.quizContent.innerHTML = html;
        
        $$('.quiz-option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Extra safety
                quizAnswers[step.key] = e.target.dataset.val;
                $$('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                setTimeout(() => {
                    currentQuizStep++;
                    renderQuizStep();
                }, 250);
            });
        });
        elements.quizPrevBtn.style.display = currentQuizStep > 0 ? 'inline-block' : 'none';
    }
}

elements.quizPrevBtn.addEventListener('click', () => {
    if(currentQuizStep > 0) {
        currentQuizStep--;
        renderQuizStep();
    }
});

// --- EVENT LISTENERS ---
elements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if(link.id === 'help-me-choose-btn') {
            startQuiz();
            return;
        }
        elements.navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        activeCategory = link.getAttribute('data-filter');
        applyAllFilters();
    });
});

// FIX 5: Search Input Logic (X button)
function updateSearchIcon() {
    if (elements.searchInput.value.length > 0) {
        // Change to X icon
        elements.searchIconSvg.innerHTML = `<path d="M18 6L6 18M6 6l12 12"></path>`;
    } else {
        // Change back to Search icon
        elements.searchIconSvg.innerHTML = `<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path>`;
    }
}

elements.searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value.trim();
    updateSearchIcon();
    applyAllFilters();
});

elements.searchIconBtn.addEventListener('click', () => {
    if (elements.searchInput.value.length > 0) {
        // Clear logic
        elements.searchInput.value = '';
        searchTerm = '';
        updateSearchIcon();
        applyAllFilters();
        elements.searchInput.focus();
    }
});

// Generic Close Button Listener
$$('.modal-close-btn, .close-confirm-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-modal');
        closeModal(id);
        if(id === 'quiz-modal') resetQuiz();
    });
});

// Modal "Order Now" button
$('#order-now-btn').addEventListener('click', () => {
    if (!selectedPerfume) return;
    closeModal('product-modal');
    openOrderModalDirectly(selectedPerfume);
});

$('#minus-qty').addEventListener('click', () => { if(orderQuantity > 1) { orderQuantity--; elements.orderQuantityValue.textContent = orderQuantity; }});
$('#plus-qty').addEventListener('click', () => { orderQuantity++; elements.orderQuantityValue.textContent = orderQuantity; });

elements.orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('#order-name').value;
    const phone = $('#order-phone').value;
    if(!validatePhoneNumber(phone)) { elements.orderError.style.display='block'; elements.orderError.textContent = 'Invalid Phone'; return; }
    
    orderCounter++;
    localStorage.setItem('artisanOrderCounter', orderCounter);
    
    const total = selectedPerfume.priceIQD * orderQuantity;
    const orderData = {
        orderId: orderCounter,
        customerName: name,
        customerPhone: phone,
        perfumeName: selectedPerfume.name,
        quantity: orderQuantity,
        totalPrice: formatCurrency(total)
    };
    
    await sendTelegramNotification(orderData);
    
    closeModal('order-modal');
    $('#confirmation-message').innerHTML = `Order #${orderCounter} placed.<br>${orderData.perfumeName} x${orderQuantity}`;
    openModal('confirmation-modal');
    elements.orderForm.reset();
});

async function sendTelegramNotification(data) {
    const msg = `🆕 ORDER #${data.orderId}\nItem: ${data.perfumeName}\nQty: ${data.quantity}\nTotal: ${data.totalPrice}\n\nClient: ${data.customerName}\nPhone: ${data.customerPhone}`;
    try {
        await fetch(TELEGRAM_API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ chat_id: CHAT_ID, text: msg })
        });
    } catch(e) { console.error(e); }
}

document.addEventListener('DOMContentLoaded', () => {
    initBrandFilter();
    applyAllFilters();
});
