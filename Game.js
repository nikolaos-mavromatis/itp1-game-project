var levelBadge = {
    points: [],
    size: 25,
    setup: function () {
        // console.log("setup");
        var incr = 2 * PI / 36;
        for (var i = 0; i < 36; i++) {
            var v = createVector(0, random(0.75, 1));
            var a = incr * i;
            v.rotate(a);
            this.points.push(v);
        }
    },
    draw: function () {

        fill(255, 168, 0);

        beginShape();
        for (var i = 0; i < this.points.length; i++) {
            var v = p5.Vector.mult(this.points[i], this.size);

            curveVertex(v.x, v.y);
        }
        endShape();
    },
}

class Game {
    constructor(level) {
        if (backgroundMusic.isPaused()) {
            backgroundMusic.play();
        }

        levelBadge.setup();

        game_score = 0;

        this.world = new World(level);

        // Variable to control the background scrolling.
        scrollPos = 0;

        // Variable to store the real position of the gameChar in the game
        // world. Needed for collision detection.
        gameChar_world_x = character.x - scrollPos;
    }

    play() {
        this.world.render();

        // Below statements (if true) should happen before the player has the chance to move
        if (lives < 1) {
            backgroundMusic.pause();
            this.displayGameOver();
            return;
        }
        if (flagpole.isReached) {
            this.displayLevelComplete();
            // bring back to the ground if level completed while jumping
            character.y = min(character.y + 1, floorPos_y);
            return;
        }
        //////// Game character logic ///////
        // Logic to move

        character.move();

        this.displayScoreAndLives();

        character.checkPlayerDie();

        if (!flagpole.isReached) {
            flagpole.checkReached();
        }

        gameChar_world_x = character.x - scrollPos;
    }

    displayScoreAndLives() {
        var coin;
        var nScoreDigits;
        var topMargin = 0.02 * height
        var rightMargin = 0.01 * width
        var fontSize = 30;

        // level banner
        push();
        translate(30, 30);
        levelBadge.draw();
        textFont(font);
        textAlign(CENTER, CENTER);
        fill(173, 116, 0);
        text(level, 0, 0);
        pop();


        function redCrossLife(x, y, size) {
            var shortSide = size / 3;

            fill(255, 168, 0);
            //vertical bar
            rect(x - shortSide / 2, y - size / 2, shortSide, size, 2);
            //horizontal
            rect(x - size / 2, y - shortSide / 2, size, shortSide, 2);

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

    displayGameOver() {
        textSize(80);
        textFont(font);
        textAlign(CENTER, BOTTOM);
        fill(255, 168, 0);
        text("GAME OVER!", width / 2, 0.98 * height / 2);
        textSize(30);
        textAlign(CENTER, TOP);
        text("Press SPACE to continue", width / 2, 1.02 * height / 2);
    }

    displayLevelComplete() {
        textSize(80);
        textFont(font);
        textAlign(CENTER, BOTTOM);
        fill(255, 168, 0);
        text("LEVEL " + level + " COMPLETE!", width / 2, 0.98 * height / 2);
        textSize(30);
        textAlign(CENTER, TOP);
        text("Press SPACE to continue", width / 2, 1.02 * height / 2);
    }
}
