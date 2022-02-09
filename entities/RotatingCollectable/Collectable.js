var v;

class Collectable {
    /*
    Creates a collectable coin using 3 concentric circles of
    varying diameter.

    The collectable's position is determined by the
    centre of the circles.
    */
    constructor(x, y, size, type, r = 0) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.r = r;
        this.isRotating = r > 0;

        this.currentX = x;
        this.currentY = y;
        this.isFound = false;
        this.type = type;
        this.value = 0;
    }

    draw() {
        noStroke();
        if (!this.isFound) {
            if (this.isRotating) {
                this.rotate();
            }

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

    rotate() {
        push();
        translate(this.x, this.y);
        v = createVector(0, this.r);
        v.rotate(angle);
        angle -= 0.006;
        this.currentX = v.x;
        this.currentY = v.y;
        stroke(0);
        strokeWeight(5);
        point(this.currentX, this.currentY);
        pop();

        this.currentX = this.x + v.x;
        this.currentY = this.y + v.y;
    }

    drawCoin() {
        this.value = 1;

        noStroke();
        fill(255, 215, 0);
        ellipse(this.currentX, this.currentY, 0.8 * this.size, this.size);
        fill(222, 184, 135, 100);
        ellipse(this.currentX, this.currentY, 0.55 * this.size, 0.75 * this.size);
        fill(255, 215, 0);
        ellipse(this.currentX + 0.07 * this.size, this.currentY, 0.4 * this.size, 0.55 * this.size);
    }

    drawDiamond() {
        this.value = 2;

        noStroke();
        strokeWeight(1);
        fill(220, 20, 60);
        beginShape();
        vertex(this.currentX - this.size / 2, this.currentY - 0.75 * this.size / 2);
        vertex(this.currentX - 0.4 * this.size / 2, this.currentY - this.size / 2);
        vertex(this.currentX + 0.4 * this.size / 2, this.currentY - this.size / 2);
        vertex(this.currentX + this.size / 2, this.currentY - 0.75 * this.size / 2);
        vertex(this.currentX, this.currentY + this.size / 2);
        vertex(this.currentX - this.size / 2, this.currentY - 0.75 * this.size / 2);
        endShape();

        //lines
        stroke(160);
        beginShape(LINES);
        vertex(this.currentX - this.size / 2, this.currentY - 0.75 * this.size / 2);
        vertex(this.currentX - 0.4 * this.size / 2, this.currentY - 0.6 * this.size / 2);
        vertex(this.currentX - 0.4 * this.size / 2, this.currentY - 0.6 * this.size / 2);
        vertex(this.currentX + 0.4 * this.size / 2, this.currentY - 0.6 * this.size / 2);
        vertex(this.currentX + 0.4 * this.size / 2, this.currentY - 0.6 * this.size / 2);
        vertex(this.currentX + this.size / 2, this.currentY - 0.75 * this.size / 2);
        vertex(this.currentX - 0.4 * this.size / 2, this.currentY - 0.6 * this.size / 2);
        vertex(this.currentX, this.currentY + this.size / 2);
        vertex(this.currentX + 0.4 * this.size / 2, this.currentY - 0.6 * this.size / 2);
        vertex(this.currentX, this.currentY + this.size / 2);
        endShape();
        noStroke();
    }

    checkCollectable() {
        if (
            dist(this.currentX,
                this.currentY,
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
