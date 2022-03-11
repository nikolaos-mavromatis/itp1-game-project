/*

Coursework 2.2 - Game Project Submission

Week 20

Comment:
    Apart from the sounds that are quite straightforward, I tried extending the basic requirements 
by adding movement wherever possible. That proved to be quite challenging when it comes to collision detection and there are still small bugs when it comes to interaction with moving objects.
    The easiest of all were the moving platforms where I followed the same principle as the enemies 
and their range functionality. Quite easy was 
    The most challenging however was the rotating collectable. Working with vectors, push/pop and 
translate helped me understand better all the interactions and also how to create better animations.
    I also tried implementing killing enemies by landing on top of them. Some are easier to kill than 
others which was not intended and still doesn't make any sense.
    Finally, what I wish I had done from the beginning was to create a separate p5 project for each 
object and test its functionality there using dummy object or the cursor coordinates.

GitHub:
https://github.com/nikolaos-mavromatis/itp1-game-project

Game available directly at:
https://nikolaos-mavromatis.github.io/itp1-game-project/

*/
var LIVES = 3;

var game;
var world;
var sky;

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
var enemyKilledSound;


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

