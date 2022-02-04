/*

The Game Project 6 - Adding game mechanics

Week 14

*/
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;

var character;
var trees;
var clouds;
var mountains;
var collectables;
var canyons;
var platforms;
var flagpole;

var game_score;
var lives;

var font;
var jumpSound;
var backgroundMusic;
var coinCollectedSound;
var loseLifeSound;
var levelCompleteSound;
var gameOverSound;


function preload() {
    // Text font
    font = loadFont('./assets/fonts/LuckiestGuy-Regular.ttf');

    // Sounds
    soundFormats('mp3', 'wav');

    jumpSound = loadSound('assets/sounds/jump.wav');
    jumpSound.setVolume(0.1);

    backgroundMusic = loadSound('assets/sounds/backgroundMusic.wav');
    backgroundMusic.setVolume(0.03);

    coinCollectedSound = loadSound("assets/sounds/coinCollected.wav");
    coinCollectedSound.setVolume(0.05);

    loseLifeSound = loadSound("./assets/sounds/loseLife.wav");
    loseLifeSound.setVolume(0.08);

    levelCompleteSound = loadSound("./assets/sounds/levelComplete.wav");
    levelCompleteSound.setVolume(0.1);

    gameOverSound = loadSound("./assets/sounds/gameOver.wav");
    gameOverSound.setVolume(0.15)
}

function setup() {
    createCanvas(1024, 576);

    backgroundMusic.loop();

    lives = 3;
    floorPos_y = height * 3 / 4;

    startGame();
}

function draw() {
    noStroke();

    // fill the sky blue
    // TODO:dim the sky the closer the character gets to the flagpole
    background(100, 155, 255);

    // draw some green ground
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height / 4);

    push();
    translate(scrollPos, 0);

    // Draw world elements

    drawMountains();

    drawClouds();

    drawTrees();

    drawCanyons();

    drawPlatforms();

    drawCollectables();

    flagpole.render();

    drawEnemies();

    pop();

    // Draw the game character
    character.draw();

    // Below statements (if true) should happen before the player has the chance to move
    if (lives < 1) {
        backgroundMusic.pause();
        displayGameOver();
        return;
    }
    if (flagpole.isReached) {
        displayLevelComplete();
        // bring back to the ground if level completed while jumping
        character.y = min(character.y + 1, floorPos_y);
        return;
    }
    //////// Game character logic ///////
    // Logic to move

    character.move();

    displayScoreAndLives();

    character.checkPlayerDie();

    if (!flagpole.isReached) {
        flagpole.checkReached();
    }

    gameChar_world_x = character.x - scrollPos;
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

    if (keyCode == 32 && (flagpole.isReached || lives < 1)) {
        startGame();
        lives = 3;
    }
}

function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }


}

function drawTrees() {
    for (var i = 0; i < trees.length; i++) {
        trees[i].draw();
    }
}

function drawClouds() {
    for (var i = 0; i < clouds.length; i++) {
        clouds[i].draw();
    }
}

function drawMountains() {
    for (let i = 0; i < mountains.length; i++) {
        mountains[i].draw();
    }
}

function drawCanyons() {
    for (var i = 0; i < canyons.length; i++) {
        canyons[i].draw();
        canyons[i].checkCanyon();
    }
}

function drawPlatforms() {
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }
}

function drawCollectables() {
    for (var i = 0; i < collectables.length; i++) {
        if (!collectables[i].isFound) {
            collectables[i].draw();
            collectables[i].checkCollectable();
        }
    }
}

function displayScoreAndLives() {
    var coin;
    var nScoreDigits;
    var topMargin = 0.02 * height
    var rightMargin = 0.01 * width
    var fontSize = 30;

    function redCrossLife(x, y, size, alive) {
        var shortSide = size / 3;

        fill(255, 168, 0);
        //vertical bar
        rect(x - shortSide / 2, y - size / 2, shortSide, size);
        //horizontal
        rect(x - size / 2, y - shortSide / 2, size, shortSide);

    }

    // Display red crosses for lives
    for (var i = 0; i < lives; i++) {
        redCrossLife(width - rightMargin - 15 - i * (30 + rightMargin), topMargin + 15, 30, true);
    }


    // Display coin and score
    textSize(fontSize);
    textFont(font);
    textAlign(RIGHT, TOP);
    fill(255, 168, 0);
    // text("LIVES: " + lives + "\nSCORE: " + game_score, 0.99 * width, 0.02 * height);

    nScoreDigits = game_score.toString().length;
    text(game_score, width - rightMargin, 2 * topMargin + fontSize);
    coin = new Collectable(width - rightMargin - 20 - nScoreDigits * 17, 63, 30, "coin");
    coin.draw();


}

