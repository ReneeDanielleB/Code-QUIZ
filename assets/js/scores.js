function displayHighScores () {
    var scores = JSON.parse(localStorage.getItem("highscores")) [];
}

function clearHighScores () {
    window.localStorage.removeItem("");
    location.reload();
}