// =========================================================================
// --- 19 REAL FRAGRANCES - 50,000 IQD EACH --- 
const initialPerfumes = [
    { id: 1, name: "9:00 PM", brand: "AFNAN", priceIQD: 50000, category: "men", image: "9-00-pm-afnan.jpeg", 
      description: "A magnetic evening fragrance blending apple, cinnamon, and vanilla into a warm, seductive aura. Confident, modern, and irresistibly smooth, it's made for nights that never end.",
      longevity: "Long-lasting (8h+)", sillage: "Heavy", profile: "Evening_Woody",
      topNotes: "Apple, Cinnamon, Bergamot", middleNotes: "Lavender, Lily of the Valley", bottomNotes: "Vanilla, Amber, Patchouli"
    },
    { id: 2, name: "9:00 PM Rebel", brand: "AFNAN", priceIQD: 50000, category: "men", image: "9-00-pm-rebel-afnan.jpeg", 
      description: "A bold twist on the original. Spicy, woody, and daringly masculine, with notes of amber, tonka, and smoky woods that create a scent both unapologetic and powerfully captivating.",
      longevity: "Very Long-lasting (10h+)", sillage: "Heavy", profile: "Evening_Woody",
      topNotes: "Apple, Sage, Cardamom", middleNotes: "Lavender, Geranium", bottomNotes: "Tonka Bean, Amber, Cedarwood"
    },
    { id: 3, name: "Art of Arabia I", brand: "Lattafa", priceIQD: 50000, category: "men", image: "art-of-arabia-i-lattafa.jpeg", 
      description: "Fresh bergamot and mint meet the depth of black tea and incense for a scent of pure sophistication. Elegant, clean, and quietly commanding, it embodies modern luxury in a bottle.",
      longevity: "Long-lasting (8h+)", sillage: "Medium", profile: "Daytime_Aquatic",
      topNotes: "Bergamot, Mint", middleNotes: "Black Tea, Jasmine", bottomNotes: "Incense, Amber, Musk"
    },
    { id: 4, name: "Art of Arabia III", brand: "Lattafa", priceIQD: 50000, category: "men", image: "art-of-arabia-iii-lattafa.jpeg", 
      description: "Rich dates, tobacco, and myrrh enveloped in amber and vanilla create a deep oriental warmth. Opulent and intoxicating, it whispers luxury and lingers like a royal memory.",
      longevity: "Very Long-lasting (10h+)", sillage: "Heavy", profile: "Evening_Woody",
      topNotes: "Dates, Bergamot", middleNotes: "Tobacco, Myrrh", bottomNotes: "Amber, Vanilla, Oud"
    },
    { id: 5, name: "Asad Bourbon", brand: "Lattafa", priceIQD: 50000, category: "men", image: "asad-bourbon-lattafa.jpeg", 
      description: "A smoky, gourmand masterpiece of vanilla bourbon, spices, and woods. Smooth, masculine, and daringly sensual, it embodies refined confidence with a hint of rebellion.",
      longevity: "Long-lasting (8h+)", sillage: "Heavy", profile: "Evening_Woody",
      topNotes: "Bourbon Vanilla, Spices", middleNotes: "Tobacco, Cinnamon", bottomNotes: "Sandalwood, Amber"
    },
    { id: 6, name: "Atlas", brand: "Lattafa", priceIQD: 50000, category: "men", image: "atlas-lattafa.jpeg", 
      description: "Bright citrus and pink pepper open to a heart of amber and suede, grounded by woody musk. Clean, adventurous, and endlessly versatile, it's made for those who carry the world on their shoulders.",
      longevity: "Moderate (4-6h)", sillage: "Medium", profile: "Daytime_Woody",
      topNotes: "Citrus, Pink Pepper", middleNotes: "Amber, Suede", bottomNotes: "Woody Musk, Vetiver"
    },
    { id: 7, name: "Badee Al Oud Honor & Glory", brand: "Lattafa", priceIQD: 50000, category: "men", image: "badee-al-oud-honor-glory-lattafa.jpeg", 
      description: "A luxurious blend of pineapple, honey, and tobacco with creamy vanilla and amber woods. Sweet yet powerful, it radiates confidence and golden sophistication.",
      longevity: "Long-lasting (8h+)", sillage: "Heavy", profile: "Evening_Floral",
      topNotes: "Pineapple, Honey", middleNotes: "Tobacco, Rose", bottomNotes: "Vanilla, Amber Woods"
    },
    { id: 8, name: "Badee Al Oud Sublime", brand: "Lattafa", priceIQD: 50000, category: "men", image: "badee-al-oud-sublime-lattafa.jpeg", 
      description: "Citrusy bergamot and apple wrapped in amber, vanilla, and musk. Bright, elegant, and addictive, it's the perfect balance of freshness and depth.",
      longevity: "Moderate (4-6h)", sillage: "Medium", profile: "Daytime_Aquatic",
      topNotes: "Bergamot, Apple", middleNotes: "Jasmine, Rose", bottomNotes: "Amber, Vanilla, Musk"
    },
    { id: 9, name: "Cassius", brand: "Maison Alhambra", priceIQD: 50000, category: "men", image: "cassius-maison-alhambra.jpeg", 
      description: "A bold, aromatic fusion of citrus, spices, and smoky woods. Charismatic and assertive, Cassius leaves an impression of timeless masculinity and effortless strength.",
      longevity: "Long-lasting (8h+)", sillage: "Heavy", profile: "Evening_Woody",
      topNotes: "Citrus, Spices", middleNotes: "Lavender, Geranium", bottomNotes: "Smoky Woods, Amber"
    },
    { id: 10, name: "Delilah Pour Femme", brand: "Maison Alhambra", priceIQD: 50000, category: "women", image: "delilah-pour-femme-maison-alhambra.jpeg", 
      description: "A romantic floral symphony of rose, jasmine, and creamy woods. Soft, sensual, and luminous, it captures the essence of feminine grace and allure.",
      longevity: "Moderate (4-6h)", sillage: "Medium", profile: "Daytime_Floral",
      topNotes: "Rose, Jasmine", middleNotes: "Peony, Violet", bottomNotes: "Creamy Woods, Musk"
    },
    { id: 11, name: "Eclair", brand: "Lattafa", priceIQD: 50000, category: "women", image: "eclair-lattafa.jpeg", 
      description: "Decadent caramel and vanilla meet chocolate and amber in a sweet yet elegant composition. Gourmand luxury at its finest, delicious, warm, and unforgettable.",
      longevity: "Long-lasting (8h+)", sillage: "Heavy", profile: "Evening_Floral",
      topNotes: "Caramel, Vanilla", middleNotes: "Chocolate, Praline", bottomNotes: "Amber, Benzoin"
    },
    { id: 12, name: "Emeer", brand: "Lattafa", priceIQD: 50000, category: "men", image: "emeer-lattafa.jpeg", 
      description: "A regal blend of oud, saffron, and amber wrapped in dark woods and musk. Commanding and opulent, it's a fragrance fit for kings, rich, smoky, and powerfully magnetic.",
      longevity: "Very Long-lasting (10h+)", sillage: "Heavy", profile: "Evening_Woody",
      topNotes: "Oud, Saffron", middleNotes: "Amber, Rose", bottomNotes: "Dark Woods, Musk"
    },
    { id: 13, name: "Exclusif Tabac", brand: "Maison Alhambra", priceIQD: 50000, category: "men", image: "exclusif-tabac-maison-alhambra.jpeg", 
      description: "Deep tobacco and honey intertwined with vanilla and spice. Smooth, luxurious, and mature, it's the perfect scent for those who move through life with quiet power.",
      longevity: "Long-lasting (8h+)", sillage: "Heavy", profile: "Evening_Woody",
      topNotes: "Tobacco, Honey", middleNotes: "Vanilla, Spice", bottomNotes: "Sandalwood, Amber"
    },
    { id: 14, name: "Fabulo Intense", brand: "Maison Alhambra", priceIQD: 50000, category: "men", image: "fabulo-intense-maison-alhambra.jpeg", 
      description: "Inspired by sophistication, it fuses lavender, leather, and tonka bean into a dark, addictive aura. Bold, mysterious, and irresistibly elegant, pure confidence in liquid form.",
      longevity: "Long-lasting (8h+)", sillage: "Heavy", profile: "Evening_Woody",
      topNotes: "Lavender, Bergamot", middleNotes: "Leather, Patchouli", bottomNotes: "Tonka Bean, Amber"
    },
    { id: 15, name: "Fattan", brand: "Al Rasasi", priceIQD: 50000, category: "men", image: "fattan-al-rasasi.jpeg", 
      description: "An aromatic blend of citrus, spices, and woods that is both modern and timeless. Fresh yet deep, it speaks to the man who leads with strength and humility.",
      longevity: "Moderate (4-6h)", sillage: "Medium", profile: "Daytime_Woody",
      topNotes: "Citrus, Spices", middleNotes: "Lavender, Geranium", bottomNotes: "Woods, Musk"
    },
    { id: 16, name: "Hawas Black", brand: "Al Rasasi", priceIQD: 50000, category: "men", image: "hawas-black-al-rasasi.jpeg", 
      description: "Dark amber and patchouli enriched with apple and musk. Intense, seductive, and refined, it captures the scent of ambition and midnight allure.",
      longevity: "Very Long-lasting (10h+)", sillage: "Heavy", profile: "Evening_Woody",
      topNotes: "Apple, Bergamot", middleNotes: "Patchouli, Cinnamon", bottomNotes: "Dark Amber, Musk"
    },
    { id: 17, name: "Hawas For Him", brand: "Al Rasasi", priceIQD: 50000, category: "men", image: "hawas-for-him-al-rasasi.jpeg", 
      description: "A perfect balance of fresh aquatic notes, citrus, and ambergris. Energetic, confident, and effortlessly attractive, it's the signature of a modern gentleman.",
      longevity: "Moderate (4-6h)", sillage: "Medium", profile: "Daytime_Aquatic",
      topNotes: "Aquatic Notes, Citrus", middleNotes: "Plum, Orange Blossom", bottomNotes: "Ambergris, Musk"
    },
    { id: 18, name: "Hawas Ice", brand: "Al Rasasi", priceIQD: 50000, category: "men", image: "hawas-ice-al-rasasi.jpeg", 
      description: "Crisp, invigorating citrus and mint chilled over amber and musk. Cool, dynamic, and refreshing, it captures the spirit of a man who thrives under pressure.",
      longevity: "Short-lived (2-4h)", sillage: "Light", profile: "Daytime_Aquatic",
      topNotes: "Citrus, Mint", middleNotes: "Apple, Ginger", bottomNotes: "Amber, Musk"
    },
    { id: 19, name: "Hayaati", brand: "Lattafa", priceIQD: 50000, category: "men", image: "hayaati-lattafa.jpeg", 
      description: "A smooth blend of cinnamon, musk, and amber wrapped in subtle sweetness. Warm, elegant, and endlessly inviting, it's the scent of quiet confidence and everyday sophistication.",
      longevity: "Long-lasting (8h+)", sillage: "Medium", profile: "Anytime_Woody",
      topNotes: "Cinnamon, Bergamot", middleNotes: "Jasmine, Rose", bottomNotes: "Musk, Amber"
    }
];

