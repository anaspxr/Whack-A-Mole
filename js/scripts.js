var moleImage = document.getElementsByClassName("moleImg");
var contents = document.getElementById("content_wrapper");
var playButton = document.getElementById("play");
var holes = document.getElementsByClassName("hole");

var score = 0;
var health = 3;

var randomNum = Math.round(Math.random() * 8);
function playClick() {
  if (playButton.innerHTML == "Play!!") {
    playButton.innerHTML = "Restart";
    moleImage[randomNum].style.display = "block";
  } else {
    score = 0;
    health = 3;
    moleImage[randomNum].style.display = "none";
    randomNum = Math.round(Math.random() * 8);
    moleImage[randomNum].style.display = "block";
  }
}
function whack(event) {
  
  var clickedMole=event.target;

  if(clickedMole.id==randomNum){
    score++;
    
    moleImage[randomNum].style.display = "none";
    randomNum = Math.round(Math.random() * 8);
    moleImage[randomNum].style.display = "block";
  }
  else{
    health--;
  }
  console.log("score=",score)
  console.log("health=",health)
}

playButton.addEventListener("click", playClick);

for (i = 0; i < holes.length; i++) {
  holes[i].addEventListener("click", whack);
}
