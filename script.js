// =========================================================================
// FIREBASE & AUTHENTICATION (MOCK SETUP)
// =========================================================================
// NOTE: These are mock keys. Replace these with your actual Firebase configuration!
const firebaseConfig = {
    apiKey: "__YOUR_API_KEY__",
    authDomain: "__YOUR_AUTH_DOMAIN__",
    projectId: "scent-oasis-app",
    storageBucket: "__YOUR_STORAGE_BUCKET__",
    messagingSenderId: "__YOUR_MESSAGING_ID__",
    appId: "__YOUR_APP_ID__"
};

// Initialize Firebase
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// const auth = firebase.auth();
// const db = firebase.firestore();

// =========================================================================
// FRAGRANCE DATA
// =========================================================================
const TEST_IMAGE_PATH = "fattan.jpeg"; // Placeholder image for all products

// UPDATED FRAGRANCE DATA with detailed notes for display
const initialPerfumes = [
    { 
        id: 1, name: "Midnight Bloom", priceIQD: 130000, category: "women", 
        notes: { top: "Dark Berries, Mandarin, Pink Pepper", middle: "Jasmine, Rose, Tuberose", base: "Vanilla, Amber, Patchouli, Sandalwood" }, 
        image: TEST_IMAGE_PATH, description: "A captivating blend of dark berries, jasmine, and vanilla. Perfect for evening wear, offering warmth and sophistication.", longevity: "Long-lasting (8h+)", sillage: "Heavy", profile: "Evening_Floral" 
    },
    { 
        id: 2, name: "Desert Sand", priceIQD: 115000, category: "men", 
        notes: { top: "Cardamom, Bergamot, Lemon", middle: "Cedarwood, Sandalwood, Orris Root", base: "Amber, Musk, Vetiver" }, 
        image: TEST_IMAGE_PATH, description: "Warm notes of amber, cedarwood, and a hint of spice. A rugged, earthy scent that embodies freedom and adventure.", longevity: "Moderate (4-6h)", sillage: "Medium", profile: "Daytime_Woody" 
    },
    { 
        id: 3, name: "Ocean Breeze", priceIQD: 95000, category: "women", 
        notes: { top: "Sea Salt, Citrus Zest, Green Apple", middle: "Water Lily, Freesia, Peony", base: "White Musk, Driftwood, Oakmoss" }, 
        image: TEST_IMAGE_PATH, description: "Fresh and aquatic with notes of sea salt and citrus. Ideal for daytime freshness and a clean, invigorating feeling.", longevity: "Short-lived (2-4h)", sillage: "Light", profile: "Daytime_Aquatic" 
    },
    { 
        id: 4, name: "Smoked Leather", priceIQD: 155000, category: "men", 
        notes: { top: "Black Pepper, Saffron", middle: "Tanned Leather, Vetiver, Oud", base: "Tobacco, Tonka Bean, Birch Tar" }, 
        image: TEST_IMAGE_PATH, description: "Intense scent of tanned leather, smoky vetiver, and cardamom. Bold and distinctive, for the confident modern man.", longevity: "Very Long-lasting (10h+)", sillage: "Heavy", profile: "Evening_Woody" 
    },
    { 
        id: 5, name: "Spiced Vetiver", priceIQD: 140000, category: "men", 
        notes: { top: "Nutmeg, Clove, Orange Zest", middle: "Vetiver, Patchouli, Geranium", base: "Moss, Ambergris, Benzoin" }, 
        image: TEST_IMAGE_PATH, description: "A complex blend of earthy vetiver, warm nutmeg, and a touch of black pepper. Distinguished and comforting.", longevity: "Long-lasting (8h+)", sillage: "Medium", profile: "Anytime_Woody" 
    },
    { 
        id: 6, name: "Lace & Lilac", priceIQD: 110000, category: "women", 
        notes: { top: "Bergamot, Pear", middle: "Lilac, Iris, Lily of the Valley", base: "Vanilla Powder, Sandalwood, Heliotrope" }, 
        image: TEST_IMAGE_PATH, description: "Delicate florals with a powdery finish. A classic, romantic, and beautifully soft feminine fragrance.", longevity: "Moderate (4-6h)", sillage: "Light", profile: "Daytime_Floral" 
    },
];

