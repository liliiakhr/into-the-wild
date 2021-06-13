let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

let bg = new Image();
bg.src = 'images/background.jpg';

let video = document.querySelector("video")
video.playbackRate = 0.3

let fg = new Image();
fg.src = '/images/foreground.jpg';

// Variables
let isGameOver = false;
let fgList = [{x:1000, y: 90}]

function foreground (){
    ctx.drawImage( fg , 0, canvas.height - 90);
}



function draw(){
    ctx.drawImage(bg, 0, 0);
    // intervalId = requestAnimationFrame(draw)
    console.log("hey")
    foreground();

//     if (isGameOver) {
//         cancelAnimationFrame(intervalId)
//     }
//     else {
//         intervalId = requestAnimationFrame(draw)
//     } 
}

draw()

window.addEventListener('load', () => {
    draw()


    // document.addEventListener(){

    // }
});
