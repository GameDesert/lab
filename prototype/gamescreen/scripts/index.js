document.getElementById("copyright-current-year").innerHTML = new Date().getFullYear();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

document.getElementById("blur-option").checked = false; // Watch this one when adding cookies

function changeBlur(object) {
    if (object.checked == true) {
        document.getElementById("bgblurstyle").innerHTML = '.bg:after {content: ""; opacity: 1; position: absolute; width: 100%; height: 100%; backdrop-filter: blur(5px); /* apply the blur */ pointer-events: none; /* make the overlay click-through */}';
    } else {
        document.getElementById("bgblurstyle").innerHTML = '.bg:after {content: ""; opacity: 1; position: absolute; width: 100%; height: 100%; backdrop-filter: blur(0px); /* remove the blur */ pointer-events: none; /* make the overlay click-through */}';
    }
}

/* COOKIES */

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function executesavedsettings() {
    updateBackground(document.getElementById('background-selection').value)
    // Carries out functions based on saved cookies.
    if (getCookie("background") != "") {updateBackground(getCookie("background"));}
    console.log("Background saved as " + getCookie("background"))

    if (getCookie("blur") == "true") {
        document.getElementById("blur-option").checked = true;
        document.getElementById("bgblurstyle").innerHTML = '.bg:after {content: ""; opacity: 1; position: absolute; width: 100%; height: 100%; backdrop-filter: blur(5px); /* apply the blur */ pointer-events: none; /* make the overlay click-through */}';
    } else {
        document.getElementById("blur-option").checked = false;
        document.getElementById("bgblurstyle").innerHTML = '.bg:after {content: ""; opacity: 1; position: absolute; width: 100%; height: 100%; backdrop-filter: blur(0px); /* remove the blur */ pointer-events: none; /* make the overlay click-through */}';
    }
    console.log("Blur saved as " + getCookie("blur"))

    if (getCookie("24hr") == "true") {
        timeformat24hr = true
    } else {
        timeformat24hr = false
    }
    console.log("24 hour time saved as " + getCookie("24hr"))

}

function savesettings() {
    document.cookie = "background="+document.getElementById('background-selection').value+";max-age=31536000;samesite=strict" // Creates a cookie to enable blur that expires in 365 days.
    document.cookie = "24hr="+document.getElementById("time-option").checked+";max-age=31536000;samesite=strict" // Creates a cookie to enable blur that expires in 365 days.
    document.cookie = "blur="+document.getElementById("blur-option").checked+";max-age=31536000;samesite=strict" // Creates a cookie to enable blur that expires in 365 days.
    console.log(document.cookie)
}

/* DICE */
let currentdie = "d20"

function selectsides(object) {
    var previousselect = document.getElementsByClassName('selected-die')[0].setAttribute("class",document.getElementsByClassName('selected-die')[0].getAttribute("class").replace(" selected-die",""));
    var newselectpre = document.getElementById(object).setAttribute("class",document.getElementById(object).getAttribute("class")+" selected-die");
    console.log(object + " selected")
    rolldie(object)
}

function rolldie(die) {
    if (die == "d2") {
        document.getElementById("roller-display").innerHTML = dice_vectors["d2"][getRandomInt(0, 1)];
    } else if (die == "d4") {
        document.getElementById("roller-display").innerHTML = dice_vectors["d4"][getRandomInt(0, 3)]; 
    } else if (die == "d6") {
        document.getElementById("roller-display").innerHTML = dice_vectors["d6"][getRandomInt(0, 5)]; 
    } else if (die == "d8") {
        document.getElementById("roller-display").innerHTML = dice_vectors["d8-10"][0].replace("_rollnum_",getRandomInt(1, 8)); 
    }  else if (die == "d10") {
        document.getElementById("roller-display").innerHTML = dice_vectors["d8-10"][0].replace("_rollnum_",getRandomInt(1, 10)); 
    }  else if (die == "d12") {
        document.getElementById("roller-display").innerHTML = dice_vectors["d12"][0].replace("_rollnum_",getRandomInt(1, 12)); 
    }  else if (die == "d20") {
        document.getElementById("roller-display").innerHTML = dice_vectors["d20"][0].replace("_rollnum_",getRandomInt(1, 20)); 
    }
}

