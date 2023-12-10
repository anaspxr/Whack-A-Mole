var moleImage = document.getElementsByClassName("moleImg");
var contents = document.getElementById("content_wrapper");
var playButton = document.getElementById("play");
var holes = document.getElementsByClassName("box");
var playGround = document.getElementById("ground2") 

//to preload the image and audio files
var mole1 = new Image();
mole1.src = "imgs/mole1.png";
var mole2 = new Image();
mole2.src = "imgs/mole2.png";
var mole3 = new Image();
mole3.src = "imgs/mole3.png";
var mole4 = new Image();
mole4.src = "imgs/mole4.png";
var mole1hit = new Image();
mole1hit.src = "imgs/mole1hit.png";
var mole2hit = new Image();
mole2hit.src = "imgs/mole2hit.png";
var mole3hit = new Image();
mole3hit.src = "imgs/mole3hit.png";
var mole4hit = new Image();
mole4hit.src = "imgs/mole4hit.png";
var hammer = new Image();
hammer.src = "imgs/hammer.png"
var hitSound = new Audio("audio/bonk.mp3")

var score = 0;
var highScore = 0;
var health = 6;
var moleNum = 0;
var moleTimeout = null;
var restartCheck = false;
var moleLevel = 1;
var speed = 2000;
var hitFlag = false;
var tempNum = 4;
 
//event listeners
playButton.addEventListener("click", playClick);
for (i = 0; i < holes.length; i++) {
  holes[i].addEventListener("click", whack);
}

playGround.style.cursor = hammer.src;

function randomNumMaker(prev) {
  //generates a random number
  //if its the same as the previous one,increment.
  var randomNum = Math.floor(Math.random() * 7);
  if (prev === randomNum) {
    if (prev === 7) {
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
  moleImage[moleNum].src = "imgs/mole1.png";
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
    hitSound.currentTime = 0;
    hitSound.play()
    score++;
    hitFlag = true 
    moleDisplay();
  }
  scoreDisplay();
}

function moleDisplay() {
  //hides the current visible mole and reveal next random mole
  if (restartCheck == true) {
    moleImage[moleNum].style = "none";
    moleNum = 0;
    moleImage[moleNum].src = "imgs/mole1.png";
    moleImage[moleNum].style.display = "block";
    restartCheck = false;
  } else {
    //if the player hit the correct mole,displays a hit mole image and disappears after 300ms
    tempNum=moleNum;
    moleNum = randomNumMaker(moleNum);
    level();
    moleImage[moleNum].style.display = "block";
    timeOut();
    if(hitFlag == true){
      moleHit();
      hitFlag=false;
      setTimeout(()=> {
        moleImage[tempNum].style = "none";
      },300);
    }
    else{
      moleImage[tempNum].style = "none";
    }
    
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
      window.alert("Game over..!!");
    }, 10);
    restart();
  } else moleDisplay();
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
  health = 6;
  moleLevel = 1;
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
      moleImage[moleNum].src = "imgs/mole1.png";
      break;
    case 2:
      speed = 1300;
      moleImage[moleNum].src = "imgs/mole2.png";
      break;
    case 3:
      speed = 1000;
      moleImage[moleNum].src = "imgs/mole3.png";
      break;
    case 4:
      speed = 500;
      moleImage[moleNum].src = "imgs/mole4.png";
      break;
    default:
      console.log("default switch error");
      break;
  }
}

function moleHit() {
  if (moleLevel == 4) moleImage[tempNum].src ="imgs/mole4hit.png";
  else if (moleLevel == 3) moleImage[tempNum].src = "imgs/mole3hit.png";
  else if (moleLevel == 2) moleImage[tempNum].src ="imgs/mole2hit.png";
  else moleImage[tempNum].src = "imgs/mole1hit.png";
}
