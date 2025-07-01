
// Demo data is now loaded from JSON files (demo-data-update.json or demo-data-default.json)

let currentChatEmployee = null;
let currentView = 'dashboard';

/**
* Initialize the HR Portal based on user session
*/
async function initializePortal() {
   const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
   
   if (!currentUser) {
         // Redirect to signin if no user session
         window.location.href = 'signin.html';
         return;
   }

   // Initialize demo data if not exists
   if (!localStorage.getItem('employees')) {
         try {
            const demoData = await loadDemoDataFromFile();
            localStorage.setItem('employees', JSON.stringify(demoData.employees));
            
            // Initialize other data if available
            if (demoData.chatMessages) {
               localStorage.setItem('chatMessages', JSON.stringify(demoData.chatMessages));
            }
            if (demoData.users) {
               localStorage.setItem('users', JSON.stringify(demoData.users));
            }
            if (demoData.systemSettings) {
               localStorage.setItem('systemSettings', JSON.stringify(demoData.systemSettings));
            }
         } catch (error) {
            console.error('Failed to load demo data:', error);
            // This should not happen as loadDemoDataFromFile has fallback
         }
   }

   // Update user info in header
   document.getElementById('userName').textContent = currentUser.name;
   document.getElementById('userAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
   document.getElementById('welcomeMessage').textContent = `Welcome back, ${currentUser.name}!`;

   // Show appropriate content based on user role
   if (currentUser.role === 'hr_admin') {
         document.getElementById('adminContent').style.display = 'block';
   } else if (currentUser.role === 'employee') {
         document.getElementById('employeeContent').style.display = 'block';
   } else {
         document.getElementById('accessDenied').style.display = 'block';
   }
}

/**
* Show Employee Management interface
*/
function showEmployeeManagement() {
   currentView = 'employee-management';
   hideAllContent();
   document.getElementById('featureContent').style.display = 'block';
   
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   
   const content = `
         <h2>Employee Management</h2>
         <p>Manage employee records, approve leave requests, and communicate with staff.</p>
         
         <div class="employee-list">
            ${employees.map(emp => `
               <div class="employee-item">
                     <div class="employee-info">
                        <div class="employee-avatar">${emp.name.charAt(0)}</div>
                        <div class="employee-details">
                           <h4>${emp.name}</h4>
                           <p>${emp.position}</p>
                           <span class="status-badge status-${emp.status}">${emp.status.toUpperCase()}</span>
                        </div>
                     </div>
                     <div class="employee-actions">
                        ${emp.leaveRequests.length > 0 ? 
                           `<button class="action-btn" onclick="viewLeaveDetails(${emp.id})">View Leave Details</button>` : 
                           '<span style="color: #666; font-size: 0.8rem;">No leave requests</span>'
                        }
                        ${emp.leaveRequests.filter(req => req.status === 'pending').length > 0 ? 
                           `<button class="action-btn approve" onclick="approveLeave(${emp.id})">Approve Leave</button>
                              <button class="action-btn reject" onclick="rejectLeave(${emp.id})">Reject Leave</button>` : 
                           ''
                        }
                        <button class="action-btn chat" onclick="openHRChat(${emp.id})">Chat</button>
                     </div>
               </div>
            `).join('')}
         </div>
   `;
   
   document.getElementById('featureContentBody').innerHTML = content;
}

/**
* Show Performance Management interface
*/
function showPerformanceManagement() {
   currentView = 'performance-management';
   hideAllContent();
   document.getElementById('featureContent').style.display = 'block';
   
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   
   const content = `
         <h2>Performance & Attendance Management</h2>
         <p>Monitor employee performance, attendance, and detailed clock-in records.</p>
         
         <div class="attendance-overview">
            <h3>Monthly Overview - January 2024</h3>
            <div class="overview-stats">
               <div class="stat-card">
                     <h4>Total Employees</h4>
                     <span class="stat-number">${employees.length}</span>
               </div>
               <div class="stat-card">
                     <h4>Average Attendance</h4>
                     <span class="stat-number">${calculateAverageAttendance(employees)}%</span>
               </div>
               <div class="stat-card">
                     <h4>On-Time Rate</h4>
                     <span class="stat-number">${calculatePunctualityRate(employees)}%</span>
               </div>
            </div>
         </div>
         
         <div class="employee-attendance-grid">
            ${employees.map(emp => `
               <div class="employee-attendance-card">
                     <div class="employee-header">
                        <h4>${emp.name}</h4>
                        <span class="position">${emp.position}</span>
                     </div>
                     
                     <div class="monthly-summary">
                        ${emp.attendance ? `
                           <div class="summary-row">
                                 <span>Present Days:</span>
                                 <span class="value">${emp.attendance.monthlyStats['2024-01']?.presentDays || 0}/${emp.attendance.monthlyStats['2024-01']?.totalWorkDays || 22}</span>
                           </div>
                           <div class="summary-row">
                                 <span>Late Days:</span>
                                 <span class="value late">${emp.attendance.monthlyStats['2024-01']?.lateDays || 0}</span>
                           </div>
                           <div class="summary-row">
                                 <span>Early Leave:</span>
                                 <span class="value early">${emp.attendance.monthlyStats['2024-01']?.earlyLeaveDays || 0}</span>
                           </div>
                           <div class="summary-row">
                                 <span>Absent Days:</span>
                                 <span class="value absent">${emp.attendance.monthlyStats['2024-01']?.absentDays || 0}</span>
                           </div>
                           <div class="summary-row">
                                 <span>Total Hours:</span>
                                 <span class="value">${emp.attendance.monthlyStats['2024-01']?.totalWorkHours || 0}h</span>
                           </div>
                        ` : `
                           <div class="no-data">No attendance data available</div>
                        `}
                     </div>
                     
                     <button class="view-details-btn" onclick="showAttendanceDetails(${emp.id})">
                        View Daily Records
                     </button>
               </div>
            `).join('')}
         </div>
   `;
   
   document.getElementById('featureContentBody').innerHTML = content;
}

/**
* Calculate average attendance rate across all employees
*/
function calculateAverageAttendance(employees) {
   if (!employees.length) return 0;
   
   let totalAttendance = 0;
   let employeesWithData = 0;
   
   employees.forEach(emp => {
         if (emp.attendance && emp.attendance.monthlyStats['2024-01']) {
            const stats = emp.attendance.monthlyStats['2024-01'];
            const rate = (stats.presentDays / stats.totalWorkDays) * 100;
            totalAttendance += rate;
            employeesWithData++;
         }
   });
   
   return employeesWithData > 0 ? Math.round(totalAttendance / employeesWithData) : 0;
}

/**
* Calculate punctuality rate across all employees
*/
function calculatePunctualityRate(employees) {
   if (!employees.length) return 0;
   
   let totalOnTime = 0;
   let totalPresent = 0;
   
   employees.forEach(emp => {
         if (emp.attendance && emp.attendance.monthlyStats['2024-01']) {
            const stats = emp.attendance.monthlyStats['2024-01'];
            totalPresent += stats.presentDays;
            totalOnTime += (stats.presentDays - stats.lateDays);
         }
   });
   
   return totalPresent > 0 ? Math.round((totalOnTime / totalPresent) * 100) : 0;
}

/**
* Show detailed attendance records for a specific employee
*/
function showAttendanceDetails(employeeId) {
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   const employee = employees.find(emp => emp.id === employeeId);
   
   if (!employee || !employee.attendance) {
         alert('No attendance data available for this employee.');
         return;
   }
   
   const modal = document.getElementById('attendanceDetailsModal') || createAttendanceModal();
   const modalBody = modal.querySelector('.attendance-modal-body');
   
   modalBody.innerHTML = `
         <h3>${employee.name} - Daily Attendance Records</h3>
         <div class="attendance-filter">
            <label>Filter by Status:</label>
            <select id="statusFilter" onchange="filterAttendanceRecords(${employeeId})">
               <option value="all">All Records</option>
               <option value="normal">Normal</option>
               <option value="late">Late</option>
               <option value="early_leave">Early Leave</option>
               <option value="absent">Absent</option>
            </select>
         </div>
         
         <div class="attendance-records" id="attendanceRecords">
            ${renderAttendanceRecords(employee.attendance.dailyRecords)}
         </div>
   `;
   
   modal.style.display = 'flex';
}

/**
* Create attendance details modal
*/
function createAttendanceModal() {
   const modal = document.createElement('div');
   modal.id = 'attendanceDetailsModal';
   modal.className = 'modal';
   modal.innerHTML = `
         <div class="modal-content attendance-modal">
            <div class="modal-header">
               <span class="close" onclick="closeAttendanceDetails()">&times;</span>
            </div>
            <div class="attendance-modal-body"></div>
         </div>
   `;
   document.body.appendChild(modal);
   return modal;
}

/**
* Render attendance records table
*/
function renderAttendanceRecords(records, filter = 'all') {
   const filteredRecords = filter === 'all' ? records : records.filter(record => record.status === filter);
   
   if (!filteredRecords.length) {
         return '<div class="no-records">No records found for the selected filter.</div>';
   }
   
   return `
         <table class="attendance-table">
            <thead>
               <tr>
                     <th>Date</th>
                     <th>Clock In</th>
                     <th>Lunch Out</th>
                     <th>Lunch In</th>
                     <th>Clock Out</th>
                     <th>Work Hours</th>
                     <th>Status</th>
               </tr>
            </thead>
            <tbody>
               ${filteredRecords.map(record => `
                     <tr class="record-${record.status}">
                        <td>${formatDate(record.date)}</td>
                        <td>${record.clockIn || '-'}</td>
                        <td>${record.lunchOut || '-'}</td>
                        <td>${record.lunchIn || '-'}</td>
                        <td>${record.clockOut || '-'}</td>
                        <td>${record.workHours || 0}h</td>
                        <td><span class="status-badge status-${record.status}">${getStatusText(record.status)}</span></td>
                     </tr>
               `).join('')}
            </tbody>
         </table>
   `;
}

/**
* Filter attendance records by status
*/
function filterAttendanceRecords(employeeId) {
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   const employee = employees.find(emp => emp.id === employeeId);
   const filter = document.getElementById('statusFilter').value;
   
   if (employee && employee.attendance) {
         document.getElementById('attendanceRecords').innerHTML = 
            renderAttendanceRecords(employee.attendance.dailyRecords, filter);
   }
}

/**
* Get status text for display
*/
function getStatusText(status) {
   const statusMap = {
         'normal': 'Normal',
         'late': 'Late',
         'early_leave': 'Early Leave',
         'absent': 'Absent'
   };
   return statusMap[status] || status;
}

/**
* Close attendance details modal
*/
function closeAttendanceDetails() {
   const modal = document.getElementById('attendanceDetailsModal');
   if (modal) {
         modal.style.display = 'none';
   }
}

/**
* Show Employee Profile (for employee users)
*/
function showEmployeeProfile() {
   currentView = 'employee-profile';
   hideAllContent();
   document.getElementById('featureContent').style.display = 'block';
   
   const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   
   // Find employee by employeeId if available, otherwise fall back to name matching
   let employee;
   if (currentUser.employeeId) {
         employee = employees.find(emp => emp.id === currentUser.employeeId);
   } else {
         employee = employees.find(emp => emp.name.toLowerCase() === currentUser.name.toLowerCase());
   }
   
   if (!employee) {
         document.getElementById('featureContentBody').innerHTML = '<p>Employee profile not found.</p>';
         return;
   }
   
   const content = `
         <h2>My Profile</h2>
         <div class="employee-item">
            <div class="employee-info">
               <div class="employee-avatar">${employee.name.charAt(0)}</div>
               <div class="employee-details">
                     <h4>${employee.name}</h4>
                     <p>${employee.position}</p>
                     <p>Email: ${employee.email}</p>
                     <p>Phone: ${employee.phone}</p>
                     <span class="status-badge status-${employee.status}">${employee.status.toUpperCase()}</span>
               </div>
            </div>
         </div>
         
         <h3>Performance Summary</h3>
         <div class="performance-card">
            <div class="performance-metric">
               <span>Attendance Rate:</span>
               <span>${employee.performance.attendance}</span>
            </div>
            <div class="performance-metric">
               <span>Punctuality:</span>
               <span>${employee.performance.punctuality}</span>
            </div>
            <div class="performance-metric">
               <span>Tasks Completed:</span>
               <span>${employee.performance.tasksCompleted}</span>
            </div>
            <div class="performance-metric">
               <span>Customer Rating:</span>
               <span>${employee.performance.customerRating}/5.0</span>
            </div>
         </div>
   `;
   
   document.getElementById('featureContentBody').innerHTML = content;
}

/**
* Show Leave Requests (for employee users)
*/
function showLeaveRequests() {
   currentView = 'leave-requests';
   hideAllContent();
   document.getElementById('featureContent').style.display = 'block';
   
   const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   
   // Find employee by employeeId if available, otherwise fall back to name matching
   let employee;
   if (currentUser.employeeId) {
         employee = employees.find(emp => emp.id === currentUser.employeeId);
   } else {
         employee = employees.find(emp => emp.name.toLowerCase() === currentUser.name.toLowerCase());
   }
   
   if (!employee) {
         document.getElementById('featureContentBody').innerHTML = '<p>Employee profile not found.</p>';
         return;
   }
   
   const content = `
         <h2>Leave Requests</h2>
         
         <h3>Submit New Leave Request</h3>
         <div class="leave-request-form">
            <div class="form-group">
               <label for="leaveType">Leave Type:</label>
               <select id="leaveType">
                     <option value="Annual Leave">Annual Leave</option>
                     <option value="Medical Leave">Medical Leave</option>
                     <option value="Unpaid Leave">Unpaid Leave</option>
               </select>
            </div>
            <div class="form-group">
               <label for="startDate">Start Date:</label>
               <input type="date" id="startDate">
            </div>
            <div class="form-group">
               <label for="endDate">End Date:</label>
               <input type="date" id="endDate">
            </div>
            <div class="form-group">
               <label for="reason">Reason:</label>
               <textarea id="reason" placeholder="Please provide a reason for your leave request..."></textarea>
            </div>
            <button class="submit-btn" onclick="submitLeaveRequest()">Submit Request</button>
         </div>
         
         <h3>Leave History</h3>
         <div class="employee-list">
            ${employee.leaveRequests.map(req => `
               <div class="employee-item">
                     <div class="employee-info">
                        <div class="employee-details">
                           <h4>${req.type}</h4>
                           <p>${req.startDate} to ${req.endDate}</p>
                           <p>Reason: ${req.reason}</p>
                        </div>
                     </div>
                     <div class="employee-actions">
                        <span class="status-badge status-${req.status === 'approved' ? 'active' : req.status === 'pending' ? 'leave' : 'medical'}">
                           ${req.status.toUpperCase()}
                        </span>
                     </div>
               </div>
            `).join('')}
         </div>
   `;
   
   document.getElementById('featureContentBody').innerHTML = content;
}

/**
* Show Payslips (for employee users)
*/
function showPayslips() {
   currentView = 'payslips';
   hideAllContent();
   document.getElementById('featureContent').style.display = 'block';
   
   const content = `
         <h2>Payslips</h2>
         <p>Download and view your salary information.</p>
         
         <div class="employee-list">
            <div class="employee-item">
               <div class="employee-info">
                     <div class="employee-details">
                        <h4>January 2024 Payslip</h4>
                        <p>Gross Salary: $3,500</p>
                        <p>Net Salary: $2,800</p>
                     </div>
               </div>
               <div class="employee-actions">
                     <button class="action-btn" onclick="downloadPayslip('2024-01')">Download PDF</button>
               </div>
            </div>
            <div class="employee-item">
               <div class="employee-info">
                     <div class="employee-details">
                        <h4>December 2023 Payslip</h4>
                        <p>Gross Salary: $3,500</p>
                        <p>Net Salary: $2,800</p>
                     </div>
               </div>
               <div class="employee-actions">
                     <button class="action-btn" onclick="downloadPayslip('2023-12')">Download PDF</button>
               </div>
            </div>
         </div>
   `;
   
   document.getElementById('featureContentBody').innerHTML = content;
}

/**
* Submit leave request
*/
function submitLeaveRequest() {
   const leaveType = document.getElementById('leaveType').value;
   const startDate = document.getElementById('startDate').value;
   const endDate = document.getElementById('endDate').value;
   const reason = document.getElementById('reason').value;
   
   if (!startDate || !endDate || !reason) {
         alert('Please fill in all fields.');
         return;
   }
   
   const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   
   // Find employee by employeeId if available, otherwise fall back to name matching
   let employeeIndex;
   if (currentUser.employeeId) {
         employeeIndex = employees.findIndex(emp => emp.id === currentUser.employeeId);
   } else {
         employeeIndex = employees.findIndex(emp => emp.name.toLowerCase() === currentUser.name.toLowerCase());
   }
   
   if (employeeIndex !== -1) {
         employees[employeeIndex].leaveRequests.push({
            type: leaveType,
            startDate: startDate,
            endDate: endDate,
            status: 'pending',
            reason: reason
         });
         
         localStorage.setItem('employees', JSON.stringify(employees));
         saveDataToUpdate(); // Save changes to update database
         alert('Leave request submitted successfully!');
         showLeaveRequests(); // Refresh the view
   }
}

/**
* Approve leave request
*/
function approveLeave(employeeId, requestIndex) {
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   const employee = employees.find(emp => emp.id === employeeId || emp.employeeId === employeeId);
   
   if (employee && employee.leaveRequests && employee.leaveRequests.length > 0) {
         // If requestIndex is not provided, approve the first pending request
         if (requestIndex === undefined) {
            const pendingRequestIndex = employee.leaveRequests.findIndex(req => req.status === 'pending');
            if (pendingRequestIndex !== -1) {
               employee.leaveRequests[pendingRequestIndex].status = 'approved';
            localStorage.setItem('employees', JSON.stringify(employees));
            saveDataToUpdate(); // Save changes to update file
            showEmployeeManagement(); // Refresh the view
            alert('Leave request approved successfully!');
            return;
            }
         } else if (employee.leaveRequests[requestIndex]) {
            employee.leaveRequests[requestIndex].status = 'approved';
         localStorage.setItem('employees', JSON.stringify(employees));
         saveDataToUpdate(); // Save changes to update file
         showLeaveRequests();
         alert('Leave request approved successfully!');
         return;
         }
   }
   
   console.error('Employee or leave request not found:', employeeId, requestIndex);
   alert('Error: Could not find the leave request to approve.');
}

/**
* Reject leave request
*/
function rejectLeave(employeeId, requestIndex) {
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   const employee = employees.find(emp => emp.id === employeeId || emp.employeeId === employeeId);
   
   if (employee && employee.leaveRequests && employee.leaveRequests.length > 0) {
         // If requestIndex is not provided, reject the first pending request
         if (requestIndex === undefined) {
            const pendingRequestIndex = employee.leaveRequests.findIndex(req => req.status === 'pending');
            if (pendingRequestIndex !== -1) {
               employee.leaveRequests[pendingRequestIndex].status = 'rejected';
            localStorage.setItem('employees', JSON.stringify(employees));
            saveDataToUpdate(); // Save changes to update file
            showEmployeeManagement(); // Refresh the view
            alert('Leave request rejected.');
            return;
            }
         } else if (employee.leaveRequests[requestIndex]) {
            employee.leaveRequests[requestIndex].status = 'rejected';
         localStorage.setItem('employees', JSON.stringify(employees));
         saveDataToUpdate(); // Save changes to update file
         showLeaveRequests();
         alert('Leave request rejected.');
         return;
         }
   }
   
   console.error('Employee or leave request not found:', employeeId, requestIndex);
   alert('Error: Could not find the leave request to reject.');
}

/**
* View leave details for an employee
*/
function viewLeaveDetails(employeeId) {
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   const employee = employees.find(emp => emp.id === employeeId || emp.employeeId === employeeId);
   
   if (!employee) {
         alert('Employee not found.');
         return;
   }
   
   document.getElementById('leaveDetailsTitle').textContent = `Leave Requests - ${employee.name}`;
   
   if (!employee.leaveRequests || employee.leaveRequests.length === 0) {
         document.getElementById('leaveDetailsBody').innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
               <p>No leave requests found for this employee.</p>
            </div>
         `;
   } else {
         const leaveRequestsHtml = employee.leaveRequests.map((request, index) => {
            const startDate = new Date(request.startDate);
            const endDate = new Date(request.endDate);
            const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
            
            return `
               <div class="leave-request-item ${request.status}">
                     <div class="leave-request-header">
                        <div class="leave-type">${request.type}</div>
                        <div class="leave-status ${request.status}">${request.status}</div>
                     </div>
                     
                     <div class="leave-details-grid">
                        <div class="leave-detail-item">
                           <div class="leave-detail-label">Start Date</div>
                           <div class="leave-detail-value">${formatDate(request.startDate)}</div>
                        </div>
                        <div class="leave-detail-item">
                           <div class="leave-detail-label">End Date</div>
                           <div class="leave-detail-value">${formatDate(request.endDate)}</div>
                        </div>
                        <div class="leave-detail-item">
                           <div class="leave-detail-label">Duration</div>
                           <div class="leave-detail-value">${daysDiff} day${daysDiff > 1 ? 's' : ''}</div>
                        </div>
                        <div class="leave-detail-item">
                           <div class="leave-detail-label">Status</div>
                           <div class="leave-detail-value">
                                 <span class="leave-status ${request.status}">${request.status.toUpperCase()}</span>
                           </div>
                        </div>
                     </div>
                     
                     ${request.reason ? `
                        <div class="leave-reason">
                           <div class="leave-detail-label">Reason</div>
                           <div class="leave-reason-text">${request.reason}</div>
                        </div>
                     ` : ''}
                     
                     ${request.status === 'pending' ? `
                        <div class="leave-actions">
                           <button class="leave-action-btn approve" onclick="approveLeaveFromDetails(${employeeId}, ${index})">Approve</button>
                           <button class="leave-action-btn reject" onclick="rejectLeaveFromDetails(${employeeId}, ${index})">Reject</button>
                        </div>
                     ` : ''}
               </div>
            `;
         }).join('');
         
         document.getElementById('leaveDetailsBody').innerHTML = leaveRequestsHtml;
   }
   
   document.getElementById('leaveDetailsModal').style.display = 'flex';
}

/**
* Close leave details modal
*/
function closeLeaveDetails() {
   document.getElementById('leaveDetailsModal').style.display = 'none';
}

/**
* Approve leave from details modal
*/
function approveLeaveFromDetails(employeeId, requestIndex) {
   approveLeave(employeeId, requestIndex);
   viewLeaveDetails(employeeId); // Refresh the modal
}

/**
* Reject leave from details modal
*/
function rejectLeaveFromDetails(employeeId, requestIndex) {
   rejectLeave(employeeId, requestIndex);
   viewLeaveDetails(employeeId); // Refresh the modal
}

/**
* Format date for display
*/
function formatDate(dateString) {
   const date = new Date(dateString);
   const options = { 
         year: 'numeric', 
         month: 'long', 
         day: 'numeric',
         weekday: 'long'
   };
   return date.toLocaleDateString('en-US', options);
}

/**
* Download payslip (demo function)
*/
function downloadPayslip(period) {
   alert(`Downloading payslip for ${period}...\n\nThis is a demo function. In a real application, this would generate and download a PDF payslip.`);
}

/**
* Open HR chat (for HR to chat with employee)
*/
function openHRChat(employeeId) {
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   const employee = employees.find(emp => emp.id === employeeId || emp.employeeId === employeeId);
   
   if (employee) {
         currentChatEmployee = employee;
         document.getElementById('chatTitle').textContent = `Chat with ${employee.name}`;
         // Use unified chat ID format with actual employee ID
         const actualEmployeeId = employee.id || employee.employeeId;
         const chatId = `chat_${actualEmployeeId}`;
         document.getElementById('chatContainer').style.display = 'block';
         document.getElementById('chatContainer').dataset.chatId = chatId;
         loadChatMessages(chatId);
   } else {
         console.error('Employee not found:', employeeId);
         alert('Error: Could not find employee to chat with.');
   }
}

/**
* Open employee chat (for employee to chat with HR)
*/
function openEmployeeChat() {
   const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
   if (!currentUser) return;
   
   // Find employee data to get employee ID
   const employees = JSON.parse(localStorage.getItem('employees')) || [];
   const employee = employees.find(emp => 
         emp.id === currentUser.employeeId || 
         emp.employeeId === currentUser.employeeId ||
         emp.name.toLowerCase().replace(' ', '') === currentUser.username
   );
   
   if (employee) {
         currentChatEmployee = {
            id: employee.id || employee.employeeId,
            name: 'HR Department'
         };
         
         document.getElementById('chatTitle').textContent = 'Chat with HR';
         
         // Use unified chat ID format
         const actualEmployeeId = employee.id || employee.employeeId;
         const chatId = `chat_${actualEmployeeId}`;
         document.getElementById('chatContainer').style.display = 'block';
         document.getElementById('chatContainer').dataset.chatId = chatId;
         loadChatMessages(chatId);
   } else {
         console.error('Employee not found for current user:', currentUser);
         alert('Error: Could not find your employee record to start chat.');
   }
}

/**
* Load chat messages
*/
function loadChatMessages(chatId) {
   const messages = JSON.parse(localStorage.getItem(chatId) || '[]');
   const chatMessages = document.getElementById('chatMessages');
   const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
   
   chatMessages.innerHTML = messages.map(msg => {
         let messageClass = 'received';
         
         // HR messages always on the left (received), Employee messages always on the right (sent)
         if (msg.sender === 'hr') {
            messageClass = 'received'; // HR messages on the left
         } else if (msg.sender === 'current') {
            // Determine if current sender is HR or Employee
            if (currentUser.role === 'hr_admin') {
               messageClass = 'received'; // HR admin messages on the left
            } else {
               messageClass = 'sent'; // Employee messages on the right
            }
         } else {
            // For other senders (employees), messages go on the right
            messageClass = 'sent';
         }
         
         return `
            <div class="message ${messageClass}">
               <div>${msg.text}</div>
               <div class="message-time">${new Date(msg.timestamp).toLocaleString()}</div>
            </div>
         `;
   }).join('');
   
   chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
* Send chat message
*/
function sendMessage() {
   const input = document.getElementById('chatInput');
   const message = input.value.trim();
   
   if (!message) return;
   
   const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
   let chatId;
   
   if (currentUser.role === 'hr_admin' && currentChatEmployee) {
         chatId = `chat_${currentChatEmployee.id}`;
   } else {
         // For employees, use their employeeId if available
         if (currentUser.employeeId) {
            chatId = `chat_${currentUser.employeeId}`;
         } else {
            // Fallback: find their employee ID by name
            const employees = JSON.parse(localStorage.getItem('employees')) || [];
            const employee = employees.find(emp => emp.name.toLowerCase().replace(' ', '') === currentUser.username);
            chatId = employee ? `chat_${employee.id}` : `chat_${currentUser.username}`;
         }
   }
   
   const messages = JSON.parse(localStorage.getItem(chatId) || '[]');
   messages.push({
         text: message,
         sender: currentUser.role === 'hr_admin' ? 'hr' : currentUser.name,
         timestamp: new Date().toISOString()
   });
   
   localStorage.setItem(chatId, JSON.stringify(messages));
   saveDataToUpdate(); // Save changes to update file
   input.value = '';
   loadChatMessages(chatId);
}

/**
* Handle chat input key press
*/
function handleChatKeyPress(event) {
   if (event.key === 'Enter') {
         sendMessage();
   }
}

/**
* Close chat
*/
function closeChat() {
   document.getElementById('chatContainer').style.display = 'none';
   currentChatEmployee = null;
}

/**
* Hide all content areas
*/
function hideAllContent() {
   document.getElementById('adminContent').style.display = 'none';
   document.getElementById('employeeContent').style.display = 'none';
   document.getElementById('featureContent').style.display = 'none';
   document.getElementById('accessDenied').style.display = 'none';
   // <!--!!Important --> Hide payroll content to prevent display issues when switching views
   document.getElementById('payrollContent').style.display = 'none';
}

/**
* Go back to dashboard
*/
function goBackToDashboard() {
   const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
   hideAllContent();
   
   if (currentUser.role === 'hr_admin') {
         document.getElementById('adminContent').style.display = 'block';
   } else if (currentUser.role === 'employee') {
         document.getElementById('employeeContent').style.display = 'block';
   }
   
   currentView = 'dashboard';
}

/**
* Show Payroll System
*/
function showPayrollSystem() {
   hideAllContent();
   document.getElementById('payrollContent').style.display = 'block';
   currentView = 'payroll';
   
   // Initialize payroll data
   initializePayrollSystem();
}

/**
* Initialize Payroll System with employee data
*/
function initializePayrollSystem() {
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   
   // Update overview statistics
   updatePayrollOverview(employees);
   
   // Populate salary table
   populateSalaryTable(employees);
   
   // Populate employee dropdown for raises
   populateEmployeeDropdown(employees);
   
   // Set default effective date to today
   document.getElementById('effectiveDate').value = new Date().toISOString().split('T')[0];
   
   // Set default report period to current month
   const now = new Date();
   const currentMonth = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
   document.getElementById('reportPeriod').value = currentMonth;
}

/**
* Update payroll overview statistics
* @param {Array} employees - Array of employee objects
*/
function updatePayrollOverview(employees) {
   let totalPayroll = 0;
   let employeeCount = 0;
   let currency = 'SGD'; // Default currency
   
   employees.forEach(emp => {
         if (emp.payroll && emp.payroll.baseSalary) {
            totalPayroll += emp.payroll.baseSalary;
            employeeCount++;
            // Use the first employee's currency as the display currency
            if (emp.payroll.currency) {
               currency = emp.payroll.currency;
            }
         }
   });
   
   const averageSalary = employeeCount > 0 ? totalPayroll / employeeCount : 0;
   
   document.getElementById('totalPayroll').textContent = `${currency} $${totalPayroll.toLocaleString()}`;
   document.getElementById('averageSalary').textContent = `${currency} $${averageSalary.toLocaleString()}`;
   document.getElementById('totalEmployees').textContent = employeeCount;
   document.getElementById('pendingPayments').textContent = '0'; // Placeholder
}

/**
* Populate salary table with employee data
* @param {Array} employees - Array of employee objects
*/
function populateSalaryTable(employees) {
   const tableBody = document.getElementById('salaryTableBody');
   tableBody.innerHTML = '';
   
   employees.forEach(emp => {
         if (emp.payroll) {
            const row = document.createElement('tr');
            
            const baseSalary = emp.payroll.baseSalary || 0;
            const currency = emp.payroll.currency || 'SGD';
            const paymentFrequency = emp.payroll.paymentFrequency || 'monthly';
            const allowances = emp.payroll.allowances ? 
               Object.values(emp.payroll.allowances).reduce((sum, val) => sum + val, 0) : 0;
            const deductions = emp.payroll.deductions ? 
               Object.values(emp.payroll.deductions).reduce((sum, val) => sum + val, 0) : 0;
            const netSalary = baseSalary + allowances - deductions;
            
            row.innerHTML = `
               <td>${emp.name}</td>
               <td>${emp.position}</td>
               <td class="salary-amount">${currency} $${baseSalary.toLocaleString()} (${paymentFrequency})</td>
               <td>${currency} $${allowances.toLocaleString()}</td>
               <td>${currency} $${deductions.toLocaleString()}</td>
               <td class="salary-amount">${currency} $${netSalary.toLocaleString()}</td>
               <td>
                     <div class="payroll-actions">
                        <button class="payroll-btn primary" onclick="viewEmployeeSalaryDetails('${emp.id}')">View Details</button>
                        <button class="payroll-btn warning" onclick="editEmployeeSalary('${emp.id}')">Edit</button>
                     </div>
               </td>
            `;
            
            tableBody.appendChild(row);
         }
   });
}

/**
* Populate employee dropdown for salary adjustments
* @param {Array} employees - Array of employee objects
*/
function populateEmployeeDropdown(employees) {
   const dropdown = document.getElementById('raiseEmployee');
   dropdown.innerHTML = '<option value="">Choose an employee...</option>';
   
   employees.forEach(emp => {
         const option = document.createElement('option');
         option.value = emp.id;
         option.textContent = `${emp.name} - ${emp.position}`;
         dropdown.appendChild(option);
   });
}

/**
* Show specific payroll tab
* @param {string} tabName - Name of the tab to show
*/
function showPayrollTab(tabName) {
   // Hide all tab contents
   document.querySelectorAll('.payroll-content').forEach(content => {
         content.classList.remove('active');
   });
   
   // Remove active class from all tabs
   document.querySelectorAll('.payroll-tab').forEach(tab => {
         tab.classList.remove('active');
   });
   
   // Show selected tab content
   document.getElementById(`payroll${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.add('active');
   
   // Add active class to clicked tab
   event.target.classList.add('active');
}

/**
* Process monthly payroll
*/
function processMonthlyPayroll() {
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   let processedCount = 0;
   let currency = 'SGD'; // Default currency
   
   employees.forEach(emp => {
         if (emp.payroll && emp.payroll.baseSalary) {
            // Simulate payroll processing
            processedCount++;
            // Use the first employee's currency as the display currency
            if (emp.payroll.currency) {
               currency = emp.payroll.currency;
            }
         }
   });
   
   alert(`Monthly payroll processed successfully!\n\nProcessed ${processedCount} employee payments.\nTotal amount: ${currency} $${calculateTotalPayroll(employees).toLocaleString()}`);
   
   // Update activities
   updatePayrollActivities(`Processed monthly payroll for ${processedCount} employees`);
}

/**
* Calculate total payroll amount
* @param {Array} employees - Array of employee objects
* @returns {number} Total payroll amount
*/
function calculateTotalPayroll(employees) {
   return employees.reduce((total, emp) => {
         if (emp.payroll && emp.payroll.baseSalary) {
            const allowances = emp.payroll.allowances ? 
               Object.values(emp.payroll.allowances).reduce((sum, val) => sum + val, 0) : 0;
            const deductions = emp.payroll.deductions ? 
               Object.values(emp.payroll.deductions).reduce((sum, val) => sum + val, 0) : 0;
            return total + emp.payroll.baseSalary + allowances - deductions;
         }
         return total;
   }, 0);
}

/**
* Apply salary adjustment
*/
function applySalaryAdjustment() {
   const employeeId = document.getElementById('raiseEmployee').value;
   const adjustmentType = document.getElementById('adjustmentType').value;
   const amount = parseFloat(document.getElementById('adjustmentAmount').value);
   const reason = document.getElementById('adjustmentReason').value;
   const effectiveDate = document.getElementById('effectiveDate').value;
   
   if (!employeeId || !amount || !reason || !effectiveDate) {
         alert('Please fill in all required fields.');
         return;
   }
   
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   const employee = employees.find(emp => emp.id === employeeId);
   
   if (!employee) {
         alert('Employee not found.');
         return;
   }
   
   // Apply adjustment based on type
   if (!employee.payroll) {
         employee.payroll = {
            baseSalary: 0,
            currency: 'SGD',
            paymentFrequency: 'monthly',
            allowances: {},
            deductions: {},
            salaryHistory: []
         };
   }
   
   const adjustment = {
         date: effectiveDate,
         type: adjustmentType,
         amount: amount,
         reason: reason,
         appliedBy: JSON.parse(sessionStorage.getItem('currentUser')).username
   };
   
   switch (adjustmentType) {
         case 'raise':
            employee.payroll.baseSalary += amount;
            break;
         case 'bonus':
            if (!employee.payroll.allowances) employee.payroll.allowances = {};
            employee.payroll.allowances.bonus = (employee.payroll.allowances.bonus || 0) + amount;
            break;
         case 'allowance':
            if (!employee.payroll.allowances) employee.payroll.allowances = {};
            employee.payroll.allowances.adjustment = (employee.payroll.allowances.adjustment || 0) + amount;
            break;
         case 'deduction':
            if (!employee.payroll.deductions) employee.payroll.deductions = {};
            employee.payroll.deductions.adjustment = (employee.payroll.deductions.adjustment || 0) + amount;
            break;
   }
   
   // Add to salary history
   if (!employee.payroll.salaryHistory) employee.payroll.salaryHistory = [];
   employee.payroll.salaryHistory.push(adjustment);
   
   // Save changes
   localStorage.setItem('employees', JSON.stringify(employees));
   saveDataToUpdate();
   
   // Update displays
   initializePayrollSystem();
   updateAdjustmentHistory();
   
   // Clear form
   document.getElementById('raiseEmployee').value = '';
   document.getElementById('adjustmentAmount').value = '';
   document.getElementById('adjustmentReason').value = '';
   
   const currency = employee.payroll.currency || 'SGD';
   alert(`Salary adjustment applied successfully!\n\nEmployee: ${employee.name}\nType: ${adjustmentType}\nAmount: ${currency} $${amount}`);
   
   // Update activities
   updatePayrollActivities(`Applied ${adjustmentType} of ${currency} $${amount} to ${employee.name}`);
}

/**
* Update payroll activities display
* @param {string} activity - Activity description
*/
function updatePayrollActivities(activity) {
   const activitiesDiv = document.getElementById('payrollActivities');
   const now = new Date();
   const timestamp = now.toLocaleString();
   
   const activityElement = document.createElement('div');
   activityElement.innerHTML = `<p><strong>${timestamp}:</strong> ${activity}</p>`;
   
   if (activitiesDiv.innerHTML === '<p>No recent activities</p>') {
         activitiesDiv.innerHTML = '';
   }
   
   activitiesDiv.insertBefore(activityElement, activitiesDiv.firstChild);
}

/**
* Update adjustment history display
*/
function updateAdjustmentHistory() {
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   const historyDiv = document.getElementById('adjustmentHistory');
   
   let allAdjustments = [];
   
   employees.forEach(emp => {
         if (emp.payroll && emp.payroll.salaryHistory) {
            emp.payroll.salaryHistory.forEach(adj => {
               allAdjustments.push({
                     ...adj,
                     employeeName: emp.name,
                     currency: emp.payroll.currency || 'SGD'
               });
            });
         }
   });
   
   // Sort by date (newest first)
   allAdjustments.sort((a, b) => new Date(b.date) - new Date(a.date));
   
   if (allAdjustments.length === 0) {
         historyDiv.innerHTML = '<p>No recent adjustments</p>';
         return;
   }
   
   historyDiv.innerHTML = allAdjustments.slice(0, 10).map(adj => `
         <div style="border: 1px solid #e9ecef; padding: 1rem; margin-bottom: 0.5rem; border-radius: 5px;">
            <strong>${adj.employeeName}</strong> - ${adj.type} of ${adj.currency} $${adj.amount}<br>
            <small>Date: ${adj.date} | Reason: ${adj.reason} | Applied by: ${adj.appliedBy}</small>
         </div>
   `).join('');
}

/**
* Generate payroll report
*/
function generatePayrollReport() {
   const reportType = document.getElementById('reportType').value;
   const reportPeriod = document.getElementById('reportPeriod').value;
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   
   if (!reportPeriod) {
         alert('Please select a report period.');
         return;
   }
   
   const reportOutput = document.getElementById('reportOutput');
   
   switch (reportType) {
         case 'monthly':
            generateMonthlyReport(employees, reportPeriod, reportOutput);
            break;
         case 'employee':
            generateEmployeeReport(employees, reportPeriod, reportOutput);
            break;
         case 'tax':
            generateTaxReport(employees, reportPeriod, reportOutput);
            break;
         case 'comparison':
            generateComparisonReport(employees, reportPeriod, reportOutput);
            break;
   }
}

/**
* Generate monthly payroll report
* @param {Array} employees - Array of employee objects
* @param {string} period - Report period (YYYY-MM)
* @param {HTMLElement} output - Output element
*/
function generateMonthlyReport(employees, period, output) {
   const [year, month] = period.split('-');
   const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
   
   let totalPayroll = 0;
   let totalAllowances = 0;
   let totalDeductions = 0;
   let currency = 'SGD'; // Default currency
   
   const reportData = employees.map(emp => {
         if (!emp.payroll) return null;
         
         const baseSalary = emp.payroll.baseSalary || 0;
         const allowances = emp.payroll.allowances ? 
            Object.values(emp.payroll.allowances).reduce((sum, val) => sum + val, 0) : 0;
         const deductions = emp.payroll.deductions ? 
            Object.values(emp.payroll.deductions).reduce((sum, val) => sum + val, 0) : 0;
         const netSalary = baseSalary + allowances - deductions;
         
         totalPayroll += netSalary;
         totalAllowances += allowances;
         totalDeductions += deductions;
         
         // Use the first employee's currency as the display currency
         if (emp.payroll.currency) {
            currency = emp.payroll.currency;
         }
         
         return {
            name: emp.name,
            position: emp.position,
            baseSalary,
            allowances,
            deductions,
            netSalary,
            currency: emp.payroll.currency || 'SGD'
         };
   }).filter(emp => emp !== null);
   
   output.innerHTML = `
         <h4>Monthly Payroll Report - ${monthName}</h4>
         <div class="salary-summary">
            <div class="summary-card">
               <h4>Total Payroll</h4>
               <div class="amount">${currency} $${totalPayroll.toLocaleString()}</div>
            </div>
            <div class="summary-card">
               <h4>Total Allowances</h4>
               <div class="amount">${currency} $${totalAllowances.toLocaleString()}</div>
            </div>
            <div class="summary-card">
               <h4>Total Deductions</h4>
               <div class="amount">${currency} $${totalDeductions.toLocaleString()}</div>
            </div>
         </div>
         <table class="salary-table">
            <thead>
               <tr>
                     <th>Employee</th>
                     <th>Position</th>
                     <th>Base Salary</th>
                     <th>Allowances</th>
                     <th>Deductions</th>
                     <th>Net Salary</th>
               </tr>
            </thead>
            <tbody>
               ${reportData.map(emp => `
                     <tr>
                        <td>${emp.name}</td>
                        <td>${emp.position}</td>
                        <td>${emp.currency} $${emp.baseSalary.toLocaleString()}</td>
                        <td>${emp.currency} $${emp.allowances.toLocaleString()}</td>
                        <td>${emp.currency} $${emp.deductions.toLocaleString()}</td>
                        <td class="salary-amount">${emp.currency} $${emp.netSalary.toLocaleString()}</td>
                     </tr>
               `).join('')}
            </tbody>
         </table>
   `;
}

/**
* Generate employee-specific report
* @param {Array} employees - Array of employee objects
* @param {string} period - Report period (YYYY-MM)
* @param {HTMLElement} output - Output element
*/
function generateEmployeeReport(employees, period, output) {
   output.innerHTML = `
         <h4>Individual Employee Reports</h4>
         <p>Select an employee to view detailed salary information:</p>
         <select id="reportEmployee" class="form-control" onchange="showEmployeeDetails()">
            <option value="">Choose an employee...</option>
            ${employees.map(emp => `<option value="${emp.id}">${emp.name}</option>`).join('')}
         </select>
         <div id="employeeReportDetails"></div>
   `;
}

/**
* Generate tax summary report
* @param {Array} employees - Array of employee objects
* @param {string} period - Report period (YYYY-MM)
* @param {HTMLElement} output - Output element
*/
function generateTaxReport(employees, period, output) {
   const [year, month] = period.split('-');
   const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
   
   let totalTaxableIncome = 0;
   let estimatedTax = 0;
   let currency = 'SGD'; // Default currency
   
   employees.forEach(emp => {
         if (emp.payroll && emp.payroll.baseSalary) {
            const annualSalary = emp.payroll.baseSalary * 12;
            totalTaxableIncome += annualSalary;
            // Simplified tax calculation (placeholder)
            estimatedTax += annualSalary * 0.15; // 15% tax rate
            // Use the first employee's currency as the display currency
            if (emp.payroll.currency) {
               currency = emp.payroll.currency;
            }
         }
   });
   
   output.innerHTML = `
         <h4>Tax Summary Report - ${monthName}</h4>
         <div class="salary-summary">
            <div class="summary-card">
               <h4>Total Taxable Income</h4>
               <div class="amount">${currency} $${totalTaxableIncome.toLocaleString()}</div>
            </div>
            <div class="summary-card">
               <h4>Estimated Annual Tax</h4>
               <div class="amount">${currency} $${estimatedTax.toLocaleString()}</div>
            </div>
         </div>
         <p><em>Note: This is a simplified tax calculation for demonstration purposes.</em></p>
   `;
}

/**
* Generate year-over-year comparison report
* @param {Array} employees - Array of employee objects
* @param {string} period - Report period (YYYY-MM)
* @param {HTMLElement} output - Output element
*/
function generateComparisonReport(employees, period, output) {
   const [year, month] = period.split('-');
   const currentYear = parseInt(year);
   const previousYear = currentYear - 1;
   let currency = 'SGD'; // Default currency
   
   // Get currency from first employee with payroll data
   employees.forEach(emp => {
         if (emp.payroll && emp.payroll.currency) {
            currency = emp.payroll.currency;
            return;
         }
   });
   
   output.innerHTML = `
         <h4>Year-over-Year Comparison</h4>
         <p>Comparing ${currentYear} vs ${previousYear}</p>
         <div class="salary-summary">
            <div class="summary-card">
               <h4>${currentYear} Total Payroll</h4>
               <div class="amount">${currency} $${calculateTotalPayroll(employees).toLocaleString()}</div>
            </div>
            <div class="summary-card">
               <h4>${previousYear} Total Payroll</h4>
               <div class="amount">${currency} $${(calculateTotalPayroll(employees) * 0.95).toLocaleString()}</div>
            </div>
            <div class="summary-card">
               <h4>Growth Rate</h4>
               <div class="amount">+5.3%</div>
            </div>
         </div>
         <p><em>Note: Previous year data is simulated for demonstration purposes.</em></p>
   `;
}

/**
* View employee salary details
* @param {string} employeeId - Employee ID
*/
function viewEmployeeSalaryDetails(employeeId) {
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   const employee = employees.find(emp => emp.id === employeeId);
   
   if (!employee || !employee.payroll) {
         alert('Employee salary information not found.');
         return;
   }
   
   const salary = employee.payroll;
   const allowances = salary.allowances || {};
   const deductions = salary.deductions || {};
   const currency = salary.currency || 'SGD';
   
   let detailsHtml = `
         <h3>${employee.name} - Salary Details</h3>
         <p><strong>Position:</strong> ${employee.position}</p>
         <p><strong>Base Salary:</strong> ${currency} $${salary.baseSalary.toLocaleString()} (${salary.paymentFrequency})</p>
         <p><strong>Overtime Rate:</strong> ${currency} $${(salary.overtimeRate || 0).toLocaleString()}/hour</p>
         
         <h4>Allowances:</h4>
         <ul>
   `;
   
   Object.entries(allowances).forEach(([key, value]) => {
         detailsHtml += `<li>${key}: ${currency} $${value.toLocaleString()}</li>`;
   });
   
   detailsHtml += `
         </ul>
         
         <h4>Deductions:</h4>
         <ul>
   `;
   
   Object.entries(deductions).forEach(([key, value]) => {
         detailsHtml += `<li>${key}: ${currency} $${value.toLocaleString()}</li>`;
   });
   
   detailsHtml += `</ul>`;
   
   if (salary.lastPayslip) {
         detailsHtml += `
            <h4>Last Payslip:</h4>
            <p><strong>Date:</strong> ${salary.lastPayslip.date}</p>
            <p><strong>Gross Pay:</strong> ${currency} $${salary.lastPayslip.grossPay.toLocaleString()}</p>
            <p><strong>Net Pay:</strong> ${currency} $${salary.lastPayslip.netPay.toLocaleString()}</p>
         `;
   }
   
   if (salary.salaryHistory && salary.salaryHistory.length > 0) {
         detailsHtml += `
            <h4>Salary History:</h4>
            <ul>
         `;
         
         salary.salaryHistory.slice(-5).forEach(history => {
            detailsHtml += `<li>${history.date}: ${history.type} of ${currency} $${history.amount} - ${history.reason}</li>`;
         });
         
         detailsHtml += `</ul>`;
   }
   
   alert(detailsHtml.replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' '));
}

/**
* Edit employee salary
* @param {string} employeeId - Employee ID
*/
function editEmployeeSalary(employeeId) {
   alert('Salary editing feature would open a detailed form here.\n\nFor now, use the Salary Adjustments tab to modify employee salaries.');
}

/**
* Show employee details in report
*/
function showEmployeeDetails() {
   const employeeId = document.getElementById('reportEmployee').value;
   const detailsDiv = document.getElementById('employeeReportDetails');
   
   if (!employeeId) {
         detailsDiv.innerHTML = '';
         return;
   }
   
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   const employee = employees.find(emp => emp.id === employeeId);
   
   if (!employee || !employee.payroll) {
         detailsDiv.innerHTML = '<p>No salary information found for this employee.</p>';
         return;
   }
   
   const salary = employee.payroll;
   const allowances = salary.allowances || {};
   const deductions = salary.deductions || {};
   const baseSalary = salary.baseSalary || 0;
   const currency = salary.currency || 'SGD';
   const overtimeRate = salary.overtimeRate || 0;
   const totalAllowances = Object.values(allowances).reduce((sum, val) => sum + val, 0);
   const totalDeductions = Object.values(deductions).reduce((sum, val) => sum + val, 0);
   const netSalary = baseSalary + totalAllowances - totalDeductions;
   
   detailsDiv.innerHTML = `
         <div style="margin-top: 2rem; padding: 1.5rem; border: 1px solid #e9ecef; border-radius: 8px; background: #f8f9fa;">
            <h4>${employee.name} - Detailed Salary Report</h4>
            <p><strong>Payment Frequency:</strong> ${salary.paymentFrequency || 'monthly'}</p>
            <p><strong>Overtime Rate:</strong> ${currency} $${overtimeRate.toLocaleString()}/hour</p>
            <div class="salary-summary">
               <div class="summary-card">
                     <h4>Base Salary</h4>
                     <div class="amount">${currency} $${baseSalary.toLocaleString()}</div>
               </div>
               <div class="summary-card">
                     <h4>Total Allowances</h4>
                     <div class="amount">${currency} $${totalAllowances.toLocaleString()}</div>
               </div>
               <div class="summary-card">
                     <h4>Total Deductions</h4>
                     <div class="amount">${currency} $${totalDeductions.toLocaleString()}</div>
               </div>
               <div class="summary-card">
                     <h4>Net Salary</h4>
                     <div class="amount">${currency} $${netSalary.toLocaleString()}</div>
               </div>
            </div>
            
            ${Object.keys(allowances).length > 0 ? `
               <h5>Allowance Breakdown:</h5>
               <ul>
                     ${Object.entries(allowances).map(([key, value]) => `<li>${key}: ${currency} $${value.toLocaleString()}</li>`).join('')}
               </ul>
            ` : ''}
            
            ${Object.keys(deductions).length > 0 ? `
               <h5>Deduction Breakdown:</h5>
               <ul>
                     ${Object.entries(deductions).map(([key, value]) => `<li>${key}: ${currency} $${value.toLocaleString()}</li>`).join('')}
               </ul>
            ` : ''}
            
            ${salary.lastPayslip ? `
               <h5>Last Payslip Information:</h5>
               <div style="border: 1px solid #dee2e6; padding: 0.75rem; margin-bottom: 0.5rem; border-radius: 4px;">
                  <strong>Date:</strong> ${salary.lastPayslip.date}<br>
                  <strong>Gross Pay:</strong> ${currency} $${salary.lastPayslip.grossPay.toLocaleString()}<br>
                  <strong>Net Pay:</strong> ${currency} $${salary.lastPayslip.netPay.toLocaleString()}
               </div>
            ` : ''}
            
            ${salary.salaryHistory && salary.salaryHistory.length > 0 ? `
               <h5>Recent Salary Changes:</h5>
               <div>
                     ${salary.salaryHistory.slice(-3).map(history => `
                        <div style="border: 1px solid #dee2e6; padding: 0.75rem; margin-bottom: 0.5rem; border-radius: 4px;">
                           <strong>${history.date}:</strong> ${history.type} of ${currency} $${history.amount}<br>
                           <small>Reason: ${history.reason} | Applied by: ${history.appliedBy}</small>
                        </div>
                     `).join('')}
               </div>
            ` : '<p><em>No salary adjustment history available.</em></p>'}
         </div>
   `;
}

/**
* Show feature functionality (legacy function for remaining features)
* @param {string} featureName - Name of the feature to show
*/
function showFeature(featureName) {
   if (featureName === 'Recruitment') {
         showRecruitment();
   } else {
         alert(`${featureName} feature would be implemented here.\n\nThis is a demo portal showing the basic structure and user role management.`);
   }
}

/**
* Show Recruitment Management interface
*/
function showRecruitment() {
   currentView = 'recruitment';
   hideAllContent();
   document.getElementById('featureContent').style.display = 'block';
   
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   const applicants = employees.filter(emp => emp.status === 'applicant');
   
   document.getElementById('featureContent').innerHTML = `
         <div class="recruitment-section">
            <div class="recruitment-header">
               <h2>Recruitment Management</h2>
               <button class="btn primary" onclick="addNewApplicant()">Add New Applicant</button>
            </div>
            
            <div class="recruitment-stats">
               <div class="stat-card">
                     <h4>Total Applicants</h4>
                     <div class="stat-number">${applicants.length}</div>
               </div>
               <div class="stat-card">
                     <h4>Pending Reviews</h4>
                     <div class="stat-number">${applicants.filter(a => a.applicationStatus === 'pending').length}</div>
               </div>
               <div class="stat-card">
                     <h4>Interviews Scheduled</h4>
                     <div class="stat-number">${applicants.filter(a => a.applicationStatus === 'interview').length}</div>
               </div>
            </div>
            
            <div class="applicants-table">
               <h3>Current Applicants</h3>
               <table class="data-table">
                     <thead>
                        <tr>
                           <th>Name</th>
                           <th>Position</th>
                           <th>Email</th>
                           <th>Phone</th>
                           <th>Application Date</th>
                           <th>Status</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        ${applicants.map(applicant => `
                           <tr>
                                 <td>${applicant.name}</td>
                                 <td>${applicant.position}</td>
                                 <td>${applicant.email}</td>
                                 <td>${applicant.phone}</td>
                                 <td>${applicant.applicationDate ? new Date(applicant.applicationDate).toLocaleDateString() : 'N/A'}</td>
                                 <td><span class="status-badge ${applicant.applicationStatus || 'pending'}">${(applicant.applicationStatus || 'pending').toUpperCase()}</span></td>
                                 <td>
                                    <button class="btn small" onclick="reviewApplicant(${applicant.id})">Review</button>
                                    <button class="btn small success" onclick="hireApplicant(${applicant.id})">Hire</button>
                                    <button class="btn small danger" onclick="rejectApplicant(${applicant.id})">Reject</button>
                                 </td>
                           </tr>
                        `).join('')}
                        ${applicants.length === 0 ? '<tr><td colspan="7" style="text-align: center; padding: 20px;">No applicants found</td></tr>' : ''}
                     </tbody>
               </table>
            </div>
         </div>
         
         <style>
            .recruitment-section {
               padding: 20px;
            }
            
            .recruitment-header {
               display: flex;
               justify-content: space-between;
               align-items: center;
               margin-bottom: 30px;
            }
            
            .recruitment-stats {
               display: grid;
               grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
               gap: 20px;
               margin-bottom: 30px;
            }
            
            .stat-card {
               background: white;
               padding: 20px;
               border-radius: 8px;
               box-shadow: 0 2px 4px rgba(0,0,0,0.1);
               text-align: center;
            }
            
            .stat-card h4 {
               margin: 0 0 10px 0;
               color: #666;
               font-size: 14px;
            }
            
            .stat-number {
               font-size: 32px;
               font-weight: bold;
               color: #2c3e50;
            }
            
            .applicants-table {
               background: white;
               border-radius: 8px;
               padding: 20px;
               box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .data-table {
               width: 100%;
               border-collapse: collapse;
               margin-top: 15px;
            }
            
            .data-table th,
            .data-table td {
               padding: 12px;
               text-align: left;
               border-bottom: 1px solid #eee;
            }
            
            .data-table th {
               background-color: #f8f9fa;
               font-weight: 600;
               color: #2c3e50;
            }
            
            .status-badge {
               padding: 4px 8px;
               border-radius: 4px;
               font-size: 12px;
               font-weight: bold;
               text-transform: uppercase;
            }
            
            .status-badge.pending {
               background-color: #fff3cd;
               color: #856404;
            }
            
            .status-badge.interview {
               background-color: #d1ecf1;
               color: #0c5460;
            }
            
            .status-badge.hired {
               background-color: #d4edda;
               color: #155724;
            }
            
            .status-badge.rejected {
               background-color: #f8d7da;
               color: #721c24;
            }
            
            .btn {
               padding: 8px 16px;
               border: none;
               border-radius: 4px;
               cursor: pointer;
               font-size: 14px;
               margin-right: 5px;
            }
            
            .btn.primary {
               background-color: #007bff;
               color: white;
            }
            
            .btn.small {
               padding: 4px 8px;
               font-size: 12px;
            }
            
            .btn.success {
               background-color: #28a745;
               color: white;
            }
            
            .btn.danger {
               background-color: #dc3545;
               color: white;
            }
            
            .btn:hover {
               opacity: 0.8;
            }
         </styl>
   `;
}

/**
* Review applicant details
*/
function reviewApplicant(applicantId) {
   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
   const applicant = employees.find(emp => emp.id === applicantId);
   
   if (applicant) {
         alert(`Reviewing applicant: ${applicant.name}\nPosition: ${applicant.position}\nEmail: ${applicant.email}\nPhone: ${applicant.phone}\nStatus: ${applicant.applicationStatus || 'pending'}`);
   }
}

/**
* Hire an applicant
*/
function hireApplicant(applicantId) {
   if (confirm('Are you sure you want to hire this applicant?')) {
         const employees = JSON.parse(localStorage.getItem('employees') || '[]');
         const applicantIndex = employees.findIndex(emp => emp.id === applicantId);
         
         if (applicantIndex !== -1) {
            employees[applicantIndex].status = 'active';
            employees[applicantIndex].applicationStatus = 'hired';
            employees[applicantIndex].hireDate = new Date().toISOString();
            
            localStorage.setItem('employees', JSON.stringify(employees));
            showRecruitment(); // Refresh the view
            alert('Applicant has been hired successfully!');
         }
   }
}

/**
* Reject an applicant
*/
function rejectApplicant(applicantId) {
   if (confirm('Are you sure you want to reject this applicant?')) {
         const employees = JSON.parse(localStorage.getItem('employees') || '[]');
         const applicantIndex = employees.findIndex(emp => emp.id === applicantId);
         
         if (applicantIndex !== -1) {
            employees[applicantIndex].applicationStatus = 'rejected';
            
            localStorage.setItem('employees', JSON.stringify(employees));
            showRecruitment(); // Refresh the view
            alert('Applicant has been rejected.');
         }
   }
}

/**
* Add new applicant (placeholder function)
*/
function addNewApplicant() {
   alert('Add New Applicant feature would open a form to add new applicants to the system.');
}

/**
* Logout user and redirect to signin page
*/
function logout() {
   if (confirm('Are you sure you want to logout?')) {
         sessionStorage.removeItem('currentUser');
         window.location.href = 'signin.html';
   }
}

/**
* Show reset confirmation modal
*/
function showResetConfirmation() {
   document.getElementById('resetConfirmation').style.display = 'flex';
}

/**
* Hide reset confirmation modal
*/
function hideResetConfirmation() {
   document.getElementById('resetConfirmation').style.display = 'none';
}

/**
   * Load demo data from JSON file
   */
/**
   * Save current data to update file
   */
async function saveDataToUpdate() {
      try {
         // Collect all current data from localStorage
         const employees = JSON.parse(localStorage.getItem('employees') || '[]');
         const systemSettings = JSON.parse(localStorage.getItem('systemSettings') || '{}');
         
         // Collect all chat messages
         const chatMessages = {};
         const keys = Object.keys(localStorage);
         keys.forEach(key => {
            if (key.startsWith('chat_')) {
                  chatMessages[key] = JSON.parse(localStorage.getItem(key) || '[]');
            }
         });
         
         // Get users data if exists
         const users = JSON.parse(localStorage.getItem('users') || '[]');
         
         const updateData = {
            employees,
            chatMessages,
            users,
            systemSettings: {
                  ...systemSettings,
                  lastUpdate: new Date().toISOString(),
                  dataSource: 'updated'
            }
         };
         
         // In a real application, this would save to demo-data-update.json
         // For demo purposes, we store it in localStorage with a special key
         localStorage.setItem('demo_data_update', JSON.stringify(updateData));
         console.log('Data saved to demo-data-update.json (simulated):', updateData);
         
      } catch (error) {
         console.error('Error saving data to update file:', error);
      }
}

/**
   * Load demo data from update file first, fallback to default file
   */
async function loadDemoDataFromFile() {
      try {
         // First check if we have updated data in localStorage (simulating demo-data-update.json)
         const storedUpdateData = localStorage.getItem('demo_data_update');
         if (storedUpdateData) {
            try {
                  const updateData = JSON.parse(storedUpdateData);
                  if (updateData && updateData.employees && updateData.employees.length > 0) {
                     console.log('Loading data from demo-data-update.json (simulated from localStorage)');
                     return updateData;
                  }
            } catch (parseError) {
                  console.warn('Error parsing stored update data, falling back to files');
            }
         }
         
         // Try to load update file from server
         try {
            let response = await fetch('../json/demo-data-update.json');
            if (response.ok) {
                  const updateData = await response.json();
                  // Check if update file has meaningful data
                  if (updateData && Object.keys(updateData).length > 0 && updateData.employees) {
                     console.log('Loading data from demo-data-update.json');
                     return updateData;
                  }
            }
         } catch (updateError) {
            console.log('demo-data-update.json not found or invalid, falling back to default');
         }
         
         // Fallback to default file (preset database)
         const response = await fetch('../json/demo-data-default.json');
         if (!response.ok) {
            throw new Error('Failed to load demo-data-default.json');
         }
         const defaultData = await response.json();
         console.log('Loading data from demo-data-default.json (preset database)');
         
         // Mark as default data source
         if (defaultData.systemSettings) {
            defaultData.systemSettings.dataSource = 'default';
         } else {
            defaultData.systemSettings = { dataSource: 'default' };
         }
         
         return defaultData;
         
      } catch (error) {
         console.error('Error loading demo data:', error);
         // Fallback to minimal demo data structure
         return {
            employees: [
                  {
                     id: 1,
                     name: 'Demo Employee',
                     position: 'Staff',
                     status: 'active',
                     email: 'demo@petstory.com',
                     phone: '+1234567890',
                     leaveRequests: [],
                     performance: {
                        attendance: '100%',
                        punctuality: '100%',
                        tasksCompleted: 0,
                        customerRating: 5.0
                     },
                     payroll: {
                        baseSalary: 3500,
                        currency: 'SGD',
                        paymentFrequency: 'monthly',
                        allowances: {
                              transport: 200,
                              meal: 300
                        },
                        deductions: {
                              cpf: 350,
                              insurance: 100
                        }
                     }
                  },
                  {
                     id: 2,
                     name: 'Foo Wen Jie',
                     position: 'HR',
                     status: 'applicant',
                     email: 'foowenjie@petstory.com',
                     phone: '+60123456789',
                     leaveRequests: [],
                     performance: {
                        attendance: 'N/A',
                        punctuality: 'N/A',
                        tasksCompleted: 0,
                        customerRating: 0
                     },
                     applicationDate: new Date().toISOString(),
                     applicationStatus: 'pending',
                     payroll: {
                        baseSalary: 4200,
                        currency: 'SGD',
                        paymentFrequency: 'monthly',
                        allowances: {
                              transport: 250,
                              meal: 350,
                              position: 500
                        },
                        deductions: {
                              cpf: 420,
                              insurance: 120
                        }
                     }
                  }
            ],
            chatMessages: {},
            users: [],
            systemSettings: {
                  lastReset: new Date().toISOString(),
                  version: '1.0.0',
                  dataSource: 'fallback'
            }
         };
      }
}

/**
   * Reset all demo data to initial state (from preset database)
   */
async function resetDemoData() {
      try {
         // Load data from default file only (preset database)
         const response = await fetch('../json/demo-data-default.json');
         if (!response.ok) {
            throw new Error('Failed to load demo-data-default.json (preset database)');
         }
         const demoData = await response.json();
         
         // Reset employees data to preset state
         localStorage.setItem('employees', JSON.stringify(demoData.employees));
         
         // Clear all existing chat messages
         const keys = Object.keys(localStorage);
         keys.forEach(key => {
            if (key.startsWith('chat_')) {
                  localStorage.removeItem(key);
            }
         });
         
         // Load chat messages from preset data
         if (demoData.chatMessages) {
            Object.keys(demoData.chatMessages).forEach(chatId => {
                  localStorage.setItem(chatId, JSON.stringify(demoData.chatMessages[chatId]));
            });
         }
         
         // Update system settings
         localStorage.setItem('systemSettings', JSON.stringify({
            ...demoData.systemSettings,
            lastReset: new Date().toISOString(),
            dataSource: 'default'
         }));
         
         // Clear the update data (simulating clearing demo-data-update.json)
         localStorage.removeItem('demo_data_update');
         
         console.log('Demo data reset: Restored to preset database (demo-data-default.json), update database cleared');
         
         hideResetConfirmation();
         alert('Demo data has been reset successfully to preset database (demo-data-default.json)!');
         
         // Refresh current view
         if (currentView === 'employee-management') {
            showEmployeeManagement();
         } else if (currentView === 'performance-management') {
            showPerformanceManagement();
         } else if (currentView === 'leave-requests') {
            showLeaveRequests();
         } else if (currentView === 'employee-profile') {
            showEmployeeProfile();
         }
      } catch (error) {
         console.error('Error resetting demo data:', error);
         alert('Error resetting demo data. Please check the console for details.');
         hideResetConfirmation();
      }
}

// <!--!!Important --> Initialize portal when page loads
document.addEventListener('DOMContentLoaded', async () => {
   await initializePortal();
   
   // Add event listeners for leave details modal
   const modal = document.getElementById('leaveDetailsModal');
   const closeBtn = document.querySelector('.close-modal');
   
   // Close modal when clicking the close button
   if (closeBtn) {
         closeBtn.addEventListener('click', closeLeaveDetails);
   }
   
   // Close modal when clicking outside the modal content
   if (modal) {
         modal.addEventListener('click', function(event) {
            if (event.target === modal) {
               closeLeaveDetails();
            }
         });
   }
   
   // Close modal when pressing ESC key
   document.addEventListener('keydown', function(event) {
         if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeLeaveDetails();
         }
   });
});