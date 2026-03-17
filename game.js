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

let obstacles = [];

let stars = [];

for(let i=0;i<120;i++){
stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2
});
}

document.addEventListener("keydown", function(e){

if(e.code === "Space" && !player.jump && !paused && !gameOver){
player.vy = -14;
player.jump = true;
}

});

pauseBtn.onclick = function(){

paused = !paused;

pauseBtn.innerText = paused ? "Resume" : "Pause";

};

restartBtn.onclick = function(){

location.reload();

};

playAgainBtn.onclick = function(){

location.reload();

};

function spawnObstacle(){

if(Math.random() < 0.02){

obstacles.push({

x:canvas.width,
y:310,
width:30,
height:30

});

}

}

function update(){

if(paused || gameOver) return;

let speed = 8 + score * 0.25;

player.vy += gravity;
player.y += player.vy;

if(player.y >= 300){
player.y = 300;
player.jump = false;
}

spawnObstacle();

obstacles.forEach(obstacle=>{
obstacle.x -= speed;
});

obstacles = obstacles.filter(obstacle => obstacle.x > -50);

obstacles.forEach(obstacle=>{

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

});

score += 0.05;

scoreDisplay.innerText = Math.floor(score);

}

function drawStars(){

ctx.fillStyle="white";

stars.forEach(star=>{

ctx.fillRect(star.x, star.y, star.size, star.size);

star.x -= 0.5;

if(star.x < 0){
star.x = canvas.width;
}

});

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

drawStars();

ctx.fillStyle="#1e293b";
ctx.fillRect(0,350,1000,50);

let playerGradient = ctx.createLinearGradient(player.x,0,player.x+40,0);

playerGradient.addColorStop(0,"#8b5cf6");
playerGradient.addColorStop(1,"#38bdf8");

ctx.fillStyle = playerGradient;

ctx.fillRect(player.x,player.y,player.width,player.height);

ctx.shadowColor="#38bdf8";
ctx.shadowBlur=15;

obstacles.forEach(obstacle=>{

ctx.fillStyle="#38bdf8";

ctx.fillRect(obstacle.x,obstacle.y,obstacle.width,obstacle.height);

});

ctx.shadowBlur=0;

}

function gameLoop(){

update();
draw();

requestAnimationFrame(gameLoop);

}

gameLoop();
