class Collectable {
    /*
    Creates a collectable coin using 3 concentric circles of
    varying diameter.

    The collectable's position is determined by the
    centre of the circles.
    */
    constructor(x, y, size, type) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.isFound = false;
        this.type = type;
        this.value = 0;
    }

    draw() {
        if (!this.isFound) {
            if (this.type == 'diamond') {
                this.drawDiamond();
            }
            else if (this.type == 'coin') {
                this.drawCoin();
            }
            else {
                throw "Cannot draw '" + this.type + "' collectable."
            }
        }
    }

    drawCoin() {
        this.value = 1;
        // from larger to smaller circle
        fill(255, 215, 0);
        ellipse(this.x, this.y, 0.8 * this.size, this.size);
        fill(222, 184, 135, 100);
        ellipse(this.x, this.y, 0.55 * this.size, 0.75 * this.size);
        fill(255, 215, 0);
        ellipse(this.x + 0.07 * this.size, this.y, 0.4 * this.size, 0.55 * this.size);
    }

    drawDiamond() {
        this.value = 2;

        noStroke();
        fill(220, 20, 60);
        beginShape();
        vertex(this.x - this.size / 2, this.y - 0.75 * this.size / 2);
        vertex(this.x - 0.4 * this.size / 2, this.y - this.size / 2);
        vertex(this.x + 0.4 * this.size / 2, this.y - this.size / 2);
        vertex(this.x + this.size / 2, this.y - 0.75 * this.size / 2);
        vertex(this.x, this.y + this.size / 2);
        vertex(this.x - this.size / 2, this.y - 0.75 * this.size / 2);
        endShape();

        //lines
        stroke(160);
        beginShape(LINES);
        vertex(this.x - this.size / 2, this.y - 0.75 * this.size / 2);
        vertex(this.x - 0.4 * this.size / 2, this.y - 0.6 * this.size / 2);
        vertex(this.x - 0.4 * this.size / 2, this.y - 0.6 * this.size / 2);
        vertex(this.x + 0.4 * this.size / 2, this.y - 0.6 * this.size / 2);
        vertex(this.x + 0.4 * this.size / 2, this.y - 0.6 * this.size / 2);
        vertex(this.x + this.size / 2, this.y - 0.75 * this.size / 2);
        vertex(this.x - 0.4 * this.size / 2, this.y - 0.6 * this.size / 2);
        vertex(this.x, this.y + this.size / 2);
        vertex(this.x + 0.4 * this.size / 2, this.y - 0.6 * this.size / 2);
        vertex(this.x, this.y + this.size / 2);
        endShape();
        noStroke();
    }

    checkCollectable() {
        if (
            dist(this.x,
                this.y,
                character.worldX,
                character.y - this.size // coin y is coin.size above the ground (where character.y is), hence the correction
            ) <= this.size
        ) {
            this.isFound = true;
            coinCollectedSound.play();
            game_score += this.value;
        }
    }
}
