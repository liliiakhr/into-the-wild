let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

let startButton = document.querySelector(".start");
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

// let video = document.querySelector("video")
// video.playbackRate = 0.3

let bg = new Image(); 
bg.src = 'recources/background.jpg';

let fg = new Image();
fg.src = 'recources/foreground.jpg';

let girl = new Image();
girl.src = 'recources/girl.png';

let bottle = new Image();
bottle.src = 'recources/bottle.png';

let fire = new Image();
fire.src = 'recources/fire.png';


                   
// Variables
let isGameOver = false;
let hasWon = false;
let hasBeenReleased = true;
let counterID = undefined;
let arrowUp = false, arrowDown = false;
let counter = 0;
let score = 0;

let fgList = [{x:1000, y: canvas.height - 90}];
let speed = 5;
let obstacles = [
    {x : 700, y: 580},
    {x : 1100, y: 560} 
];
let obstaclesW = 50, obstaclesH = 75;

let waterList = [{x : 1400, y : 600}]

let girlX = 140, girlY = 480, girlH = 140, girlW = 75;  


   