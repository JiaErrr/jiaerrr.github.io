
// Navigation functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Add click event listeners to navigation items
            const navItems = document.querySelectorAll('.nav-item[data-module]');
            
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    const moduleId = this.getAttribute('data-module');
                    switchToModule(moduleId);
                });
            });
            
            // Function to switch modules
            function switchToModule(moduleId) {
                // Hide all modules
                const allModules = document.querySelectorAll('.module-content, .module');
                allModules.forEach(module => {
                    module.style.display = 'none';
                });
                
                // Show selected module
                const selectedModule = document.getElementById(moduleId);
                if (selectedModule) {
                    selectedModule.style.display = 'block';
                    
                    // Initialize contract management if needed
                    if (moduleId === 'contract-management' && typeof initializeContractManagement === 'function') {
                        initializeContractManagement();
                    }
                }
                
                // Update navigation active state
                const allNavItems = document.querySelectorAll('.nav-item');
                allNavItems.forEach(nav => nav.classList.remove('active'));
                
                const activeNavItem = document.querySelector(`[data-module="${moduleId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
            }
            
            // Initialize with dashboard
            switchToModule('dashboard');
            
            // File upload functionality
            const fileInput = document.getElementById('company-documents');
            const uploadedFilesContainer = document.getElementById('uploaded-files');
            
            if (fileInput) {
                fileInput.addEventListener('change', function(e) {
                    handleFileUpload(e.target.files);
                });
            }
            
            function handleFileUpload(files) {
                uploadedFilesContainer.innerHTML = '';
                
                Array.from(files).forEach((file, index) => {
                    if (file.size > 5 * 1024 * 1024) { // 5MB limit
                        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
                        return;
                    }
                    
                    const fileDiv = document.createElement('div');
                    fileDiv.className = 'uploaded-file';
                    fileDiv.innerHTML = `
                        <span><i class="fas fa-file"></i> ${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
                        <button type="button" onclick="removeFile(${index})">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    uploadedFilesContainer.appendChild(fileDiv);
                });
            }
            
            // Form validation and submission
            const supplierForm = document.getElementById('supplier-registration-form');
            if (supplierForm) {
                supplierForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    if (validateSupplierForm()) {
                        submitSupplierForm();
                    }
                });
            }
            
            function validateSupplierForm() {
                const requiredFields = [
                    'company-name', 'contact-person', 'contact-email', 
                    'contact-phone', 'company-address', 'login-username', 
                    'login-password', 'confirm-password'
                ];
                
                let isValid = true;
                
                // Check required fields
                requiredFields.forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (!field.value.trim()) {
                        field.style.borderColor = '#ff4757';
                        isValid = false;
                    } else {
                        field.style.borderColor = '#ddd';
                    }
                });
                
                // Check product types
                const productTypes = document.querySelectorAll('input[name="productTypes"]:checked');
                if (productTypes.length === 0) {
                    alert('Please select at least one product type.');
                    isValid = false;
                }
                
                // Check password match
                const password = document.getElementById('login-password').value;
                const confirmPassword = document.getElementById('confirm-password').value;
                if (password !== confirmPassword) {
                    document.getElementById('confirm-password').style.borderColor = '#ff4757';
                    alert('Passwords do not match.');
                    isValid = false;
                }
                
                // Check password length
                if (password.length < 8) {
                    document.getElementById('login-password').style.borderColor = '#ff4757';
                    alert('Password must be at least 8 characters long.');
                    isValid = false;
                }
                
                // Check email format
                const email = document.getElementById('contact-email').value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    document.getElementById('contact-email').style.borderColor = '#ff4757';
                    alert('Please enter a valid email address.');
                    isValid = false;
                }
                
                return isValid;
            }
            
            function submitSupplierForm() {
                // Collect form data
                const formData = new FormData(supplierForm);
                
                // Get selected product types
                const productTypes = [];
                document.querySelectorAll('input[name="productTypes"]:checked').forEach(checkbox => {
                    productTypes.push(checkbox.value);
                });
                
                // Simulate form submission
                const supplierData = {
                    companyName: formData.get('companyName'),
                    contactPerson: formData.get('contactPerson'),
                    contactEmail: formData.get('contactEmail'),
                    contactPhone: formData.get('contactPhone'),
                    companyAddress: formData.get('companyAddress'),
                    productTypes: productTypes,
                    loginUsername: formData.get('loginUsername'),
                    registrationDate: new Date().toISOString().split('T')[0],
                    status: 'pending'
                };
                
                console.log('Supplier Registration Data:', supplierData);
                
                // Show success message
                alert('Supplier registration submitted successfully! The application is now pending review.');
                
                // Reset form and close modal
                supplierForm.reset();
                uploadedFilesContainer.innerHTML = '';
                closeSupplierModal();
                
                // Optionally refresh supplier list
            // loadSuppliers();
        }
        
        // Order Management Functionality
        initializeOrderManagement();
        
        // Supplier Management Functionality
        initializeSupplierManagement();
        
        // Communication Tools Functionality
        initializeCommunicationTools();
        
        // Support Tickets Functionality
        initializeSupportTickets();
    });
    
    // Order Management Functions
    function initializeOrderManagement() {
        // Sample order data
        const sampleOrders = [
            {
                id: 'ORD-2024-001',
                supplier: 'PetFood Co.',
                products: 'Premium Dog Food (50kg)',
                totalAmount: 'RM 1,250.00',
                status: 'pending',
                orderDate: '2024-01-15',
                deliveryDate: '2024-01-20'
            },
            {
                id: 'ORD-2024-002',
                supplier: 'Toy World',
                products: 'Interactive Cat Toys (Set of 10)',
                totalAmount: 'RM 450.00',
                status: 'processing',
                orderDate: '2024-01-14',
                deliveryDate: '2024-01-18'
            },
            {
                id: 'ORD-2024-003',
                supplier: 'Health Pets',
                products: 'Vitamin Supplements (100 bottles)',
                totalAmount: 'RM 2,100.00',
                status: 'shipped',
                orderDate: '2024-01-12',
                deliveryDate: '2024-01-16'
            },
            {
                id: 'ORD-2024-004',
                supplier: 'PetFood Co.',
                products: 'Cat Litter (20 bags)',
                totalAmount: 'RM 800.00',
                status: 'delivered',
                orderDate: '2024-01-10',
                deliveryDate: '2024-01-14'
            },
            {
                id: 'ORD-2024-005',
                supplier: 'Toy World',
                products: 'Dog Leashes (Various sizes)',
                totalAmount: 'RM 320.00',
                status: 'cancelled',
                orderDate: '2024-01-08',
                deliveryDate: '2024-01-12'
            }
        ];
        
        // Store orders globally
        window.ordersData = sampleOrders;
        
        // Initialize order statistics
        updateOrderStats();
        
        // Load orders into table
        loadOrdersTable();
        
        // Setup order search and filters
        setupOrderFilters();
    }
    
    function updateOrderStats() {
        const orders = window.ordersData || [];
        
        const stats = {
            pending: orders.filter(o => o.status === 'pending').length,
            processing: orders.filter(o => o.status === 'processing').length,
            completed: orders.filter(o => o.status === 'shipped' || o.status === 'delivered').length,
            cancelled: orders.filter(o => o.status === 'cancelled').length
        };
        
        document.getElementById('pending-count').textContent = stats.pending;
        document.getElementById('processing-count').textContent = stats.processing;
        document.getElementById('completed-count').textContent = stats.completed;
        document.getElementById('cancelled-count').textContent = stats.cancelled;
    }
    
    function loadOrdersTable() {
        const tbody = document.getElementById('orders-tbody');
        const orders = window.ordersData || [];
        
        tbody.innerHTML = '';
        
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" value="${order.id}"></td>
                <td><strong>${order.id}</strong></td>
                <td>${order.supplier}</td>
                <td>${order.products}</td>
                <td><strong>${order.totalAmount}</strong></td>
                <td><span class="status-badge ${order.status}">${order.status}</span></td>
                <td>${order.orderDate}</td>
                <td>${order.deliveryDate}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn view" onclick="viewOrder('${order.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit" onclick="editOrder('${order.id}')" title="Edit Order">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${order.status === 'pending' ? `
                            <button class="action-btn" style="background: #27ae60;" onclick="acceptOrder('${order.id}')" title="Accept Order">
                                <i class="fas fa-check"></i>
                            </button>
                        ` : ''}
                        ${order.status === 'processing' ? `
                            <button class="action-btn" style="background: #3498db;" onclick="markShipped('${order.id}')" title="Mark as Shipped">
                                <i class="fas fa-shipping-fast"></i>
                            </button>
                        ` : ''}
                        <button class="action-btn" style="background: #9b59b6;" onclick="uploadInvoice('${order.id}')" title="Upload Invoice">
                            <i class="fas fa-file-invoice"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    function loadOrdersGrid() {
        const gridContainer = document.getElementById('orders-grid-view');
        const orders = window.ordersData || [];
        
        gridContainer.innerHTML = '';
        
        orders.forEach(order => {
            const card = document.createElement('div');
            card.className = 'order-card';
            card.innerHTML = `
                <div class="order-card-header">
                    <h4>${order.id}</h4>
                    <span class="status-badge ${order.status}">${order.status}</span>
                </div>
                <div class="order-card-body">
                    <p><strong>Supplier:</strong> ${order.supplier}</p>
                    <p><strong>Products:</strong> ${order.products}</p>
                    <p><strong>Order Date:</strong> ${order.orderDate}</p>
                    <p><strong>Delivery Date:</strong> ${order.deliveryDate}</p>
                </div>
                <div class="order-card-footer">
                    <strong>${order.totalAmount}</strong>
                    <div class="action-buttons">
                        <button class="action-btn view" onclick="viewOrder('${order.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit" onclick="editOrder('${order.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }
    
    function setupOrderFilters() {
        const searchInput = document.getElementById('order-search');
        const statusFilter = document.getElementById('order-status-filter');
        const dateFilter = document.getElementById('order-date-filter');
        const supplierFilter = document.getElementById('order-supplier-filter');
        
        if (searchInput) {
            searchInput.addEventListener('input', filterOrders);
        }
        if (statusFilter) {
            statusFilter.addEventListener('change', filterOrders);
        }
        if (dateFilter) {
            dateFilter.addEventListener('change', filterOrders);
        }
        if (supplierFilter) {
            supplierFilter.addEventListener('change', filterOrders);
        }
    }
    
    function filterOrders() {
        const searchTerm = document.getElementById('order-search').value.toLowerCase();
        const statusFilter = document.getElementById('order-status-filter').value;
        const dateFilter = document.getElementById('order-date-filter').value;
        const supplierFilter = document.getElementById('order-supplier-filter').value;
        
        let filteredOrders = window.ordersData || [];
        
        // Apply filters
        if (searchTerm) {
            filteredOrders = filteredOrders.filter(order => 
                order.id.toLowerCase().includes(searchTerm) ||
                order.products.toLowerCase().includes(searchTerm)
            );
        }
        
        if (statusFilter) {
            filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
        }
        
        if (dateFilter) {
            filteredOrders = filteredOrders.filter(order => order.orderDate === dateFilter);
        }
        
        if (supplierFilter) {
            filteredOrders = filteredOrders.filter(order => 
                order.supplier.toLowerCase().includes(supplierFilter.toLowerCase())
            );
        }
        
        // Update display with filtered orders
        window.filteredOrdersData = filteredOrders;
        loadFilteredOrders();
    }
    
    function loadFilteredOrders() {
        const tbody = document.getElementById('orders-tbody');
        const orders = window.filteredOrdersData || window.ordersData || [];
        
        tbody.innerHTML = '';
        
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" value="${order.id}"></td>
                <td><strong>${order.id}</strong></td>
                <td>${order.supplier}</td>
                <td>${order.products}</td>
                <td><strong>${order.totalAmount}</strong></td>
                <td><span class="status-badge ${order.status}">${order.status}</span></td>
                <td>${order.orderDate}</td>
                <td>${order.deliveryDate}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn view" onclick="viewOrder('${order.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit" onclick="editOrder('${order.id}')" title="Edit Order">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${order.status === 'pending' ? `
                            <button class="action-btn" style="background: #27ae60;" onclick="acceptOrder('${order.id}')" title="Accept Order">
                                <i class="fas fa-check"></i>
                            </button>
                        ` : ''}
                        ${order.status === 'processing' ? `
                            <button class="action-btn" style="background: #3498db;" onclick="markShipped('${order.id}')" title="Mark as Shipped">
                                <i class="fas fa-shipping-fast"></i>
                            </button>
                        ` : ''}
                        <button class="action-btn" style="background: #9b59b6;" onclick="uploadInvoice('${order.id}')" title="Upload Invoice">
                            <i class="fas fa-file-invoice"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    // Global functions for modal control
    function openSupplierModal() {
        document.getElementById('supplier-modal').style.display = 'flex';
    }
    
    function closeSupplierModal() {
        document.getElementById('supplier-modal').style.display = 'none';
    }
    
    // Supplier Management Functions
    function initializeSupplierManagement() {
        // Sample supplier data
        const sampleSuppliers = [
            {
                id: 'SUP-001',
                companyName: 'PetFood Co.',
                contactPerson: 'John Smith',
                contactEmail: 'john@petfoodco.com',
                contactPhone: '+60 12-345 6789',
                category: 'food',
                status: 'approved',
                registrationDate: '2024-01-10',
                productsOffered: ['Premium Dog Food', 'Cat Food', 'Pet Treats'],
                rating: 4.8,
                totalOrders: 156
            },
            {
                id: 'SUP-002',
                companyName: 'Toy World Sdn Bhd',
                contactPerson: 'Sarah Lee',
                contactEmail: 'sarah@toyworld.com',
                contactPhone: '+60 11-234 5678',
                category: 'toys',
                status: 'approved',
                registrationDate: '2024-01-08',
                productsOffered: ['Interactive Toys', 'Cat Toys', 'Dog Leashes'],
                rating: 4.6,
                totalOrders: 89
            },
            {
                id: 'SUP-003',
                companyName: 'Health Pets Malaysia',
                contactPerson: 'Dr. Ahmad Rahman',
                contactEmail: 'ahmad@healthpets.my',
                contactPhone: '+60 13-456 7890',
                category: 'health',
                status: 'approved',
                registrationDate: '2024-01-05',
                productsOffered: ['Vitamins', 'Supplements', 'Medical Supplies'],
                rating: 4.9,
                totalOrders: 234
            },
            {
                id: 'SUP-004',
                companyName: 'Pet Supplies Co.',
                contactPerson: 'Lisa Wong',
                contactEmail: 'lisa@petsupplies.com',
                contactPhone: '+60 14-567 8901',
                category: 'food',
                status: 'pending',
                registrationDate: '2024-01-15',
                productsOffered: ['Organic Pet Food', 'Natural Treats'],
                rating: 0,
                totalOrders: 0
            },
            {
                id: 'SUP-005',
                companyName: 'Grooming Essentials',
                contactPerson: 'Michael Tan',
                contactEmail: 'michael@grooming.com',
                contactPhone: '+60 15-678 9012',
                category: 'health',
                status: 'approved',
                registrationDate: '2024-01-12',
                productsOffered: ['Shampoos', 'Brushes', 'Grooming Tools'],
                rating: 4.7,
                totalOrders: 67
            }
        ];
        
        // Store suppliers globally
        window.suppliersData = sampleSuppliers;
        
        // Load suppliers into grid
        loadSuppliersGrid();
    }
    
    function loadSuppliersGrid() {
        const gridContainer = document.getElementById('suppliers-grid');
        const suppliers = window.suppliersData || [];
        
        if (!gridContainer) return;
        
        gridContainer.innerHTML = '';
        
        suppliers.forEach(supplier => {
            const card = document.createElement('div');
            card.className = 'supplier-card';
            card.innerHTML = `
                <div class="supplier-card-header">
                    <h3>${supplier.companyName}</h3>
                    <span class="status-badge ${supplier.status}">${supplier.status}</span>
                </div>
                <div class="supplier-card-body">
                    <p><strong>Contact:</strong> ${supplier.contactPerson}</p>
                    <p><strong>Email:</strong> ${supplier.contactEmail}</p>
                    <p><strong>Phone:</strong> ${supplier.contactPhone}</p>
                    <p><strong>Category:</strong> ${getCategoryName(supplier.category)}</p>
                    <p><strong>Registration:</strong> ${supplier.registrationDate}</p>
                    ${supplier.status === 'approved' ? `
                        <p><strong>Rating:</strong> ${'★'.repeat(Math.floor(supplier.rating))} ${supplier.rating}/5</p>
                        <p><strong>Total Orders:</strong> ${supplier.totalOrders}</p>
                    ` : ''}
                </div>
                <div class="supplier-card-footer">
                    <div class="action-buttons">
                        <button class="action-btn view" onclick="viewSupplier('${supplier.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit" onclick="editSupplier('${supplier.id}')" title="Edit Supplier">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${supplier.status === 'pending' ? `
                            <button class="action-btn" style="background: #27ae60;" onclick="approveSupplier('${supplier.id}')" title="Approve">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="action-btn" style="background: #e74c3c;" onclick="rejectSupplier('${supplier.id}')" title="Reject">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }
    
    function getCategoryName(category) {
        const categories = {
            'food': 'Pet Food',
            'toys': 'Toys & Accessories',
            'health': 'Health & Care'
        };
        return categories[category] || category;
    }
    
    // Supplier action functions
    function viewSupplier(supplierId) {
        const supplier = window.suppliersData.find(s => s.id === supplierId);
        if (supplier) {
            alert(`Viewing supplier: ${supplier.companyName}\nContact: ${supplier.contactPerson}\nEmail: ${supplier.contactEmail}`);
        }
    }
    
    function editSupplier(supplierId) {
        alert(`Edit supplier functionality would open here for supplier ID: ${supplierId}`);
    }
    
    function approveSupplier(supplierId) {
        const suppliers = window.suppliersData;
        const supplier = suppliers.find(s => s.id === supplierId);
        if (supplier) {
            supplier.status = 'approved';
            loadSuppliersGrid();
            alert(`Supplier ${supplier.companyName} has been approved!`);
        }
    }
    
    function rejectSupplier(supplierId) {
        const suppliers = window.suppliersData;
        const supplier = suppliers.find(s => s.id === supplierId);
        if (supplier) {
            supplier.status = 'rejected';
            loadSuppliersGrid();
            alert(`Supplier ${supplier.companyName} has been rejected.`);
        }
    }

    // Order Management Global Functions
    function toggleOrderView() {
        const tableView = document.getElementById('orders-table-view');
        const gridView = document.getElementById('orders-grid-view');
        const toggleIcon = document.getElementById('view-toggle-icon');
        const toggleText = document.getElementById('view-toggle-text');
        
        if (tableView.style.display === 'none') {
            // Switch to table view
            tableView.style.display = 'block';
            gridView.style.display = 'none';
            toggleIcon.className = 'fas fa-th';
            toggleText.textContent = 'Grid View';
        } else {
            // Switch to grid view
            tableView.style.display = 'none';
            gridView.style.display = 'block';
            toggleIcon.className = 'fas fa-th-list';
            toggleText.textContent = 'List View';
            loadOrdersGrid();
        }
    }
    
    function openOrderModal() {
        document.getElementById('order-modal').style.display = 'flex';
    }
    
    function closeOrderModal() {
        document.getElementById('order-modal').style.display = 'none';
    }
    
    function viewOrder(orderId) {
        const order = window.ordersData.find(o => o.id === orderId);
        if (order) {
            alert(`Order Details:\n\nID: ${order.id}\nCustomer: ${order.customer}\nSupplier: ${order.supplier}\nProducts: ${order.products}\nTotal: ${order.totalAmount}\nStatus: ${order.status}\nOrder Date: ${order.orderDate}\nDelivery Date: ${order.deliveryDate}`);
        }
    }
    
    function editOrder(orderId) {
        alert(`Edit order functionality for ${orderId} would be implemented here.`);
    }
    
    function acceptOrder(orderId) {
        const orderIndex = window.ordersData.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            window.ordersData[orderIndex].status = 'processing';
            updateOrderStats();
            loadOrdersTable();
            
            // Simulate notification
            alert(`Order ${orderId} has been accepted and is now processing.`);
            
            // Log activity
            console.log(`Order ${orderId} status changed from pending to processing at ${new Date().toISOString()}`);
        }
    }
    
    function markShipped(orderId) {
        const orderIndex = window.ordersData.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            window.ordersData[orderIndex].status = 'shipped';
            updateOrderStats();
            loadOrdersTable();
            
            // Simulate notification
            alert(`Order ${orderId} has been marked as shipped.`);
            
            // Log activity
            console.log(`Order ${orderId} status changed to shipped at ${new Date().toISOString()}`);
        }
    }
    
    function uploadInvoice(orderId) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.jpg,.jpeg,.png';
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                alert(`Invoice "${file.name}" uploaded successfully for order ${orderId}.`);
                
                // Log activity
                console.log(`Invoice uploaded for order ${orderId}: ${file.name} at ${new Date().toISOString()}`);
            }
        };
        input.click();
     }
     
     // Order Creation Form Functions
     function addOrderProduct() {
         const container = document.getElementById('order-products-container');
         const productCount = container.children.length + 1;
         
         const productDiv = document.createElement('div');
         productDiv.className = 'order-product-item';
         productDiv.innerHTML = `
             <div class="form-row">
                 <div class="form-group">
                     <label>Product ${productCount}</label>
                     <select class="form-control" name="product_${productCount}" onchange="updateOrderTotal()">
                         <option value="">Select Product</option>
                         <option value="premium-dog-food|25.00">Premium Dog Food - RM 25.00/kg</option>
                         <option value="cat-toys|15.00">Interactive Cat Toys - RM 15.00/piece</option>
                         <option value="vitamin-supplements|21.00">Vitamin Supplements - RM 21.00/bottle</option>
                         <option value="cat-litter|40.00">Cat Litter - RM 40.00/bag</option>
                         <option value="dog-leashes|16.00">Dog Leashes - RM 16.00/piece</option>
                     </select>
                 </div>
                 <div class="form-group">
                     <label>Quantity</label>
                     <input type="number" class="form-control" name="quantity_${productCount}" min="1" value="1" onchange="updateOrderTotal()">
                 </div>
                 <div class="form-group">
                     <label>Unit Price</label>
                     <input type="text" class="form-control" name="unit_price_${productCount}" readonly>
                 </div>
                 <div class="form-group">
                     <label>Subtotal</label>
                     <input type="text" class="form-control" name="subtotal_${productCount}" readonly>
                 </div>
                 <div class="form-group">
                     <button type="button" class="btn btn-danger btn-sm" onclick="removeOrderProduct(this)">
                         <i class="fas fa-trash"></i>
                     </button>
                 </div>
             </div>
         `;
         
         container.appendChild(productDiv);
     }
     
     function removeOrderProduct(button) {
         const productItem = button.closest('.order-product-item');
         productItem.remove();
         updateOrderTotal();
     }
     
     function updateOrderTotal() {
         const container = document.getElementById('order-products-container');
         const productItems = container.querySelectorAll('.order-product-item');
         
         let subtotal = 0;
         
         productItems.forEach((item, index) => {
             const productSelect = item.querySelector(`select[name^="product_"]`);
             const quantityInput = item.querySelector(`input[name^="quantity_"]`);
             const unitPriceInput = item.querySelector(`input[name^="unit_price_"]`);
             const subtotalInput = item.querySelector(`input[name^="subtotal_"]`);
             
             if (productSelect.value && quantityInput.value) {
                 const [productName, price] = productSelect.value.split('|');
                 const unitPrice = parseFloat(price);
                 const quantity = parseInt(quantityInput.value);
                 const itemSubtotal = unitPrice * quantity;
                 
                 unitPriceInput.value = `RM ${unitPrice.toFixed(2)}`;
                 subtotalInput.value = `RM ${itemSubtotal.toFixed(2)}`;
                 
                 subtotal += itemSubtotal;
             } else {
                 unitPriceInput.value = '';
                 subtotalInput.value = '';
             }
         });
         
         // Update order summary
         const tax = subtotal * 0.06; // 6% tax
         const shipping = subtotal > 500 ? 0 : 50; // Free shipping over RM 500
         const total = subtotal + tax + shipping;
         
         document.getElementById('order-subtotal').textContent = `RM ${subtotal.toFixed(2)}`;
         document.getElementById('order-tax').textContent = `RM ${tax.toFixed(2)}`;
         document.getElementById('order-shipping').textContent = `RM ${shipping.toFixed(2)}`;
         document.getElementById('order-total').textContent = `RM ${total.toFixed(2)}`;
     }
     
     function submitOrderForm() {
         const form = document.getElementById('order-form');
         const formData = new FormData(form);
         
         // Basic validation
         const customerName = formData.get('customer_name');
         const supplier = formData.get('supplier');
         const deliveryDate = formData.get('delivery_date');
         
         if (!customerName || !supplier || !deliveryDate) {
             alert('Please fill in all required fields.');
             return;
         }
         
         // Check if at least one product is selected
         const container = document.getElementById('order-products-container');
         const productItems = container.querySelectorAll('.order-product-item');
         let hasValidProduct = false;
         
         productItems.forEach(item => {
             const productSelect = item.querySelector('select[name^="product_"]');
             if (productSelect.value) {
                 hasValidProduct = true;
             }
         });
         
         if (!hasValidProduct) {
             alert('Please select at least one product.');
             return;
         }
         
         // Generate new order ID
         const newOrderId = `ORD-2024-${String(window.ordersData.length + 1).padStart(3, '0')}`;
         
         // Create new order object
         const newOrder = {
             id: newOrderId,
             customer: customerName,
             supplier: supplier,
             products: 'Multiple Products', // Simplified for display
             totalAmount: document.getElementById('order-total').textContent,
             status: 'pending',
             orderDate: new Date().toISOString().split('T')[0],
             deliveryDate: deliveryDate
         };
         
         // Add to orders data
         window.ordersData.unshift(newOrder);
         
         // Update display
         updateOrderStats();
         loadOrdersTable();
         
         // Close modal and reset form
         closeOrderModal();
         form.reset();
         
         // Clear products container except first item
         const productsContainer = document.getElementById('order-products-container');
         const firstProduct = productsContainer.firstElementChild;
         productsContainer.innerHTML = '';
         if (firstProduct) {
             productsContainer.appendChild(firstProduct);
         }
         
         // Reset order summary
         document.getElementById('order-subtotal').textContent = 'RM 0.00';
         document.getElementById('order-tax').textContent = 'RM 0.00';
         document.getElementById('order-shipping').textContent = 'RM 0.00';
         document.getElementById('order-total').textContent = 'RM 0.00';
         
         // Simulate notification
         alert(`Order ${newOrderId} has been created successfully!`);
         
         // Log activity
         console.log(`New order created: ${newOrderId} at ${new Date().toISOString()}`);
     }
     
     function removeFile(index) {
            const fileInput = document.getElementById('company-documents');
            const dt = new DataTransfer();
            const files = fileInput.files;
            
            for (let i = 0; i < files.length; i++) {
                if (i !== index) {
                    dt.items.add(files[i]);
                }
            }
            
            fileInput.files = dt.files;
            
            // Refresh uploaded files display
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        }

// Contract Management Functions
function initializeContractManagement() {
    // Enhanced demo contract data for comprehensive testing
    window.contractsData = [
        {
            id: 'CON-2024-001',
            title: 'Premium Pet Food Supply Agreement',
            supplier: 'PetFood Co.',
            type: 'Supply Agreement',
            status: 'active',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            value: 'RM 125,000.00',
            paymentTerms: 'Net 30 days',
            lastModified: '2024-03-15',
            content: 'Comprehensive supply agreement covering premium pet food products including dry kibble, wet food, treats, and specialty dietary foods for dogs and cats. Agreement includes quality standards, delivery schedules, pricing structures, and seasonal product variations.',
            history: [
                {
                    date: '2024-03-15',
                    action: 'Amendment Added',
                    description: 'Added new organic product lines to existing agreement with updated pricing.'
                },
                {
                    date: '2024-01-15',
                    action: 'Contract Signed',
                    description: 'Contract digitally signed by both parties and activated.'
                },
                {
                    date: '2024-01-10',
                    action: 'Legal Review Completed',
                    description: 'Legal team completed comprehensive review and approved all terms.'
                },
                {
                    date: '2023-12-20',
                    action: 'Contract Drafted',
                    description: 'Initial contract terms negotiated and drafted.'
                }
            ]
        },
        {
            id: 'CON-2024-002',
            title: 'Interactive Pet Toys Distribution',
            supplier: 'Toy World',
            type: 'Distribution Agreement',
            status: 'active',
            startDate: '2024-02-01',
            endDate: '2025-01-31',
            value: 'RM 85,000.00',
            paymentTerms: 'Net 15 days',
            lastModified: '2024-02-01',
            content: 'Exclusive distribution agreement for premium pet toys, interactive play items, and accessories. Includes seasonal product launches, promotional support, and territory exclusivity rights.',
            history: [
                {
                    date: '2024-02-01',
                    action: 'Contract Activated',
                    description: 'Distribution agreement signed and activated for 12-month term.'
                },
                {
                    date: '2024-01-25',
                    action: 'Final Terms Agreed',
                    description: 'All distribution terms and territory rights finalized.'
                },
                {
                    date: '2024-01-10',
                    action: 'Contract Created',
                    description: 'Initial distribution agreement drafted and sent for review.'
                }
            ]
        },
        {
            id: 'CON-2024-003',
            title: 'Pet Health & Wellness Products',
            supplier: 'Health Pets',
            type: 'Service Agreement',
            status: 'pending',
            startDate: '2024-03-01',
            endDate: '2025-02-28',
            value: 'RM 65,000.00',
            paymentTerms: 'Net 30 days',
            lastModified: '2024-02-28',
            content: 'Service agreement for pet health and wellness products including vitamins, supplements, grooming supplies, and veterinary-recommended items. Pending final signature.',
            history: [
                {
                    date: '2024-02-28',
                    action: 'Terms Finalized',
                    description: 'Contract terms finalized after successful negotiations.'
                },
                {
                    date: '2024-02-15',
                    action: 'Under Review',
                    description: 'Contract under legal review and compliance check.'
                }
            ]
        },
        {
            id: 'CON-2024-004',
            title: 'Comfort Zone Pet Accessories',
            supplier: 'Comfort Zone',
            type: 'Supply Agreement',
            status: 'active',
            startDate: '2024-01-15',
            endDate: '2024-12-15',
            value: 'RM 95,000.00',
            paymentTerms: 'Net 45 days',
            lastModified: '2024-01-15',
            content: 'Supply agreement for pet bedding, carriers, crates, and comfort accessories. Includes seasonal collections, custom sizing options, and bulk order discounts.',
            history: [
                {
                    date: '2024-01-15',
                    action: 'Contract Signed',
                    description: 'Agreement finalized and signed for premium comfort products.'
                },
                {
                    date: '2023-12-20',
                    action: 'Negotiations Started',
                    description: 'Contract negotiations initiated with comfort product specialist.'
                }
            ]
        },
        {
            id: 'CON-2024-005',
            title: 'Organic Fresh Treats Partnership',
            supplier: 'Fresh Treats Ltd',
            type: 'Partnership Agreement',
            status: 'pending',
            startDate: '2024-04-01',
            endDate: '2025-03-31',
            value: 'RM 110,000.00',
            paymentTerms: 'Net 20 days',
            lastModified: '2024-03-25',
            content: 'Strategic partnership for organic and natural pet treats, including co-branding opportunities, exclusive product development, and joint marketing initiatives.',
            history: [
                {
                    date: '2024-03-25',
                    action: 'Terms Under Review',
                    description: 'Partnership terms being reviewed by both legal teams.'
                },
                {
                    date: '2024-03-10',
                    action: 'Partnership Proposed',
                    description: 'Strategic partnership proposal submitted for organic treats line.'
                }
            ]
        },
        {
            id: 'CON-2023-012',
            title: 'Aquatic Pet Supplies Agreement',
            supplier: 'Aqua Pets',
            type: 'Supply Agreement',
            status: 'expired',
            startDate: '2023-06-01',
            endDate: '2024-05-31',
            value: 'RM 55,000.00',
            paymentTerms: 'Net 30 days',
            lastModified: '2024-05-31',
            content: 'Supply agreement for aquarium supplies, fish food, and aquatic pet accessories. Contract expired and renewal discussions ongoing.',
            history: [
                {
                    date: '2024-05-31',
                    action: 'Contract Expired',
                    description: 'Contract reached end date - renewal discussions pending.'
                },
                {
                    date: '2023-12-15',
                    action: 'Mid-term Review',
                    description: 'Performance review completed with satisfactory results.'
                },
                {
                    date: '2023-06-01',
                    action: 'Contract Activated',
                    description: 'Aquatic supplies agreement activated.'
                }
            ]
        },
        {
            id: 'CON-2024-006',
            title: 'Premium Nutrition Specialist Foods',
            supplier: 'Premium Nutrition',
            type: 'Supply Agreement',
            status: 'active',
            startDate: '2024-05-01',
            endDate: '2024-10-31',
            value: 'RM 78,000.00',
            paymentTerms: 'Net 15 days',
            lastModified: '2024-05-01',
            content: 'Specialized supply agreement for premium and prescription pet foods, including veterinary-recommended diets and therapeutic nutrition products.',
            history: [
                {
                    date: '2024-05-01',
                    action: 'Contract Activated',
                    description: 'Premium nutrition agreement signed and activated.'
                },
                {
                    date: '2024-04-10',
                    action: 'Terms Negotiated',
                    description: 'Specialized terms negotiated for premium product line.'
                }
            ]
        },
        {
            id: 'CON-2024-007',
            title: 'Global Pet Supplies Distribution',
            supplier: 'Global Pet Supplies',
            type: 'Distribution Agreement',
            status: 'pending',
            startDate: '2024-06-01',
            endDate: '2025-05-31',
            value: 'RM 150,000.00',
            paymentTerms: 'Net 30 days',
            lastModified: '2024-05-28',
            content: 'Large-scale distribution agreement covering multiple product categories including food, toys, accessories, and health products with comprehensive territory coverage.',
            history: [
                {
                    date: '2024-05-28',
                    action: 'Final Review Stage',
                    description: 'Contract in final review stage before signing.'
                },
                {
                    date: '2024-05-15',
                    action: 'Contract Drafted',
                    description: 'Comprehensive distribution contract drafted for review.'
                }
            ]
        },
        {
            id: 'CON-2023-008',
            title: 'Eco-Friendly Pet Products Partnership',
            supplier: 'Eco Pets',
            type: 'Partnership Agreement',
            status: 'active',
            startDate: '2023-09-01',
            endDate: '2024-08-31',
            value: 'RM 42,000.00',
            paymentTerms: 'Net 30 days',
            lastModified: '2023-09-01',
            content: 'Partnership for eco-friendly and sustainable pet products including biodegradable toys, organic accessories, and environmentally conscious packaging solutions.',
            history: [
                {
                    date: '2023-09-01',
                    action: 'Partnership Activated',
                    description: 'Eco-friendly product partnership agreement activated.'
                },
                {
                    date: '2023-08-15',
                    action: 'Sustainability Assessment',
                    description: 'Environmental impact assessment completed successfully.'
                }
            ]
        },
        {
            id: 'CON-2024-009',
            title: 'Smart Pet Technology Solutions',
            supplier: 'Tech Pet Solutions',
            type: 'Service Agreement',
            status: 'pending',
            startDate: '2024-07-01',
            endDate: '2025-06-30',
            value: 'RM 88,000.00',
            paymentTerms: 'Net 45 days',
            lastModified: '2024-06-25',
            content: 'Service agreement for smart pet products including GPS trackers, automatic feeders, health monitoring devices, and IoT-enabled pet care solutions.',
            history: [
                {
                    date: '2024-06-25',
                    action: 'Technical Review',
                    description: 'Technical specifications and compatibility review completed.'
                },
                {
                    date: '2024-06-10',
                    action: 'Technology Assessment',
                    description: 'Comprehensive evaluation of smart pet technology solutions.'
                }
            ]
        },
        {
            id: 'CON-2022-005',
            title: 'Classic Pet Products Long-term Supply',
            supplier: 'Classic Pets',
            type: 'Supply Agreement',
            status: 'archived',
            startDate: '2022-01-01',
            endDate: '2023-12-31',
            value: 'RM 92,000.00',
            paymentTerms: 'Net 30 days',
            lastModified: '2024-01-15',
            content: 'Long-term supply agreement for traditional pet products and accessories. Contract completed successfully and archived for reference.',
            history: [
                {
                    date: '2024-01-15',
                    action: 'Contract Archived',
                    description: 'Contract moved to archived status after successful completion.'
                },
                {
                    date: '2023-12-31',
                    action: 'Contract Completed',
                    description: 'Two-year agreement successfully completed.'
                },
                {
                    date: '2022-01-01',
                    action: 'Long-term Agreement Activated',
                    description: 'Two-year supply agreement activated.'
                }
            ]
        },
        {
            id: 'CON-2024-010',
            title: 'Luxury Pet Boutique Partnership',
            supplier: 'Luxury Pet Boutique',
            type: 'Partnership Agreement',
            status: 'draft',
            startDate: '2024-08-01',
            endDate: '2025-07-31',
            value: 'RM 120,000.00',
            paymentTerms: 'Net 20 days',
            lastModified: '2024-07-20',
            content: 'Exclusive partnership for luxury pet accessories, designer clothing, premium grooming products, and high-end pet lifestyle items.',
            history: [
                {
                    date: '2024-07-20',
                    action: 'Terms Negotiation',
                    description: 'Luxury product line partnership terms under negotiation.'
                },
                {
                    date: '2024-07-05',
                    action: 'Luxury Line Proposal',
                    description: 'Proposal for exclusive luxury pet product line submitted.'
                }
            ]
        }
    ];

    loadContractsTable();
    updateContractStats();
    loadContractReminders();
}

function loadContractsTable() {
    const tableBody = document.getElementById('contracts-tbody');
    if (!tableBody) return;

    const filteredContracts = getFilteredContracts();
    
    tableBody.innerHTML = '';
    
    filteredContracts.forEach(contract => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contract.id}</td>
            <td>${contract.title}</td>
            <td>${contract.supplier}</td>
            <td>${contract.type}</td>
            <td><span class="status-badge ${contract.status}">${contract.status}</span></td>
            <td>${contract.startDate}</td>
            <td>${contract.endDate}</td>
            <td>${contract.value}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewContract('${contract.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="btn btn-sm btn-secondary" onclick="downloadContract('${contract.id}')">
                    <i class="fas fa-download"></i> Download
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function getFilteredContracts() {
    const statusFilter = document.getElementById('contract-status-filter')?.value || 'all';
    const supplierFilter = document.getElementById('contract-supplier-filter')?.value || 'all';
    const searchTerm = document.getElementById('contract-search')?.value.toLowerCase() || '';
    
    return window.contractsData.filter(contract => {
        const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
        const matchesSupplier = supplierFilter === 'all' || contract.supplier === supplierFilter;
        const matchesSearch = contract.title.toLowerCase().includes(searchTerm) || 
                             contract.id.toLowerCase().includes(searchTerm) ||
                             contract.supplier.toLowerCase().includes(searchTerm);
        
        return matchesStatus && matchesSupplier && matchesSearch;
    });
}

function updateContractStats() {
    const totalContracts = window.contractsData.length;
    const activeContracts = window.contractsData.filter(c => c.status === 'active').length;
    const pendingContracts = window.contractsData.filter(c => c.status === 'pending').length;
    const expiringContracts = window.contractsData.filter(c => {
        const endDate = new Date(c.endDate);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    }).length;
    
    document.getElementById('total-contracts').textContent = totalContracts;
    document.getElementById('active-contracts').textContent = activeContracts;
    document.getElementById('pending-contracts').textContent = pendingContracts;
    document.getElementById('expiring-contracts').textContent = expiringContracts;
}

function loadContractReminders() {
    const remindersList = document.getElementById('contract-reminders');
    if (!remindersList) return;
    
    const today = new Date();
    const reminders = [];
    
    window.contractsData.forEach(contract => {
        const endDate = new Date(contract.endDate);
        const daysUntilExpiry = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
            reminders.push({
                type: daysUntilExpiry <= 7 ? 'urgent' : 'warning',
                title: `Contract Expiring Soon`,
                description: `${contract.title} (${contract.id}) expires in ${daysUntilExpiry} days`,
                contractId: contract.id
            });
        } else if (daysUntilExpiry <= 0) {
            reminders.push({
                type: 'urgent',
                title: `Contract Expired`,
                description: `${contract.title} (${contract.id}) expired ${Math.abs(daysUntilExpiry)} days ago`,
                contractId: contract.id
            });
        }
        
        if (contract.status === 'pending') {
            reminders.push({
                type: 'info',
                title: `Pending Signature`,
                description: `${contract.title} (${contract.id}) is awaiting signature`,
                contractId: contract.id
            });
        }
    });
    
    remindersList.innerHTML = '';
    
    if (reminders.length === 0) {
        remindersList.innerHTML = '<p style="color: #cccccc; text-align: center; padding: 20px;">No contract reminders at this time.</p>';
        return;
    }
    
    reminders.forEach(reminder => {
        const reminderDiv = document.createElement('div');
        reminderDiv.className = `reminder-item ${reminder.type}`;
        reminderDiv.innerHTML = `
            <div class="reminder-content">
                <div class="reminder-title">${reminder.title}</div>
                <div class="reminder-description">${reminder.description}</div>
            </div>
            <div class="reminder-actions">
                <button class="btn btn-sm btn-primary" onclick="viewContract('${reminder.contractId}')">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="btn btn-sm btn-secondary" onclick="dismissReminder(this)">
                    <i class="fas fa-times"></i> Dismiss
                </button>
            </div>
        `;
        remindersList.appendChild(reminderDiv);
    });
}

function viewContract(contractId) {
    const contract = window.contractsData.find(c => c.id === contractId);
    if (!contract) return;
    
    // Populate contract details modal
    document.getElementById('contract-modal-title').textContent = contract.title;
    document.getElementById('contract-modal-id').textContent = contract.id;
    document.getElementById('contract-modal-status').innerHTML = `<span class="status-badge ${contract.status}">${contract.status}</span>`;
    
    // Contract details
    document.getElementById('detail-supplier').textContent = contract.supplier;
    document.getElementById('detail-type').textContent = contract.type;
    document.getElementById('detail-start-date').textContent = contract.startDate;
    document.getElementById('detail-end-date').textContent = contract.endDate;
    document.getElementById('detail-value').textContent = contract.value;
    document.getElementById('detail-payment-terms').textContent = contract.paymentTerms;
    document.getElementById('detail-last-modified').textContent = contract.lastModified;
    
    // Contract content
    document.getElementById('contract-preview-content').textContent = contract.content;
    
    // Contract history
    const historyContainer = document.getElementById('contract-history-timeline');
    historyContainer.innerHTML = '';
    
    contract.history.forEach(item => {
        const historyDiv = document.createElement('div');
        historyDiv.className = 'history-item';
        historyDiv.innerHTML = `
            <div class="history-item-header">
                <div class="history-item-title">${item.action}</div>
                <div class="history-item-date">${item.date}</div>
            </div>
            <div class="history-item-description">${item.description}</div>
        `;
        historyContainer.appendChild(historyDiv);
    });
    
    // Show modal
    document.getElementById('contract-details-modal').style.display = 'flex';
}

function closeContractModal() {
    document.getElementById('contract-details-modal').style.display = 'none';
}

function openUploadContractModal() {
    document.getElementById('upload-contract-modal').style.display = 'flex';
}

function closeUploadContractModal() {
    document.getElementById('upload-contract-modal').style.display = 'none';
    document.getElementById('upload-contract-form').reset();
}

function downloadContract(contractId) {
    const contract = window.contractsData.find(c => c.id === contractId);
    if (!contract) return;
    
    // Simulate PDF download
    alert(`Downloading contract: ${contract.title} (${contract.id})`);
    console.log(`Contract download initiated: ${contractId} at ${new Date().toISOString()}`);
}

function signContract(contractId) {
    const contract = window.contractsData.find(c => c.id === contractId);
    if (!contract) return;
    
    // Simulate digital signature process
    if (confirm(`Are you sure you want to digitally sign the contract: ${contract.title}?`)) {
        contract.status = 'active';
        contract.lastModified = new Date().toISOString().split('T')[0];
        contract.history.unshift({
            date: new Date().toISOString().split('T')[0],
            action: 'Contract Signed',
            description: 'Contract has been digitally signed and is now active.'
        });
        
        // Update displays
        loadContractsTable();
        updateContractStats();
        loadContractReminders();
        closeContractModal();
        
        alert('Contract signed successfully!');
        console.log(`Contract signed: ${contractId} at ${new Date().toISOString()}`);
    }
}

function refreshContracts() {
    loadContractsTable();
    updateContractStats();
    loadContractReminders();
    
    // Show refresh notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 9999;
    `;
    notification.textContent = 'Contracts refreshed successfully!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

function filterContracts() {
    loadContractsTable();
}

function dismissReminder(button) {
    const reminderItem = button.closest('.reminder-item');
    reminderItem.style.opacity = '0.5';
    reminderItem.style.pointerEvents = 'none';
    
    setTimeout(() => {
        reminderItem.remove();
    }, 500);
}

function submitUploadContractForm() {
    const form = document.getElementById('upload-contract-form');
    const formData = new FormData(form);
    
    // Basic validation
    const title = formData.get('contract_title');
    const supplier = formData.get('contract_supplier');
    const type = formData.get('contract_type');
    const startDate = formData.get('start_date');
    const endDate = formData.get('end_date');
    const value = formData.get('contract_value');
    
    if (!title || !supplier || !type || !startDate || !endDate || !value) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Generate new contract ID
    const newContractId = `CON-2024-${String(window.contractsData.length + 1).padStart(3, '0')}`;
    
    // Create new contract object
    const newContract = {
        id: newContractId,
        title: title,
        supplier: supplier,
        type: type,
        status: 'draft',
        startDate: startDate,
        endDate: endDate,
        value: `RM ${parseFloat(value).toLocaleString('en-MY', {minimumFractionDigits: 2})}`,
        paymentTerms: formData.get('payment_terms') || 'Net 30 days',
        lastModified: new Date().toISOString().split('T')[0],
        content: formData.get('special_terms') || 'Contract terms and conditions to be finalized.',
        history: [
            {
                date: new Date().toISOString().split('T')[0],
                action: 'Contract Created',
                description: 'Initial contract draft created and uploaded for review.'
            }
        ]
    };
    
    // Add to contracts data
    window.contractsData.unshift(newContract);
    
    // Update displays
    loadContractsTable();
    updateContractStats();
    loadContractReminders();
    
    // Close modal and reset form
    closeUploadContractModal();
    
    // Show success message
    alert(`Contract ${newContractId} has been uploaded successfully and is now in draft status.`);
    
    // Log activity
    console.log(`New contract uploaded: ${newContractId} at ${new Date().toISOString()}`);
}

// ===== COMMUNICATION TOOLS MODULE =====

/**
 * Initialize Communication Tools module with demo data and event listeners
 */
function initializeCommunicationTools() {
    // Initialize demo data for communication tools
    initializeCommunicationData();
    
    // Load initial content
    loadConversations();
    loadNotifications();
    loadSharedFiles();
    
    // Setup tab switching
    setupCommunicationTabs();
    
    // Setup message input enter key handler
    const messageInput = document.getElementById('message-input');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

/**
 * Initialize demo data for communication tools
 */
function initializeCommunicationData() {
    // Demo conversations data
    window.conversationsData = [
        {
            id: 'conv-001',
            participantName: 'Admin Support',
            participantRole: 'Administrator',
            lastMessage: 'Your order #ORD-2024-045 has been processed successfully.',
            lastMessageTime: '2024-01-15 14:30',
            unreadCount: 2,
            status: 'active',
            avatar: 'fas fa-user-shield'
        },
        {
            id: 'conv-002',
            participantName: 'Contract Manager',
            participantRole: 'Contract Department',
            lastMessage: 'Please review the updated contract terms.',
            lastMessageTime: '2024-01-15 11:45',
            unreadCount: 0,
            status: 'active',
            avatar: 'fas fa-file-contract'
        },
        {
            id: 'conv-003',
            participantName: 'Payment Support',
            participantRole: 'Finance Department',
            lastMessage: 'Invoice payment has been confirmed.',
            lastMessageTime: '2024-01-14 16:20',
            unreadCount: 1,
            status: 'active',
            avatar: 'fas fa-dollar-sign'
        }
    ];
    
    // Demo messages data
    window.messagesData = {
        'conv-001': [
            {
                id: 'msg-001',
                senderId: 'admin-001',
                senderName: 'Admin Support',
                content: 'Hello! How can I help you today?',
                timestamp: '2024-01-15 10:00',
                type: 'text',
                isOwn: false
            },
            {
                id: 'msg-002',
                senderId: 'supplier-001',
                senderName: 'You',
                content: 'I need help with order #ORD-2024-045',
                timestamp: '2024-01-15 10:05',
                type: 'text',
                isOwn: true
            },
            {
                id: 'msg-003',
                senderId: 'admin-001',
                senderName: 'Admin Support',
                content: 'Let me check the status of your order.',
                timestamp: '2024-01-15 10:10',
                type: 'text',
                isOwn: false
            },
            {
                id: 'msg-004',
                senderId: 'admin-001',
                senderName: 'Admin Support',
                content: 'Your order #ORD-2024-045 has been processed successfully.',
                timestamp: '2024-01-15 14:30',
                type: 'text',
                isOwn: false
            }
        ],
        'conv-002': [
            {
                id: 'msg-005',
                senderId: 'contract-001',
                senderName: 'Contract Manager',
                content: 'Please review the updated contract terms.',
                timestamp: '2024-01-15 11:45',
                type: 'text',
                isOwn: false
            }
        ],
        'conv-003': [
            {
                id: 'msg-006',
                senderId: 'finance-001',
                senderName: 'Payment Support',
                content: 'Invoice payment has been confirmed.',
                timestamp: '2024-01-14 16:20',
                type: 'text',
                isOwn: false
            }
        ]
    };
    
    // Demo notifications data
    window.notificationsData = [
        {
            id: 'notif-001',
            title: 'New Order Received',
            message: 'Order #ORD-2024-046 has been placed and requires your attention.',
            type: 'order',
            priority: 'high',
            timestamp: '2024-01-15 15:30',
            isRead: false,
            actionUrl: '#order-management'
        },
        {
            id: 'notif-002',
            title: 'Contract Expiring Soon',
            message: 'Contract #CON-2024-015 will expire in 7 days.',
            type: 'contract',
            priority: 'medium',
            timestamp: '2024-01-15 09:00',
            isRead: false,
            actionUrl: '#contract-management'
        },
        {
            id: 'notif-003',
            title: 'Payment Received',
            message: 'Payment for invoice #INV-2024-089 has been processed.',
            type: 'payment',
            priority: 'low',
            timestamp: '2024-01-14 14:15',
            isRead: true,
            actionUrl: '#order-management'
        },
        {
            id: 'notif-004',
            title: 'System Maintenance',
            message: 'Scheduled maintenance will occur on Jan 20, 2024 from 2:00 AM to 4:00 AM.',
            type: 'system',
            priority: 'medium',
            timestamp: '2024-01-13 10:00',
            isRead: true,
            actionUrl: null
        }
    ];
    
    // Demo shared files data
    window.sharedFilesData = [
        {
            id: 'file-001',
            name: 'Contract_Template_2024.pdf',
            type: 'pdf',
            size: '2.5 MB',
            uploadedBy: 'Contract Manager',
            uploadDate: '2024-01-10',
            category: 'contract',
            downloadCount: 15
        },
        {
            id: 'file-002',
            name: 'Product_Catalog_Q1.pdf',
            type: 'pdf',
            size: '8.7 MB',
            uploadedBy: 'Product Manager',
            uploadDate: '2024-01-08',
            category: 'product',
            downloadCount: 23
        },
        {
            id: 'file-003',
            name: 'Supplier_Guidelines.docx',
            type: 'docx',
            size: '1.2 MB',
            uploadedBy: 'Admin Support',
            uploadDate: '2024-01-05',
            category: 'guideline',
            downloadCount: 8
        },
        {
            id: 'file-004',
            name: 'Quality_Standards.jpg',
            type: 'jpg',
            size: '3.1 MB',
            uploadedBy: 'Quality Manager',
            uploadDate: '2024-01-03',
            category: 'quality',
            downloadCount: 12
        }
    ];
    
    // Demo support tickets data
    window.supportTicketsData = [
        {
            id: 'TKT-2024-001',
            title: 'Order Processing Issue',
            description: 'Unable to process order #ORD-2024-045 due to inventory mismatch.',
            category: 'order',
            priority: 'high',
            status: 'pending',
            createdDate: '2024-01-15',
            lastUpdate: '2024-01-15 14:30',
            assignedTo: 'Support Team',
            responses: [
                {
                    id: 'resp-001',
                    author: 'You',
                    content: 'Unable to process order #ORD-2024-045 due to inventory mismatch.',
                    timestamp: '2024-01-15 10:00',
                    isStaff: false
                }
            ]
        },
        {
            id: 'TKT-2024-002',
            title: 'Invoice Payment Inquiry',
            description: 'Need clarification on invoice #INV-2024-089 payment terms.',
            category: 'invoice',
            priority: 'medium',
            status: 'in_progress',
            createdDate: '2024-01-14',
            lastUpdate: '2024-01-14 16:45',
            assignedTo: 'Finance Team',
            responses: [
                {
                    id: 'resp-002',
                    author: 'You',
                    content: 'Need clarification on invoice #INV-2024-089 payment terms.',
                    timestamp: '2024-01-14 14:00',
                    isStaff: false
                },
                {
                    id: 'resp-003',
                    author: 'Finance Support',
                    content: 'We are reviewing your inquiry and will respond within 24 hours.',
                    timestamp: '2024-01-14 16:45',
                    isStaff: true
                }
            ]
        }
    ];
    
    // Set current active conversation
    window.currentConversationId = null;
}

/**
 * Setup communication tabs functionality
 */
function setupCommunicationTabs() {
    const tabButtons = document.querySelectorAll('.communication-tabs .tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchCommunicationTab(tabId);
        });
    });
}

/**
 * Switch between communication tabs
 */
function switchCommunicationTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.communication-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabId}-tab`).classList.add('active');
    
    // Load content based on tab
    switch(tabId) {
        case 'messages':
            loadConversations();
            break;
        case 'notifications':
            loadNotifications();
            break;
        case 'files':
            loadSharedFiles();
            break;
    }
}

/**
 * Load conversations list
 */
function loadConversations() {
    const conversationsList = document.getElementById('conversations-list');
    if (!conversationsList) return;
    
    conversationsList.innerHTML = '';
    
    window.conversationsData.forEach(conversation => {
        const conversationDiv = document.createElement('div');
        conversationDiv.className = 'conversation-item';
        conversationDiv.onclick = () => selectConversation(conversation.id);
        
        conversationDiv.innerHTML = `
            <div class="conversation-avatar">
                <i class="${conversation.avatar}"></i>
            </div>
            <div class="conversation-info">
                <div class="conversation-header">
                    <span class="participant-name">${conversation.participantName}</span>
                    <span class="conversation-time">${conversation.lastMessageTime.split(' ')[1]}</span>
                </div>
                <div class="conversation-preview">
                    <span class="participant-role">${conversation.participantRole}</span>
                </div>
                <div class="last-message">${conversation.lastMessage}</div>
                ${conversation.unreadCount > 0 ? `<div class="unread-badge">${conversation.unreadCount}</div>` : ''}
            </div>
        `;
        
        conversationsList.appendChild(conversationDiv);
    });
}

/**
 * Select and load a conversation
 */
function selectConversation(conversationId) {
    window.currentConversationId = conversationId;
    const conversation = window.conversationsData.find(c => c.id === conversationId);
    
    if (!conversation) return;
    
    // Update chat header
    document.getElementById('chat-title').textContent = conversation.participantName;
    
    // Mark conversation as read
    conversation.unreadCount = 0;
    
    // Load messages
    loadChatMessages(conversationId);
    
    // Update conversation list to show selection
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

/**
 * Load chat messages for a conversation
 */
function loadChatMessages(conversationId) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messages = window.messagesData[conversationId] || [];
    
    chatMessages.innerHTML = '';
    
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.isOwn ? 'sent' : 'received'}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${message.content}</div>
                <div class="message-time">${message.timestamp}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
    });
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Start a new conversation
 */
function startNewConversation() {
    const participantName = prompt('Enter participant name:');
    if (!participantName) return;
    
    const newConversationId = `conv-${Date.now()}`;
    const newConversation = {
        id: newConversationId,
        participantName: participantName,
        participantRole: 'External Contact',
        lastMessage: 'Conversation started',
        lastMessageTime: new Date().toISOString().slice(0, 16).replace('T', ' '),
        unreadCount: 0,
        status: 'active',
        avatar: 'fas fa-user'
    };
    
    window.conversationsData.unshift(newConversation);
    window.messagesData[newConversationId] = [];
    
    loadConversations();
    selectConversation(newConversationId);
}

/**
 * Send a message in the current conversation
 */
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    if (!messageInput || !window.currentConversationId) return;
    
    const messageText = messageInput.value.trim();
    if (!messageText) return;
    
    const newMessage = {
        id: `msg-${Date.now()}`,
        senderId: 'supplier-001',
        senderName: 'You',
        content: messageText,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        type: 'text',
        isOwn: true
    };
    
    // Add message to data
    if (!window.messagesData[window.currentConversationId]) {
        window.messagesData[window.currentConversationId] = [];
    }
    window.messagesData[window.currentConversationId].push(newMessage);
    
    // Update conversation last message
    const conversation = window.conversationsData.find(c => c.id === window.currentConversationId);
    if (conversation) {
        conversation.lastMessage = messageText;
        conversation.lastMessageTime = newMessage.timestamp;
    }
    
    // Clear input and reload
    messageInput.value = '';
    loadChatMessages(window.currentConversationId);
    loadConversations();
    
    // Simulate auto-reply after 2 seconds
    setTimeout(() => {
        simulateAutoReply();
    }, 2000);
}

/**
 * Simulate an automatic reply
 */
function simulateAutoReply() {
    if (!window.currentConversationId) return;
    
    const autoReplies = [
        'Thank you for your message. We will get back to you shortly.',
        'Your request has been received and is being processed.',
        'We appreciate your inquiry and will respond within 24 hours.',
        'Your message is important to us. A team member will contact you soon.'
    ];
    
    const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    
    const autoMessage = {
        id: `msg-${Date.now()}`,
        senderId: 'auto-reply',
        senderName: 'System',
        content: randomReply,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        type: 'text',
        isOwn: false
    };
    
    window.messagesData[window.currentConversationId].push(autoMessage);
    
    // Update conversation
    const conversation = window.conversationsData.find(c => c.id === window.currentConversationId);
    if (conversation) {
        conversation.lastMessage = randomReply;
        conversation.lastMessageTime = autoMessage.timestamp;
        conversation.unreadCount += 1;
    }
    
    loadChatMessages(window.currentConversationId);
    loadConversations();
}

/**
 * Load notifications list
 */
function loadNotifications() {
    const notificationsList = document.getElementById('notifications-list');
    if (!notificationsList) return;
    
    notificationsList.innerHTML = '';
    
    if (window.notificationsData.length === 0) {
        notificationsList.innerHTML = '<p style="text-align: center; color: #cccccc; padding: 20px;">No notifications at this time.</p>';
        return;
    }
    
    window.notificationsData.forEach(notification => {
        const notificationDiv = document.createElement('div');
        notificationDiv.className = `notification-item ${notification.priority} ${notification.isRead ? 'read' : 'unread'}`;
        
        const iconMap = {
            order: 'fas fa-shopping-cart',
            contract: 'fas fa-file-contract',
            payment: 'fas fa-dollar-sign',
            system: 'fas fa-cog'
        };
        
        notificationDiv.innerHTML = `
            <div class="notification-icon">
                <i class="${iconMap[notification.type] || 'fas fa-bell'}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-header">
                    <span class="notification-title">${notification.title}</span>
                    <span class="notification-time">${notification.timestamp}</span>
                </div>
                <div class="notification-message">${notification.message}</div>
                ${notification.actionUrl ? `<button class="btn btn-sm btn-primary" onclick="handleNotificationAction('${notification.actionUrl}')">View Details</button>` : ''}
            </div>
            <div class="notification-actions">
                <button class="btn btn-sm btn-secondary" onclick="markNotificationAsRead('${notification.id}')">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteNotification('${notification.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        notificationsList.appendChild(notificationDiv);
    });
}

