let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

let startButton = document.querySelector(".start");
let playAgainButton = document.querySelector(".play-again");

let gamePage = document.querySelector('.game-page');
let startPage = document.querySelector('.start-page');
let gameoverPage = document.querySelector('.gameover-page');
let winningPage = document.querySelector('.winning-page')


// let video = document.querySelector("video")
// video.playbackRate = 0.3

let bg = new Image(); 
bg.src = 'images/background.jpg';

let fg = new Image();
fg.src = '/images/foreground.jpg';

let girl = new Image();
girl.src = '/images/girl.png';

let bottle = new Image();
bottle.src = '/images/bottle.png';

let fire = new Image();
fire.src = '/images/fire.png';
                   
// Variables
let isGameOver = false;
let hasBeenReleased = true;
let arrowUp = false, arrowDown = false;

let fgList = [{x:1000, y: canvas.height - 90}];
let speed = 4;
let obstacles = [
    {x : 700, y: 580},
    {x : 1100, y: 560} 
];
let obstaclesW = 50, obstaclesH = 75;
let girlX = 150, girlY = 480, girlH = 140, girlW = 75;
let gravity = true;

   


function addForeground (){
    ctx.drawImage( fg , 0, canvas.height - 90);
    for (let i = 0; i < fgList.length; i++) {
        ctx.drawImage(fg, fgList[i].x, fgList[i].y);
        fgList[i].x = fgList[i].x - speed;

        if (fgList[i].x < 0 && fgList[i].x >= -speed) {
            fgList.push({ x: 1000, y: canvas.height - 90});
          } 
    }
}

function addCharecter(){
    ctx.drawImage( girl, girlX, girlY, girlW, girlH);

    if (arrowDown && girlY + girlH < canvas.height){
        girlY += 3;
    }
    if (arrowUp && girlY > 400){
        girlY -= 3;
    }

}
          
function addObstacles(){

    for (let i=0; i<obstacles.length; i++){
        ctx.drawImage(fire, obstacles[i].x, obstacles[i].y, 50, 75);
        obstacles[i].x -= speed

        if (obstacles[i].x + 50 < 0){
            obstacles[i] = {
                x: Math.floor(Math.random() * (1200-1000 + 1) + 1000),
                y: Math.floor(Math.random() * (600-450 + 1) + 450)
            }
        }
        // collision
        if (girlX + girlW > obstacles[i].x && 
            girlX < obstacles[i].x + 50 &&
            girlY + girlH > obstacles[i].y &&
            girlY < obstacles[i].y + 75
            ){
            isGameOver = true
        }
    }
    }       

    
         
function addWater(){
    ctx.drawImage( bottle , 700, 550, 50, 70);
}

function draw(){
    ctx.drawImage(bg, 0, 0);
    addForeground();
    addCharecter();
    addObstacles();
    addWater();
    // checkCollision();

    if (isGameOver) {
        cancelAnimationFrame(intervalId)
        console.log("game over")
        startPage.style.display = 'none';
        gamePage.style.display = 'none';
        gameoverPage.style.display = 'flex';
    }
    else {
        intervalId = requestAnimationFrame(draw);
    } 
}


window.addEventListener('load', () => { 
    draw()

    document.addEventListener('keydown', (event) => {
        if (event.code === "Space" && hasBeenReleased){
            hasBeenReleased = false;
            girlY -= 110;
            setTimeout(() => {
                spaceDown = false;
                girlY += 110;
            }, 700); 
        };
        if (event.code === "ArrowUp"){
            arrowUp = true;
        };
        if (event.code === "ArrowDown"){
            arrowDown = true;
        };
    }); 

    document.addEventListener('keyup', () => {
        hasBeenReleased = true;
        arrowUp = false;
        arrowDown = false; 
    })

    startButton.addEventListener('click', () => {
        startPage.style.display = 'none';
        gamePage.style.display = 'flex';
    })

    playAgainButton.addEventListener('click', () => {
        gamePage.style.display = 'flex';    
        gameoverPage.style.display = 'none'; 
        winningPage.style.display = 'none';
        
    })
        
        
});
