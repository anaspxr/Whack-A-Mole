var moleImage = document.getElementsByClassName("moleImg");
var contents = document.getElementById("content_wrapper");
var playButton = document.getElementById("play")

var randomNum = Math.round(Math.random() * 9);
function playClick() {
  var play = document.getElementById("play");
  play.innerHTML = "Restart";
  moleImage[randomNum].style.display = "block";
}

function whack() {
  moleImage[randomNum].style.display = "none";
  randomNum = Math.round(Math.random() * 9);
  moleImage[randomNum].style.display = "block";
  console.log(moleImage[randomNum])
}

playButton.addEventListener("click",function(){playClick()})














// function unwrap() {
//   var el = document.getElementById("content_wrapper");
//   var play = document.getElementById("play");
//   if (el.style.display == "none") el.style.display = "flex";
//   play.style.display = "none";
// }
