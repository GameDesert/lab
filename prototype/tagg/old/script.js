const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 145;
const currentFrame = index => (
  `assets/sequence/${index.toString().padStart(4, '0')}.png`
)

const preloadImages = () => {
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(0);
canvas.width=720;
canvas.height=1080;
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
  console.log(index)
  if (index >= 144 ) {
    console.log("SWITCH")
    document.getElementById("hero-lightpass").style.position = "relative";
    document.getElementById("hero-lightpass").style.top = "0px";
    document.getElementById("scroll-indicator").style.opacity = 0;
  } else {
    document.getElementById("hero-lightpass").style.position = "fixed";
    document.getElementById("hero-lightpass").style.top = "50%";
    document.getElementById("scroll-indicator").style.opacity = 1;
  }
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  // const maxScrollTop = html.scrollHeight - window.innerHeight;
  const maxScrollTop = 4*window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages();