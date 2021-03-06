var levelBadge = {
    points: [],
    size: 25,
    setup: function () {
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
    /* Renders the game world and the interface.*/
    constructor(level) {
        if (backgroundMusic.isPaused()) {
            backgroundMusic.play();
        }

        levelBadge.setup();

        game_score = 0;

        this.world = new World(level);

        // Variable to control the background scrolling.
        scrollPos = 0;
    }

    play() {
        if (!this.world.isCompleted) {
            this.world.render();
        }

        // Below statements (if true) should happen before the player has the chance to move
        if (lives < 1) {
            backgroundMusic.pause();
            this.interfaceGameOver();
            return;
        }
        if (flagpole.isReached) {
            this.interfaceLevelComplete();
            // bring back to the ground if level completed while jumping
            character.y = min(character.y + 1, floorPos_y);
            character.thruster.origin.y = min(character.thruster.origin.y + 1, floorPos_y);
            return;
        }

        //////// Game character logic ///////
        // Logic to move

        character.move();

        this.interfaceGameplay();

        character.checkPlayerDie();

        if (!flagpole.isReached) {
            flagpole.checkReached();
        }
    }

    interfaceGameplay() {
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

        // display lives
        for (var i = 0; i < lives; i++) {
            character.drawLife(width - rightMargin - 15 - i * (30 + rightMargin), topMargin + 15, 30);
        }

        // Display coin and score
        textSize(fontSize);
        textFont(font);
        textAlign(RIGHT, TOP);
        fill(255, 168, 0);
        nScoreDigits = game_score.toString().length;
        text(game_score, width - rightMargin, 2 * topMargin + fontSize);
        coin = new Collectable(width - rightMargin - 20 - nScoreDigits * 17, 63, 30, "coin");
        coin.draw();

        // display progress
        fill(0, 250, 154);
        rect(0, height - 10, map(flagpole.x - character.worldX, flagpole.x, 0, 0, width), 10);
    }

    interfaceGameOver() {
        textSize(80);
        textFont(font);
        textAlign(CENTER, BOTTOM);
        fill(255, 168, 0);
        text("GAME OVER!", width / 2, 0.98 * height / 2);
        textSize(30);
        textAlign(CENTER, TOP);
        text("Press SPACE to continue", width / 2, 1.02 * height / 2);
    }

    interfaceLevelComplete() {
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