// --- REST OF CODE UNCHANGED FROM LAST VERSION ---
let currentPerfumes = [...initialPerfumes];
let selectedPerfume = null;
let orderQuantity = 1;
let currentQuizStep = 0;
let quizAnswers = {};

const BOT_TOKEN = '8276122717:AAG4UVrd_BgLVZDtS7UP7_jXBvSiAoHYiBk'; 
const CHAT_ID = '-1002969971930';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
let orderCounter = parseInt(localStorage.getItem('artisanOrderCounter') || 0);

const quizQuestions = [
    {
        question: "Is this for a Man or a Woman?",
        key: "gender",
        options: [
            { text: "Man", value: "men", profiles: initialPerfumes.filter(p => p.category === 'men').map(p => p.profile) },
            { text: "Woman", value: "women", profiles: initialPerfumes.filter(p => p.category === 'women').map(p => p.profile) }
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

function validatePhoneNumber(phone) {
    const iraqiPattern = /^0750\d{7}$/;
    return iraqiPattern.test(phone.replace(/\s/g, ''));
}

function formatCurrency(amount) {
    const formattedNumber = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(amount);
    return `${formattedNumber} IQD`;
}

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
                onerror="this.onerror=null; this.src='fattan-al-rasasi.jpeg';" /> 
            <div class="perfume-card-content">
                <h4 class="perfume-card-name">${perfume.name}</h4>
                <p class="perfume-card-brand">${perfume.brand}</p>
                <p class="perfume-card-notes">${perfume.topNotes}</p>
                <p class="perfume-card-price">${formatCurrency(perfume.priceIQD)}</p>
            </div>
        `;
        card.addEventListener('click', () => openProductModal(perfume));
        elements.catalog.appendChild(card);
    });
}

function openModal(modalId) {
    document.getElementById(modalId)?.classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove('active');
}

function openProductModal(perfume) {
    selectedPerfume = perfume;
    $('#modal-image').src = perfume.image; 
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

function renderQuizStep() {
    elements.quizContent.innerHTML = '';
    
    if (currentQuizStep >= quizQuestions.length) {
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
                <p style="font-weight: 600; color: #E74C3C;">The final result recommendation section will be fixed after the data migration.</p>
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
            startQuiz();
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

elements.searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    elements.navLinks.forEach(l => l.classList.remove('active')); 

    const searched = initialPerfumes.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.topNotes.toLowerCase().includes(searchTerm) || 
        p.middleNotes.toLowerCase().includes(searchTerm) ||
        p.bottomNotes.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
    );
    currentPerfumes = searched;
    renderCatalog(currentPerfumes);
});

$$('.modal-close-btn, .close-confirm-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const modalId = e.target.getAttribute('data-modal') || e.target.closest('.modal-backdrop').id;
        closeModal(modalId);
        if (modalId === 'quiz-modal') resetQuiz();
        if (modalId === 'confirmation-modal') elements.navLinks[0].click(); 
    });
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
    const customerPhone = $('#order-phone').value.replace(/\s/g, '');
    
    if (!validatePhoneNumber(customerPhone)) {
        elements.orderError.textContent = "Please enter a valid Iraqi phone number (0750XXXXXXXXX)";
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
        console.log(`Order #${orderCounter} Submitted and Telegram Notification Sent:`, orderData);
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
    renderCatalog(initialPerfumes);
});
