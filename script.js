// Sample data
let employees = [
    { id: 'EMP001', name: 'John Doe', email: 'john@example.com', dept: 'IT', phone: '+1234567890', status: 'Active' },
    { id: 'EMP002', name: 'Jane Smith', email: 'jane@example.com', dept: 'HR', phone: '+1234567891', status: 'Active' },
    { id: 'EMP003', name: 'Mike Johnson', email: 'mike@example.com', dept: 'Finance', phone: '+1234567892', status: 'Active' },
    { id: 'EMP004', name: 'Sarah Wilson', email: 'sarah@example.com', dept: 'IT', phone: '+1234567893', status: 'Active' },
];

let attendanceData = [
    { id: 'EMP001', name: 'John Doe', dept: 'IT', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'present' },
    { id: 'EMP002', name: 'Jane Smith', dept: 'HR', checkIn: '09:15 AM', checkOut: '', status: 'late' },
    { id: 'EMP003', name: 'Mike Johnson', dept: 'Finance', checkIn: '', checkOut: '', status: 'absent' },
    { id: 'EMP004', name: 'Sarah Wilson', dept: 'IT', checkIn: '08:45 AM', checkOut: '05:30 PM', status: 'present' },
];

// DOM elements
const attendanceTableBody = document.getElementById('attendanceTableBody');
const employeesTableBody = document.getElementById('employeesTableBody');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    renderAttendanceTable();
    renderEmployeesTable();
    setupTabs();
    setupEmployeeForm();
    initChart();
});

// Tab functionality
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active tab content
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Update dashboard stats
function updateStats() {
    const presentCount = attendanceData.filter(emp => emp.status === 'present').length;
    const absentCount = attendanceData.filter(emp => emp.status === 'absent').length;
    const lateCount = attendanceData.filter(emp => emp.status === 'late').length;
    const totalEmployees = employees.length;

    document.getElementById('presentCount').textContent = presentCount;
    document.getElementById('absentCount').textContent = absentCount;
    document.getElementById('lateCount').textContent = lateCount;
    document.getElementById('totalEmployees').textContent = totalEmployees;
}

// Render attendance table
function renderAttendanceTable() {
    attendanceTableBody.innerHTML = attendanceData.map(emp => `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.dept}</td>
            <td>${emp.checkIn || '-'}</td>
            <td>${emp.checkOut || '-'}</td>
            <td><span class="status ${emp