document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await fetch("https://restaurant-pos-backend-i88u.onrender.com", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: user.value,
      password: pass.value
    })
  });
  const data = await res.json();
  if(data.success){
    window.location.href = "dashboard.html";
  } else {
    alert("Login failed");
  }
});
