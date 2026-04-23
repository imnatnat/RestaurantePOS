console.log("app.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    console.log("Login attempt:", user, pass);

    // TEMP LOGIN (for testing)
    if (user && pass) {
      window.location.href = "dashboard.html";
    } else {
      alert("Fill in fields");
    }
  });
});
