// Supplier Portal JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeSupplierPortal();
});

function initializeSupplierPortal() {
    // Initialize sidebar navigation
    initializeSidebarNavigation();
    
    // Initialize dashboard features
    initializeDashboardFeatures();
    
    // Initialize product management
    initializeProductManagement();
    
    // Initialize order management
    initializeOrderManagement();
    
    // Add welcome animation
    addWelcomeAnimation();
}

// Sidebar Navigation
function initializeSidebarNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all menu items
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

// Dashboard Features
function initializeDashboardFeatures() {
    // Animate stats on load
    animateStats();
    
    // Update activity feed periodically
    updateActivityFeed();
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isNumber = !isNaN(parseFloat(finalValue));
        
        if (isNumber) {
            const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
            const prefix = finalValue.replace(/[0-9.,]/g, '');
            
            let currentValue = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(timer);
                }
                stat.textContent = prefix + Math.floor(currentValue).toLocaleString();
            }, 30);
        }
    });
}

function updateActivityFeed() {
    // Simulate real-time activity updates
    const activities = [
        'New order #12348 received',
        'Product "Cat Accessories" updated',
        'Inventory restocked for "Dog Treats"',
        'Order #12340 shipped',
        'New customer review received'
    ];
    
    setInterval(() => {
        const activityList = document.querySelector('.activity-list');
        if (activityList && Math.random() > 0.7) {
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            const newActivity = createActivityItem('Just now', randomActivity);
            
            activityList.insertBefore(newActivity, activityList.firstChild);
            
            // Remove oldest activity if more than 5
            if (activityList.children.length > 5) {
                activityList.removeChild(activityList.lastChild);
            }
        }
    }, 10000); // Update every 10 seconds
}

function createActivityItem(time, text) {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
        <span class="activity-time">${time}</span>
        <span class="activity-text">${text}</span>
    `;
    
    // Add entrance animation
    activityItem.style.opacity = '0';
    activityItem.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        activityItem.style.transition = 'all 0.5s ease';
        activityItem.style.opacity = '1';
        activityItem.style.transform = 'translateX(0)';
    }, 100);
    
    return activityItem;
}

// Product Management
function initializeProductManagement() {
    // Add product button
    const addBtn = document.querySelector('.add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', showAddProductModal);
    }
    
    // Product action buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-btn')) {
            editProduct(e.target);
        } else if (e.target.classList.contains('delete-btn')) {
            deleteProduct(e.target);
        }
    });
}

function showAddProductModal() {
    // Create modal for adding new product
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3>Add New Product</h3>
                <button class="close-btn" onclick="closeModal(this)">&times;</button>
            </div>
            <div class="modal-body">
                <form id="add-product-form">
                    <div class="form-group">
                        <label for="product-name">Product Name:</label>
                        <input type="text" id="product-name" required>
                    </div>
                    <div class="form-group">
                        <label for="product-price">Price:</label>
                        <input type="number" id="product-price" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label for="product-stock">Stock Quantity:</label>
                        <input type="number" id="product-stock" required>
                    </div>
                    <div class="form-group">
                        <label for="product-category">Category:</label>
                        <select id="product-category" required>
                            <option value="">Select Category</option>
                            <option value="food">Food</option>
                            <option value="toys">Toys</option>
                            <option value="accessories">Accessories</option>
                            <option value="health">Health</option>
                        </select>
                    </div>
                    <button type="submit" class="submit-btn">Add Product</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    const form = document.getElementById('add-product-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addNewProduct(form);
        closeModal(modal.querySelector('.close-btn'));
    });
    
    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal.querySelector('.close-btn'));
        }
    });
}

function addNewProduct(form) {
    const formData = new FormData(form);
    const productData = {
        name: document.getElementById('product-name').value,
        price: document.getElementById('product-price').value,
        stock: document.getElementById('product-stock').value,
        category: document.getElementById('product-category').value
    };
    
    // Create new product card
    const productGrid = document.querySelector('.product-grid');
    const newProductCard = document.createElement('div');
    newProductCard.className = 'product-card';
    
    // Get emoji based on category
    const categoryEmojis = {
        food: '🍖',
        toys: '🎾',
        accessories: '🎀',
        health: '💊'
    };
    
    newProductCard.innerHTML = `
        <div class="product-image">${categoryEmojis[productData.category] || '📦'}</div>
        <h4>${productData.name}</h4>
        <p class="product-price">$${parseFloat(productData.price).toFixed(2)}</p>
        <p class="product-stock">Stock: ${productData.stock}</p>
        <div class="product-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    
    productGrid.appendChild(newProductCard);
    
    // Add entrance animation
    newProductCard.style.opacity = '0';
    newProductCard.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        newProductCard.style.transition = 'all 0.5s ease';
        newProductCard.style.opacity = '1';
        newProductCard.style.transform = 'scale(1)';
    }, 100);
    
    showNotification('Product added successfully!', 'success');
}

function editProduct(button) {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h4').textContent;
    
    showNotification(`Editing ${productName}...`, 'info');
    // Here you would implement the edit functionality
}

function deleteProduct(button) {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h4').textContent;
    
    if (confirm(`Are you sure you want to delete ${productName}?`)) {
        productCard.style.transition = 'all 0.5s ease';
        productCard.style.opacity = '0';
        productCard.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            productCard.remove();
            showNotification('Product deleted successfully!', 'success');
        }, 500);
    }
}

// Order Management
function initializeOrderManagement() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('process-btn')) {
            processOrder(e.target);
        } else if (e.target.classList.contains('track-btn')) {
            trackOrder(e.target);
        } else if (e.target.classList.contains('view-btn')) {
            viewOrder(e.target);
        }
    });
}

function processOrder(button) {
    const row = button.closest('.table-row');
    const orderId = row.querySelector('span:first-child').textContent;
    const statusElement = row.querySelector('.status');
    
    // Update status to shipped
    statusElement.textContent = 'Shipped';
    statusElement.className = 'status shipped';
    
    // Change button to track
    button.textContent = 'Track';
    button.className = 'track-btn';
    
    showNotification(`Order ${orderId} has been processed and shipped!`, 'success');
}

function trackOrder(button) {
    const row = button.closest('.table-row');
    const orderId = row.querySelector('span:first-child').textContent;
    
    showNotification(`Tracking information for ${orderId} has been sent to customer.`, 'info');
}

function viewOrder(button) {
    const row = button.closest('.table-row');
    const orderId = row.querySelector('span:first-child').textContent;
    
    showNotification(`Viewing details for ${orderId}...`, 'info');
}

// Utility Functions
function closeModal(closeBtn) {
    const modal = closeBtn.closest('.modal-overlay');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.remove();
    }, 300);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#2ed573',
        error: '#ff4757',
        info: '#3742fa',
        warning: '#ffa502'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function addWelcomeAnimation() {
    // Add staggered animation to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        showNotification('Logging out...', 'info');
        
        setTimeout(() => {
            // Redirect to main page
            window.location.href = '../index.html';
        }, 1000);
    }
}

// Export functions for global access
window.logout = logout;
window.closeModal = closeModal;