/**
 * Mark all notifications as read
 */
function markAllAsRead() {
    window.notificationsData.forEach(notification => {
        notification.isRead = true;
    });
    
    loadNotifications();
    
    // Show success message
    showNotificationMessage('All notifications marked as read', 'success');
}

/**
 * Mark a specific notification as read
 */
function markNotificationAsRead(notificationId) {
    const notification = window.notificationsData.find(n => n.id === notificationId);
    if (notification) {
        notification.isRead = true;
        loadNotifications();
    }
}

/**
 * Delete a notification
 */
function deleteNotification(notificationId) {
    const index = window.notificationsData.findIndex(n => n.id === notificationId);
    if (index > -1) {
        window.notificationsData.splice(index, 1);
        loadNotifications();
    }
}

/**
 * Handle notification action clicks
 */
function handleNotificationAction(actionUrl) {
    if (actionUrl.startsWith('#')) {
        const moduleId = actionUrl.substring(1);
        switchToModule(moduleId);
    }
}

/**
 * Load shared files list
 */
function loadSharedFiles() {
    const filesGrid = document.getElementById('files-grid');
    if (!filesGrid) return;
    
    filesGrid.innerHTML = '';
    
    if (window.sharedFilesData.length === 0) {
        filesGrid.innerHTML = '<p style="text-align: center; color: #cccccc; padding: 20px;">No shared files available.</p>';
        return;
    }
    
    window.sharedFilesData.forEach(file => {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'file-item';
        
        const iconMap = {
            pdf: 'fas fa-file-pdf',
            docx: 'fas fa-file-word',
            xlsx: 'fas fa-file-excel',
            jpg: 'fas fa-file-image',
            png: 'fas fa-file-image',
            zip: 'fas fa-file-archive'
        };
        
        fileDiv.innerHTML = `
            <div class="file-icon">
                <i class="${iconMap[file.type] || 'fas fa-file'}"></i>
            </div>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-details">
                    <span class="file-size">${file.size}</span>
                    <span class="file-date">Uploaded: ${file.uploadDate}</span>
                </div>
                <div class="file-meta">
                    <span class="file-uploader">By: ${file.uploadedBy}</span>
                    <span class="file-downloads">${file.downloadCount} downloads</span>
                </div>
            </div>
            <div class="file-actions">
                <button class="btn btn-sm btn-primary" onclick="downloadFile('${file.id}')">
                    <i class="fas fa-download"></i> Download
                </button>
                <button class="btn btn-sm btn-secondary" onclick="shareFile('${file.id}')">
                    <i class="fas fa-share"></i> Share
                </button>
            </div>
        `;
        
        filesGrid.appendChild(fileDiv);
    });
}