dice_vectors = {
    "d2":[
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" viewBox="0 0 24 24" version="1.1" id="svg4" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs8" /><path id="path2" d="M 12 2 A 10 10 0 0 0 2 12 A 10 10 0 0 0 12 22 A 10 10 0 0 0 22 12 A 10 10 0 0 0 12 2 z M 12 5.8027344 L 12.667969 6.9472656 L 11.144531 7.2695312 L 12 5.8027344 z M 5.0292969 6.578125 L 8.7167969 9.9316406 L 8.7167969 10.537109 L 9.796875 10.433594 L 9.796875 13.443359 L 9.796875 14.263672 C 9.796875 14.281157 9.7969161 14.298914 9.796875 14.316406 L 8.3144531 14.697266 L 8.3144531 15.097656 L 6.578125 15.097656 L 5.0292969 6.578125 z M 18.970703 6.578125 L 17.421875 15.097656 L 15.685547 15.097656 L 15.685547 14.71875 L 14.308594 14.324219 C 14.308538 14.304421 14.306641 14.28341 14.306641 14.263672 L 14.306641 13.443359 L 14.306641 9.8691406 L 14.306641 9.8398438 L 14.308594 9.7617188 L 14.710938 10.451172 L 18.970703 6.578125 z M 6.578125 16.648438 L 8.3144531 16.648438 L 8.3144531 17.136719 L 15.685547 17.136719 L 15.685547 16.648438 L 17.421875 16.648438 L 17.421875 17.421875 C 17.421875 17.886641 17.113202 18.197266 16.648438 18.197266 L 7.3515625 18.197266 C 6.8867973 18.197266 6.578125 17.886641 6.578125 17.421875 L 6.578125 16.648438 z " /><path d="m 9.7171133,8.5919306 3.4601017,-0.7284424 0.18211,0.130079 -0.05203,1.8471218 v 3.603188 q 0,0.403245 0,0.819498 0,0.403245 0.01301,0.819498 l 1.365829,0.390237 v 0.663403 H 9.3138684 V 15.47311 l 1.4698926,-0.377229 q 0.01301,-0.416253 0.01301,-0.832506 0,-0.416253 0,-0.819498 V 9.3333809 L 9.7171133,9.4374441 Z" style="font-weight:900;font-size:13.0079px;line-height:0;font-family:'Source Serif Pro';-inkscape-font-specification:'Source Serif Pro Heavy';text-align:center;text-anchor:middle;fill:#c7a170;stroke-width:0.999999" id="path1420" /></svg>`,
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" viewBox="0 0 24 24" version="1.1" id="svg4" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs8" /><path id="path2" d="M 12 2 A 10 10 0 0 0 2 12 A 10 10 0 0 0 12 22 A 10 10 0 0 0 22 12 A 10 10 0 0 0 12 2 z M 12 5.8027344 L 17.607422 8.7539062 L 17.607422 9.9335938 L 15.949219 9.9335938 C 15.924712 9.4090809 15.784252 8.9145136 15.517578 8.4589844 C 15.209418 7.9173521 14.744261 7.5289875 14.183594 7.2578125 C 13.59661 6.9612076 12.89564 6.8378906 12.142578 6.8378906 C 11.46096 6.8378906 10.81333 6.9395575 10.201172 7.1582031 C 9.5819322 7.3833809 9.0526913 7.7228752 8.6289062 8.2089844 C 8.1965114 8.7068936 7.9911748 9.2905696 7.9628906 9.9335938 L 6.3925781 9.9335938 L 6.3925781 8.7539062 L 12 5.8027344 z M 14.183594 7.2578125 C 14.187494 7.2597725 14.193396 7.257791 14.197266 7.2597656 L 14.173828 7.2480469 C 14.178128 7.2501169 14.179294 7.2557225 14.183594 7.2578125 z M 15.517578 8.4589844 C 15.519278 8.4619144 15.523791 8.4619038 15.525391 8.4648438 L 15.515625 8.4492188 C 15.517325 8.4521586 15.515806 8.4560344 15.517578 8.4589844 z M 7.5742188 11.115234 L 8.4960938 11.115234 C 8.5890894 11.201569 8.6911003 11.280338 8.8007812 11.349609 C 8.9766939 11.460713 9.1559263 11.538882 9.34375 11.589844 L 9.34375 13.154297 C 9.2762722 13.220089 9.2132465 13.283042 9.1445312 13.349609 C 8.8624329 13.614339 8.5811382 13.887611 8.3007812 14.167969 L 8.0078125 14.460938 L 8.0078125 15.246094 L 7.5742188 15.246094 L 7.5742188 11.115234 z M 11.144531 11.115234 L 11.154297 11.115234 C 11.141043 11.13824 11.127879 11.160772 11.115234 11.183594 L 11.115234 11.144531 C 11.124959 11.134685 11.134594 11.124902 11.144531 11.115234 z M 15.792969 11.115234 L 16.425781 11.115234 L 16.425781 15.246094 L 16.042969 15.246094 L 16.042969 13.341797 L 14.65625 13.341797 L 14.65625 12.800781 C 14.727136 12.746198 14.792322 12.692549 14.84375 12.638672 C 15.286571 12.175094 15.61279 11.669377 15.792969 11.115234 z M 6.3925781 16.425781 L 8.0078125 16.425781 L 8.0078125 17.162109 L 16.042969 17.162109 L 16.042969 16.425781 L 17.607422 16.425781 L 17.607422 18.197266 L 6.3925781 18.197266 L 6.3925781 16.425781 z " /><path d="m 9.0081827,16.162529 v -1.287782 q 0.4162528,-0.416253 0.8325056,-0.80649 0.4162527,-0.403245 0.8064897,-0.793482 0.598364,-0.611371 1.001608,-1.092663 0.416253,-0.494301 0.62438,-0.988601 0.208126,-0.507308 0.208126,-1.118679 0,-0.7414506 -0.325197,-1.1316876 -0.325198,-0.4032449 -0.897546,-0.4032449 -0.05203,0 -0.104063,0 -0.03902,0 -0.104063,0 l -0.117071,0.9365688 q -0.06504,0.4943002 -0.234142,0.7544577 -0.169103,0.247151 -0.390237,0.338206 -0.221135,0.09106 -0.429261,0.09106 -0.2991817,0 -0.5463318,-0.156095 -0.2471501,-0.156094 -0.3772291,-0.416252 0,-0.7284428 0.4292607,-1.222743 0.4422686,-0.5073082 1.1577032,-0.7674662 0.728442,-0.260158 1.599972,-0.260158 0.9886,0 1.599971,0.3121896 0.62438,0.2991818 0.910553,0.8064899 0.299182,0.5073081 0.299182,1.1446947 0,0.975593 -0.832506,1.847122 -0.819497,0.858522 -2.484508,1.821106 -0.247151,0.143087 -0.494301,0.286174 -0.24715,0.143087 -0.481292,0.286174 h 4.383662 v 1.821106 z" style="font-weight:900;font-size:13.0079px;line-height:0;font-family:'Source Serif Pro';-inkscape-font-specification:'Source Serif Pro Heavy';text-align:center;text-anchor:middle;fill:#c7a170;stroke-width:0.999999" id="path1620" /></svg>`
    ],
    "d4":[
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" viewBox="0 0 24 24" version="1.1" id="svg1039" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs1043" /> <path id="path1037" d="M 12 2.6132812 C 11.645 2.6132812 11.290078 2.7858597 11.080078 3.1308594 L 1.1601562 19.359375 C 0.72015669 20.079374 1.240079 21 2.0800781 21 L 21.919922 21 C 22.759921 21 23.279843 20.079374 22.839844 19.359375 L 12.919922 3.1308594 C 12.709922 2.7858597 12.355 2.6132812 12 2.6132812 z " /> <text xml:space="preserve" style="font-size:13.0079px;line-height:0;font-family:'Source Sans Pro';-inkscape-font-specification:'Source Sans Pro, Normal';stroke-width:0.999999" x="12.0065" y="18.136513" id="text353"><tspan id="tspan351" x="12.0065" y="18.136513" style="font-style:normal;font-variant:normal;font-weight:900;font-stretch:normal;font-family:'Source Serif Pro';-inkscape-font-specification:'Source Serif Pro Heavy';text-align:center;text-anchor:middle;fill:#c7a170;fill-opacity:1;stroke-width:0.999999">1</tspan></text></svg>`,
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" viewBox="0 0 24 24" version="1.1" id="svg1039" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs1043" /> <path id="path1037" d="M 12 2.6132812 C 11.645 2.6132812 11.290078 2.7858597 11.080078 3.1308594 L 1.1601562 19.359375 C 0.72015669 20.079374 1.240079 21 2.0800781 21 L 21.919922 21 C 22.759921 21 23.279843 20.079374 22.839844 19.359375 L 12.919922 3.1308594 C 12.709922 2.7858597 12.355 2.6132812 12 2.6132812 z " /> <text xml:space="preserve" style="font-size:13.0079px;line-height:0;font-family:'Source Sans Pro';-inkscape-font-specification:'Source Sans Pro, Normal';stroke-width:0.999999" x="12.0065" y="18.136513" id="text353"><tspan id="tspan351" x="12.0065" y="18.136513" style="font-style:normal;font-variant:normal;font-weight:900;font-stretch:normal;font-family:'Source Serif Pro';-inkscape-font-specification:'Source Serif Pro Heavy';text-align:center;text-anchor:middle;fill:#c7a170;fill-opacity:1;stroke-width:0.999999">2</tspan></text></svg>`,
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" viewBox="0 0 24 24" version="1.1" id="svg1039" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs1043" /> <path id="path1037" d="M 12 2.6132812 C 11.645 2.6132812 11.290078 2.7858597 11.080078 3.1308594 L 1.1601562 19.359375 C 0.72015669 20.079374 1.240079 21 2.0800781 21 L 21.919922 21 C 22.759921 21 23.279843 20.079374 22.839844 19.359375 L 12.919922 3.1308594 C 12.709922 2.7858597 12.355 2.6132812 12 2.6132812 z " /> <text xml:space="preserve" style="font-size:13.0079px;line-height:0;font-family:'Source Sans Pro';-inkscape-font-specification:'Source Sans Pro, Normal';stroke-width:0.999999" x="12.0065" y="18.136513" id="text353"><tspan id="tspan351" x="12.0065" y="18.136513" style="font-style:normal;font-variant:normal;font-weight:900;font-stretch:normal;font-family:'Source Serif Pro';-inkscape-font-specification:'Source Serif Pro Heavy';text-align:center;text-anchor:middle;fill:#c7a170;fill-opacity:1;stroke-width:0.999999">3</tspan></text></svg>`,
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" viewBox="0 0 24 24" version="1.1" id="svg1039" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs1043" /> <path id="path1037" d="M 12 2.6132812 C 11.645 2.6132812 11.290078 2.7858597 11.080078 3.1308594 L 1.1601562 19.359375 C 0.72015669 20.079374 1.240079 21 2.0800781 21 L 21.919922 21 C 22.759921 21 23.279843 20.079374 22.839844 19.359375 L 12.919922 3.1308594 C 12.709922 2.7858597 12.355 2.6132812 12 2.6132812 z " /> <text xml:space="preserve" style="font-size:13.0079px;line-height:0;font-family:'Source Sans Pro';-inkscape-font-specification:'Source Sans Pro, Normal';stroke-width:0.999999" x="12.0065" y="18.136513" id="text353"><tspan id="tspan351" x="12.0065" y="18.136513" style="font-style:normal;font-variant:normal;font-weight:900;font-stretch:normal;font-family:'Source Serif Pro';-inkscape-font-specification:'Source Serif Pro Heavy';text-align:center;text-anchor:middle;fill:#c7a170;fill-opacity:1;stroke-width:0.999999">4</tspan></text></svg>`
    ],
    "d6":[
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" /></svg>`,
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15Z" /></svg>`,
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15Z" /></svg>`,
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15M17,5A2,2 0 0,0 15,7A2,2 0 0,0 17,9A2,2 0 0,0 19,7A2,2 0 0,0 17,5M7,15A2,2 0 0,0 5,17A2,2 0 0,0 7,19A2,2 0 0,0 9,17A2,2 0 0,0 7,15Z" /></svg>`,
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15M17,5A2,2 0 0,0 15,7A2,2 0 0,0 17,9A2,2 0 0,0 19,7A2,2 0 0,0 17,5M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M7,15A2,2 0 0,0 5,17A2,2 0 0,0 7,19A2,2 0 0,0 9,17A2,2 0 0,0 7,15Z" /></svg>`,
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15M17,10A2,2 0 0,0 15,12A2,2 0 0,0 17,14A2,2 0 0,0 19,12A2,2 0 0,0 17,10M17,5A2,2 0 0,0 15,7A2,2 0 0,0 17,9A2,2 0 0,0 19,7A2,2 0 0,0 17,5M7,10A2,2 0 0,0 5,12A2,2 0 0,0 7,14A2,2 0 0,0 9,12A2,2 0 0,0 7,10M7,15A2,2 0 0,0 5,17A2,2 0 0,0 7,19A2,2 0 0,0 9,17A2,2 0 0,0 7,15Z" /></svg>`
    ],
    "d8-10":[
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" viewBox="0 0 24 24" version="1.1" id="svg84" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs88" /> <path id="path82" d="M 12 2 C 11.500001 2 10.999843 2.1898441 10.589844 2.5898438 L 2.5898438 10.589844 C 1.7998445 11.369843 1.7998445 12.630157 2.5898438 13.410156 L 10.589844 21.410156 C 11.369843 22.200155 12.630157 22.200155 13.410156 21.410156 L 21.410156 13.410156 C 22.200155 12.630157 22.200155 11.369843 21.410156 10.589844 L 13.410156 2.5898438 C 13.000157 2.1898441 12.5 2 12 2 z " /> <text xml:space="preserve" style="font-size:13.0079px;line-height:0;font-family:'Source Sans Pro';-inkscape-font-specification:'Source Sans Pro, Normal';letter-spacing:-0.8px;stroke-width:0.999999" x="14.692632" y="16.136513" id="text353"><tspan id="tspan351" x="12.0065" y="16.136513" style="font-style:normal;font-variant:normal;font-weight:900;font-stretch:normal;font-family:'Source Serif Pro';-inkscape-font-specification:'Source Serif Pro Heavy';text-align:center;text-anchor:middle;fill:#c7a170;fill-opacity:1;stroke-width:0.999999">_rollnum_</tspan></text> </svg>`
    ],
    "d12":[
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" viewBox="0 0 24 24" version="1.1" id="svg793" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs797" /> <path id="path791" d="m 12,1.269531 -10.5,7.640625 4,12.359375 h 13 l 4,-12.359375 z" style="fill:#000000" /> <text xml:space="preserve" style="font-size:13.0079px;line-height:0;font-family:'Source Sans Pro';-inkscape-font-specification:'Source Sans Pro, Normal';letter-spacing:-0.8px;stroke-width:0.999999" x="20.829098" y="16.46176" id="text353"><tspan id="tspan351" x="12.0065" y="16.46176" style="font-style:normal;font-variant:normal;font-weight:900;font-stretch:normal;font-family:'Source Serif Pro';-inkscape-font-specification:'Source Serif Pro Heavy';text-align:center;text-anchor:middle;fill:#c7a170;fill-opacity:1;stroke-width:0.999999">_rollnum_</tspan></text> </svg>`
    ],
    "d20":[
        `<svg style="animation-name: spindie; animation-duration: 0.75s; animation-timing-function: ease-out; animation-fill-mode: backwards;" viewBox="0 0 24 24" version="1.1" id="svg1075" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs1079" /> <path id="path1073" d="M 12 2 C 11.79 2 11.589687 2.0596876 11.429688 2.1796875 L 3.5292969 6.6191406 C 3.2092972 6.7891405 3 7.1200004 3 7.5 L 3 16.5 C 3 16.88 3.2092972 17.21086 3.5292969 17.380859 L 11.429688 21.820312 C 11.589687 21.940312 11.79 22 12 22 C 12.21 22 12.410313 21.940312 12.570312 21.820312 L 20.470703 17.380859 C 20.790703 17.21086 21 16.88 21 16.5 L 21 7.5 C 21 7.1200004 20.790703 6.7891405 20.470703 6.6191406 L 12.570312 2.1796875 C 12.410313 2.0596876 12.21 2 12 2 z " /> <text xml:space="preserve" style="font-size:13.0079px;line-height:0;font-family:'Source Sans Pro';-inkscape-font-specification:'Source Sans Pro, Normal';letter-spacing:-0.8px;stroke-width:0.999999" x="65.241249" y="16.136513" id="text353"><tspan id="tspan351" x="12.0065" y="16.136513" style="font-style:normal;font-variant:normal;font-weight:900;font-stretch:normal;font-family:'Source Serif Pro';-inkscape-font-specification:'Source Serif Pro Heavy';text-align:center;text-anchor:middle;fill:#c7a170;fill-opacity:1;stroke-width:0.999999">_rollnum_</tspan></text> </svg>`
    ]
}

/* CURRENCY CONVERTER */

currency_relativity = {
    "dcrown":10,
    "crown":1,
    "tenth":0.1,
    "piece":0.01,
}

function convertCurrencies() {
    multiplier = currency_relativity[document.getElementById("starting-currency").value] / currency_relativity[document.getElementById("final-currency").value]
    document.getElementById("currency-out").innerHTML = document.getElementById("starting-currency-amount").value * multiplier
}

/* WIKI VIEWER */

search_url = "https://expanse.kotla.eu/api.php"

function searchWiki(searchquery) {
    var params = new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: searchquery,
        srprop: "titlesnippet",
        format: "json",
        origin: location.origin
    });
    
    fetch(`${search_url}?${params}`)
        .then(function(response){return response.json();})
        .then(function(response) {
            if (response.query.searchinfo.totalhits != 0){
                for (let resultcount = 0; resultcount < response.query.searchinfo.totalhits; resultcount++) {
                    console.log(response.query.search[resultcount].title)
                } 
            }
        })
        .catch(function(error){console.log(error);});
}