var moleImage = document.getElementsByClassName("moleImg");
var contents = document.getElementById("content_wrapper");
var playButton = document.getElementById("play");
var holes = document.getElementsByClassName("hole");

var score = 0;
var highScore = 0;
var health = 3;
var moleNum = 4;
var moleTimeout = null;
var restartCheck = false;
var moleLevel = 1;
var speed = 2000;

//event listeners
playButton.addEventListener("click", playClick);
for (i = 0; i < holes.length; i++) {
  holes[i].addEventListener("click", whack);
}

function randomNumMaker(prev) {
  //generates a random number
  //if its the same as the previous one,increment.
  var randomNum = Math.floor(Math.random() * 8);
  if (prev === randomNum) {
    if (prev === 8) {
      randomNum = 0;
    } else {
      randomNum = randomNum + 1;
    }
  }
  return randomNum;
}

function playClick() {
  //When clicking the play button
  //if its the first time (button text is play),a middle mole is displayed
  //if the button text is restart,the restart function is called
  if (playButton.innerHTML == "Play!!") {
    playButton.innerHTML = "Restart";
    moleImage[moleNum].style.display = "block";
  } else {
    restart();
  }
}

function whack(event) {
  //When clicking any holes after starting the game
  //if click the correct hole,score increment and calls the moleDisplay function to display next mole
  //else decrement the score
  var clickedMole = event.target;
  if (clickedMole.id == moleNum) {
    score++;
    moleDisplay();
  } else {
    score--;
  }
  scoreDisplay();
}

function moleDisplay() {
  //hides the current visible mole and reveal next random mole
  if (restartCheck == true) {
    moleImage[moleNum].style = "none";
    moleNum = 4;
    moleImage[moleNum].style.display = "block";
    restartCheck = false;
  } else {
    level();
    moleImage[moleNum].style = "none";
    moleNum = randomNumMaker(moleNum);
    moleImage[moleNum].style.display = "block";
    timeOut();
  }
}

function moleInterval() {
  //this function is called after a certain time interval
  //hides the current visible mole after a certain time and reduces health
  health--;
  scoreDisplay();
  if (health <= 0) {
    clearTimeout(moleTimeout);
    setTimeout(function () {
      window.alert("Game over..!!")
    }, 10);
    restart();
    setTimeout(function() {
      window.alert("Game over..!! \n Score:" + score + "\n health:0");
    health = 3;
  },  10);
    
  }
  else moleDisplay();
}

function timeOut() {
  //calls the moleInterval function when needed
  if (timeOut !== null) {
    clearTimeout(moleTimeout);
  }
  moleTimeout = setTimeout(moleInterval, speed);
}

function restart() {
  //checks the high score and resets the score and health to restart
  if (score > highScore) highScore = score;
  score = 0;
  health = 3;
  scoreDisplay();
  clearTimeout(moleTimeout);
  restartCheck = true;
  moleDisplay();
}

function scoreDisplay() {
  document.getElementById("score").innerHTML = "Score:" + score;
  document.getElementById("health").innerHTML = "Health:" + health;
  document.getElementById("level").innerHTML = "Level:" + moleLevel;
  document.getElementById("highScore").innerHTML = "High score:" + highScore;
}

function level() {
  //finding level
  if (score > 15) moleLevel = 4;
  else if (score > 10) moleLevel = 3;
  else if (score > 5) moleLevel = 2;
  else moleLevel = 1;
  //increasing speed
  switch (moleLevel) {
    case 1:
      speed = 1500;
      break;
    case 2:
      speed = 1300;
      break;
    case 3:
      speed = 1000;
      break;
    case 4:
      speed = 500;
      break;
    default:
      console.log("default switch error")
      break;
  }
}
