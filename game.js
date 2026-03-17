const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreDisplay = document.getElementById("score");

const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");

const gameOverScreen = document.getElementById("gameOverScreen");
const playAgainBtn = document.getElementById("playAgain");
const finalScore = document.getElementById("finalScore");

let score = 0;
let gravity = 0.7;

let paused = false;
let gameOver = false;

let player = {
x:120,
y:300,
width:40,
height:40,
vy:0,
jump:false
};

let obstacle = {
x:1000,
y:310,
width:30,
height:30
};

document.addEventListener("keydown", function(e){

if(e.code === "Space" && !player.jump && !paused && !gameOver){

player.vy = -14;
player.jump = true;

}

});

pauseBtn.onclick = () => {

paused = !paused;

pauseBtn.innerText = paused ? "Resume" : "Pause";

};

restartBtn.onclick = () => {

location.reload();

};

playAgainBtn.onclick = () => {

location.reload();

};

function update(){

if(paused || gameOver) return;

player.vy += gravity;
player.y += player.vy;

if(player.y >= 300){

player.y = 300;
player.jump = false;

}

obstacle.x -= 8;

if(obstacle.x < -30){

obstacle.x = 1000;

score++;

scoreDisplay.innerText = score;

}

if(

player.x < obstacle.x + obstacle.width &&
player.x + player.width > obstacle.x &&
player.y < obstacle.y + obstacle.height &&
player.y + player.height > obstacle.y

){

gameOver = true;

finalScore.innerText = score;

gameOverScreen.style.display = "flex";

}

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#1e293b";
ctx.fillRect(0,350,1000,50);

let playerGradient = ctx.createLinearGradient(player.x,0,player.x+40,0);

playerGradient.addColorStop(0,"#8b5cf6");
playerGradient.addColorStop(1,"#38bdf8");

ctx.fillStyle = playerGradient;

ctx.fillRect(player.x,player.y,player.width,player.height);

ctx.shadowColor="#38bdf8";
ctx.shadowBlur=15;

ctx.fillStyle="#38bdf8";

ctx.fillRect(obstacle.x,obstacle.y,obstacle.width,obstacle.height);

ctx.shadowBlur=0;

}

function gameLoop(){

update();
draw();

requestAnimationFrame(gameLoop);

}

gameLoop();
