const leaderboardBody = document.getElementById("leaderboardBody");
const studentCount = document.getElementById("studentCount");

// Get the saved student name
const studentName = localStorage.getItem("studentName") || "Student";

// Read quiz results safely
let quizResults = [];

try {
  quizResults = JSON.parse(localStorage.getItem("quizResults") || "[]");

  if (!Array.isArray(quizResults)) {
    quizResults = [];
  }
} catch (error) {
  quizResults = [];
}

// Convert a quiz result into a percentage
function getPercentage(result) {
  if (typeof result.percentage === "number") {
    return result.percentage;
  }

  if (typeof result.percent === "number") {
    return result.percent;
  }

  const score = Number(result.score);
  const total = Number(result.total);

  if (Number.isFinite(score) && total > 0) {
    return (score / total) * 100;
  }

  return null;
}

// Find the best saved score
const validScores = quizResults
  .map(getPercentage)
  .filter((score) => score !== null && Number.isFinite(score));

const bestScore = validScores.length ? Math.max(...validScores) : null;

// Display ranking
function showLeaderboard() {
  leaderboardBody.innerHTML = "";

  if (bestScore === null) {
    leaderboardBody.innerHTML = `
            <tr>
                <td colspan="4">
                    No quiz score found. Complete a quiz first!
                </td>
            </tr>
        `;

    studentCount.textContent = "0 Students";
    updateTopCards(null);
    return;
  }

  const student = {
    name: studentName,
    score: Math.round(bestScore),
  };

  const row = document.createElement("tr");

  const rankCell = document.createElement("td");
  rankCell.className = "rank-number";
  rankCell.textContent = "👑 1";

  const nameCell = document.createElement("td");
  nameCell.className = "top-student-name";
  nameCell.textContent = student.name;

  const kingBadge = document.createElement("span");
  kingBadge.className = "king-badge";
  kingBadge.textContent = " KING 👑";
  nameCell.appendChild(kingBadge);

  const scoreCell = document.createElement("td");
  scoreCell.className = "score-value";
  scoreCell.textContent = `${student.score}%`;

  const statusCell = document.createElement("td");
  const statusBadge = document.createElement("span");
  statusBadge.className = "status-badge";
  statusBadge.textContent = "Completed";
  statusCell.appendChild(statusBadge);

  row.append(rankCell, nameCell, scoreCell, statusCell);
  leaderboardBody.appendChild(row);

  studentCount.textContent = "1 Student";
  updateTopCards(student);
}

// Update the three cards at the top
function updateTopCards(student) {
  const cards = document.querySelectorAll(".top-card");

  cards.forEach((card) => {
    const name = card.querySelector("h2");
    const label = card.querySelector("p");
    const score = card.querySelector("strong");

    if (!name || !label || !score) return;

    if (card.classList.contains("first-place")) {
      name.textContent = student ? student.name : "No score yet";
      label.textContent = student ? "KING 👑" : "Take a quiz first";
      score.textContent = student ? `${student.score}%` : "--";
    } else {
      name.textContent = "Awaiting students";
      label.textContent = "RANKING";
      score.textContent = "--";
    }
  });
}

showLeaderboard();