/**
 * Upload a new file
 */
function uploadFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.jpg,.png,.zip';
    input.multiple = true;
    
    input.onchange = function(e) {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            // Simulate file upload
            const newFile = {
                id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: file.name,
                type: file.name.split('.').pop().toLowerCase(),
                size: formatFileSize(file.size),
                uploadedBy: 'You',
                uploadDate: new Date().toISOString().split('T')[0],
                category: 'general',
                downloadCount: 0
            };
            
            window.sharedFilesData.unshift(newFile);
        });
        
        loadSharedFiles();
        showNotificationMessage(`${files.length} file(s) uploaded successfully`, 'success');
    };
    
    input.click();
}

/**
 * Download a file
 */
function downloadFile(fileId) {
    const file = window.sharedFilesData.find(f => f.id === fileId);
    if (!file) return;
    
    // Increment download count
    file.downloadCount += 1;
    
    // Simulate file download
    showNotificationMessage(`Downloading ${file.name}...`, 'info');
    
    // Update display
    loadSharedFiles();
    
    console.log(`File download initiated: ${file.name} at ${new Date().toISOString()}`);
}

/**
 * Share a file
 */
function shareFile(fileId) {
    const file = window.sharedFilesData.find(f => f.id === fileId);
    if (!file) return;
    
    const shareUrl = `${window.location.origin}/shared-files/${fileId}`;
    
    // Copy to clipboard if available
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
            showNotificationMessage('Share link copied to clipboard', 'success');
        });
    } else {
        // Fallback for older browsers
        prompt('Copy this share link:', shareUrl);
    }
}

