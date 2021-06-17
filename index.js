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


// Add bonfires in randomized order         
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
        checkForCollision()  
    }
}  


// collision (substracting n px from character's height and width to account for images' invisible space )
function checkForCollision() {
    for (let i=0; i<obstacles.length; i++){
        if (xPos + (frameWidth * scale) - 40  > obstacles[i].x && 
            xPos < obstacles[i].x + 30 &&
            yPos + frameHeight * scale - 30 > obstacles[i].y &&
            yPos < obstacles[i].y + 55
            ){
                ouchSound.play();
                ouchSound.volume = 0.2;
                gameOver();
            }
    }
}

// Add water bottles in randomized order
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
        calculateScore();
    }
}

// Checking for collision with water bottles and adding to the score
function calculateScore() {
    for (let i=0; i< waterList.length; i++){
        if (xPos + frameWidth * scale - 20  > waterList[i].x && 
            xPos < waterList[i].x + 45 &&
            yPos + frameHeight * scale  > waterList[i].y &&
            yPos < waterList[i].y + 60
            ){
                waterList.splice(i, 1);
                score += 1;
                waterSound.play();
                waterSound.volume = 0.1;
            }
    }
}

// Display score on canvas
function drawScore(){
    ctx.font = '40px serif';
    ctx.fillText(`${score}`, 900, 50);
    winning();
}

// Start timer at the beginning of the game
function addTimer(){
    counterID = setInterval(() => {
        counter += 1;    
    }, 1000);
}

// Display timer on canvas
function drawTimer(){
    let minutes = Math.floor(counter / 60);
    let seconds =  Math.floor(counter % 60);
    let editedSeconds = seconds < 10 ? "0" + seconds : seconds;
    ctx.font = '40px serif';
    ctx.fillText(`${minutes}:${editedSeconds}`, 50, 50);

}

// called every tim game state is initialized
function initializeGameState(){
    gameoverPage.style.display = 'none';   
    startPage.style.display = 'none';
    gamePage.style.display = 'flex';
    winningPage.style.display = 'none';
    gamePage.style.display = 'flex';   
    fgList = [{x:1000, y: canvas.height - 90}];
    // speed = 4;
    counter = 0;
    score = 0;
    // easyLevel = false, hardLevel = false;
    obstacles = [
        {x : 700, y: 580},
        {x : 1100, y: 560} 
    ];
    obstaclesW = 50, obstaclesH = 75;
    xPos = 150, yPos = 480, frameWidth = 166, frameHeight = 225;
    rocks = [{x : 1050, y : 450}]
    addTimer();

} 


function restart(){
    initializeGameState();
    isGameOver = false;
    hasWon = false;
    draw();
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

// Called to check if the score has reached winning score
function winning(){
    if (easyLevel && score == 7){
        if(counterID){
            clearInterval(counterID);
        };
        setTimeout(() => {
            gamePage.style.display = 'none';
            gameoverPage.style.display = 'none';
            startPage.style.display = 'none';
            winningPage.style.display = 'flex';
            winScoreElement.innerHTML = score;
        }, 1200);
        hasWon = true;
    }else if(hardLevel && score == 11){
        if(counterID){
            clearInterval(counterID);
        };
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

// Charecter drawing and animation
function animateCharacter(){
    ctx.drawImage(
        character,
        frameIndex * frameWidth,
        0, 
        frameWidth, 
        frameHeight,
        xPos, 
        yPos,
        frameWidth * scale, 
        frameHeight * scale
        );

        count ++;
        if (count > 5) {
            frameIndex ++;
            count = 0;
        }
        if (frameIndex > 5){
            frameIndex = 0;
        }
        // Let character move up and down
        if (arrowDown && yPos + (frameHeight * scale) < canvas.height){
            yPos += 3;
        }
        if (arrowUp && yPos > 400){
            yPos -= 3;
        }
};

function easyLevelFunc() {
    easyLevel = true;
    speed = 4;
};

function hardLevelFunc() {
    hardLevel = true;
    console.log("hard");
    speed = 6;
};

// Main function to animate the page
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (hardLevel){
        ctx.drawImage(bg2, 0, 0);
    }
    if (easyLevel){
        ctx.drawImage(bg, 0, 0);
    }
    // ctx.drawImage(bg2, 0, 0);
    addForeground();
    // addCharecter();
    addObstacles();
    addWater();
    drawTimer();
    drawScore();
    animateCharacter();

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
            yPos -= 110;
            if (easyLevel){
                setTimeout(() => {
                    spaceDown = false;
                    yPos += 110;
                }, 600); 
            }else if (hardLevel){
                setTimeout(() => {
                    spaceDown = false;
                    yPos += 110;
                }, 400); 
            }

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

    // startButton.addEventListener('click', () => {
    //     initializeGameState();
    //     draw();
    //     manageSound();
    // })
    startEasyButton.addEventListener('click', () => {
        initializeGameState();
        draw();
        manageSound();
        easyLevelFunc();
    })
    startHardButton.addEventListener('click', () => {
        initializeGameState();
        draw();
        manageSound();
        hardLevelFunc();
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