// =========================================================================
// STATE MANAGEMENT & CONSTANTS
// =========================================================================
let currentPerfumes = [...initialPerfumes];
let selectedPerfume = null;
let orderQuantity = 1;
const TELEGRAM_BOT_URL = "https://t.me/YOUR_TELEGRAM_BOT_USERNAME?start="; // Replace with your actual bot URL

// Helper to get elements easily
const $ = (selector) => document.querySelector(selector);
const elements = {
    catalog: $('#perfume-catalog'),
    searchInput: $('#search-input'),
    sortSelect: $('#sort-select'),
    filterButtons: document.querySelectorAll('.filter-button[data-filter]'),
    // Modals
    productModalOverlay: $('#product-modal-overlay'),
    orderModalOverlay: $('#order-modal-overlay'),
    // Order controls
    qtySpan: $('#order-quantity'),
    btnIncrement: $('#btn-increment'),
    btnDecrement: $('#btn-decrement'),
    submitOrderBtn: $('#submit-order-btn'),
    statusBox: $('#status-message')
};

// =========================================================================
// CORE UI FUNCTIONS
// =========================================================================

/**
 * Formats IQD price.
 * @param {number} price - The price in IQD.
 * @returns {string} Formatted price string.
 */
function formatCurrency(price) {
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'IQD',
        minimumFractionDigits: 0
    }) + ' IQD';
}

/**
 * Renders the current list of perfumes to the catalog section.
 */
function renderCatalog(perfumesToRender) {
    elements.catalog.innerHTML = '';
    if (perfumesToRender.length === 0) {
        elements.catalog.innerHTML = `<p class="empty-message" style="text-align: center; color: var(--subtle-gray); padding: 40px; font-style: italic;">No fragrances found matching your criteria. Try different filters or search terms.</p>`;
        return;
    }

    perfumesToRender.forEach(perfume => {
        const card = document.createElement('div');
        card.classList.add('perfume-card');
        card.setAttribute('data-id', perfume.id);
        
        // DISPLAY FRAGRANCE NAME ON THE CARD and primary notes
        // Only show the first 3 notes from the top note for simplicity on the card
        const primaryNotes = perfume.notes.top.split(',').slice(0, 3).join(', ');
        
        card.innerHTML = `
            <img src="${perfume.image}" alt="Bottle of ${perfume.name}" class="perfume-card-img" 
                onerror="this.onerror=null; this.src='${TEST_IMAGE_PATH}';" /> 
            <div class="perfume-card-content">
                <p class="perfume-card-name-display">${perfume.name}</p> 
                <p class="perfume-card-notes">Top: ${primaryNotes}</p>
                <p class="perfume-card-price">${formatCurrency(perfume.priceIQD)}</p>
            </div>
        `;
        card.addEventListener('click', () => openProductModal(perfume));
        elements.catalog.appendChild(card);
    });
}

/**
 * Populates and opens the product detail modal.
 */
function openProductModal(perfume) {
    selectedPerfume = perfume;
    
    $('#modal-image').src = TEST_IMAGE_PATH; // Always use placeholder for this mock
    $('#modal-image').alt = `${perfume.name} Perfume Bottle`;
    $('#modal-name').textContent = perfume.name;
    
    // Logic to ensure MAX 3 NOTES per layer and proper display
    const getNotesHTML = (notesString) => {
        return notesString.split(',').map(n => n.trim()).slice(0, 3).join(', ');
    };
    
    const topNotes = getNotesHTML(perfume.notes.top);
    const middleNotes = getNotesHTML(perfume.notes.middle);
    const baseNotes = getNotesHTML(perfume.notes.base);
    
    // Write Top, Middle, and Base notes perfectly organized
    $('#modal-notes').innerHTML = `
        <strong>Top Notes (Initial Impression)</strong>
        <p>${topNotes}</p>
        
        <strong>Middle Notes (Heart of the Scent)</strong>
        <p>${middleNotes}</p>
        
        <strong>Base Notes (Lasting Foundation)</strong>
        <p>${baseNotes}</p>
    `; 

    $('#modal-description').textContent = perfume.description;
    $('#modal-longevity').textContent = `Longevity: ${perfume.longevity}`;
    $('#modal-sillage').textContent = `Sillage: ${perfume.sillage}`;
    $('#modal-price').textContent = formatCurrency(perfume.priceIQD); 
    
    openModal('product-modal');
}

/**
 * Opens a modal by its ID.
 */