/**
 * Format file size for display
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Show notification message
 */
function showNotificationMessage(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        z-index: 9999;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== SUPPORT TICKET SYSTEM =====

/**
 * Initialize support ticket system
 */
function initializeSupportTickets() {
    loadSupportTickets();
    setupTicketFilters();
}

/**
 * Setup ticket filters
 */
function setupTicketFilters() {
    const statusFilter = document.getElementById('ticket-status-filter');
    const categoryFilter = document.getElementById('ticket-category-filter');
    const priorityFilter = document.getElementById('ticket-priority-filter');
    
    if (statusFilter) statusFilter.addEventListener('change', filterTickets);
    if (categoryFilter) categoryFilter.addEventListener('change', filterTickets);
    if (priorityFilter) priorityFilter.addEventListener('change', filterTickets);
}

/**
 * Load support tickets list
 */
function loadSupportTickets() {
    const ticketsList = document.getElementById('tickets-list');
    if (!ticketsList) return;
    
    ticketsList.innerHTML = '';
    
    if (window.supportTicketsData.length === 0) {
        ticketsList.innerHTML = '<p style="text-align: center; color: #cccccc; padding: 20px;">No support tickets found.</p>';
        return;
    }
    
    window.supportTicketsData.forEach(ticket => {
        const ticketDiv = document.createElement('div');
        ticketDiv.className = `ticket-item ${ticket.status}`;
        
        const statusColors = {
            pending: '#ffc107',
            in_progress: '#17a2b8',
            resolved: '#28a745',
            closed: '#6c757d'
        };
        
        const priorityColors = {
            low: '#28a745',
            medium: '#ffc107',
            high: '#dc3545'
        };
        
        ticketDiv.innerHTML = `
            <div class="ticket-header">
                <div class="ticket-id">${ticket.id}</div>
                <div class="ticket-status" style="background-color: ${statusColors[ticket.status]}">
                    ${ticket.status.replace('_', ' ').toUpperCase()}
                </div>
            </div>
            <div class="ticket-content">
                <h4 class="ticket-title">${ticket.title}</h4>
                <p class="ticket-description">${ticket.description}</p>
                <div class="ticket-meta">
                    <span class="ticket-category">
                        <i class="fas fa-tag"></i> ${ticket.category.toUpperCase()}
                    </span>
                    <span class="ticket-priority" style="color: ${priorityColors[ticket.priority]}">
                        <i class="fas fa-exclamation-circle"></i> ${ticket.priority.toUpperCase()}
                    </span>
                    <span class="ticket-date">
                        <i class="fas fa-calendar"></i> ${ticket.createdDate}
                    </span>
                    <span class="ticket-assigned">
                        <i class="fas fa-user"></i> ${ticket.assignedTo}
                    </span>
                </div>
            </div>
            <div class="ticket-actions">
                <button class="btn btn-sm btn-primary" onclick="viewTicketDetails('${ticket.id}')">
                    <i class="fas fa-eye"></i> View Details
                </button>
                <button class="btn btn-sm btn-secondary" onclick="addTicketResponse('${ticket.id}')">
                    <i class="fas fa-reply"></i> Add Response
                </button>
            </div>
        `;
        
        ticketsList.appendChild(ticketDiv);
    });
}

/**
 * Filter tickets based on selected criteria
 */
function filterTickets() {
    const statusFilter = document.getElementById('ticket-status-filter');
    const categoryFilter = document.getElementById('ticket-category-filter');
    const priorityFilter = document.getElementById('ticket-priority-filter');
    
    const statusValue = statusFilter ? statusFilter.value : '';
    const categoryValue = categoryFilter ? categoryFilter.value : '';
    const priorityValue = priorityFilter ? priorityFilter.value : '';
    
    const filteredTickets = window.supportTicketsData.filter(ticket => {
        const statusMatch = !statusValue || ticket.status === statusValue;
        const categoryMatch = !categoryValue || ticket.category === categoryValue;
        const priorityMatch = !priorityValue || ticket.priority === priorityValue;
        
        return statusMatch && categoryMatch && priorityMatch;
    });
    
    // Temporarily store original data and replace with filtered data
    const originalData = window.supportTicketsData;
    window.supportTicketsData = filteredTickets;
    loadSupportTickets();
    window.supportTicketsData = originalData;
}

/**
 * Create a new support ticket
 */
function createSupportTicket() {
    const modal = document.createElement('div');
    modal.className = 'modal fade show';
    modal.style.display = 'block';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create Support Ticket</h5>
                    <button type="button" class="btn-close" onclick="closeTicketModal()"></button>
                </div>
                <div class="modal-body">
                    <form id="create-ticket-form">
                        <div class="mb-3">
                            <label for="ticket-title" class="form-label">Title *</label>
                            <input type="text" class="form-control" id="ticket-title" required>
                        </div>
                        <div class="mb-3">
                            <label for="ticket-category" class="form-label">Category *</label>
                            <select class="form-control" id="ticket-category" required>
                                <option value="">Select Category</option>
                                <option value="order">Order Issues</option>
                                <option value="invoice">Invoice Issues</option>
                                <option value="account">Account Issues</option>
                                <option value="technical">Technical Support</option>
                                <option value="general">General Inquiry</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="ticket-priority" class="form-label">Priority *</label>
                            <select class="form-control" id="ticket-priority" required>
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="ticket-description" class="form-label">Description *</label>
                            <textarea class="form-control" id="ticket-description" rows="5" required placeholder="Please provide detailed information about your issue..."></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="ticket-attachment" class="form-label">Attachments (Optional)</label>
                            <input type="file" class="form-control" id="ticket-attachment" multiple accept=".pdf,.jpg,.png,.doc,.docx">
                            <small class="form-text text-muted">Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB each)</small>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeTicketModal()">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="submitTicket()">Create Ticket</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    window.currentTicketModal = modal;
}

