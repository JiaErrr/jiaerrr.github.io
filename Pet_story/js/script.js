/**
 * PET STORY E-commerce Website JavaScript
 * Handles card interactions, navigation, and animations
 */

// <!--!!Important --> Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

/**
 * Initialize all website functionality
 */
function initializeWebsite() {
    setupCardInteractions();
    setupNavigationArrows();
    setupSmoothScrolling();
    setupResponsiveMarquee();
}

// <!--!!Important --> Enhanced Carousel with Image Rotation Logic
class CardCarousel {
    constructor() {
        this.banner = document.getElementById('carousel-banner');
        this.cardList = document.querySelector('.card-list');
        this.cards = document.querySelectorAll('.card-box');
        this.btnGroup = document.querySelector('.btn-group');
        this.nextBtn = document.querySelector('.btn.next');
        this.prevBtn = document.querySelector('.btn.prev');
        
        this.currentIndex = Math.floor(this.cards.length / 2); // Start with center card
        this.totalCards = this.cards.length;
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        if (!this.banner || !this.cards.length) return;
        
        this.setupEventListeners();
        this.showButtons();
        
        // Set initial positions
        this.updateCardPositions();
    }

    setupEventListeners() {
        // Navigation buttons
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.throttle(() => this.nextCard(), 500));
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.throttle(() => this.prevCard(), 500));
        }

        // <!--!!Important --> Card click events with center-only navigation
        this.cards.forEach((card, index) => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCardClick(index);
            });
        });

        // Resize handler
        window.addEventListener('resize', () => {
            this.updateCardPositions();
        });
    }

    showButtons() {
        // Animate buttons to show
        setTimeout(() => {
            if (this.btnGroup) {
                this.btnGroup.style.opacity = '1';
            }
        }, 1500);
    }

    /**
     * Move specified card to center position
     * @param {number} index - Index of card to center
     */
    goToCard(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.currentIndex = index;
        this.updateCardPositions();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }

    nextCard() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.updateCardPositions();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }

    prevCard() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.updateCardPositions();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }

    updateCardPositions() {
        this.cards.forEach((card, index) => {
            // Remove all position classes
            card.classList.remove('center', 'left-1', 'left-2', 'right-1', 'right-2', 'hidden', 'active');
            
            // Calculate relative position from current center
            const relativePosition = index - this.currentIndex;
            
            // Apply appropriate class based on position
            if (relativePosition === 0) {
                card.classList.add('center', 'active');
            } else if (relativePosition === -1) {
                card.classList.add('left-1');
            } else if (relativePosition === -2) {
                card.classList.add('left-2');
            } else if (relativePosition === 1) {
                card.classList.add('right-1');
            } else if (relativePosition === 2) {
                card.classList.add('right-2');
            } else {
                card.classList.add('hidden');
            }
            
            // Handle wrap-around for circular carousel
            if (relativePosition < -2) {
                const wrapPosition = relativePosition + this.totalCards;
                if (wrapPosition === 1) card.classList.replace('hidden', 'right-1');
                else if (wrapPosition === 2) card.classList.replace('hidden', 'right-2');
            } else if (relativePosition > 2) {
                const wrapPosition = relativePosition - this.totalCards;
                if (wrapPosition === -1) card.classList.replace('hidden', 'left-1');
                else if (wrapPosition === -2) card.classList.replace('hidden', 'left-2');
            }
        });
    }

    /**
     * Handle card click events - only center card navigates, others move to center
     * @param {number} index - Index of clicked card
     */
    handleCardClick(index) {
        // If clicked card is not in center, move it to center
        if (index !== this.currentIndex) {
            this.goToCard(index);
            return;
        }
        
        // <!--!!Important --> Only center card can navigate
        const card = this.cards[index];
        const cardTitle = card.querySelector('.card-info h3')?.textContent || '';
        
        // Add click animation for center card
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Navigate based on card title
        this.navigateToSection(cardTitle);
    }
    
    /**
     * Navigate to different sections based on card content
     * @param {string} cardTitle - The title of the clicked card
     */
    navigateToSection(cardTitle) {
        let targetSection = '';
        
        switch(cardTitle) {
            case 'ABOUT':
                targetSection = 'about';
                break;
            case 'FOOD':
                targetSection = 'food';
                break;
            case 'LOCATIONS':
                targetSection = 'locations';
                break;
            case 'ACCESSORIES':
                targetSection = 'accessories';
                break;
            case 'CATERING':
                targetSection = 'catering';
                break;
            case 'HEALTH':
                targetSection = 'health';
                break;
            default:
                console.log(`Clicked on ${cardTitle}`);
                return;
        }
        
        // Show navigation feedback
        this.showNavigationFeedback(cardTitle);
        
        // For demo purposes, log navigation
        console.log(`Navigating to ${targetSection} section`);
        
        // Future implementation: actual page navigation
        // window.location.href = `${targetSection}.html`;
    }
    
    /**
     * Show visual feedback for navigation
     * @param {string} cardTitle - The title of the navigated section
     */
    showNavigationFeedback(cardTitle) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.className = 'navigation-notification';
        notification.textContent = `Loading ${cardTitle} section...`;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 16px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    // Throttle function to prevent rapid clicking
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
}

// Initialize carousel when DOM is loaded
let cardCarousel;
document.addEventListener('DOMContentLoaded', () => {
    cardCarousel = new CardCarousel();
    initializeSupplierPortal();
});

// <!--!!Important --> Supplier Portal Functions
function initializeSupplierPortal() {
    // Setup form event listeners
    const supplierForm = document.getElementById('supplier-application-form');
    const signinForm = document.getElementById('supplier-signin-form');
    
    if (supplierForm) {
        supplierForm.addEventListener('submit', handleSupplierApplication);
    }
    
    if (signinForm) {
        signinForm.addEventListener('submit', handleSupplierSignIn);
    }
    
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeSupplierModal();
            closeSupplierSignInModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSupplierModal();
            closeSupplierSignInModal();
        }
    });
}

