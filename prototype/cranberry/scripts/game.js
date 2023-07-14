function convertLinks(text) {
    text = text.replace("/#","<span class='link' onclick='gamemove(`")
    text = text.replace("/+","<span class='file' onclick='getfile(`")
    text = text.replace("/-","`);'>")
    text = text.replace("-/","</span>")
}

function retrieveSounds(name) {
    var audio = new Audio(`assets/soundscape/${name}.mp3`);
    audio.play();
}

function gamemove() {

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