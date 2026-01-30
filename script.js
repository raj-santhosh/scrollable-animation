const canvas = document.getElementById("scroll-canvas");
const context = canvas.getContext("2d");

const frameCount = 224;
const currentFrame = index =>
  `images/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = [];
const imageSeq = {
  frame: 1
};

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Draw image to canvas (cover style)
function drawImage(img) {
  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const x = (canvas.width / 2) - (img.width / 2) * scale;
  const y = (canvas.height / 2) - (img.height / 2) * scale;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    img,
    x,
    y,
    img.width * scale,
    img.height * scale
  );
}

// First image
images[0].onload = () => {
  drawImage(images[0]);
};

// Scroll control
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScroll;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => {
    drawImage(images[frameIndex]);
  });
});

// Resize handling
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
