let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

let video = document.querySelector("video")
video.playbackRate = 0.3

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
let fgList = [{x:1000, y: canvas.height - 90}];
let speed = 3;



function addForeground (){
    ctx.drawImage( fg , 0, canvas.height - 90);
    for (let i = 0; i < fgList.length; i++) {
        ctx.drawImage(fg, fgList[i].x, fgList[i].y);
        fgList[i].x = fgList[i].x - speed;

        if (fgList[i].x < 0 && fgList[i].x >= -speed) {
            fgList.push({ x: 1000, y: canvas.height - 90 });
          }
    }
}

function addCharecter(){
    ctx.drawImage( girl, 160, 480, 120, 150);
}

function addObstacles(){
    ctx.drawImage( fire , 450, canvas.height - fg.height + 90, 50, 70);
}

function addWater(){
    ctx.drawImage( bottle , 700, 550, 50, 70);
}

function draw(){
    ctx.drawImage(bg, 0, 0);
    addForeground();
    addCharecter()
    addObstacles();
    addWater();
    intervalId = requestAnimationFrame(draw)

//     if (isGameOver) {
//         cancelAnimationFrame(intervalId)
//     }
//     else {
//         intervalId = requestAnimationFrame(draw)
//     } 
}

// draw()

window.addEventListener('load', () => {
    draw()


    // document.addEventListener(){

    // }
});
