/*

The Game Project 6 - Adding game mechanics

Week 14

*/
var LIVES = 3;

var game;
var world;
var sky;

var gameChar_x;
var gameChar_world_x;
var gameChar_y;
var floorPos_y;
var scrollPos;

var character;
var enemies;
var spikes;
var trees;
var clouds;
var mountains;
var collectables;
var canyons;
var platforms;
var flagpole;
var rotatingCollectable;

var game_score;
var lives;
var level;

var font;
var jumpSound;
var backgroundMusic;
var coinCollectedSound;
var loseLifeSound;
var levelCompleteSound;
var gameOverSound;

// var angle;


function preload() {
    // Text font
    font = loadFont('./assets/fonts/LuckiestGuy-Regular.ttf');

    // Sounds
    soundFormats('mp3', 'wav');

    jumpSound = loadSound('assets/sounds/jumpBoingShort.wav');
    jumpSound.setVolume(0.1);

    backgroundMusic = loadSound('assets/sounds/backgroundMusic.wav');
    backgroundMusic.setVolume(0.01);

    coinCollectedSound = loadSound("assets/sounds/coinCollected.wav");
    coinCollectedSound.setVolume(0.05);

    loseLifeSound = loadSound("./assets/sounds/loseLife.wav");
    loseLifeSound.setVolume(0.08);

    levelCompleteSound = loadSound("./assets/sounds/levelComplete.wav");
    levelCompleteSound.setVolume(0.1);

    gameOverSound = loadSound("./assets/sounds/gameOver.wav");
    gameOverSound.setVolume(0.25)

    enemyKilledSound = loadSound('assets/sounds/enemyKilled.wav');
    enemyKilledSound.setVolume(0.08);
}

function setup() {
    createCanvas(1024, 576);

    backgroundMusic.loop();

    lives = LIVES;
    floorPos_y = height * 3 / 4;
    level = 1;

    game = new Game(level);
}

function draw() {
    noStroke();

    game.play();

}

function keyPressed() {
    if (lives > 0) {
        character.keyPressedInteraction();
    }
}

function keyReleased() {
    if (lives > 0) {
        character.keyReleasedInteraction();
    }

    if (keyCode == 32 && flagpole.isReached) {
        level += 1;
        game = new Game(level);
        lives = LIVES
    }

    if (keyCode == 32 && game.world.isCompleted) {
        level = 1;
        game = new Game(level);
        lives = LIVES;
    }

    if (keyCode == 32 && lives < 1) {
        level = 1;
        game = new Game(level);
        lives = LIVES;
    }
}

