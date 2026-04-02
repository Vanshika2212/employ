document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    if(username === "" || password === "") {
        message.textContent = "Please fill all fields!";
        return;
    }

    // Temporary login check
    if(username === "admin" && password === "1234") {
        message.style.color = "lightgreen";
        message.textContent = "Login Successful!";
    } else {
        message.textContent = "Invalid credentials!";
    }
});