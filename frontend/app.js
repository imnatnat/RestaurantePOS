document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  const res = await fetch("https://restaurant-pos-backend-i88u.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: user,
      password: pass
    })
  });

  const data = await res.json();

  if (data.success) {
    window.location.href = "dashboard.html";
  } else {
    alert("Login failed");
  }
});
