const codingQuestions = {
  Beginner: [
    {
      title: "Print Hello World",
      description: "Write JavaScript code to print Hello World in the console.",
      example: "Output: Hello World",
      hint: "Use console.log() to print text.",
      answers: [
        'console.log("Hello World");',
        "console.log('Hello World');",
        'console.log("Hello World")',
        "console.log('Hello World')",
      ],
    },
    {
      title: "Add Two Numbers",
      description:
        "Create two variables a = 5 and b = 3, then print their sum.",
      example: "Output: 8",
      hint: "Use let a = 5, let b = 3 and console.log(a + b).",
      answers: [
        "let a = 5; let b = 3; console.log(a + b);",
        "let a = 5; let b = 3; console.log(a+b);",
      ],
    },
  ],

  Intermediate: [
    {
      title: "Even or Odd",
      description:
        "Write JavaScript code to check whether a number n = 8 is even or odd. Print Even or Odd.",
      example: "Output: Even",
      hint: "Use the modulus operator % to check the remainder.",
      answers: [
        'let n = 8; if (n % 2 === 0) { console.log("Even"); } else { console.log("Odd"); }',
        'let n = 8; if(n%2===0){console.log("Even");}else{console.log("Odd");}',
      ],
    },
    {
      title: "Find the Largest Number",
      description: "Given a = 12 and b = 20, print the larger number.",
      example: "Output: 20",
      hint: "Compare the two numbers using an if...else statement.",
      answers: [
        "let a = 12; let b = 20; if (a > b) { console.log(a); } else { console.log(b); }",
        "let a = 12; let b = 20; if(a>b){console.log(a);}else{console.log(b);}",
      ],
    },
  ],

  Advanced: [
    {
      title: "Reverse a String",
      description:
        'Write JavaScript code to reverse the string "hello" and print the result.',
      example: "Output: olleh",
      hint: "Try split(), reverse() and join().",
      answers: [
        'console.log("hello".split("").reverse().join(""));',
        "console.log('hello'.split('').reverse().join(''));",
        'console.log("hello".split("").reverse().join(""))',
        "console.log('hello'.split('').reverse().join(''))",
      ],
    },
    {
      title: "Check a Palindrome",
      description:
        'Check whether "madam" is a palindrome and print true or false.',
      example: "Output: true",
      hint: "Compare the string with its reversed version.",
      answers: [
        'let s = "madam"; console.log(s === s.split("").reverse().join(""));',
        'let s = "madam"; console.log(s===s.split("").reverse().join(""));',
      ],
    },
  ],
};

const difficulty = document.getElementById("difficulty");
const questionList = document.getElementById("questionList");
const questionLevel = document.getElementById("questionLevel");
const questionTitle = document.getElementById("codingQuestionTitle");
const questionDescription = document.getElementById(
  "codingQuestionDescription",
);
const codingExample = document.getElementById("codingExample");
const answerInput = document.getElementById("answerInput");
const checkAnswerBtn = document.getElementById("checkAnswerBtn");
const showHintBtn = document.getElementById("showHintBtn");
const codingFeedback = document.getElementById("codingFeedback");
const codingHint = document.getElementById("codingHint");
const completedCount = document.getElementById("completedCount");

let currentIndex = 0;
let completed = JSON.parse(
  localStorage.getItem("completedCodingQuestions") || "[]",
);

function getCurrentQuestions() {
  return codingQuestions[difficulty.value];
}

function getQuestionId(question) {
  return `${difficulty.value}:${question.title}`;
}

function updateCompletedCount() {
  completedCount.textContent = `Completed: ${completed.length}`;
}

function renderQuestionList() {
  questionList.replaceChildren();

  getCurrentQuestions().forEach((question, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "question-item";
    button.textContent = `${index + 1}. ${question.title}`;

    if (index === currentIndex) {
      button.classList.add("active");
    }

    if (completed.includes(getQuestionId(question))) {
      button.classList.add("completed");
    }

    button.addEventListener("click", () => {
      currentIndex = index;
      showQuestion();
    });

    questionList.appendChild(button);
  });
}

function showQuestion() {
  const question = getCurrentQuestions()[currentIndex];

  questionLevel.textContent = difficulty.value;
  questionTitle.textContent = question.title;
  questionDescription.textContent = question.description;
  codingExample.textContent = question.example;

  answerInput.value = "";
  codingFeedback.textContent = "";
  codingHint.hidden = true;
  codingHint.textContent = "";

  renderQuestionList();
}

function normalizeCode(code) {
  return code.replace(/\s+/g, "").replace(/;+/g, ";").trim();
}

function checkAnswer() {
  const question = getCurrentQuestions()[currentIndex];
  const userAnswer = normalizeCode(answerInput.value);

  if (!userAnswer) {
    codingFeedback.textContent = "Please write your answer first.";
    codingFeedback.style.color = "#b42318";
    return;
  }

  const correct = question.answers.some(
    (answer) => normalizeCode(answer) === userAnswer,
  );

  if (correct) {
    codingFeedback.textContent = "Correct! Question completed.";
    codingFeedback.style.color = "#16803d";

    const id = getQuestionId(question);

    if (!completed.includes(id)) {
      completed.push(id);
      localStorage.setItem(
        "completedCodingQuestions",
        JSON.stringify(completed),
      );
    }

    updateCompletedCount();
    renderQuestionList();
  } else {
    codingFeedback.textContent =
      "Not an exact match for the sample solution. Check the hint and try again.";
    codingFeedback.style.color = "#b42318";
  }
}

difficulty.addEventListener("change", () => {
  currentIndex = 0;
  showQuestion();
});

checkAnswerBtn.addEventListener("click", checkAnswer);

showHintBtn.addEventListener("click", () => {
  codingHint.textContent = getCurrentQuestions()[currentIndex].hint;
  codingHint.hidden = false;
});

updateCompletedCount();
showQuestion();
