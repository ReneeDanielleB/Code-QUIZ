//Retrieve highscores from local storage
function displayHighScores () {
    var scores = JSON.parse(localStorage.getItem("highscores")) || [];
}


//Add highscores history with recent scores first
highcores.sort(function (a, b) {
    return b.score - a.score;
});

//Set li for each highscore
highcores.forEach(function (score) {
    var li = document.createElement("li");
    li.textContent = score.initials + " ~ " + score.score;
});

//Apend highscore on page
var ol = document.getElementById("highscores");
ol.appendChild(li);


//Clear highscores
function deleteHighScores () {
    window.localStorage.removeItem("highscores");
    location.reload();
}
document.getElementById("clear").onclick = deleteHighScores;

//Run function page
displayHighScores();