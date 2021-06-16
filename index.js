function addForeground (){

    // ctx.save();
    // ctx.translate(0, canvas.height - 90);
    // ctx.rotate(45);
    // ctx.translate(-500,-(canvas.height - 90)/2);
    // ctx.drawImage( fg , 0, canvas.height - 90);
    // ctx.restore();

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
        // collision (substracting 10px from character's height and width to account for images' invisible space )
        if (girlX + girlW -10  > obstacles[i].x && 
            girlX < obstacles[i].x + 50 &&
            girlY + girlH -10 > obstacles[i].y &&
            girlY < obstacles[i].y + 75
            ){
                ouchSound.play()
                ouchSound.volume = 0.2;
                gameOver()
            }
    }
}       
       
function addWater(){
    if (waterList.length == 0 ) {
        waterList[0] = { x : Math.floor(Math.random() * (1400-800 + 1) + 800) , y : Math.floor(Math.random() * (720-350 + 1) + 350)}
    }

    for (let i=0; i< waterList.length; i++){
        ctx.drawImage( bottle , waterList[i].x, waterList[i].y, 45, 60);
        waterList[i].x -= speed

        if (waterList[i].x + 500 < 0){
            waterList[i] = {
                x: Math.floor(Math.random() * (1800-800 + 1) + 800),
                y: Math.floor(Math.random() * (720-350 + 1) + 350)
            }
        }    

        // Scoring
        if (girlX + girlW -10  > waterList[i].x && 
            girlX < waterList[i].x + 45 &&
            girlY + girlH -10 > waterList[i].y &&
            girlY < waterList[i].y + 60
            ){
                waterList.splice(i, 1)
                score += 1
                waterSound.play()
                waterSound.volume = 0.1;
                console.log(score)
            }

    }
}

function drawScore(){
    ctx.font = '40px serif';
    ctx.fillText(`${score}`, 900, 50);
    winning();
}


function addTimer(){
    counterID = setInterval(() => {
        counter += 1;    
    }, 1000);
}

function drawTimer(){
    let minutes = Math.floor(counter / 60)
    let seconds =  Math.floor(counter % 60)
    let editedSeconds = seconds < 10 ? "0" + seconds : seconds
    ctx.font = '40px serif'
    ctx.fillText(`${minutes}:${editedSeconds}`, 50, 50)

}

function initializeGameState(){
    gameoverPage.style.display = 'none';   
    startPage.style.display = 'none';
    gamePage.style.display = 'flex';
    winningPage.style.display = 'none';
    gamePage.style.display = 'flex';   
    fgList = [{x:1000, y: canvas.height - 90}];
    speed = 4;
    counter = 0;
    score = 0;
    obstacles = [
        {x : 700, y: 580},
        {x : 1100, y: 560} 
    ];
    obstaclesW = 50, obstaclesH = 75;
    girlX = 150, girlY = 480, girlH =140, girlW = 75;
    addTimer();



} 

function restart(){
    initializeGameState();
    isGameOver = false;
    hasWon = false;
    draw();
    // if (startPage.style.display == 'none'){}

}

function gameOver(){
    isGameOver = true;
    if(counterID){
        clearInterval(counterID);
    };
    setTimeout(() => {
        gamePage.style.display = 'none';
        gameoverPage.style.display = 'flex';
        startPage.style.display = 'none';
        winningPage.style.display = 'none';
        scoreElement.innerHTML = score;
    }, 700);
}

function winning(){
    if (score == 2){
        // cancelAnimationFrame(intervalId);
        setTimeout(() => {
            gamePage.style.display = 'none';
            gameoverPage.style.display = 'none';
            startPage.style.display = 'none';
            winningPage.style.display = 'flex';
            winScoreElement.innerHTML = score;
        }, 1200);
        hasWon = true;
    }
}



function manageSound(){
    if (soundButton.classList.contains("on")){
        mainAudio.play();
        mainAudio.volume = 0.1;
        mainAudio.loop = true;
    } else if (soundButton.classList.contains("off")){
        mainAudio.pause();
    }
}

function draw(){
    ctx.drawImage(bg, 0, 0);
    addForeground();
    addCharecter();
    addObstacles();
    addWater();
    drawTimer();
    drawScore();

    if (isGameOver || hasWon) {
        cancelAnimationFrame(intervalId);
        console.log("game over")     
    } 
    else {
        intervalId = requestAnimationFrame(draw);
    } 
}


// Event listeners
window.addEventListener('load', () => {   
    startPage.style.display = 'flex';
    gamePage.style.display = 'none';
    

    document.addEventListener('keydown', (event) => {
        if (event.code === "Space" && hasBeenReleased){
            hasBeenReleased = false;
            girlY -= 110;
            setTimeout(() => {
                spaceDown = false;
                girlY += 110;
            }, 600); 
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
        manageSound();
        initializeGameState();
        draw();
    })

    playAgainButton.addEventListener('click', () => {
        restart()
        
    })

    playAgainWinButton.addEventListener('click', () => {
        restart()
        
    })

    soundButton.addEventListener('click', () => {
        
        if (soundButton.classList.contains("on")){
            soundButton.classList.remove("on");
            soundButton.classList.add("off");
            soundButton.innerHTML = "Sound OFF";
        }else if (soundButton.classList.contains("off")){
            soundButton.classList.remove("off");
            soundButton.classList.add("on");
            soundButton.innerHTML = "Sound ON";
        };
        manageSound();
    })

});
