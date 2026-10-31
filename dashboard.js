const studentName = document.getElementById("studentName");
const totalQuizzes = document.getElementById("totalQuizzes");
const averageScore = document.getElementById("averageScore");
const codingCount = document.getElementById("codingCount");
const recentResults = document.getElementById("recentResults");
const logoutBtn = document.getElementById("logoutBtn");

// Read demo data saved by the browser
const savedName = localStorage.getItem("studentName");
const quizResults = JSON.parse(localStorage.getItem("quizResults") || "[]");
const savedCodingCount = Number(localStorage.getItem("codingCount") || 0);

if (savedName) {
  studentName.textContent = savedName;
}

totalQuizzes.textContent = quizResults.length;
codingCount.textContent = savedCodingCount;

if (quizResults.length > 0) {
  const totalScore = quizResults.reduce(
    (sum, result) => sum + Number(result.score || 0),
    0,
  );

  const average = totalScore / quizResults.length;
  averageScore.textContent = `${average.toFixed(1)}%`;

  recentResults.replaceChildren();

  quizResults
    .slice(-5)
    .reverse()
    .forEach((result) => {
      const item = document.createElement("p");
      item.textContent = `${result.title || "Aptitude Quiz"}: ${result.score}%`;
      recentResults.appendChild(item);
    });
}

logoutBtn.addEventListener("click", function () {
  window.location.href = "login.html";
});
