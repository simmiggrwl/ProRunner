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
var x=100;
var y=350;
var dx=2;
var dy=200;
var spaceKey=false;
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


//bg&obstacles
//ceiling,floor
var img = new Image();
img.src = 'https://i.pinimg.com/originals/57/9c/6c/579c6c1de4a0d0502d80613ff125517c.gif';
img.onload = function() {
  var pattern = ctx.createPattern(img, 'repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0,0,1400,150); //ceiling
  ctx.moveTo(0,450);
  ctx.fillRect(0,450,1400,150); //floor
}
//score
ctxtext.fillStyle='white';
ctxtext.font ='30px serif';
ctxtext.fillText('Score: 0', 50, 50);
ctxtext.fillText(`HighScore: ${highScore}`,50,85);
//obstacles
function drawbg(){
  ctx1.clearRect(0,0,canvas1.width,canvas1.height);
  var height=150;
  var width=110;
  x1=Math.floor(Math.random()*(canvas1.width-2));
  x2=Math.floor(Math.random()*(canvas1.width-2));
  x3=Math.floor(Math.random()*(canvas1.width-2));
  x4=Math.floor(Math.random()*(canvas1.width-2));
  while(x1<200){
    x1=Math.floor(Math.random()*(canvas.width-2));
  }
  while(x2<200 || Math.abs(x2-x1)<=220){
    x2=Math.floor(Math.random()*(canvas.width-2));
  }
  while(x2<200 || Math.abs(x3-x1)<=220 || Math.abs(x3-x2)<=220){
    x3=Math.floor(Math.random()*(canvas.width-2));
  }
  while(x4<200 || Math.abs(x4-x1)<=220 || Math.abs(x4-x2)<=220 || Math.abs(x4-x3)<=220){
    x4=Math.floor(Math.random()*(canvas.width-2));
  }
  ctx1.fillStyle='black';
  ctx1.fillRect(x1,0,width,height);
  ctx1.fillRect(x2,0,width,height);
  ctx1.fillRect(x3,450,width,height);
  ctx1.fillRect(x4,450,width,height);
}

//person
function drawPerson(){
  ctx.fillStyle='green';
  ctx.fillRect(x,y,100,100);
  if(x>canvas.width){
    x=0;
    frameCount++;
    if(frameCount>2){
    score+=10;}
    updatescore();
    drawbg();
  }
  x+=dx;
  if(spaceKey==true && y==350){
    document.getElementById('jumpsound').play();
    y-=dy;
    spaceKey=false;
  }
  else if(spaceKey==true && y==150){
    document.getElementById('jumpsound').play();
    y+=dy;
    spaceKey=false;
  }
  checkcolission();
}


function checkcolission(){
    if(frameCount>1 && y==150){
        if(x1>=x && x1<=(x+100)){
            document.getElementById('gameoversound').play();
            alert(`Game Over! \r\nScore: ${score}`);
            console.log("first");
            location=window.location;
        }
        else if((x1+110)>=x && (x1+110)<=(x+100)){
          document.getElementById('gameoversound').play();
          alert(`Game Over! \r\nScore: ${score}`);
          console.log("first");
          location=window.location;
      }
        else if(x2>=x && x2<=(x+100)){
            document.getElementById('gameoversound').play();
            alert(`Game Over! \r\nScore: ${score}`);
            console.log("second");
            location=window.location;
        }
        else if((x2+110)>=x && (x2+110)<=(x+100)){
          document.getElementById('gameoversound').play();
          alert(`Game Over! \r\nScore: ${score}`);
          console.log("second");
          location=window.location;
      }
    }
    else if(frameCount>1 && y==350){
        if(x3>=x && x3<=(x+100) ){
            document.getElementById('gameoversound').play();
            alert(`Game Over! \r\nScore: ${score}`);
            console.log("third1");
            location=window.location;
        }
        else if((x3+110)>=x && (x3+110)<=(x+100)){
          document.getElementById('gameoversound').play();
          alert(`Game Over! \r\nScore: ${score}`);
          console.log("third2");
          console.log(x);
          location=window.location;
      }
        else if(x4>=x && x4<=(x+100)){
            document.getElementById('gameoversound').play();
            alert(`Game Over! \r\nScore: ${score}`);
            console.log("fourth");
            location=window.location;
        }
        else if((x4+110)>=x && (x4+110)<=(x+100)){
          document.getElementById('gameoversound').play();
          alert(`Game Over! \r\nScore: ${score}`);
          console.log("fourth");
          location=window.location;
      }
    }
}

function updatescore(){
  ctxtext.fillStyle='white';
  ctxtext.font = '30px serif';
  ctxtext.clearRect(0,0,text.width,text.height);
  ctxtext.fillText(`Score: ${score}`,50,50);
  if (score >= parseInt(highScore)) {
    localStorage.setItem("highscore", score);      
  }
  else{
    localStorage.getItem("highscore");
  }
  highScore=localStorage.getItem("highscore");
  ctxtext.fillText(`HighScore: ${highScore}`, 50, 85);
  
}


function gameLoop(time){
  ctx.clearRect(0,150,canvas.width,300);
  drawPerson();
  requestAnimationFrame(gameLoop);
}

function keyDownHandler(e) {
  if(e.keyCode == 32) {
    spaceKey = true;
    console.log("true");
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 32) {
    spaceKey = false;
  }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
