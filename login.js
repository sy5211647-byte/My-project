const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const message = document.getElementById("loginMessage");

  if (!email || !password) {
    message.textContent = "Please enter email and password.";
    return;
  }

  // Demo login only — no real authentication
  localStorage.setItem("studentName", email.split("@")[0]);

  window.location.href = "dashboard.html";
});
