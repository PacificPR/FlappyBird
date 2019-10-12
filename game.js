//Simple FlappyBird Game

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//BUTTONS

var bstart=document.getElementById("START");  
// load images

var titleimg=document.getElementById("title");
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables controlling the speed,score,gravity and position of bird and pipes

var gap = 85;
var constant;
var bX = 10;
var bY = 150;
var gravity = 1.5;
var sc = 0;
var t=1;
// audio files

var fly = new Audio();
var score = new Audio();

fly.src = "sounds/fly.mp3";
score.src = "sounds/score.mp3";

//Moving the bird upwards

function moveUp(evt){
    if(evt.keyCode==13)
    document.getElementById("START").click();
    if(bY>=25)
    bY -= 25;
    fly.play();
}
//Taking the input (events)
document.addEventListener("keydown",moveUp);//moveUp on pressing any key
document.addEventListener("touchstart",moveUp,false);//moveUp for touchscreen
// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};
//Game code

function draw()
{
    bstart.style.display='none';
    titleimg.style.display='none';
    var spe=1;
    ctx.drawImage(bg,0,0);
    
    for(var i = 0; i < pipe.length; i++){
         
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
       // speed
        if(i>2 && spe<1.2){
        spe +=.1;
            }
            
        pipe[i].x=pipe[i].x-spe;
        
        if( Math.round(pipe[i].x) == 100 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){

                alert("GAME OVER\nSCORE:"+sc);
            location.reload()// Reloads the page 
        }
        
        if(Math.round(pipe[i].x) == 5){
            sc++;
            score.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    ctx.fillStyle = "BLUE";
    ctx.font = "20px italic serif,arial";
    ctx.fillText("SCORE :"+sc,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}
