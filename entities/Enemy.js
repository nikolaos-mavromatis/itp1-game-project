class Enemy {
    constructor(x, y, range) {

        this.x = x;
        this.y = y;
        this.range = range;
        this.size = 20;

        this.currentX = x;
        this.inc = 1;
    }

    update() {
        this.currentX += this.inc;

        if (this.currentX >= this.x + this.range) {
            this.inc *= -1;
        }
        else if (this.currentX < this.x) {
            this.inc *= -1;
        }

    }

    draw() {
        this.update();
        fill(255, 0, 0);
        ellipse(this.currentX, this.y, this.size, this.size);
    }

    checkContact(x, y) {
        if (dist(this.currentX, this.y, x, y) <= this.size) {
            return true;
        }

        return false;
    }
}
