const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let scoreEl = document.getElementById("score");

let player = {
x:80,
y:260,
width:40,
height:40,
vy:0,
jump:false
};

let obstacle = {
x:900,
y:270,
width:30,
height:30
};

let gravity = 0.7;
let score = 0;

document.addEventListener("keydown", e => {

if(e.code === "Space" && !player.jump){
player.vy = -13;
player.jump = true;
}

});

function update(){

player.vy += gravity;
player.y += player.vy;

if(player.y >= 260){
player.y = 260;
player.jump = false;
}

obstacle.x -= 7;

if(obstacle.x < -30){
obstacle.x = 900;
score++;
scoreEl.innerText = score;
}

if(
player.x < obstacle.x + obstacle.width &&
player.x + player.width > obstacle.x &&
player.y < obstacle.y + obstacle.height &&
player.y + player.height > obstacle.y
){
alert("Game Over\nScore: "+score);
location.reload();
}

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#1e293b";
ctx.fillRect(0,300,900,50);

let gradient = ctx.createLinearGradient(player.x,0,player.x+40,0);
gradient.addColorStop(0,"#8b5cf6");
gradient.addColorStop(1,"#38bdf8");

ctx.fillStyle = gradient;
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