function openModal(id) {
    if (id === 'order-modal') {
        // Reset quantity for a new order
        orderQuantity = 1;
        updateOrderModal();
        elements.productModalOverlay.classList.remove('open'); // Close product modal first
    }
    $(`#${id}-overlay`).classList.add('open');
}

/**
 * Closes a modal by its ID.
 */
function closeModal(id) {
    $(`#${id}-overlay`).classList.remove('open');
}

/**
 * Updates the quantity and total price in the order modal.
 */
function updateOrderModal() {
    if (!selectedPerfume) return;
    
    const total = selectedPerfume.priceIQD * orderQuantity;
    
    $('#order-item-name').textContent = `${selectedPerfume.name} (${orderQuantity}x)`;
    $('#order-total-price').textContent = formatCurrency(total);
    elements.qtySpan.textContent = orderQuantity;
    
    // Disable decrement button if quantity is 1
    elements.btnDecrement.disabled = (orderQuantity <= 1);
}

/**
 * Handles filtering and sorting to update the catalog.
 */
function updateFilterAndSort() {
    let filtered = [...initialPerfumes];
    
    // 1. FILTERING
    const activeFilter = $('.filter-button.active')?.dataset.filter || 'all';
    
    if (activeFilter !== 'all') {
        filtered = filtered.filter(p => p.category === activeFilter);
    }

    // 2. SEARCHING
    const searchTerm = elements.searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.notes.top.toLowerCase().includes(searchTerm) ||
            p.notes.middle.toLowerCase().includes(searchTerm) ||
            p.notes.base.toLowerCase().includes(searchTerm)
        );
    }
    
    // 3. SORTING
    const sortValue = elements.sortSelect.value;
    if (sortValue === 'price-asc') {
        filtered.sort((a, b) => a.priceIQD - b.priceIQD);
    } else if (sortValue === 'price-desc') {
        filtered.sort((a, b) => b.priceIQD - a.priceIQD);
    }

    currentPerfumes = filtered;
    renderCatalog(currentPerfumes);
}

/**
 * Displays a temporary status message (like "Added to cart").
 * @param {string} message - The message to display.
 */
function showStatusMessage(message) {
    elements.statusBox.textContent = message;
    elements.statusBox.classList.add('visible');
    setTimeout(() => {
        elements.statusBox.classList.remove('visible');
    }, 3000);
}

// =========================================================================
// EVENT HANDLERS
// =========================================================================

// Filter/Category Buttons
elements.filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all
        elements.filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked one
        e.currentTarget.classList.add('active');
        updateFilterAndSort();
    });
});

// Search Input
elements.searchInput.addEventListener('input', updateFilterAndSort);

// Sort Dropdown
elements.sortSelect.addEventListener('change', updateFilterAndSort);

// Quantity Controls
elements.btnIncrement.addEventListener('click', () => {
    orderQuantity++;
    updateOrderModal();
});
elements.btnDecrement.addEventListener('click', () => {
    if (orderQuantity > 1) {
        orderQuantity--;
        updateOrderModal();
    }
});

// Telegram Order Submission
elements.submitOrderBtn.addEventListener('click', () => {
    if (!selectedPerfume) return;

    // 1. Generate Order Summary
    const totalIQD = selectedPerfume.priceIQD * orderQuantity;
    const message = `*New Order Request*
Fragrance: ${selectedPerfume.name}
Quantity: ${orderQuantity}
Total Price: ${formatCurrency(totalIQD)}

_Please confirm the order details and delivery location._
`;

    // 2. Encode and create Telegram link
    const encodedMessage = encodeURIComponent(message);
    const telegramLink = `${TELEGRAM_BOT_URL}${encodedMessage}`;

    // 3. Open Telegram Link
    window.open(telegramLink, '_blank');
    
    // 4. Close Modal and Show Feedback
    closeModal('order-modal');
    showStatusMessage(`Order for ${selectedPerfume.name} initiated via Telegram!`);
});


// =========================================================================
// INITIALIZATION
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Inject the Search Icon (Magnifying Glass)
    const searchContainer = elements.searchInput.closest('.search-container');
    const searchIcon = document.createElement('span');
    searchIcon.classList.add('search-icon');
    searchIcon.innerHTML = '<i class="fas fa-search"></i>';
    searchContainer.prepend(searchIcon);

    // Initial render of the catalog
    renderCatalog(initialPerfumes);
});