/**
 * Submit a new support ticket
 */
function submitTicket() {
    const title = document.getElementById('ticket-title').value.trim();
    const category = document.getElementById('ticket-category').value;
    const priority = document.getElementById('ticket-priority').value;
    const description = document.getElementById('ticket-description').value.trim();
    const attachmentInput = document.getElementById('ticket-attachment');
    
    // Validation
    if (!title || !category || !priority || !description) {
        showNotificationMessage('Please fill in all required fields', 'error');
        return;
    }
    
    // Create new ticket
    const newTicket = {
        id: `TKT-2024-${String(window.supportTicketsData.length + 1).padStart(3, '0')}`,
        title: title,
        description: description,
        category: category,
        priority: priority,
        status: 'pending',
        createdDate: new Date().toISOString().split('T')[0],
        lastUpdate: new Date().toISOString().slice(0, 16).replace('T', ' '),
        assignedTo: 'Support Team',
        responses: [
            {
                id: `resp-${Date.now()}`,
                author: 'You',
                content: description,
                timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
                isStaff: false
            }
        ]
    };
    
    // Handle attachments
    if (attachmentInput.files.length > 0) {
        newTicket.attachments = Array.from(attachmentInput.files).map(file => ({
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type
        }));
    }
    
    // Add to tickets data
    window.supportTicketsData.unshift(newTicket);
    
    // Close modal and refresh
    closeTicketModal();
    loadSupportTickets();
    
    showNotificationMessage(`Support ticket ${newTicket.id} created successfully`, 'success');
}

