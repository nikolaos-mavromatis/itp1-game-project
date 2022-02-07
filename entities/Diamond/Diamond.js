class Diamond {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.w = size;
        this.h = size;
    }

    draw() {
        noStroke();
        fill(220, 20, 60);
        beginShape();
        vertex(this.x - this.w / 2, this.y - 0.75 * this.h / 2);
        vertex(this.x - 0.4 * this.w / 2, this.y - this.h / 2);
        vertex(this.x + 0.4 * this.w / 2, this.y - this.h / 2);
        vertex(this.x + this.w / 2, this.y - 0.75 * this.h / 2);
        vertex(this.x, this.y + this.h / 2);
        vertex(this.x - this.w / 2, this.y - 0.75 * this.h / 2);
        endShape();

        //lines
        stroke(160);
        beginShape(LINES);
        vertex(this.x - this.w / 2, this.y - 0.75 * this.h / 2);
        vertex(this.x - 0.4 * this.w / 2, this.y - 0.6 * this.h / 2);
        vertex(this.x - 0.4 * this.w / 2, this.y - 0.6 * this.h / 2);
        vertex(this.x + 0.4 * this.w / 2, this.y - 0.6 * this.h / 2);
        vertex(this.x + 0.4 * this.w / 2, this.y - 0.6 * this.h / 2);
        vertex(this.x + this.w / 2, this.y - 0.75 * this.h / 2);
        vertex(this.x - 0.4 * this.w / 2, this.y - 0.6 * this.h / 2);
        vertex(this.x, this.y + this.h / 2);
        vertex(this.x + 0.4 * this.w / 2, this.y - 0.6 * this.h / 2);
        vertex(this.x, this.y + this.h / 2);
        endShape();
        // line(
        //     this.x - this.w / 2, this.y - 0.75 * this.h / 2,
        //     this.x - 0.4 * this.w / 2, this.y - 0.6 * this.h / 2
        // );
        // line(
        //     this.x - this.w / 2, this.y - 0.75 * this.h / 2,
        //     this.x - 0.4 * this.w / 2, this.y - 0.6 * this.h / 2
        // );

    }
}