function openSupplierModal() {
    const modal = document.getElementById('supplier-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 300);
    }
}

function closeSupplierModal() {
    const modal = document.getElementById('supplier-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form
        const form = document.getElementById('supplier-application-form');
        if (form) form.reset();
    }
}

function showSupplierSignIn() {
    closeSupplierModal();
    const signinModal = document.getElementById('supplier-signin-modal');
    if (signinModal) {
        signinModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus on username input
        setTimeout(() => {
            const usernameInput = document.getElementById('supplier-username');
            if (usernameInput) usernameInput.focus();
        }, 300);
    }
}

function closeSupplierSignInModal() {
    const modal = document.getElementById('supplier-signin-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form
        const form = document.getElementById('supplier-signin-form');
        if (form) form.reset();
    }
}

function handleSupplierApplication(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    
    // Simulate sending email application
    if (name && email) {
        // Show success message
        alert(`Thank you ${name}! Your supplier application has been sent to our team. We will contact you at ${email} soon.`);
        
        // Close modal
        closeSupplierModal();
    } else {
        alert('Please fill in all required fields.');
    }
}

function handleSupplierSignIn(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    // Demo credentials check
    if (username && password) {
        if (username === 'supplier' && password === 'password') {
            // Redirect to supplier portal
            window.location.href = 'html/supplier-portal.html';
        } else {
            alert('Invalid credentials. Please try again.\n\nDemo credentials:\nUsername: supplier\nPassword: password');
        }
    } else {
        alert('Please enter both username and password.');
    }
}

// Legacy code removed - now handled by CardCarousel class

/**
 * Handle card click events
 * @param {HTMLElement} card - The clicked card element
 */
function handleCardClick(card) {
    const cardTitle = card.querySelector('h3').textContent;
    
    // Add click animation
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = 'translateY(-10px) rotate(2deg)';
    }, 150);
    
    // Navigate based on card type
    switch(cardTitle) {
        case 'ABOUT':
            navigateToSection('about');
            break;
        case 'FOOD':
            navigateToSection('food');
            break;
        case 'LOCATIONS':
            navigateToSection('locations');
            break;
        case 'ACCESSORIES':
            navigateToSection('accessories');
            break;
        default:
            console.log(`Clicked on ${cardTitle}`);
    }
}

/**
 * Navigate to different sections (placeholder for future implementation)
 * @param {string} section - The section to navigate to
 */
function navigateToSection(section) {
    // For now, just log the navigation
    console.log(`Navigating to ${section} section`);
    
    // Future implementation: actual page navigation or section scrolling
    // window.location.href = `${section}.html`;
    
    // Show temporary feedback
    showNotification(`Loading ${section.toUpperCase()} section...`);
}

/**
 * Setup navigation arrow functionality
 */
function setupNavigationArrows() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cardsContainer = document.querySelector('.cards-container');
    
    if (prevBtn && nextBtn && cardsContainer) {
        prevBtn.addEventListener('click', () => {
            scrollCards('left');
        });
        
        nextBtn.addEventListener('click', () => {
            scrollCards('right');
        });
    }
}

/**
 * Scroll cards horizontally
 * @param {string} direction - 'left' or 'right'
 */
function scrollCards(direction) {
    const cardsContainer = document.querySelector('.cards-container');
    const scrollAmount = 300;
    
    if (direction === 'left') {
        cardsContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        cardsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

/**
 * Setup smooth scrolling for navigation
 */
function setupSmoothScrolling() {
    // Add smooth scrolling to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Setup responsive marquee behavior
 */
function setupResponsiveMarquee() {
    const marqueeContent = document.querySelector('.marquee-content');
    
    if (marqueeContent) {
        // Adjust marquee speed based on screen size
        function adjustMarqueeSpeed() {
            const screenWidth = window.innerWidth;
            let duration = '20s';
            
            if (screenWidth < 768) {
                duration = '15s';
            } else if (screenWidth < 480) {
                duration = '12s';
            }
            
            marqueeContent.style.animationDuration = duration;
        }
        
        // Initial adjustment
        adjustMarqueeSpeed();
        
        // Adjust on window resize
        window.addEventListener('resize', adjustMarqueeSpeed);
    }
}

/**
 * Show notification message
 * @param {string} message - The message to display
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#000',
        color: '#fff',
        padding: '15px 30px',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        zIndex: '9999',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

/**
 * Handle home and shop icon clicks
 */
document.addEventListener('click', function(e) {
    if (e.target.closest('.home-icon')) {
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    if (e.target.closest('.shop-icon')) {
        showNotification('Shop coming soon!');
    }
});

/**
 * Add entrance animations for cards
 */
function addEntranceAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cardEntrance {
            from {
                opacity: 0;
                transform: translateY(50px) rotate(-5deg);
            }
            to {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
        }
        
        .card {
            animation: cardEntrance 0.6s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
}

// Initialize entrance animations
addEntranceAnimations();

/**
 * Handle character interaction
 */
const character = document.querySelector('.character');
if (character) {
    character.addEventListener('click', function() {
        const speechBubble = document.querySelector('.speech-bubble span');
        const messages = [
            "let's be friends",
            "Welcome to PET STORY!",
            "Find the best for your pets!",
            "Need help? Just ask!"
        ];
        
        const currentMessage = speechBubble.textContent;
        const currentIndex = messages.indexOf(currentMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        
        speechBubble.textContent = messages[nextIndex];
        
        // Add bounce animation
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
}