// =========================================================================
// --- FINAL 35 FRAGRANCES - ALL NEW DATA + IMAGES - REMOVED 2 FILES --- 
const initialPerfumes = [
    { id: 1, name: "9:00 PM Rebel", brand: "AFNAN", priceIQD: 40000, category: "men", image: "9 PM Rebel.jpeg", 
      description: "A bold pineapple and apple opening with warm vanilla and caramel depth. Seductive and commanding.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Bold Pineapple Apple",
      topNotes: "Pineapple, Apple, Mandarin", middleNotes: "Oakmoss, Vanilla, Cedarwood", bottomNotes: "Dry Wood, Ambergris, Caramel"
    },
    { id: 2, name: "9:00 PM", brand: "AFNAN", priceIQD: 40000, category: "men", image: "9 PM.jpeg", 
      description: "Iconic apple-cinnamon warmth with creamy vanilla and amber. Timeless seduction for unforgettable nights.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Apple Cinnamon Warmth",
      topNotes: "Apple, Cinnamon, Lavender", middleNotes: "Orange Blossom, Lily-of-the-Valley", bottomNotes: "Vanilla, Tonka Bean, Amber"
    },
    { id: 3, name: "Art Of Arabia I", brand: "Lattafa", priceIQD: 60000, category: "men", image: "art_1.jpeg", 
      description: "Fresh bergamot-mint meets sophisticated black tea and incense. Elegant daily luxury.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Aquatic",
      shortDescription: "Fresh Bergamot Mint",
      topNotes: "Bergamot, Mint", middleNotes: "Black Tea, Ginger, Lavender", bottomNotes: "Ambroxan, Frankincense, Cinnamon"
    },
    { id: 4, name: "Art Of Arabia III", brand: "Lattafa", priceIQD: 60000, category: "men", image: "art_3.jpeg", 
      description: "Rich dates and tobacco wrapped in myrrh and vanilla. Opulent oriental warmth.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Rich Dates Tobacco",
      topNotes: "Olibanum, Davana, Bergamot", middleNotes: "Dates, Tobacco, Sandalwood", bottomNotes: "Myrrh, Vanilla, Tonka Bean"
    },
    { id: 5, name: "Asad Bourbon", brand: "Lattafa", priceIQD: 50000, category: "men", image: "Asad_bourbon.jpeg", 
      description: "Smoky bourbon vanilla with cacao and warm spices. Sophisticated gourmand confidence.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Smoky Bourbon Vanilla",
      topNotes: "Lavender, Mirabelle, Pink Pepper", middleNotes: "Cacao, Nutmeg, Davana", bottomNotes: "Bourbon Vanilla, Amber, Vetiver"
    },
    { id: 6, name: "Atlas", brand: "Lattafa", priceIQD: 40000, category: "men", image: "atlas.jpeg", 
      description: "Fresh sea notes and lemon with ambergris depth. Adventurous and versatile.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Aquatic",
      shortDescription: "Fresh Sea Lemon",
      topNotes: "Sea Notes, Salt, Lemon", middleNotes: "Davana, Iris", bottomNotes: "Ambergris, Oakmoss, Sandalwood"
    },
    { id: 7, name: "Badee Al Oud Honor And Glory", brand: "Lattafa", priceIQD: 50000, category: "men", image: "badee_honor.jpeg", 
      description: "Pineapple and creme brulee with spicy cinnamon warmth. Regal and golden sophistication.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Floral",
      shortDescription: "Pineapple Creme Brulee",
      topNotes: "Pineapple, Creme Brulee", middleNotes: "Cinnamon, Turmeric, Black Pepper", bottomNotes: "Vanilla, Sandalwood Cashmeran"
    },
    { id: 8, name: "Badee Al Oud Sublime", brand: "Lattafa", priceIQD: 50000, category: "men", image: "badee_sublime.jpeg", 
      description: "Juicy apple and litchi with plush jasmine florals. Bright yet addictive elegance.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Floral",
      shortDescription: "Juicy Apple Litchi",
      topNotes: "Apple, Litchi, Rose", middleNotes: "Plum, Jasmine", bottomNotes: "Moss, Vanilla, Patchouli"
    },
    { id: 9, name: "Cassius", brand: "Maison Alhambra", priceIQD: 40000, category: "men", image: "cassius.jpeg", 
      description: "Spicy nutmeg and green apple with rich tonka depth. Charismatic masculine power.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Spicy Nutmeg Apple",
      topNotes: "Nutmeg, Green Apple", middleNotes: "Tonka Bean, Rose", bottomNotes: "Patchouli, Vanilla"
    },
    { id: 10, name: "Delilah Pour Femme", brand: "Maison Alhambra", priceIQD: 50000, category: "women", image: "delilah.jpeg", 
      description: "Romantic Turkish rose and peony with creamy vanilla musk. Feminine grace perfected.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Floral",
      shortDescription: "Turkish Rose Peony",
      topNotes: "Rhubarb, Litchi, Bergamot", middleNotes: "Turkish Rose, Peony, Lily", bottomNotes: "White Musk, Cashmeran, Vanilla"
    },
    { id: 11, name: "Eclair", brand: "Lattafa", priceIQD: 50000, category: "women", image: "eclaire.jpeg", 
      description: "Decadent caramel and milk with honeyed florals. Irresistible gourmand luxury.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Floral",
      shortDescription: "Decadent Caramel Milk",
      topNotes: "Caramel, Milk, Sugar", middleNotes: "Honey, White Flowers", bottomNotes: "Vanilla, Praline, Musk"
    },
    { id: 12, name: "Emeer", brand: "Lattafa", priceIQD: 40000, category: "men", image: "emeer.jpeg", 
      description: "Regal lemon and white tea with ambergris sophistication. Commanding oriental presence.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Regal Lemon Tea",
      topNotes: "Lemon, Bergamot, Clary Sage", middleNotes: "White Tea, Sandalwood, Cardamom", bottomNotes: "Ambergris, Cedarwood, Cashmeran"
    },
    { id: 13, name: "Exclusif Tabac", brand: "Maison Alhambra", priceIQD: 50000, category: "men", image: "exclusif_tabac.jpeg", 
      description: "Rich tobacco and osmanthus with smooth tonka warmth. Mature masculine elegance.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Rich Tobacco Osmanthus",
      topNotes: "Osmanthus, Artemisia, Citrus", middleNotes: "Tobacco, Patchouli, Guaiac Wood", bottomNotes: "Tonka Bean"
    },
    { id: 14, name: "Fabulo Intense", brand: "Maison Alhambra", priceIQD: 40000, category: "men", image: "fabulo.jpeg", 
      description: "Dark lavender and leather with bitter almond intrigue. Mysterious masculine seduction.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Dark Lavender Leather",
      topNotes: "Lavender, Clary Sage", middleNotes: "Bitter Almond, Vanilla, Orris Root", bottomNotes: "Leather, White Woods, Tonka Bean"
    },
    { id: 15, name: "Fattan", brand: "ALRASASI", priceIQD: 40000, category: "men", image: "fattan.jpeg", 
      description: "Zesty grapefruit and pink pepper with earthy vetiver depth. Modern timeless masculinity.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Woody",
      shortDescription: "Zesty Grapefruit Pepper",
      topNotes: "Grapefruit, Bergamot, Pink Pepper", middleNotes: "Vetiver, Cedar, Patchouli", bottomNotes: "Oakmoss, Benzoin, Amber"
    },
    { id: 16, name: "Hawas Black", brand: "ALRASASI", priceIQD: 70000, category: "men", image: "hawas_black.jpeg", 
      description: "Dark bergamot-pineapple with intense patchouli amber. Midnight masculine allure.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Dark Bergamot Pineapple",
      topNotes: "Bergamot, Pineapple, Grapefruit", middleNotes: "Patchouli, Cedarwood, Jasmine", bottomNotes: "Oakmoss, Woody Notes, Amber"
    },
    { id: 17, name: "Hawas For Him", brand: "ALRASASI", priceIQD: 70000, category: "men", image: "hawas.jpeg", 
      description: "Fresh apple and watery plum with ambergris magnetism. Ultimate modern gentleman.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Aquatic",
      shortDescription: "Fresh Apple Plum",
      topNotes: "Apple, Bergamot, Lemon", middleNotes: "Watery Notes, Plum, Orange Blossom", bottomNotes: "Ambergris, Musk, Patchouli"
    },
    { id: 18, name: "Hawas Ice", brand: "ALRASASI", priceIQD: 70000, category: "men", image: "hawas_ice.jpeg", 
      description: "Icy lemon and apple with cool cardamom freshness. Dynamic chilled confidence.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Aquatic",
      shortDescription: "Icy Lemon Apple",
      topNotes: "Apple, Italian Lemon, Sicilian Bergamot", middleNotes: "Plum, Orange Blossom, Cardamom", bottomNotes: "Musk, Amber, Driftwood"
    },
    { id: 19, name: "Hayaati", brand: "Lattafa", priceIQD: 50000, category: "men", image: "hayaati.jpeg", 
      description: "Warm apple-cinnamon with creamy vanilla musk. Everyday sophisticated comfort.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Anytime_Woody",
      shortDescription: "Warm Apple Cinnamon",
      topNotes: "Apple, Bergamot", middleNotes: "Cinnamon, Woodsy Notes", bottomNotes: "Musk, Vanilla"
    },
    { id: 20, name: "Her Confession", brand: "Lattafa", priceIQD: 50000, category: "women", image: "her_confession.jpeg", 
      description: "Mystical cinnamon-tuberose with warm vanilla tonka. Romantic feminine expression.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Floral",
      shortDescription: "Mystical Cinnamon Tuberose",
      topNotes: "Mystikal, Cinnamon", middleNotes: "Tuberose, Jasmine, Incense", bottomNotes: "Vanilla Tonka, Musk"
    },
    { id: 21, name: "His Confession", brand: "Lattafa", priceIQD: 50000, category: "men", image: "his_confession.jpeg", 
      description: "Spicy cinnamon-lavender with smooth amber tonka. Bold intimate masculinity.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Woody",
      shortDescription: "Spicy Cinnamon Lavender",
      topNotes: "Cinnamon, Lavender, Mandarin", middleNotes: "Iris, Benzoin, Cypress", bottomNotes: "Vanilla, Tonka, Amber"
    },
    { id: 22, name: "Jean Lowe Immortal", brand: "Maison Alhambra", priceIQD: 50000, category: "men", image: "immortal.jpeg", 
      description: "Zesty ginger-grapefruit with ambroxan amber depth. Timeless legendary power.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Zesty Ginger Grapefruit",
      topNotes: "Ginger, Grapefruit, Bergamot", middleNotes: "Rosemary, Water Notes, Sage", bottomNotes: "Ambroxan, Amber, Labdanum"
    },
    { id: 23, name: "Jean Lowe Ombre", brand: "Maison Alhambra", priceIQD: 50000, category: "men", image: "ombre.jpeg", 
      description: "Deep oud-incense with raspberry rose intrigue. Sophisticated dark elegance.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Deep Oud Incense",
      topNotes: "Oud, Incense", middleNotes: "Rose, Raspberry, Saffron", bottomNotes: "Amber, Benzoin, Geranium"
    },
    { id: 24, name: "Khamrah", brand: "Lattafa", priceIQD: 40000, category: "unisex", image: "Khamrah.jpeg", 
      description: "Spiced dates and praline with creamy tuberose. Sensual oriental masterpiece.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Floral",
      shortDescription: "Spiced Dates Praline",
      topNotes: "Cinnamon, Nutmeg, Bergamot", middleNotes: "Dates, Praline, Tuberose", bottomNotes: "Vanilla, Tonka Bean, Amberwood"
    },
    { id: 25, name: "Khamrah Dukhan", brand: "Lattafa", priceIQD: 40000, category: "men", image: "khamrah_dukhan.jpeg", 
      description: "Smoky incense and spicy pimento with rich tobacco depth. Dramatic oriental intensity.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Smoky Incense Pimento",
      topNotes: "Spices, Pimento, Mandarin", middleNotes: "Incense, Labdanum, Orange Blossom", bottomNotes: "Praline, Tobacco, Amber"
    },
    { id: 26, name: "Khamrah Qahwa", brand: "Lattafa", priceIQD: 40000, category: "men", image: "khamra_qahwa.jpeg", 
      description: "Rich coffee and cinnamon with candied fruit sweetness. Bold aromatic magnetism.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Rich Coffee Cinnamon",
      topNotes: "Cinnamon, Cardamom, Ginger", middleNotes: "Praline, Candied Fruits, White Fruits", bottomNotes: "Vanilla, Coffee, Tonka Bean"
    },
    { id: 27, name: "Liqud Brun", brand: "FRENCH AVENUE", priceIQD: 50000, category: "unisex", image: "liquid.jpeg", 
      description: "Warm cinnamon-cognac with buttery praline woods. Decadent French indulgence.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Floral",
      shortDescription: "Warm Cinnamon Cognac",
      topNotes: "Cinnamon, Orange Blossom, Cardamom", middleNotes: "Bourbon Vanilla, Elemi Resin", bottomNotes: "Praline, Ambroxan, Guaiac Wood"
    },
    { id: 28, name: "Opulence Leather", brand: "Maison Alhambra", priceIQD: 40000, category: "men", image: "opulence.jpg", 
      description: "Rich cardamom-leather with jasmine and moss depth. Luxurious masculine statement.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Rich Cardamom Leather",
      topNotes: "Cardamom", middleNotes: "Leather, Jasmine Sambac", bottomNotes: "Amber, Moss, Patchouli"
    },
    { id: 29, name: "Supremacy Collector's Edition", brand: "AFNAN", priceIQD: 70000, category: "men", image: "supremacy_collector.jpeg", 
      description: "Exclusive pineapple and white flowers with oakmoss ambergris. Regal collector's masterpiece.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Exclusive Pineapple Flowers",
      topNotes: "Pineapple, Bergamot, White Flowers", middleNotes: "Orange Blossom, Birch, Amber", bottomNotes: "Oakmoss, Musk, Ambergris"
    },
    { id: 30, name: "Supremacy Not Only Intense", brand: "AFNAN", priceIQD: 70000, category: "men", image: "not_only.jpeg", 
      description: "Bold black currant and apple with intense saffron musk. Commanding modern power.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Bold Black Currant",
      topNotes: "Black Currant, Bergamot, Apple", middleNotes: "Oakmoss, Patchouli, Lavender", bottomNotes: "Ambergris, Musk, Saffron"
    },
    { id: 31, name: "Teriaq Intense", brand: "Lattafa", priceIQD: 50000, category: "men", image: "Teriaq.jpeg", 
      description: "Luxurious saffron-plum with warm cinnamon tonka. Intense oriental sophistication.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Luxurious Saffron Plum",
      topNotes: "Saffron, Bergamot", middleNotes: "Plum Liquor, Cinnamon", bottomNotes: "Amber, Tonka Bean, Benzoin"
    },
    { id: 32, name: "Tobacco Touch", brand: "Maison Alhambra", priceIQD: 50000, category: "men", image: "tobacco_touch.jpeg", 
      description: "Smooth tobacco and spicy vanilla with dried fruit warmth. Elegant everyday signature.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Anytime_Woody",
      shortDescription: "Smooth Tobacco Vanilla",
      topNotes: "Tobacco, Spicy Notes", middleNotes: "Tobacco, Vanilla, Tonka Bean", bottomNotes: "Dried Fruits, Woody Notes"
    },
    { id: 33, name: "Turathi Blue", brand: "AFNAN", priceIQD: 50000, category: "men", image: "Turathi.jpeg", 
      description: "Bright citrus freshness with amber-woody musk. Coastal elegant versatility.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Aquatic",
      shortDescription: "Bright Citrus Freshness",
      topNotes: "Citrus", middleNotes: "Amber, Woody Notes", bottomNotes: "Musk, Spices, Patchouli"
    },
    { id: 34, name: "Winsome", brand: "Maison Alhambra", priceIQD: 40000, category: "men", image: "winsome.jpg", 
      description: "Delicate violet-rose with bourbon vanilla warmth. Charming feminine radiance.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Floral",
      shortDescription: "Delicate Violet Rose",
      topNotes: "Violet Leaf, Coriander, Bergamot", middleNotes: "Rose, Black Pepper, Lily-of-the-Valley", bottomNotes: "Patchouli, Bourbon Vanilla, Ambergris"
    },
    { id: 35, name: "Yara", brand: "Lattafa", priceIQD: 40000, category: "women", image: "yara.jpeg", 
      description: "Bright orchid-tangerine with tropical vanilla musk. Luminous feminine glow.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Floral",
      shortDescription: "Bright Orchid Tangerine",
      topNotes: "Orchid, Heliotrope, Tangerine", middleNotes: "Gourmand Accord, Tropical Fruits", bottomNotes: "Vanilla, Musk, Sandalwood"
    }
];

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
    const anyNumberPattern = /^\d{4} \d{3} \d{4}$/; // XXXX XXX XXXX format
    const cleaned = phone.replace(/\s/g, '');
    return /^\d{11}$/.test(cleaned); // Exactly 11 digits total
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
    const el = document.getElementById(modalId);
    el?.classList.add('active');
    // lock background scroll when any modal opens
    document.body.classList.add('no-scroll');
}

