/* ==============================================
   SAZ Naturals — Main JavaScript
   ============================================== */

// ===== PRODUCT DATA =====
const products = [
    // --- HAIR CARE ---
    {
        id: 1,
        name: 'Nourishing Hair Butter',
        category: 'hair',
        description: 'Deeply moisturizes and revitalizes natural hair. Rich in shea butter and coconut oil.',
        benefits: ['Moisturizing', 'Anti-Breakage', 'Shine'],
        price: 'TZS 15,000',
        badge: 'Best Seller',
        image: 'images/hair-butter.jpg',
        icon: 'fas fa-leaf'
    },
    {
        id: 2,
        name: 'Growth Stimulating Oil',
        category: 'hair',
        description: 'Promotes hair growth and strengthens roots with rosemary, peppermint, and castor oil.',
        benefits: ['Growth', 'Strengthening', 'Scalp Health'],
        price: 'TZS 12,000',
        badge: null,
        image: 'images/growth-oil.jpg',
        icon: 'fas fa-seedling'
    },
    {
        id: 3,
        name: 'Coconut & Aloe Conditioner',
        category: 'hair',
        description: 'Silky, sulfate-free conditioner with virgin coconut oil and fresh aloe vera.',
        benefits: ['Detangling', 'Softness', 'Sulfate-Free'],
        price: 'TZS 14,000',
        badge: 'New',
        image: 'images/coconut-conditioner.jpg',
        icon: 'fas fa-tint'
    },
    {
        id: 4,
        name: 'Flaxseed Hair Gel',
        category: 'hair',
        description: 'Natural hold gel for curls and twists. Made from organic flaxseeds — no alcohol, no crunch.',
        benefits: ['Curl Definition', 'Natural Hold', 'Alcohol-Free'],
        price: 'TZS 10,000',
        badge: null,
        image: 'images/flaxseed-gel.jpg',
        icon: 'fas fa-water'
    },

    // --- SKIN CARE ---
    {
        id: 5,
        name: 'Shea Butter Body Lotion',
        category: 'skin',
        description: 'Ultra-rich body moisturizer with unrefined shea butter, cocoa butter, and vitamin E.',
        benefits: ['Deep Hydration', 'Glow', 'Non-Greasy'],
        price: 'TZS 18,000',
        badge: 'Popular',
        image: 'images/shea-lotion.jpg',
        icon: 'fas fa-hand-sparkles'
    },
    {
        id: 6,
        name: 'Brightening Face Serum',
        category: 'skin',
        description: 'Vitamin C serum with tamanu oil and licorice root extract for even skin tone.',
        benefits: ['Brightening', 'Even Tone', 'Anti-Acne'],
        price: 'TZS 20,000',
        badge: null,
        image: 'images/face-serum.jpg',
        icon: 'fas fa-gem'
    },
    {
        id: 7,
        name: 'Aloe Vera Face Wash',
        category: 'skin',
        description: 'Gentle, foaming daily cleanser with fresh aloe vera and tea tree oil.',
        benefits: ['Gentle', 'Deep Clean', 'Balancing'],
        price: 'TZS 11,000',
        badge: null,
        image: 'images/aloe-face-wash.jpg',
        icon: 'fas fa-soap'
    },

    // --- OILS ---
    {
        id: 8,
        name: 'Pure Argan Oil',
        category: 'oils',
        description: 'Cold-pressed argan oil from Morocco. Perfect for hair, face, and nails.',
        benefits: ['Multi-Use', 'Anti-Aging', 'Non-Comedogenic'],
        price: 'TZS 22,000',
        badge: 'Premium',
        image: 'images/argan-oil.jpg',
        icon: 'fas fa-oil-can'
    },
    {
        id: 9,
        name: 'Black Castor Oil',
        category: 'oils',
        description: 'Jamaican black castor oil — the ultimate growth elixir for hair and brows.',
        benefits: ['Thickening', 'Growth', 'Brow & Lash'],
        price: 'TZS 16,000',
        badge: null,
        image: 'images/castor-oil.jpg',
        icon: 'fas fa-droplet'
    },
    {
        id: 10,
        name: 'Tea Tree & Peppermint Oil',
        category: 'oils',
        description: 'Refreshing scalp oil blend with tea tree, peppermint, and eucalyptus essential oils.',
        benefits: ['Scalp Care', 'Dandruff', 'Cooling'],
        price: 'TZS 13,000',
        badge: null,
        image: 'images/tea-tree-oil.jpg',
        icon: 'fas fa-spa'
    },

    // --- HANDMADE ---
    {
        id: 11,
        name: 'Lavender Soap Bar',
        category: 'handmade',
        description: 'Handcrafted cold-process soap with lavender essential oil and oatmeal.',
        benefits: ['Handmade', 'Exfoliating', 'Calming'],
        price: 'TZS 8,000',
        badge: null,
        image: 'images/lavender-soap.jpg',
        icon: 'fas fa-flower'
    },
    {
        id: 12,
        name: 'Sugar Body Scrub',
        category: 'handmade',
        description: 'Exfoliating brown sugar scrub with coconut oil and vanilla bean.',
        benefits: ['Exfoliating', 'Nourishing', 'Natural'],
        price: 'TZS 12,000',
        badge: 'Eco-Friendly',
        image: 'images/sugar-scrub.jpg',
        icon: 'fas fa-mortar-pestle'
    },
    {
        id: 13,
        name: 'Beeswax Lip Balm Set',
        category: 'handmade',
        description: 'Set of 3 tinted lip balms made with beeswax, coconut oil, and natural pigments.',
        benefits: ['Moisturizing', 'Tinted', 'Handmade'],
        price: 'TZS 9,000',
        badge: null,
        image: 'images/lip-balm.jpg',
        icon: 'fas fa-lips'
    }
];

