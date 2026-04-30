document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    console.log("Login:", user);

    // TEMP LOGIN
    if (user === "admin" && pass === "1234") {
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials");
    }
  });
});