/**
 * View ticket details
 */
function viewTicketDetails(ticketId) {
    const ticket = window.supportTicketsData.find(t => t.id === ticketId);
    if (!ticket) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal fade show';
    modal.style.display = 'block';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    
    const statusColors = {
        pending: '#ffc107',
        in_progress: '#17a2b8',
        resolved: '#28a745',
        closed: '#6c757d'
    };
    
    const responsesHtml = ticket.responses.map(response => `
        <div class="response-item ${response.isStaff ? 'staff-response' : 'user-response'}">
            <div class="response-header">
                <strong>${response.author}</strong>
                <span class="response-time">${response.timestamp}</span>
                ${response.isStaff ? '<span class="staff-badge">Staff</span>' : ''}
            </div>
            <div class="response-content">${response.content}</div>
        </div>
    `).join('');
    
    modal.innerHTML = `
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Ticket Details - ${ticket.id}</h5>
                    <button type="button" class="btn-close" onclick="closeTicketModal()"></button>
                </div>
                <div class="modal-body">
                    <div class="ticket-details-header">
                        <div class="row">
                            <div class="col-md-8">
                                <h4>${ticket.title}</h4>
                                <p class="text-muted">${ticket.description}</p>
                            </div>
                            <div class="col-md-4">
                                <div class="ticket-status-badge" style="background-color: ${statusColors[ticket.status]}">
                                    ${ticket.status.replace('_', ' ').toUpperCase()}
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-3">
                                <strong>Category:</strong><br>
                                <span class="badge bg-secondary">${ticket.category.toUpperCase()}</span>
                            </div>
                            <div class="col-md-3">
                                <strong>Priority:</strong><br>
                                <span class="badge bg-warning">${ticket.priority.toUpperCase()}</span>
                            </div>
                            <div class="col-md-3">
                                <strong>Created:</strong><br>
                                ${ticket.createdDate}
                            </div>
                            <div class="col-md-3">
                                <strong>Assigned To:</strong><br>
                                ${ticket.assignedTo}
                            </div>
                        </div>
                    </div>
                    
                    <hr>
                    
                    <div class="ticket-responses">
                        <h6>Conversation History</h6>
                        <div class="responses-container">
                            ${responsesHtml}
                        </div>
                    </div>
                    
                    ${ticket.status !== 'closed' ? `
                    <div class="add-response-section mt-4">
                        <h6>Add Response</h6>
                        <div class="mb-3">
                            <textarea class="form-control" id="new-response-text" rows="3" placeholder="Type your response here..."></textarea>
                        </div>
                        <button class="btn btn-primary" onclick="submitTicketResponse('${ticket.id}')">Add Response</button>
                    </div>
                    ` : ''}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeTicketModal()">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    window.currentTicketModal = modal;
}

/**
 * Add response to ticket
 */
function addTicketResponse(ticketId) {
    const responseText = prompt('Enter your response:');
    if (!responseText || !responseText.trim()) return;
    
    const ticket = window.supportTicketsData.find(t => t.id === ticketId);
    if (!ticket) return;
    
    const newResponse = {
        id: `resp-${Date.now()}`,
        author: 'You',
        content: responseText.trim(),
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        isStaff: false
    };
    
    ticket.responses.push(newResponse);
    ticket.lastUpdate = newResponse.timestamp;
    
    loadSupportTickets();
    showNotificationMessage('Response added successfully', 'success');
    
    // Simulate staff auto-reply after 3 seconds
    setTimeout(() => {
        simulateStaffReply(ticketId);
    }, 3000);
}

/**
 * Submit ticket response from modal
 */
function submitTicketResponse(ticketId) {
    const responseText = document.getElementById('new-response-text').value.trim();
    if (!responseText) {
        showNotificationMessage('Please enter a response', 'error');
        return;
    }
    
    const ticket = window.supportTicketsData.find(t => t.id === ticketId);
    if (!ticket) return;
    
    const newResponse = {
        id: `resp-${Date.now()}`,
        author: 'You',
        content: responseText,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        isStaff: false
    };
    
    ticket.responses.push(newResponse);
    ticket.lastUpdate = newResponse.timestamp;
    
    // Clear the textarea
    document.getElementById('new-response-text').value = '';
    
    // Refresh the modal content
    closeTicketModal();
    viewTicketDetails(ticketId);
    
    showNotificationMessage('Response added successfully', 'success');
    
    // Simulate staff auto-reply after 3 seconds
    setTimeout(() => {
        simulateStaffReply(ticketId);
    }, 3000);
}

/**
 * Simulate staff reply
 */
function simulateStaffReply(ticketId) {
    const ticket = window.supportTicketsData.find(t => t.id === ticketId);
    if (!ticket || ticket.status === 'closed') return;
    
    const staffReplies = [
        'Thank you for your response. We are reviewing your case and will update you shortly.',
        'We have received your additional information and are working on a solution.',
        'Our team is investigating this issue. We will provide an update within 24 hours.',
        'We appreciate your patience. A specialist has been assigned to your case.'
    ];
    
    const randomReply = staffReplies[Math.floor(Math.random() * staffReplies.length)];
    
    const staffResponse = {
        id: `resp-${Date.now()}`,
        author: 'Support Team',
        content: randomReply,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        isStaff: true
    };
    
    ticket.responses.push(staffResponse);
    ticket.lastUpdate = staffResponse.timestamp;
    
    // Update status to in_progress if it was pending
    if (ticket.status === 'pending') {
        ticket.status = 'in_progress';
    }
    
    loadSupportTickets();
    
    // If modal is open for this ticket, refresh it
    if (window.currentTicketModal) {
        closeTicketModal();
        viewTicketDetails(ticketId);
    }
}

/**
 * Close ticket modal
 */
function closeTicketModal() {
    if (window.currentTicketModal) {
        document.body.removeChild(window.currentTicketModal);
        window.currentTicketModal = null;
    }
}

// Initialize contract management when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add contract management initialization to existing DOMContentLoaded
    initializeContractManagement();
    
    // Initialize communication tools
    initializeCommunicationTools();
    
    // Add event listeners for contract filters
    const statusFilter = document.getElementById('contract-status-filter');
    const supplierFilter = document.getElementById('contract-supplier-filter');
    const searchInput = document.getElementById('contract-search');
    
    if (statusFilter) statusFilter.addEventListener('change', filterContracts);
    if (supplierFilter) supplierFilter.addEventListener('change', filterContracts);
    if (searchInput) searchInput.addEventListener('input', filterContracts);
});