// WhatsApp number (replace with actual number)
const WHATSAPP_NUMBER = '255655799575';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// ===== DOM ELEMENTS =====
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const visitorCount = document.getElementById('visitorCount');
const currentYear = document.getElementById('currentYear');
const navbar = document.getElementById('navbar');

// ===== PRODUCT IMAGE HELPER =====
function getProductImageHTML(product) {
    // Try to show the real image, with icon as fallback
    return `
        <img src="${product.image}" alt="${product.name}"
             class="product-img"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
             onload="this.style.display='block'; this.nextElementSibling.style.display='none';">
        <div class="product-img-fallback" style="display:none;">
            <i class="${product.icon}"></i>
        </div>
    `;
}

// ===== PRODUCTS RENDERING =====
function renderProducts(category = 'all') {
    const filtered = category === 'all'
        ? products
        : products.filter(p => p.category === category);

    productsGrid.innerHTML = filtered.map((product, index) => `
        <div class="product-card animate-in" style="animation-delay: ${index * 0.08}s">
            <div class="product-image">
                ${getProductImageHTML(product)}
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <span class="product-category">${product.category.replace('-', ' ')}</span>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-benefits">
                    ${product.benefits.map(b => `<span>${b}</span>`).join('')}
                </div>
                <div class="product-price">${product.price}</div>
                <a href="${WHATSAPP_URL}?text=${encodeURIComponent(
                    `Hi SAZ Naturals! I'd like to order: ${product.name} (${product.price})`
                )}" target="_blank" rel="noopener" class="product-order-btn">
                    <i class="fab fa-whatsapp"></i> Order on WhatsApp
                </a>
            </div>
        </div>
    `).join('');

    // Re-trigger stagger animation for new products
    setTimeout(() => {
        document.querySelectorAll('.product-card.animate-in').forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // trigger reflow
            el.style.animation = '';
        });
    }, 50);
}

// ===== CATEGORY FILTERING =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.category);
    });
});

// ===== THEME TOGGLE =====
function getPreferredTheme() {
    const stored = localStorage.getItem('saaz-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('saaz-theme', theme);
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// Initialize theme
setTheme(getPreferredTheme());

// ===== MOBILE MENU =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = navLinks.querySelector(`a[href="#${id}"]`);

        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== SCROLL ANIMATIONS (Fade In) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== CONTACT FORM =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    const whatsappMessage = [
        `*New Inquiry from SAZ Naturals Website*`,
        ``,
        `*Name:* ${name}`,
        `*Email:* ${email}`,
        `*Subject:* ${subject || 'N/A'}`,
        ``,
        `*Message:*`,
        `${message}`
    ].join('\n');

    window.open(
        `${WHATSAPP_URL}?text=${encodeURIComponent(whatsappMessage)}`,
        '_blank'
    );

    contactForm.reset();
});

// ===== VISITOR COUNTER (localStorage-based) =====
function initVisitorCounter() {
    let count = parseInt(localStorage.getItem('saaz-visitors')) || 0;

    // Increment once per session
    if (!sessionStorage.getItem('saaz-visited')) {
        count++;
        localStorage.setItem('saaz-visitors', count);
        sessionStorage.setItem('saaz-visited', 'true');
    }

    visitorCount.textContent = count;
}

initVisitorCounter();

// ===== CURRENT YEAR =====
currentYear.textContent = new Date().getFullYear();

// ===== NAVBAR GLASS EFFECT ON SCROLL =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== SMOOTH SCROLL FOR NAV LINKS (offset for fixed navbar) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 70;
            const targetPos = target.offsetTop - offset;
            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        }
    });
});

// ===== INITIAL RENDER =====
renderProducts('all');

// Show initial fade-in elements that are already visible
document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
        el.classList.add('visible');
        observer.unobserve(el);
    }
});

console.log('🌿 SAZ Naturals — Natural Beauty Starts Here');
console.log(`📱 WhatsApp: ${WHATSAPP_URL}`);