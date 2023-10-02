var contents = document.getElementById("content_wrapper")
 contents.style.display = "none";
  
 
function unwrap() {
    var el = document.getElementById("content_wrapper");
    var play = document.getElementById("play");
if (el.style.display == "none") el.style.display = "flex"; play.style.display="none"; 
}

