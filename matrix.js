const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

// Global variables
let fontSize = 16;
let columns;
let drops = [];

// Adjust canvas to full screen and reinitialize drops
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Dynamically adjust font size based on screen width
  fontSize = Math.max(14, Math.floor(canvas.width / 90)); // Minimum 14px
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}

// Initial setup
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Characters for falling effect
const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@!*%&";

// Draw falling letters
function draw() {
  // Slightly fade previous frame to create a trailing effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00FF00"; // Neon green
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Reset drop randomly after reaching the bottom
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

// Animate every 30ms
setInterval(draw, 30);