function displayGameOver() {
    textSize(80);
    textFont(font);
    textAlign(CENTER, BOTTOM);
    fill(255, 168, 0);
    text("GAME OVER!", width / 2, 0.98 * height / 2);
    textSize(30);
    textAlign(CENTER, TOP);
    text("Press SPACE to continue", width / 2, 1.02 * height / 2);
}

function displayLevelComplete() {
    textSize(80);
    textFont(font);
    textAlign(CENTER, BOTTOM);
    fill(255, 168, 0);
    text("LEVEL COMPLETE!", width / 2, 0.98 * height / 2);
    textSize(30);
    textAlign(CENTER, TOP);
    text("Press SPACE to continue", width / 2, 1.02 * height / 2);
}

function startGame() {
    if (backgroundMusic.isPaused()) {
        backgroundMusic.play();
    }

    game_score = 0;

    gameChar_x = 0.2 * width;
    // gameChar_x = 2450;
    gameChar_y = floorPos_y;

    character = new Character(gameChar_x, gameChar_y);

    // World elements
    trees = [
        new Tree(x = 350, floorPos_y, 170),
    ];

    clouds = [
        new Cloud(x = 50, y = 150, size = 50),
        new Cloud(300, 170, 100),
        new Cloud(400, 140, 80),
        new Cloud(800, 140, 120),
        new Cloud(1300, 140, 90),
        new Cloud(1700, 140, 100),
        new Cloud(1800, 140, 60),
        new Cloud(2200, 140, 120),
    ];

    mountains = [
        // new Mountain(x = 100, y = floorPos_y, size = 400, dark = false),
        new Mountain(800, floorPos_y, 450, false),
        new Mountain(520, floorPos_y, 350, true),
        new Mountain(1100, floorPos_y, 350, true),
        new Mountain(1750, floorPos_y, 200, true),
        new Mountain(1900, floorPos_y, 350, false),
    ];

    canyons = [
        new Canyon(x = 620, y = floorPos_y, size = 100),
        new Canyon(1140, floorPos_y, 100),
        new Canyon(1600, floorPos_y, 100),
        new Canyon(1800, floorPos_y, 100),
        new Canyon(2800, floorPos_y, 600),
    ];

    platforms = [
        new Platform(520, floorPos_y - 60, 80, 0),
        new Platform(775, floorPos_y - 60, 80, 0),
        new Platform(990, floorPos_y - 120, 250, 0),
        new Platform(1260, floorPos_y - 180, 200, 0),
        new Platform(2555, floorPos_y - 60, 150, 485),
    ];

    enemies = [
        new Enemy(x = 420, y = floorPos_y, range = 150),
        new Enemy(900, floorPos_y, 150),
        new Enemy(platforms[3].x - platforms[3].w / 2, platforms[3].walkLevel, platforms[3].w),
        new Enemy(2000, floorPos_y, 250),
    ];

    collectables = [
        new Collectable(platforms[0].x, platforms[0].walkLevel - 20, 30, "coin"),
        new Collectable(1700, floorPos_y - 20, 30, "diamond"),
    ]


    // ==================================================================== //
    // TODO: make function: treat all colllectables as 2D arrays
    var collSize = 30;

    var nCoins = floor(platforms[2].w / collSize)
    for (var i = 0; i < nCoins; i++) {
        collectables.push(
            new Collectable(platforms[2].x - floor(nCoins / 2) * collSize + i * collSize + 15, platforms[2].walkLevel - 20, collSize, "coin")
        )
    }

    var nCoins = floor(platforms[3].w / collSize) // if not provided fill in the whole width
    nCoins = 3;
    for (var i = 0; i < nCoins; i++) {
        collectables.push(
            new Collectable(platforms[3].x - floor(nCoins / 2) * collSize + i * collSize, platforms[3].walkLevel - 20 - 70, collSize, "coin")
        )
    }

    // ==================================================================== //
    nCoins = 8;
    for (var i = 0; i < nCoins; i++) {
        for (var j = 0; j < 2; j++) {
            if (i + j % 2 != 0) {
                collectables.push(
                    new Collectable(canyons[4].x - floor(nCoins / 2) * collSize + i * collSize + 15, platforms[4].walkLevel - 20 - 40 - (i % 2) * collSize, collSize, "coin")
                )
            }
        }
    }

    flagpole = new Flagpole(x = 3946, y = floorPos_y);

    // Variable to control the background scrolling.
    scrollPos = 0;

    // Variable to store the real position of the gameChar in the game
    // world. Needed for collision detection.
    gameChar_world_x = character.x - scrollPos;

}
