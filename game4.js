const canvas= document.getElementById('canvas');
const canvas1= document.getElementById('canvas1');
const text= document.getElementById('text');
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
canvas1.height=window.innerHeight;
canvas1.width=window.innerWidth;
var ctx1=canvas1.getContext('2d'); //obstacles
var ctx= canvas.getContext('2d'); //bg
var ctxtext=text.getContext('2d'); //score
var bestname=localStorage.getItem("name");
var running=true;
var x=100;
var powerup=0;
var x6=0;
var y=canvas.height-250;
var dx=2;
var dy=0;
var spaceKey=false;
var rightKey=false;
var leftKey=false;
var frameCount=1;
var x1=0;
var x2=0;
var x3=0;
var x4=0;
var x5=0;
var x7=0;
var score=0;
var obsdy=0;
var yobs=canvas.height-200;
var yp=canvas.height-200+25;
var scorep=true;
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
  ctx.fillRect(0,0,canvas.width,148); //ceiling
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
  while(x5<200 || Math.abs(x5-x1)<=100 || Math.abs(x5-x2)<=100 || Math.abs(x5-x3)<=100 || Math.abs(x5-x4)<=100){
    x5=Math.floor(Math.random()*(canvas.width-100));
    x6=Math.floor(Math.random()*(canvas.width-100));
    x7=Math.floor(Math.random()*(canvas.width-100));
  }
}

//moving obstacle
var pmove=1;
function moveobstacle(){
  if(frameCount%2==0){
      ctx1.fillStyle='red';
      ctx1.fillRect(x5,yobs,50,50);
      if(yobs>=canvas.height-200){
      obsdy=-2;
      }
      else if(yobs<=149){
      obsdy=2;
      }
      yobs+=obsdy;}
    else{
     ctx1.fillStyle='red';
     ctx1.beginPath();  
     ctx1.arc(x5,yobs+25,25,0,Math.PI*2);
     ctx1.fill();
     if((yobs+50)>=canvas.height-150){
     obsdy=-2;
     }
     else if((yobs)<=149){
     obsdy=2;
     }
     yobs+=obsdy;}   

    //invincible powerup
  if(frameCount%3==0 && powerup==0){
  ctx1.beginPath();  
  ctx1.fillStyle='green';
  ctx1.arc(x6,yp,25,0,Math.PI*2);
  ctx1.fill();
  x6+=pmove;
  if(x6+25>=canvas.width)
  {pmove=-2;}
  else if(x6-25<=0){
    pmove=2;
  }
  }

  //score powerup
  if(frameCount%4==0 && scorep==true){
    ctx1.beginPath();  
    ctx1.fillStyle='#99EDC3';
    ctx1.arc(x7,300,25,0,Math.PI*2);
    ctx1.fill();
  }
}



//person
function drawPerson(){
  ctx.fillStyle='blue';
  //ctx.fillRect(x,y,100,100);
  ctx.beginPath();
  ctx.moveTo(x,y);
  if(y==canvas.height-250){
  ctx.lineTo(x+50, y+100);
  ctx.lineTo(x-50, y+100);
  ctx.fill();}
  else if(y<=250){
    ctx.lineTo(x+50, y-100);
    ctx.lineTo(x-50, y-100);
    ctx.fill();
  }
  else if(dy==-5){
    ctx.lineTo(x+50, y-100);
    ctx.lineTo(x-50, y-100);
    ctx.fill(); 
  }
  else if(dy==5){
    ctx.lineTo(x+50, y+100);
    ctx.lineTo(x-50, y+100);
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
  changeyposition();
  y+=dy;

  if(spaceKey==true && y>=canvas.height-250){
    document.getElementById('jumpsound').play();
    dy=-5;
    /**while(y!=250){
      y--;
      x++;}
    y=250;
    x+=100;**/
    spaceKey=false;
  }
  else if(spaceKey==true && y<=250){
    document.getElementById('jumpsound').play();
    dy=5;
    /**while(y!=canvas.height-250){
      y++;
      x++;}
    y=canvas.height-250;
    x+=100;**/
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

function changeyposition(){
  if(y>=canvas.height-250 && dy==5){
    dy=0;
  }
  else if(y<=250 && dy==-5){
    dy=0;
    console.log(y);
  }
}


function checkcolission(){  
    if(powerup==0 && frameCount>1 && y<=250){
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
    else if(powerup==0 && frameCount>1 && y==canvas.height-250){
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

    //collision with scorepowerup
    if(frameCount%4==0 && scorep==true){
      if(y==canvas.height-250 || dy==5){
        if((x7+25)>=(x-50) && (x7-25)<=(x+50)){
          if(325>=y && 275<=(y+100)){
            score+=30;
            scorep=false;
            setTimeout(function() {scorep=true}, 10000);
          }
        }
      }
      else if(y<=250 || dy==-5){
        if((x7+25)>=(x-50) && (x7-25)<=(x+50)){
          if(325>=(y-100) && 275<=y){
            score+=30;
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
            scorep=false;
            setTimeout(function() {scorep=true}, 10000);
            
          }
        }
      }
    }
    //collison with powerup
    if(frameCount%3==0 && powerup==0){
      if((y+100)>=(yp-25) && y<=yp+25){
        if((x6+25)>=(x-50) && (x6-25)<=(x+50)){
          console.log("yess");
          powerup=1;
          dx+=3;
          alert("You are immune for 10 seconds!");
          setTimeout(function() {powerup=0}, 10000);
          setTimeout(function() {dx-=3}, 10000);
        }
      }
    }
    // moving red obstacle
    if(frameCount%2==0 && powerup==0 && frameCount>1){
      if(y==canvas.height-250 || dy==5){
        if((x5+50)>=(x-50) && x5<=(x+50)){
          if((yobs+50)>=y && yobs<=(y+100)){
            document.getElementById('gameoversound').play();
            alert(`Game Over! \r\nScore: ${score}`);
            console.log("fourth");
            running=false;
            location=window.location;
          }
        }
      }
      else if(y<=250 || dy==-5){
        if((x5+50)>=(x-50) && x5<=(x+50)){
          if((yobs+50)>=(y-100) && yobs<=y){
            document.getElementById('gameoversound').play();
            alert(`Game Over! \r\nScore: ${score}`);
            console.log("fourth");
            running=false;
            location=window.location;
          }
        }
      }
    }
    else if(frameCount%2!=0 && powerup==0 && frameCount>1){
        if(y==canvas.height-250 || dy==5){
            if((x5+25)>=(x-50) && (x5-25)<=(x+50)){
              if((yobs+50)>=y && (yobs)<=(y+100)){
                document.getElementById('gameoversound').play();
                alert(`Game Over! \r\nScore: ${score}`);
                running=false;
                location=window.location;
              }
            }
          }
          else if(y<=250 || dy==-5){
            if((x5+25)>=(x-50) && (x5-25)<=(x+50)){
              if((yobs+50)>=(y-100) && (yobs)<=y){
                document.getElementById('gameoversound').play();
                alert(`Game Over! \r\nScore: ${score}`);
                running=false;
                location=window.location;
              }
            }
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
  ctx.clearRect(0,148,canvas.width,canvas.height-298);
  ctx1.clearRect(0,148,canvas1.width,canvas1.height-298);
  drawPerson();
  if(frameCount>1){
    moveobstacle();
  }
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
