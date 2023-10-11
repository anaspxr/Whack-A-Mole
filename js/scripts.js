var moleImage = document.getElementsByClassName("moleImg");
var contents = document.getElementById("content_wrapper");
var playButton = document.getElementById("play");
var holes = document.getElementsByClassName("hole");

var score = 0;
var highScore = 0;
var health = 3;
var randomNum = Math.floor(Math.random() * 8);
var moleTimeout = null;

function moleInterval() {
  score--;
  scoreDisplay();
  moleDisplay();
}

function timeOut() {
  if (timeOut !== null) {
    clearTimeout(moleTimeout);
  }
  moleTimeout = setTimeout(moleDisplay, 800);
}

function moleDisplay() {
  moleImage[randomNum].style = "none";
  randomNum = Math.floor(Math.random() * 8);
  moleImage[randomNum].style.display = "block";
}

function Restart() {
  if (score > highScore) highScore = score;
  score = 0;
  health = 3;
  moleDisplay();
}

function playClick() {
  if (playButton.innerHTML == "Play!!") {
    playButton.innerHTML = "Restart";
    moleImage[randomNum].style.display = "block";
  } else {
    Restart();
  }
}
function whack(event) {
  timeOut();
  var clickedMole = event.target;
  if (clickedMole.id == randomNum) {
    score++;
    moleDisplay();
  } else {
    health--;
  }
  scoreDisplay();

  if (health <= 0) {
    window.alert("Game over..!! \n Score:" + score + "\n health:0");
    Restart();
  }
}

function scoreDisplay() {
  document.getElementById("score").innerHTML = "Score:" + score;
  document.getElementById("health").innerHTML = "Health:" + health;
  document.getElementById("highScore").innerHTML = "High score:" + highScore;
}

playButton.addEventListener("click", playClick);

for (i = 0; i < holes.length; i++) {
  holes[i].addEventListener("click", whack);
}
