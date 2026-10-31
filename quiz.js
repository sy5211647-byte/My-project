const questions = [
  {
    question: "What is 15 + 27?",
    options: ["32", "42", "40", "45"],
    answer: 1,
  },
  {
    question: "What is 12 × 8?",
    options: ["84", "92", "96", "108"],
    answer: 2,
  },
  {
    question: "Find the next number: 2, 4, 6, 8, __",
    options: ["9", "10", "12", "14"],
    answer: 1,
  },
  {
    question:
      "A train travels 60 km in one hour. How far will it travel in 3 hours at the same speed?",
    options: ["120 km", "150 km", "180 km", "200 km"],
    answer: 2,
  },
  {
    question: "Which number is a prime number?",
    options: ["9", "15", "21", "13"],
    answer: 3,
  },
];

const questionNumber = document.getElementById("questionNumber");
const scorePreview = document.getElementById("scorePreview");
const progressBar = document.getElementById("quizProgressBar");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const quizMessage = document.getElementById("quizMessage");
const nextBtn = document.getElementById("nextBtn");
const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");
const retryBtn = document.getElementById("retryBtn");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let quizFinished = false;

function showQuestion() {
  const current = questions[currentQuestion];

  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

  scorePreview.textContent = `Score: ${score}`;

  progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;

  questionText.textContent = current.question;
  optionsContainer.replaceChildren();
  quizMessage.textContent = "";
  selectedAnswer = null;
  nextBtn.disabled = true;

  current.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "quiz-option";
    button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;

    button.addEventListener("click", function () {
      if (selectedAnswer !== null) return;

      selectedAnswer = index;

      const optionButtons = optionsContainer.querySelectorAll(".quiz-option");

      optionButtons.forEach((item) => {
        item.disabled = true;
      });

      button.classList.add("selected");

      if (selectedAnswer === current.answer) {
        score++;
        quizMessage.textContent = "Correct answer!";
      } else {
        quizMessage.textContent = `Incorrect. Correct answer: ${current.options[current.answer]}`;
      }

      scorePreview.textContent = `Score: ${score}`;
      nextBtn.disabled = false;
    });

    optionsContainer.appendChild(button);
  });

  nextBtn.textContent =
    currentQuestion === questions.length - 1
      ? "Submit Quiz"
      : "Next Question →";
}

function finishQuiz() {
  quizFinished = true;

  const percentage = Math.round((score / questions.length) * 100);

  quizCard.hidden = true;
  resultCard.hidden = false;

  progressBar.style.width = "100%";
  finalScore.textContent = `Your score: ${score}/${questions.length} (${percentage}%)`;

  if (percentage >= 80) {
    resultMessage.textContent = "Excellent work! Keep practising.";
  } else if (percentage >= 50) {
    resultMessage.textContent = "Good effort! Practise to improve your score.";
  } else {
    resultMessage.textContent = "Keep learning and try the quiz again.";
  }

  try {
    const previousResults = JSON.parse(
      localStorage.getItem("quizResults") || "[]",
    );

    if (!Array.isArray(previousResults)) {
      throw new Error("Invalid quiz results");
    }

    previousResults.push({
      title: "Aptitude Quiz",
      score: percentage,
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem("quizResults", JSON.stringify(previousResults));
  } catch (error) {
    resultMessage.textContent +=
      " Note: Your result could not be saved in this browser.";
  }
}

nextBtn.addEventListener("click", function () {
  if (selectedAnswer === null || quizFinished) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    finishQuiz();
  }
});

retryBtn.addEventListener("click", function () {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;
  quizFinished = false;

  quizCard.hidden = false;
  resultCard.hidden = true;

  showQuestion();
});

showQuestion();
