let story = {}
fetch('scripts/story.json')
    .then((response) => response.json())
    .then((json) => story = json);

console.log(story)
    
function convertLinks(text) {
    text = text.replaceAll("/#","<span class='link' onclick='gamemove(`")
    text = text.replaceAll("/+","<span class='file' onclick='getfile(`")
    text = text.replaceAll("/-","`);'>")
    text = text.replaceAll("-/","</span>")
    return text
}

function retrieveSounds(name) {
    if (name != "") {
        var audio = new Audio(`assets/soundscape/${name}.mp3`);
        audio.play();
    }
}

function gamemove(page) {
    nexttext = story[page]["body"]
    nexttext = convertLinks(nexttext)
    document.getElementById("gametext").innerHTML = nexttext;
    retrieveSounds(story[page]["sound"])
}

function getfile(title) {
    var img = new Image();

    img.onload = function(){
    var iheight = img.height;
    var iwidth = img.width;

    console.log(iheight)
    console.log(iwidth)

    var docwindow = open(`assets/docs/${title}.png`, "_blank", `popup=true, height=${iheight}, width=${iwidth}`)
    if (!docwindow) {
        console.log("POPUP BLOCKED")
        open(`assets/docs/${title}.png`, "_blank")
      }
    }

    img.src = `assets/docs/${title}.png`;
}