function closeModal(modalId) {
    const el = document.getElementById(modalId);
    el?.classList.remove('active');
    // if no other modals are active, restore body scroll
    const anyActive = document.querySelectorAll('.modal-backdrop.active').length > 0;
    if (!anyActive) document.body.classList.remove('no-scroll');
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

function getQuizRecommendations() {
    const { gender, season, time_of_day, scent_profile } = quizAnswers;
    
    // Filter perfumes based on gender
    let filteredPerfumes = initialPerfumes.filter(p => p.category === gender || p.category === 'unisex');
    
    // Filter based on season preferences
    if (season === 'summer') {
        filteredPerfumes = filteredPerfumes.filter(p => 
            p.profile.includes('Daytime') && (p.profile.includes('Aquatic') || p.profile.includes('Floral'))
        );
    } else if (season === 'winter') {
        filteredPerfumes = filteredPerfumes.filter(p => 
            p.profile.includes('Evening') || p.profile.includes('Anytime')
        );
    }
    
    // Filter based on time of day
    if (time_of_day) {
        filteredPerfumes = filteredPerfumes.filter(p => p.profile.includes(time_of_day));
    }
    
    // Filter based on scent profile
    if (scent_profile) {
        filteredPerfumes = filteredPerfumes.filter(p => p.profile.includes(scent_profile));
    }
    
    // If no matches found, return top 3 perfumes for the gender
    if (filteredPerfumes.length === 0) {
        filteredPerfumes = initialPerfumes.filter(p => p.category === gender || p.category === 'unisex').slice(0, 3);
    }
    
    // Return top 3 recommendations
    return filteredPerfumes.slice(0, 3);
}

function renderQuizStep() {
    elements.quizContent.innerHTML = '';
    
    if (currentQuizStep >= quizQuestions.length) {
        const recommendations = getQuizRecommendations();
        elements.quizContent.innerHTML = `
            <div class="quiz-results-container">
                <h3 class="modal-title" style="margin-bottom: 1rem;">Your Perfect Match!</h3>
                <p style="margin-bottom: 1.5rem; color: #666;">Based on your preferences, here are our top recommendations:</p>
                
                <div class="quiz-recommendations">
                    ${recommendations.map((perfume, index) => `
                        <div class="quiz-recommendation-card" data-perfume-id="${perfume.id}" style="cursor: pointer;">
                            <div class="recommendation-content">
                                <img src="${perfume.image}" alt="${perfume.name}" class="recommendation-image" 
                                     onerror="this.onerror=null; this.src='fattan.jpeg';" />
                                <div class="recommendation-details">
                                    <h4 class="recommendation-name">${perfume.name}</h4>
                                    <p class="recommendation-brand">${perfume.brand}</p>
                                    <p class="recommendation-description">${perfume.description}</p>
                                    <div class="recommendation-specs">
                                        <span class="spec-badge">${perfume.longevity}</span>
                                        <span class="spec-badge">${perfume.sillage}</span>
                                    </div>
                                    <p class="recommendation-price">${formatCurrency(perfume.priceIQD)}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="quiz-results-actions">
                    <button type="button" class="modal-btn" onclick="closeModal('quiz-modal'); resetQuiz();" style="margin-right: 0.5rem;">Browse All</button>
                    <button type="button" class="modal-btn ghost-btn" data-modal="quiz-modal">Close Quiz</button>
                </div>
            </div>
        `;
        elements.quizPrevBtn.style.display = 'none';
        
        // Add click handlers for recommendation cards
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
    const customerPhone = $('#order-phone').value.trim();
    
    if (!validatePhoneNumber(customerPhone)) {
        elements.orderError.textContent = "Please enter a valid phone number (e.g., XXXX XXX XXXX)";
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
