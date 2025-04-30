const bird = document.getElementById("bird");
const pipeTop = document.getElementById("pipe-top");
const pipeBottom = document.getElementById("pipe-bottom");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("start-btn");

let birdTop = 200;
let gravity = 1;
let jump = -20;
let velocity = 0;
let pipeSpeed = 2;
let gameOver = false;
let score = 0;

let pipeGap = 150;
let pipeWidth = 60;
let pipeHeight = 300;
let pipeFrequency = 90;

let pipeTimer = 0;

let jumpSound = new Audio("jump.mp3");
let pointSound = new Audio("point.mp3");
let hitSound = new Audio("hit.mp3");
let dieSound = new Audio("die.mp3");

document.addEventListener("keydown", () => {
  if (!gameOver) {
    velocity = jump;
    jumpSound.play();
  }
});

startBtn.addEventListener("click", startGame);

function startGame() {
  birdTop = 200;
  velocity = 0;
  score = 0;
  gameOver = false;
  scoreDisplay.textContent = "Score: " + score;
  pipeTop.style.left = "400px";
  pipeBottom.style.left = "400px";
  startBtn.style.display = "none";
  gameLoop();
}

function gameLoop() {
  if (gameOver) return;

  velocity += gravity;
  birdTop += velocity;
  bird.style.top = birdTop + "px";

  let pipeLeft = parseInt(pipeTop.style.left);
  pipeLeft -= pipeSpeed;
  pipeTop.style.left = pipeLeft + "px";
  pipeBottom.style.left = pipeLeft + "px";

  if (pipeLeft < -pipeWidth) {
    pipeLeft = 400;
    let pipeHeight = Math.floor(Math.random() * 200) + 50;
    pipeTop.style.height = pipeHeight + "px";
    pipeBottom.style.height = 600 - pipeHeight - pipeGap + "px";
    score++;
    scoreDisplay.textContent = "Score: " + score;
    pointSound.play();
  }

  if (
    birdTop < 0 ||
    birdTop > 570 ||
    (pipeLeft < 110 &&
      pipeLeft > 50 &&
      (birdTop < parseInt(pipeTop.style.height) ||
        birdTop > 600 - parseInt(pipeBottom.style.height)))
  ) {
    hitSound.play();
    gameOver = true;
    dieSound.play();
    startBtn.style.display = "block";
    return;
  }

  pipeTimer++;
  if (pipeTimer > pipeFrequency) {
    pipeTimer = 0;
    let pipeHeight = Math.floor(Math.random() * 200) + 50;
    pipeTop.style.height = pipeHeight + "px";
    pipeBottom.style.height = 600 - pipeHeight - pipeGap + "px";
  }

  requestAnimationFrame(gameLoop);
}
