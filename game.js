let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let player = {
x:50,
y:220,
width:40,
height:40,
vy:0,
jump:false
};

let obstacle = {
x:800,
y:220,
width:30,
height:40
};

let gravity = 0.6;
let score = 0;

document.addEventListener("keydown", function(e){
if(e.code === "Space" && !player.jump){
player.vy = -12;
player.jump = true;
}
});

function update(){

player.vy += gravity;
player.y += player.vy;

if(player.y >= 220){
player.y = 220;
player.jump = false;
}

obstacle.x -= 6;

if(obstacle.x < -30){
obstacle.x = 800;
score++;
}

if(
player.x < obstacle.x + obstacle.width &&
player.x + player.width > obstacle.x &&
player.y < obstacle.y + obstacle.height &&
player.y + player.height > obstacle.y
){
alert("Game Over! Score: " + score);
document.location.reload();
}

}

function draw(){

ctx.clearRect(0,0,800,300);

ctx.fillStyle="blue";
ctx.fillRect(player.x,player.y,player.width,player.height);

ctx.fillStyle="red";
ctx.fillRect(obstacle.x,obstacle.y,obstacle.width,obstacle.height);

ctx.fillStyle="black";
ctx.font="20px Arial";
ctx.fillText("Score: "+score,650,30);

}

function gameLoop(){
update();
draw();
requestAnimationFrame(gameLoop);
}

gameLoop();
