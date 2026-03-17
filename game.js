const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");

const scoreDisplay=document.getElementById("score");

const pauseBtn=document.getElementById("pauseBtn");
const restartBtn=document.getElementById("restartBtn");
const homeBtn=document.getElementById("homeBtn");

const gameOverScreen=document.getElementById("gameOverScreen");
const playAgainBtn=document.getElementById("playAgain");

const finalScore=document.getElementById("finalScore");
const highScoreText=document.getElementById("highScore");

let score=0;
let gravity=0.7;

let paused=false;
let gameOver=false;

let player={
x:120,
y:300,
width:40,
height:40,
vy:0,
jump:false
};

let obstacles=[];
let coins=[];
let stars=[];

for(let i=0;i<120;i++){
stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2
});
}

document.addEventListener("keydown",jump);
document.addEventListener("touchstart",jump);

function jump(e){

if((e.code==="Space"||e.type==="touchstart")&&!player.jump&&!paused&&!gameOver){

player.vy=-14;
player.jump=true;

}

}

pauseBtn.onclick=function(){

paused=!paused;

pauseBtn.innerText=paused?"Resume":"Pause";

};

restartBtn.onclick=function(){
location.reload();
};

homeBtn.onclick=function(){
window.location.href="index.html";
};

playAgainBtn.onclick=function(){
location.reload();
};

function spawnObjects(){

if(Math.random()<0.02){

obstacles.push({
x:canvas.width,
y:310,
width:30,
height:30
});

}

if(Math.random()<0.01){

coins.push({
x:canvas.width,
y:260,
size:10
});

}

}

function update(){

if(paused||gameOver)return;

let speed=8+score*0.25;

player.vy+=gravity;
player.y+=player.vy;

if(player.y>=300){

player.y=300;
player.jump=false;

}

spawnObjects();

obstacles.forEach(o=>o.x-=speed);
coins.forEach(c=>c.x-=speed);

obstacles=obstacles.filter(o=>o.x>-50);
coins=coins.filter(c=>c.x>-50);

obstacles.forEach(o=>{

if(
player.x<o.x+o.width &&
player.x+player.width>o.x &&
player.y<o.y+o.height &&
player.y+player.height>o.y
){

gameOver=true;

finalScore.innerText=Math.floor(score);

let high=localStorage.getItem("highscore")||0;

if(score>high){

localStorage.setItem("highscore",Math.floor(score));
high=Math.floor(score);

}

highScoreText.innerText=high;

gameOverScreen.style.display="flex";

}

});

coins.forEach((c,i)=>{

if(
player.x<c.x+20 &&
player.x+player.width>c.x &&
player.y<c.y+20 &&
player.y+player.height>c.y
){

score+=5;

coins.splice(i,1);

}

});

score+=0.05;
scoreDisplay.innerText=Math.floor(score);

}

function drawStars(){

ctx.fillStyle="white";

stars.forEach(star=>{

ctx.fillRect(star.x,star.y,star.size,star.size);

star.x-=0.5;

if(star.x<0) star.x=canvas.width;

});

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

drawStars();

ctx.fillStyle="#1e293b";
ctx.fillRect(0,350,1000,50);

let gradient=ctx.createLinearGradient(player.x,0,player.x+40,0);

gradient.addColorStop(0,"#8b5cf6");
gradient.addColorStop(1,"#38bdf8");

ctx.fillStyle=gradient;
ctx.fillRect(player.x,player.y,player.width,player.height);

ctx.shadowColor="#38bdf8";
ctx.shadowBlur=15;

obstacles.forEach(o=>{

ctx.fillStyle="#38bdf8";
ctx.fillRect(o.x,o.y,o.width,o.height);

});

coins.forEach(c=>{

ctx.fillStyle="gold";
ctx.beginPath();
ctx.arc(c.x,c.y,c.size,0,Math.PI*2);
ctx.fill();

});

ctx.shadowBlur=0;

}

function gameLoop(){

update();
draw();

requestAnimationFrame(gameLoop);

}

gameLoop();
