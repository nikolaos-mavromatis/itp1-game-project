var wheelD;
var rot = 0;

class BoltWheelie {
    /* Renders an enemy on wheels featuring a lightning bolt. */
    constructor(x, y, size, range) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.range = range;

        this.isDead = false;
        this.currentX = x;
        this.direction = -1;
        this.velocity = 1;

        var ratio = 0.85;
        /* 
        Calculate the radius of the body:
        size = bodyD + wheelD/2 <=> 
        size = 2*r + ratio * r / 2 <=>
        size = (4*r + ratio*r) / 2 <=>
        r = 2*size / (4 + ratio)
        */
        this.r = 2 * this.size / (4 + ratio);
        wheelD = ratio * this.r;
    }

    update() {
        this.currentX += this.velocity * this.direction;

        if (this.currentX >= this.x + this.range || this.currentX < this.x) {
            this.direction *= -1;
        }
    }

    draw() {
        noStroke();
        this.update();
        this.#drawEnemy();
    }

    checkContact(x, y) {
        if (dist(this.currentX, this.y, x, y) <= 1.5 * this.r) {
            return true;
        }

        return false;
    }

    checkDead(x, y) {
        if (
            dist(x, y, this.currentX, this.y) < 2 * this.size &&
            (
                (x > this.currentX - this.size / 2) &&
                (x < this.currentX + this.size / 2)
            )
        ) {
            enemyKilledSound.play();
            this.isDead = true;
            character.y -= 15;
        }
    }

    #drawEnemy() {
        /*
        x, y represent the middle bottom point of 
        the rectangle surrounding the enemy
        */

        this.#drawBody();
        this.#drawEye();
        this.#drawMouth();
        this.#drawWheel(this.currentX - 0.5 * this.r, this.y - wheelD / 2, wheelD, this.direction);
        this.#drawWheel(this.currentX + 0.5 * this.r, this.y - wheelD / 2, wheelD, this.direction);
        this.#drawBolt();
    }

    #drawBody() {
        fill(92, 45, 122);
        ellipse(this.currentX, this.y - (wheelD / 2 + this.r), 2 * this.r, 2 * this.r);
    }

    #drawEye() {
        fill(255);
        // contour
        ellipse(
            this.currentX + (0.5 * this.r) * this.direction,
            this.y - (wheelD / 2 + this.r + this.r / 3),
            0.8 * 0.55 * this.r,
            0.55 * this.r
        );
        fill(0);
        // pupil
        ellipse(
            this.currentX + (0.5 * this.r) * this.direction + 0.15 * 0.55 * this.r * this.direction,
            this.y - (wheelD / 2 + this.r + this.r / 3) + 0.1 * 0.55 * this.r,
            0.4 * 0.55 * this.r,
            0.5 * 0.55 * this.r
        );
        // eyebrow
        beginShape();
        vertex(
            this.currentX + 0.3 * this.r * this.direction,
            this.y - wheelD / 2 - this.r - 0.8 * this.r
        );
        vertex(
            this.currentX + 0.79 * this.r * this.direction,
            this.y - wheelD / 2 - this.r - 0.5 * this.r
        );
        vertex(
            this.currentX + 0.8 * this.r * this.direction,
            this.y - wheelD / 2 - this.r - 0.4 * this.r
        );
        vertex(
            this.currentX + 0.25 * this.r * this.direction,
            this.y - wheelD / 2 - this.r - 0.55 * this.r
        );
        endShape();
    }

    #drawMouth() {
        stroke(0);
        strokeWeight(1);
        line(
            this.currentX + 0.3 * this.r * this.direction + 0.6 * this.r * this.direction,
            this.y - wheelD / 2 - this.r + 0.25 * this.r,
            this.currentX + 0.3 * this.r * this.direction,
            this.y - wheelD / 2 - this.r + 0.25 * this.r
        );
        noStroke();
        fill(255);
        triangle(
            this.currentX + 0.3 * this.r * this.direction + 0.20 * this.r * this.direction,
            this.y - wheelD / 2 - this.r + 0.25 * this.r + 2,
            this.currentX + 0.3 * this.r * this.direction + 0.30 * this.r * this.direction,
            this.y - wheelD / 2 - this.r + 0.25 * this.r + 2,
            this.currentX + 0.3 * this.r * this.direction + 0.25 * this.r * this.direction,
            this.y - wheelD / 2 - this.r + 0.25 * this.r + 0.2 * this.r
        );
    }

    #drawCross(x, y, size, alpha) {
        var shortSide = size / 3;

        fill(255);
        //vertical bar
        rect(x - shortSide / 2, y - size / 2, shortSide, size, alpha);
        //horizontal
        rect(x - size / 2, y - shortSide / 2, size, shortSide, alpha);
    }

    #drawWheel(x, y, size, direction) {
        fill(212, 21, 116);
        ellipse(x, y, size, size);

        push();
        translate(x, y);
        rotate(rot);
        this.#drawCross(0, 0, 0.6 * size, 20);
        rot += 0.02 * direction;
        if (direction < 0) {
            rot -= 0.02;;
        }
        pop();
    }

    #drawBolt() {
        let w = 1.8 * this.r / 3;

        fill(255, 228, 48);
        beginShape();
        vertex(
            this.currentX - this.r / 2.5 * this.direction - this.direction * w / 2,
            this.y - (wheelD / 2 + this.r + this.r / 3) - 1.8 * this.r / 2
        );
        vertex(
            this.currentX - this.r / 2.5 * this.direction - this.direction * 0.2 * w / 2,
            this.y - (wheelD / 2 + this.r + this.r / 3) - 0.1 * 1.8 * this.r / 2
        );
        vertex(
            this.currentX - this.r / 2.5 * this.direction - this.direction * w / 2,
            this.y - (wheelD / 2 + this.r + this.r / 3) - 0.1 * 1.8 * this.r / 2
        );
        vertex(
            this.currentX - this.r / 2.5 * this.direction + this.direction * w / 2,
            this.y - (wheelD / 2 + this.r + this.r / 3) + 1.8 * this.r / 2
        );
        vertex(
            this.currentX - this.r / 2.5 * this.direction + this.direction * 0.2 * w / 2,
            this.y - (wheelD / 2 + this.r + this.r / 3) + 0.1 * 1.8 * this.r / 2
        );
        vertex(
            this.currentX - this.r / 2.5 * this.direction + this.direction * w / 2,
            this.y - (wheelD / 2 + this.r + this.r / 3) + 0.1 * 1.8 * this.r / 2
        );
        endShape();
    }
}
