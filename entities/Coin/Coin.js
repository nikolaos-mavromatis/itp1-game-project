class Coin {
    /*
    Creates a collectable coin using 3 concentric circles of
    varying diameter.

    The collectable's position is determined by the
    centre of the circles.
    */
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.isFound = false;
        this.value = 1;
    }

    draw() {
        if (!this.isFound) {
            // from larger to smaller circle
            noStroke();
            fill(255, 215, 0);
            ellipse(this.x, this.y, 0.8 * this.size, this.size);
            fill(222, 184, 135, 100);
            ellipse(this.x, this.y, 0.55 * this.size, 0.75 * this.size);
            fill(255, 215, 0);
            ellipse(this.x + 0.07 * this.size, this.y, 0.4 * this.size, 0.55 * this.size);
        }
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
