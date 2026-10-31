localStorage.setItem("studentName", fullName);

message.textContent = "Registration form checked! Redirecting to login...";

setTimeout(() => {
  window.location.href = "login.html";
}, 1000);
