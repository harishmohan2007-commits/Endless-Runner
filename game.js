let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let scoreEl = document.getElementById("score");

let player = {
x:50,
y:200,
w:30,
h:30,
vy:0,
jump:false
};

let obstacle = {
x:800,
y:200,
w:30,
h:30
};

let gravity = 0.6;
let score = 0;
let paused = false;

document.addEventListener("keydown", function(e){
if(e.code==="Space" && !player.jump){
player.vy = -10;
player.jump = true;
}
});

function pauseGame(){
paused = !paused;
document.getElementById("pauseBtn").innerText = paused ? "Resume" : "Pause";
}

function restartGame(){
location.reload();
}

function update(){

if(paused) return;

player.vy += gravity;
player.y += player.vy;

if(player.y >= 200){
player.y = 200;
player.jump = false;
}

obstacle.x -= 5;

if(obstacle.x < 0){
obstacle.x = 800;
score++;
scoreEl.innerText = score;
}

if(
player.x < obstacle.x + obstacle.w &&
player.x + player.w > obstacle.x &&
player.y < obstacle.y + obstacle.h &&
player.y + player.h > obstacle.y
){
gameOver();
}
}

function gameOver(){

document.getElementById("over").style.display = "block";

let high = localStorage.getItem("highscore") || 0;

if(score > high){
localStorage.setItem("highscore", score);
}

paused = true;
}

function draw(){

ctx.clearRect(0,0,800,300);

ctx.fillStyle="blue";
ctx.fillRect(player.x,player.y,player.w,player.h);

ctx.fillStyle="red";
ctx.fillRect(obstacle.x,obstacle.y,obstacle.w,obstacle.h);
}

function loop(){
update();
draw();
requestAnimationFrame(loop);
}

loop();
