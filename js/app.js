// CREATE A QUIZ CLASS
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

// Create a question Class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// NOW DISPLAY THE QUESTIONS
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

// GUESS ANSWER
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};

// SHOW QUIZ PROGRESS
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML =
        `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

// SHOW SCORES
function showScores() {
    let quizEndHTML =
        `
    <h1>Quiz Completed</h1>
    <h2 id='score'>You scored: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Take Quiz Again</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

// create questions here
let questions = [
    new Question(
        "Which of the following is not an area in Ibadan?", ["Iwo road", "Gbagi", "Lekki", "Ojoo"], "Lekki"
    ),
    new Question(
        "Which of the following is not a product of Google?", ["Youtube", "Gmail", "Netflix", "Google drive"], "Netflix"
    ),
    new Question(
        "Which of the following is not an even number?", ["2", "4", "8", "9"], "9"
    ),
    new Question(
        "Product designer is to ideate and software engineer is to?", ["VS Code", "Figma", "Implement", "Brainstorm"], "Implement"
    ),
    new Question(
        "Jesus wept is found in", ["Hebrew", "Hosea", "Isaiah", "Genesis"], "Hebrew"
    ),
    new Question(
        "Yoruba is to pepper, Hausa is to Submission and Igbo is to?", ["Aba", "Bottle", "Pride", "Money"], "Money"
    ),
    new Question(
        "The following are example of life science courses except?", ["Biochemistry", "Medicine and Surgery", "Biology", "Zoology"], "Medicine and Surgery"
    ),
    new Question(
        "How many geo-political zone do we have in Nigeria?", ["7", "4", "5", "6"], "6"
    ),
    new Question(
        "Which of the following is not an area in Ekiti?", ["Ilupeju", "Aramoko", "Ikorodu", "Ilawe"], "Ikorodu"
    ),
    new Question(
        "China can be found in?", ["Africa", "Europe", "Asia", "Russia"], "Asia"
    )
];

// INITIALIZE quiz
let quiz = new Quiz(questions);

// display questions
displayQuestion();


// Add A CountDown for the Quiz
let time = 2;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}

startCountdown();