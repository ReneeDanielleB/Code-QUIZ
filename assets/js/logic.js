//timer
let count = 60;
let timer;

function startTimer() {
    timer = setInterval(function() {
        count--;
        if (count === 0) {
            clearInterval(timer);
            alert("Time's up!");
        }
        document.getElementById("timer").textContent = count;
    }, 1000);
}

//local storage
localStorage.setItem("key","value"); 

const value = localStorage.getItem("key");

localStorage.removeItem("key");

function startQuiz() {
    document.getElementById("start").addEventListener("click", );
}