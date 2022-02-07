var r;
var wheelD;
var angle = 0;
var scrollPos = 0;

class BoltWheelie {
    constructor(x, y, size, range) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.range = range;

        this.currentX = x;
        this.direction = 1;
        this.velocity = 1;

        var ratio = 0.85;
        /* 
        Calculate the radius of the body
        size = bodyD + wheelD/2 <=> 
        size = 2*r + ratio * r / 2 <=>
        size = (4*r + ratio*r) / 2 <=>
        r = 2*size / (4 + ratio)
        */
        r = 2 * this.size / (4 + ratio);
        wheelD = ratio * r;
    }

    update() {
        this.currentX += this.velocity * this.direction;

        if (this.currentX >= this.x + this.range || this.currentX < this.x) {
            this.direction *= -1;
        }
    }

    draw() {
        this.update();
        this.#drawEnemy();
    }

    checkContact(x, y) {
        if (dist(this.currentX, this.y, x, y) <= this.size) {
            return true;
        }

        return false;
    }

    #drawEnemy() {
        /* x, y represent the middle bottom point of 
    the rectangle surrounding the enemy */

        // // draw reference point
        // stroke(0);
        // strokeWeight(5);
        // point(this.currentX, this.y);
        // noStroke();

        this.#drawBody();
        this.#drawWheel(this.currentX - 0.5 * r, this.y - wheelD / 2, wheelD, this.direction);
        this.#drawWheel(this.currentX + 0.5 * r, this.y - wheelD / 2, wheelD, this.direction);
        this.#drawEye();
        this.#drawMouth();
        this.#drawBolt();
    }

    #drawBody() {
        fill(92, 45, 122);
        ellipse(this.currentX, this.y - (wheelD / 2 + r), 2 * r, 2 * r);
    }

    #drawEye() {
        fill(255);
        // contour
        ellipse(
            this.currentX + (0.5 * r) * this.direction,
            this.y - (wheelD / 2 + r + r / 3),
            0.8 * 0.55 * r,
            0.55 * r
        );
        fill(0);
        // pupil
        ellipse(
            this.currentX + (0.5 * r) * this.direction + 0.15 * 0.55 * r * this.direction,
            this.y - (wheelD / 2 + r + r / 3) + 0.1 * 0.55 * r,
            0.4 * 0.55 * r,
            0.5 * 0.55 * r
        );
        // eyebrow
        beginShape();
        vertex(
            this.currentX + 0.3 * r * this.direction,
            this.y - wheelD / 2 - r - 0.8 * r
        );
        vertex(
            this.currentX + 0.79 * r * this.direction,
            this.y - wheelD / 2 - r - 0.5 * r
        );
        vertex(
            this.currentX + 0.8 * r * this.direction,
            this.y - wheelD / 2 - r - 0.4 * r
        );
        vertex(
            this.currentX + 0.25 * r * this.direction,
            this.y - wheelD / 2 - r - 0.55 * r
        );
        endShape();
    }

    #drawMouth() {
        stroke(0);
        // strokeWeight(1);
        line(
            this.currentX + 0.3 * r * this.direction + 0.6 * r * this.direction,
            this.y - wheelD / 2 - r + 0.25 * r,
            this.currentX + 0.3 * r * this.direction,
            this.y - wheelD / 2 - r + 0.25 * r
        );
        noStroke();
        fill(255);
        triangle(
            this.currentX + 0.3 * r * this.direction + 0.20 * r * this.direction,
            this.y - wheelD / 2 - r + 0.25 * r + 2,
            this.currentX + 0.3 * r * this.direction + 0.30 * r * this.direction,
            this.y - wheelD / 2 - r + 0.25 * r + 2,
            this.currentX + 0.3 * r * this.direction + 0.25 * r * this.direction,
            this.y - wheelD / 2 - r + 0.25 * r + 0.2 * r
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
        rotate(angle);
        this.#drawCross(0, 0, 0.6 * size, 20);
        angle += 0.02 * direction;
        // if (direction < 0) {
        //     angle -= 0.02;;
        // }
        pop();
    }

    #drawBolt() {
        let w = 1.8 * r / 3;

        fill(255, 228, 48);
        beginShape();
        vertex(
            this.currentX - r / 2.5 * this.direction - this.direction * w / 2,
            this.y - (wheelD / 2 + r + r / 3) - 1.8 * r / 2
        );
        vertex(
            this.currentX - r / 2.5 * this.direction - this.direction * 0.2 * w / 2,
            this.y - (wheelD / 2 + r + r / 3) - 0.1 * 1.8 * r / 2
        );
        vertex(
            this.currentX - r / 2.5 * this.direction - this.direction * w / 2,
            this.y - (wheelD / 2 + r + r / 3) - 0.1 * 1.8 * r / 2
        );
        vertex(
            this.currentX - r / 2.5 * this.direction + this.direction * w / 2,
            this.y - (wheelD / 2 + r + r / 3) + 1.8 * r / 2
        );
        vertex(
            this.currentX - r / 2.5 * this.direction + this.direction * 0.2 * w / 2,
            this.y - (wheelD / 2 + r + r / 3) + 0.1 * 1.8 * r / 2
        );
        vertex(
            this.currentX - r / 2.5 * this.direction + this.direction * w / 2,
            this.y - (wheelD / 2 + r + r / 3) + 0.1 * 1.8 * r / 2
        );
        endShape();
    }
}


function setup() {
    createCanvas(400, 400);
    noStroke();

    enemy = new BoltWheelie(width / 4, 0.9 * height, 200, 200);
}

function draw() {
    background(120);

    push();
    translate(scrollPos);
    enemy.draw();
    pop();

    stroke(0)
    strokeWeight(3);
    line(width / 2 - scrollPos, 0, width / 2 - scrollPos, height);
    noStroke();
}

function keyPressed() {
    if (keyCode == 37) {
        scrollPos += 5;
    }
    if (keyCode == 39) {
        scrollPos -= 5;
    }

}
