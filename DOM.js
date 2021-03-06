let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

let startButton = document.querySelector(".start");
let startEasyButton = document.querySelector(".easy");
let startHardButton = document.querySelector(".hard");
let playAgainButton = document.querySelector(".play-again");
let playAgainWinButton = document.querySelector(".play-again-win");
let soundButton = document.querySelector(".sound-button") 

let gamePage = document.querySelector('.game-page');
let startPage = document.querySelector('.start-page');
let gameoverPage = document.querySelector('.gameover-page');
let winningPage = document.querySelector('.winning-page');
let scoreElement = document.querySelector('.score');
let winScoreElement = document.querySelector('.score-win')

// Audio
let mainAudio = new Audio('recources/main-theme.mp3')
let ouchSound = new Audio('recources/ouch.mp3');
let waterSound = new Audio('recources/water.wav');

// Images
let bg = new Image(); 
bg.src = 'recources/images/background1.jpg';

let bg2 = new Image();
bg2.src = 'recources/images/background2.jpg';

let fg = new Image();
fg.src = 'recources/images/foreground.jpg';

let bottle = new Image();
bottle.src = 'recources/images/bottle.png';

let fire = new Image();
fire.src = 'recources/images/fire.png';

let rock = new Image();
rock.src = 'recources/images/rock.png'

let character = new Image();
character.src = 'recources/images/character.png'

// Animated character
let frameWidth = 166, frameHeight = 225, xPos = 150, yPos = 480, scale = 0.6, fps = 69;
let secondsToUpdate = 1 * fps, count = 0, frameIndex = 0;
                   
// Variables
let isGameOver = false, hasWon = false, hasBeenReleased = true;
let counterID = undefined;
let arrowUp = false, arrowDown = false;
let counter = 0, score = 0;
let easyLevel = false, hardLevel = false;


let fgList = [{x:1000, y: canvas.height - 90}];
let speed = 5;
let obstacles = [
    {x : 700, y: 580},
    {x : 1100, y: 560} 
];
let obstaclesW = 50, obstaclesH = 75;

let waterList = [{x : 1400, y : 600}]

// let girlX = 140, girlY = 480, girlH = 140, girlW = 75;  

let rocks = [{x : 1050, y : 450}]
   