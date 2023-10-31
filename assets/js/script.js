var questions = [
    {
        question: "What does 'JS' stand for in JavaScript?",
        options: ["JustScript", "JavaStyle", "JavaScript", "JollyStrings"],
        correctAnswer: "JavaScript"
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "function", "varName", "if"],
        correctAnswer: "var"
    },
    {
        question: "How do you create a single-line comment in JavaScript?",
        options: ["<!-- This is a comment -->", "// This is a comment", "' This is a comment", "/* This is a comment */"],
        correctAnswer: "// This is a comment"
    },
    {
        question: "What is the correct way to write a function in JavaScript?",
        options: ["function = myFunction()", "function: myFunction()", "function myFunction()", "myFunction(): function"],
        correctAnswer: "function myFunction()"
    },

    {
        question: "Which operator is used for equality comparison in JavaScript?",
        options: ["==", "===", "=", "!="],
        correctAnswer: "==="
    },

    {
        question: "What does NaN stand for?",
        options: ["Not a Number", "New and Negated", "Nearly a Number", "None at all"],
        correctAnswer: "Not a Number"
    },

    {
        question: "What would return in the console from the following console.log(5 +'5') ",
        options: ["10", "True", "55", "error"],
        correctAnswer: "55"
    },

    {
        question: "What is the JavaScript syntax for printing to the console?",
        options: ["log.console('Hello World');", "print('Hello World');", "console.log('Hello World');", "write('Hello World');"],
        correctAnswer: "console.log('Hello World');"
    },
    {
        question: "Which data type is used for true/false values in JavaScript?",
        options: ["boolean", "string", "number", "array"],
        correctAnswer: "boolean"
    },

    {
        question: "What does the 'this' keyword refer to in JavaScript?",
        options: ["It refers to the current function", "It refers to the global object", "It refers to the previous function", "It refers to the parent object"],
        correctAnswer: "It refers to the parent object"
    }
];

var currentQuestionIndex = 0;
var score = 0;
var timer;
var userScores = [];

function startQuiz() {
    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    userScores = JSON.parse(localStorage.getItem("userScores")) || [];
    showQuestion(questions[currentQuestionIndex]);
    timer = setInterval(updateTimer, 1000);
}

function showQuestion(question) {
    var questionElement = document.getElementById("question");
    var optionsElement = document.getElementById("options");
    questionElement.innerText = question.question;
    optionsElement.innerHTML = "";
    question.options.forEach(function (option) {
        var button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", selectOption);
        optionsElement.appendChild(button);
    });
}

function selectOption(event) {
    var selectedOption = event.target.innerText;
    var correct = selectedOption === questions[currentQuestionIndex].correctAnswer;
    if (correct) {
        score += 100;
        showFeedback("Correct!");
    } else {
        var timeElement = document.getElementById("time");
        var remainingTime = parseInt(timeElement.innerText);
        if (remainingTime >= 10) {
            remainingTime -= 10;
        } else {
            remainingTime = 0;
        }
        timeElement.innerText = remainingTime;
        showFeedback("Incorrect!");
    }
    Array.from(document.getElementsByClassName("option-btn")).forEach(function (button) {
        button.disabled = true;
    });
    setTimeout(nextQuestion, 1000);
}

function showFeedback(feedback) {
    var feedbackElement = document.getElementById("feedback-container");
    feedbackElement.innerText = feedback;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        clearInterval(timer);
        showResultInput();
    }
}

function updateTimer() {
    var timeElement = document.getElementById("time");
    var time = parseInt(timeElement.innerText);
    if (time > 0) {
        time--;
        timeElement.innerText = time;
    } else {
        clearInterval(timer);
        Array.from(document.getElementsByClassName("option-btn")).forEach(function (button) {
            button.disabled = true;
        });
        showResultInput();
    }
}

function showResultInput() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("username-container").style.display = "block";
    document.getElementById("try-again-container").style.display = "block";
}

function submitScore() {
    var username = document.getElementById("username").value;
    if (username !== "") {
        var userScore = { username: username, score: score };
        var savedScores = JSON.parse(localStorage.getItem("userScores")) || [];
        savedScores.push(userScore);
        localStorage.setItem("userScores", JSON.stringify(savedScores));
        userScores = savedScores;
        updateScoreboard();
        document.getElementById("result-container").style.display = "none";
        document.getElementById("scoreboard").style.display = "block";
        document.getElementById("restart-container").style.display = "block";
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("username").value = "";
    document.getElementById("username-container").style.display = "none";
    document.getElementById("scoreboard").style.display = "none";
    document.getElementById("restart-container").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    startQuiz();
}

function updateScoreboard() {
    var allScores = JSON.parse(localStorage.getItem("userScores")) || [];
    var scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = "";
    allScores.sort(function (a, b) {
        return b.score - a.score;
    });
    allScores.forEach(function (userScore) {
        var scoreEntry = document.createElement("div");
        scoreEntry.innerText = userScore.username + ": " + userScore.score + " points";
        scoreboard.appendChild(scoreEntry);
    });
}
