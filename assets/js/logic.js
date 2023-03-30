//Identify elements
let questions = document.querySelector("#questions");
let timer = document.querySelector("#time");
let choices = document.querySelector("#choices");
let submitBtn = document.querySelector("#submit");
let startBtn = document.querySelector("#start");
let initials = document.querySelector("#initials");
let feedback = document.querySelector("#feedback");

let questionIndex = 0;
let time = questions.length * 15;
let timerId;

const audioPass = new Audio("./assets/sfx/correct.wav");
const audioFail = new Audio("./assets/sfx/incorrect.wav");

//Start quiz
function startQuiz() {
    let startScreen = document.getElementById("start-screen");
    startScreen.setAttribute("class", "hide");

    questions.removeAttribute("class");

    timerId = setInterval("clockTick, 1000");
    
    timer.textContent = time;

    fetchQuestions();
}

//Display questions
function fetchQuestions () {
    let currentQuestion = questions[questionIndex];

    let title = document.getElementById("question-title");
    title.textContent = currentQuestion.title;

    choices.innerHTML = "";

    //choices loop
    currentQuestion.choices.forEach(function(choice, i) {
       let choiceNode = document.createElement("button");
       choiceNode.setAttribute("class", "choice");
       choiceNode.setAttribute("value", choice);
       
       choiceNode.textContent = i + 1 + "." + choice;

       choiceNode.onClick = questionClick;

       choices.appendChild(choiceNode);
    });
}

function questionClick() {
    //If user guesses wrong deduct time
    if (this.value !== questions[questionIndex].answer) {
        time -= 10;

        if (time < 0) {time = 0;}

        //Display updated time
        timer.textContent = time;
        feedback.textContent = "Try again!";
        feedback.getElementsByClassName.color = "red";
        feedback.getElementsByClassName.fontSize = "300%";

        //Fail audio
        audioFail.play();
    } else {
        feedback.textContent = "Yay, you got it!";
        feedback.getElementsByClassName.color = "green";
        feedback.getElementsByClassName.fontSize = "300%";

        //Pass audio
        audioPass.play();
    } 

    feedback.setAttribute("class", "feedback");

    setTimeout(function() {
        feedback.setAttribute("class", "feedback hide");
    } , 1000);

    //Start next question
    questionIndex++;

    if (questionIndex === questions.length) {
        endQuiz();
    } else {
        getQuestion();
    }
}
    
function endQuiz() {
    clearInterval(timerId);

    //Display final screen
    let endScreen = document.getElementById("end-screen");
    endScreen.removeAttribute("class");

    let finalScore = document.getElementById("final-score");
    finalScore.textContent = time;

    questions.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timer.textContent = time;

    if (time <= 0) {endQuiz();}
}

function storeHighscore() {
    let initials = initials.valu.trim();

    if (initials !== "") {
     let highscores = 
        JSON.parse(window.localStorage.getItem("highscores")) || [];

        let recentScore = {
            score : time,
            initials : initials
        };

        //Store in local store
        highscores.push(recentScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        //Trigger highscores page
        window.location.href = "highscores.html";
    }
}

function initialsEvent(event) {
    if (event.key === "Enter") {
        storeHighscore();
    }
}

submitBtn.onClick = storeHighscore;

startBtn.onClick = startQuiz;

initials.onkeyup = initialsEvent;

