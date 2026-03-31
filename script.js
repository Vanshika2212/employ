const API = "http://localhost:8080/api";

// ================= LOAD DASHBOARD DATA =================

async function loadDashboard() {
    try {
        const res = await fetch(API + "/attendance");
        const data = await res.json();

        // Update cards
        document.getElementById("totalEmployees").innerText = data.length;

        let present = data.filter(a => a.status === "Present").length;
        document.getElementById("presentToday").innerText = present;

        document.getElementById("pendingLeave").innerText = "--"; // future
        document.getElementById("tasks").innerText = "--";

        // Activity list
        const activityList = document.getElementById("activityList");
        if (activityList) {
            activityList.innerHTML = "";

            data.slice(-5).forEach(a => {
                activityList.innerHTML += `
                    <li>${a.employeeName} marked ${a.status}</li>
                `;
            });
        }

    } catch (error) {
        console.error("Error loading dashboard:", error);
    }
}

// ================= LOAD ATTENDANCE =================

async function loadAttendance() {
    try {
        const res = await fetch(API + "/attendance");
        const data = await res.json();

        const table = document.getElementById("attendanceTable");
        if (!table) return;

        table.innerHTML = "";

        data.forEach(a => {
            table.innerHTML += `
                <tr>
                    <td>${a.employeeName}</td>
                    <td>${a.status}</td>
                    <td>${a.date}</td>
                    <td>
                        <button onclick="deleteAttendance(${a.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error loading attendance:", error);
    }
}

// ================= ADD ATTENDANCE =================

async function addAttendance() {
    const name = document.getElementById("name").value;
    const status = document.getElementById("status").value;
    const date = document.getElementById("date").value;

    try {
        await fetch(API + "/attendance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                employeeName: name,
                status: status,
                date: date
            })
        });

        alert("Attendance Added ✅");
        loadAttendance();

    } catch (error) {
        console.error("Error adding attendance:", error);
    }
}

// ================= DELETE ATTENDANCE =================

async function deleteAttendance(id) {
    try {
        await fetch(API + "/attendance/" + id, {
            method: "DELETE"
        });

        loadAttendance();

    } catch (error) {
        console.error("Error deleting:", error);
    }
}

// ================= LOGIN =================

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch(API + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const result = await res.text();

        if (result === "SUCCESS") {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "index.html";
        } else {
            alert("Invalid credentials ❌");
        }

    } catch (error) {
        console.error("Login error:", error);
    }
}

// ================= LOGOUT =================

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

// ================= PAGE LOAD HANDLER =================

// Run functions based on page
window.onload = () => {

    // Dashboard page
    if (document.getElementById("totalEmployees")) {
        loadDashboard();
    }

    // Attendance page
    if (document.getElementById("attendanceTable")) {
        loadAttendance();
    }
} ;
window.onload = () => {

    // Dashboard page
    if (document.getElementById("totalEmployees")) {
        loadDashboard();
    }

    // Attendance page
    if (document.getElementById("attendanceTable")) {
        loadAttendance();
    }

    // Employee page
    if (document.getElementById("employeeTable")) {
        loadEmployees();
    }
};
async function loadEmployees() {
    try {
        const res = await fetch("http://localhost:8080/api/employees");
        const data = await res.json();

        const table = document.getElementById("employeeTable");
        table.innerHTML = "";

        data.forEach(emp => {
            table.innerHTML += `
                <tr>
                    <td>${emp.name}</td>
                    <td>${emp.email}</td>
                    <td>
                        <button onclick="deleteEmployee(${emp.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error loading employees:", error);
    }
}
async function deleteEmployee(id) {
    await fetch("http://localhost:8080/api/employees/" + id, {
        method: "DELETE"
    });

    loadEmployees();
}