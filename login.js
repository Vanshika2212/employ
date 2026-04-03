document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.text())
  .then(data => {
    if (data === "SUCCESS") {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "index.html";
    } else {
      document.getElementById("error").textContent = "Invalid credentials";
    }
  });
});
