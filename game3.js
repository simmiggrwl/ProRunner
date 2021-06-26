const canvas= document.getElementById('canvas');
const canvas1= document.getElementById('canvas1');
const text= document.getElementById('text');
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
canvas1.height=window.innerHeight;
canvas1.width=window.innerWidth;
var ctx1=canvas1.getContext('2d');
var ctx= canvas.getContext('2d');
var ctxtext=text.getContext('2d');
var bestname=localStorage.getItem("name");
var running=true;
var x=100;
var y=canvas.height-250;
var dx=2;
var dy=100;
var spaceKey=false;
var rightKey=false;
var leftKey=false;
var time=10;
var frameCount=1;
var x1=0;
var x2=0;
var x3=0;
var x4=0;
var score=0;
var highScore=localStorage.getItem("highscore");

if(localStorage.getItem("highscore") == null) {
  highScore = localStorage.setItem("highscore", 0);
}else {
  highScore = localStorage.getItem("highscore");
}

if(localStorage.getItem("name") == null) {
    bestname = localStorage.setItem("name", "anon");
  }else {
    bestname = localStorage.getItem("name");
  }


//bg&obstacles
//ceiling,floor
var img = new Image();
img.src = 'https://i.pinimg.com/originals/57/9c/6c/579c6c1de4a0d0502d80613ff125517c.gif';
img.onload = function() {
  var pattern = ctx.createPattern(img, 'repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0,0,canvas.width,150); //ceiling
  ctx.moveTo(0,150);
  ctx.fillRect(0,canvas.height-150,canvas.width,150); //floor
}
//score
ctxtext.fillStyle='white';
ctxtext.font ='25px serif';
ctxtext.fillText('Score: 0', 50, 55);
ctxtext.fillText(`HighScore: ${highScore}`,50,85);
ctxtext.fillText(`Best Player: ${bestname}`, 50,115);
//obstacles
function drawbg(){
  ctx1.clearRect(0,0,canvas1.width,canvas1.height);
  var height=150;
  var width=110;
  x1=Math.floor(Math.random()*(canvas1.width-100));
  x2=Math.floor(Math.random()*(canvas1.width-100));
  x3=Math.floor(Math.random()*(canvas1.width-100));
  x4=Math.floor(Math.random()*(canvas1.width-100));
  while(x1<200){
    x1=Math.floor(Math.random()*(canvas.width-100));
  }
  while(x2<200 || Math.abs(x2-x1)<=220){
    x2=Math.floor(Math.random()*(canvas.width-100));
  }
  while(x3<200 || Math.abs(x3-x1)<=220 || Math.abs(x3-x2)<=220){
    x3=Math.floor(Math.random()*(canvas.width-100));
  }
  while(x4<200 || Math.abs(x4-x1)<=220 || Math.abs(x4-x2)<=220 || Math.abs(x4-x3)<=220){
    x4=Math.floor(Math.random()*(canvas.width-100));
  }
  ctx1.fillStyle='black';
  ctx1.fillRect(x1,0,width,height);
  ctx1.fillRect(x2,0,width,height);
  ctx1.fillRect(x3,canvas.height-150,width,height);
  ctx1.fillRect(x4,canvas.height-150,width,height);
}

//person
function drawPerson(){
  ctx.fillStyle='green';
  //ctx.fillRect(x,y,100,100);
  ctx.beginPath();
  ctx.moveTo(x,y);
  if(y==canvas.height-250){
  ctx.lineTo(x+50, y+100);
  ctx.lineTo(x-50, y+100);
  ctx.fill();}
  else{
    ctx.lineTo(x+50, y-100);
    ctx.lineTo(x-50, y-100);
    ctx.fill(); 
  }
  if(x+50>canvas.width){
    x=0;
    frameCount++;
    if(frameCount>2){
    score+=10;}
    updatescore();
    drawbg();
  }
  if(frameCount>5){
    dx=3;
  }
  if(frameCount>10){
    dx=4;
  }
  x+=dx;
  if(spaceKey==true && y==canvas.height-250){
    document.getElementById('jumpsound').play();
    y=250;
    x+=100;
    spaceKey=false;
  }
  else if(spaceKey==true && y==250){
    document.getElementById('jumpsound').play();
    y=canvas.height-250;
    x+=100;
    spaceKey=false;
  }
  else if(rightKey==true){
    x+=1;
    rightKey=false;
  }
  else if(leftKey==true){
    x-=1;
    rightKey=false;
  }

  checkcolission();
}


function checkcolission(){
    if(frameCount>1 && y==250){
        if(x1>=(x-50) && x1<=(x+50)){
            document.getElementById('gameoversound').play();
            alert(`Game Over! \r\nScore: ${score}`);
            console.log("first");
            running=false;
            location=window.location;
            
        }
        else if((x1+110)>=(x-50) && (x1+110)<=(x+50)){
          document.getElementById('gameoversound').play();
          alert(`Game Over! \r\nScore: ${score}`);
          console.log("first");
          running=false;
          location=window.location;
      }
        else if(x2>=(x-50) && x2<=(x+50)){
            document.getElementById('gameoversound').play();
            alert(`Game Over! \r\nScore: ${score}`);
            console.log("second");
            running=false;
            location=window.location;
        }
        else if((x2+110)>=(x-50) && (x2+110)<=(x+50)){
          document.getElementById('gameoversound').play();
          alert(`Game Over! \r\nScore: ${score}`);
          console.log("second");
          running=false;
          location=window.location;
      }
    }
    else if(frameCount>1 && y==canvas.height-250){
        if(x3>=(x-50) && x3<=(x+50) ){
            document.getElementById('gameoversound').play();
            alert(`Game Over! \r\nScore: ${score}`);
            console.log("third1");
            running=false;
            location=window.location;
        }
        else if((x3+110)>=(x-50) && (x3+110)<=(x+50)){
          document.getElementById('gameoversound').play();
          alert(`Game Over! \r\nScore: ${score}`);
          console.log("third2");
          console.log(x);
          running=false;
          location=window.location;
      }
        else if(x4>=(x-50) && x4<=(x+50)){
            document.getElementById('gameoversound').play();
            alert(`Game Over! \r\nScore: ${score}`);
            console.log("fourth");
            running=false;
            location=window.location;
        }
        else if((x4+110)>=(x-50) && (x4+110)<=(x+50)){
          document.getElementById('gameoversound').play();
          alert(`Game Over! \r\nScore: ${score}`);
          console.log("fourth");
          running=false;
          location=window.location;
      }
    }
}

function updatescore(){
  ctxtext.fillStyle='white';
  ctxtext.font = '25px serif';
  ctxtext.clearRect(0,0,text.width,text.height);
  ctxtext.fillText(`Score: ${score}`,50,55);
  if (score >= parseInt(highScore)) {
    localStorage.setItem("highscore", score);  
    localStorage.setItem("name", playername);    
  }
  else{
    localStorage.getItem("highscore");
    localStorage.getItem("name"); 
  }
  highScore=localStorage.getItem("highscore");
  bestname=localStorage.getItem("name");
  ctxtext.fillText(`HighScore: ${highScore}`, 50, 85);
  ctxtext.fillText(`Best Player: ${bestname}`, 50, 115);
  
}

var playername="anon";
function onStart(){
    playername=prompt("Enter your name:");
    console.log(playername);
    gameLoop();
}


function gameLoop(){
  if (running==false){
    return; }
  ctx.clearRect(0,150,canvas.width,canvas.height-300);
  drawPerson();
  requestAnimationFrame(gameLoop);
}

function keyDownHandler(e) {
  if(e.keyCode == 32) {
    spaceKey = true;
    console.log("true");
  }
  else if(e.keyCode ==39){
    rightKey=true;
  }
  else if(e.keyCode==37){
    leftKey=true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 32) {
    spaceKey = false;
  }
  else if(e.keyCode ==39){
    rightKey=false;
  }
  else if(e.keyCode==37){
    leftKey=false;
  }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
