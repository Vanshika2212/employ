// =====================
// SECTION SWITCHING
// =====================
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// =====================
// API URLs
// =====================
const EMP_API = "http://localhost:8080/api/employees";
const ATT_API = "http://localhost:8080/api/attendance";

// =====================
// DASHBOARD UPDATE
// =====================
function updateDashboard(total, present = 0) {
  document.getElementById("totalEmp").textContent = total;
  document.getElementById("presentEmp").textContent = present;
}

// =====================
// LOAD EMPLOYEES
// =====================
function loadEmployees() {
  fetch(EMP_API)
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("empTable");
      table.innerHTML = "";

      data.forEach(emp => {
        table.innerHTML += `
          <tr>
            <td>${emp.name}</td>
            <td>${emp.role}</td>
            <td>
              <button onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
          </tr>
        `;
      });

      updateDashboard(data.length);
    })
    .catch(err => console.error("Error loading employees:", err));
}

// =====================
// ADD EMPLOYEE
// =====================
document.getElementById("empForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("empName").value;
  const role = document.getElementById("empRole").value;

  fetch(EMP_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, role })
  })
  .then(() => {
    loadEmployees();
    this.reset();
  })
  .catch(err => console.error("Error adding employee:", err));
});

// =====================
// DELETE EMPLOYEE
// =====================
function deleteEmployee(id) {
  fetch(EMP_API + "/" + id, {
    method: "DELETE"
  })
  .then(() => loadEmployees())
  .catch(err => console.error("Error deleting employee:", err));
}

// =====================
// MARK ATTENDANCE (BACKEND)
// =====================
function markAttendance() {
  const empId = prompt("Enter Employee ID:");

  if (!empId) return;

  fetch(ATT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      employeeId: empId,
      status: "Present"
    })
  })
  .then(() => {
    alert("Attendance Marked ✅");
    loadAttendanceCount();
  })
  .catch(err => console.error("Error marking attendance:", err));
}

// =====================
// LOAD ATTENDANCE COUNT
// =====================
function loadAttendanceCount() {
  fetch(ATT_API)
    .then(res => res.json())
    .then(data => {
      document.getElementById("presentEmp").textContent = data.length;
    })
    .catch(err => console.error("Error loading attendance:", err));
}

// =====================
// INITIAL LOAD
// =====================
window.onload = function () {
  loadEmployees();
  loadAttendanceCount();
};
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}
