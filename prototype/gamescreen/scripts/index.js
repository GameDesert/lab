/* CHECKING FULLSCREEN */

document.addEventListener("fullscreenchange", function() {
    checkFullscreen();
});
document.addEventListener("webkitfullscreenchange", function() {
    checkFullscreen();
});
document.addEventListener("mozfullscreenchange", function() {
    checkFullscreen();
}); 

window.onresize = function (event) {
    checkFullscreen();
}

function checkFullscreen() {
    if (document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) {
        fullscreenEntered();
    } else {
        var maxHeight = window.screen.height,
        maxWidth = window.screen.width,
        curHeight = window.innerHeight,
        curWidth = window.innerWidth;
        if(maxWidth == curWidth && maxHeight == curHeight) {
            fullscreenEntered();
        } else {
            fullscreenExited();
        }
    }
}

function toggleFullscreen() {
    if (document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement)
    {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        fullscreenExited();
    } else {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
            document.documentElement.webkitRequestFullscreen();
          } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
            document.documentElement.msRequestFullscreen();
          }
          fullscreenEntered();
    }
}

function fullscreenExited() {
    document.getElementById("fullscreen").style.color = "rgba(255, 255, 255, 0.75)";
    document.getElementById("settings-icon").style.color = "rgba(255, 255, 255, 0.75)";
    document.getElementById("fullscreen-icon").setAttribute("class", "mdi mdi-fullscreen");
}

function fullscreenEntered() {
    document.getElementById("fullscreen").style.color = "rgba(255, 255, 255, 0.1)";
    document.getElementById("settings-icon").style.color = "rgba(255, 255, 255, 0.1)";
    document.getElementById("fullscreen-icon").setAttribute("class", "mdi mdi-fullscreen-exit");
}

/* CLOCK */

var timeformat24hr = false

function changeTimeFormat(object) {
    if (object.checked == true) {
        timeformat24hr = true
    } else if (object.checked == false) {
        timeformat24hr = false
    }
}

function currentTime() {
    var date = new Date(); /* creating object of Date class */
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    if (timeformat24hr == true) {
        hour = updateTime(hour);
        min = updateTime(min);
        sec = updateTime(sec);
        document.getElementById("clock").innerText = hour + ":" + min + ":" + sec; /* adding time to the div */
        var t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */
    } else if (timeformat24hr == false) {
        var midday = "AM";
        midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
        hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour); /* assigning hour in 12-hour format */
        hour = updateTime(hour);
        min = updateTime(min);
        sec = updateTime(sec);
        document.getElementById("clock").innerText = hour + ":" + min + ":" + sec + " " + midday; /* adding time to the div */
            var t = setTimeout(currentTime, 1000); /* setting timer */
    }
}
  
  function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
  }
  
  currentTime(); /* calling currentTime() function to initiate the process */

/* SETTINGS MODAL */

// Get the modal
var modal = document.getElementById("settings");

// Get the button that opens the modal
var btn = document.getElementById("settingsButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/* BACKGROUND */
function updateBackground(bg) {
    document.getElementById("bg").style.backgroundImage = "url(assets/backgrounds/" + bg + ".png)"
}

document.getElementById("blur-option").checked = false;

function changeBlur(object) {
    if (object.checked == true) {
        document.getElementById("bgblurstyle").innerHTML = '.bg:after {content: ""; opacity: 1; position: absolute; width: 100%; height: 100%; backdrop-filter: blur(5px); /* apply the blur */ pointer-events: none; /* make the overlay click-through */}';
    } else {
        document.getElementById("bgblurstyle").innerHTML = '.bg:after {content: ""; opacity: 1; position: absolute; width: 100%; height: 100%; backdrop-filter: blur(0px); /* apply the blur */ pointer-events: none; /* make the overlay click-through */}';
    }
}