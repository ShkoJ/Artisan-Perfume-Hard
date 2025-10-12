document.addEventListener('DOMContentLoaded', () => {
    // ------------------- Mock Data (EDIT HERE TO ADD FRAGRANCES) -------------------
    const perfumes = [
        // --- Placeholder 1: Oud Al Sultan (Men) ---
        {
            id: 'p1',
            name: 'Oud Al Sultan',
            price: 75000, // Price in IQD
            category: 'men',
            description: 'A rich and powerful blend of classic oud with a hint of spicy notes, perfect for a strong statement. A true embodiment of masculinity and luxury.',
            quality: 'Long Lasting',
            sillage: 'Strong',
            image: 'https://source.unsplash.com/400x400/?perfume,oud,men',
        },
        // --- Placeholder 2: Rose & Vanilla (Women) ---
        {
            id: 'p2',
            name: 'Rose & Vanilla',
            price: 60000,
            category: 'women',
            description: 'An elegant and sweet fragrance with the timeless aroma of blooming roses and a warm, comforting vanilla finish. Ideal for a graceful and feminine touch.',
            quality: 'Fresh Scent',
            sillage: 'Moderate',
            image: 'https://source.unsplash.com/400x400/?perfume,rose,vanilla',
        },
        // --- Placeholder 3: Aqua Serenity (Men) ---
        {
            id: 'p3',
            name: 'Aqua Serenity',
            price: 55000,
            category: 'men',
            description: 'A fresh and invigorating scent inspired by the ocean breeze, featuring notes of citrus and sea salt. A perfect everyday fragrance for a clean and refreshing feel.',
            quality: 'Daily Wear',
            sillage: 'Light',
            image: 'https://source.unsplash.com/400x400/?perfume,aqua,fresh',
        },
        // --- Placeholder 4: Midnight Jasmine (Women) ---
        {
            id: 'p4',
            name: 'Midnight Jasmine',
            price: 65000,
            category: 'women',
            description: 'A mysterious and seductive fragrance with the intense aroma of jasmine and a subtle hint of musky undertones. Perfect for an evening out or a special occasion.',
            quality: 'Evening',
            sillage: 'Heavy',
            image: 'https://source.unsplash.com/400x400/?perfume,jasmine,night',
        },
        // --- PLACEHOLDER FOR FUTURE FRAGRANCE: Simply copy the structure above and change the data ---
        /*
        {
            id: 'p5', 
            name: 'New Fragrance Name',
            price: 50000, // New Price
            category: 'men', // or 'women'
            description: 'A detailed description of the new fragrance...',
            quality: 'Best Seller',
            sillage: 'Moderate',
            image: 'https://your-image-url.jpg', // Replace with your image URL
        },
        */
    ];

    let currentPerfume = null;
    let currentQuantity = 1;

    // ------------------- DOM Elements -------------------
    const welcomeModal = document.getElementById('welcome-modal');
    const browseBtn = document.getElementById('browse-btn');
    const perfumeCatalog = document.getElementById('perfume-catalog');
    const navLinks = document.querySelectorAll('.nav-link');
    const searchInput = document.getElementById('search-input');
    
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

    // ------------------- Configuration -------------------
    const TELEGRAM_APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz02WcrKgwzQ48WwMLhXBmyDb7eS-DFKiP8ux7wccG4ssHJiUQOxaaBwkBKs7agi6gT/exec';

    // ------------------- Utility Functions -------------------
    const formatPrice = (price) => `${price.toLocaleString()} IQD`;
    
    const renderPerfumeCards = (filteredPerfumes) => {
        perfumeCatalog.innerHTML = '';
        if (filteredPerfumes.length === 0) {
            // Added class for styling empty state
            perfumeCatalog.innerHTML = '<p class="empty-message">No perfumes found matching your criteria.</p>'; 
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

    const closeModal = (modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    const openModal = (modal) => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // ------------------- Event Listeners -------------------
    
    // Initial render
    renderPerfumeCards(perfumes);

    // Welcome modal handler
    setTimeout(() => {
        openModal(welcomeModal);
    }, 500);

    browseBtn.addEventListener('click', () => {
        closeModal(welcomeModal);
    });

    // Filter navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            const filter = link.dataset.filter;
            const filteredPerfumes = filter === 'all' ? perfumes : perfumes.filter(p => p.category === filter);
            renderPerfumeCards(filteredPerfumes);
            searchInput.value = '';
        });
    });

    // Real-time search
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        // Keep the active filter when searching
        const activeFilter = document.querySelector('.nav-link.active').dataset.filter;
        const basePerfumes = activeFilter === 'all' ? perfumes : perfumes.filter(p => p.category === activeFilter);
        
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
        // Reset state
        currentPerfume = null;
        currentQuantity = 1;
        orderQuantitySpan.textContent = currentQuantity;
        document.getElementById('order-form').reset();
    });

    // Order Now from product modal
    orderNowBtn.addEventListener('click', () => {
        if (currentPerfume) {
            orderSummaryName.textContent = currentPerfume.name;
            orderQuantitySpan.textContent = currentQuantity; // Ensure quantity is 1 when opening from product view
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
        
        // Disable button to prevent double submission
        const submitBtn = orderForm.querySelector('.place-order-btn');
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(TELEGRAM_APP_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderDetails)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // const data = await response.json(); // Uncomment if your script returns data
            // console.log('Success:', data);

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

    // Close modal on outside click
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            const activeModal = document.querySelector('.modal-backdrop.active');
            if (activeModal && activeModal.id !== 'welcome-modal') { // Keep welcome modal open unless manually closed
                closeModal(activeModal);
            }
        }
    });
});
