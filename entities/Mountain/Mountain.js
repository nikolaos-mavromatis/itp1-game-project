class Mountain {
    constructor(x, y, size, snow) {
        this.x = x;
        this.y = y;
        this.a = size;
        this.snow = snow;
    }

    draw() {
        //mountain
        noStroke();
        fill(165, 42, 42);

        beginShape();
        vertex(this.x - this.a / 2, this.y);
        vertex(this.x - this.a / 20, this.y - 0.75 * this.a);
        vertex(this.x + this.a / 20, this.y - 0.75 * this.a);
        vertex(this.x + this.a / 2, this.y);
        endShape();

        if (this.snow) {
            //snow
            fill(255);
            beginShape();
            curveVertex(this.x - 6.5 * this.a / 40, this.y - 3 * this.a / 8);
            curveVertex(this.x - this.a / 20, this.y - 0.75 * this.a);
            curveVertex(this.x + this.a / 20, this.y - 0.75 * this.a);
            curveVertex(this.x + 6.5 * this.a / 40, this.y - 3 * this.a / 8);
            endShape();

            beginShape();
            vertex(this.x - 3.4 * this.a / 20, this.y - 0.55 * this.a);
            vertex(this.x - this.a / 20, this.y - 0.75 * this.a);
            vertex(this.x + this.a / 20, this.y - 0.75 * this.a);
            vertex(this.x + 4.6 * this.a / 20, this.y - 0.45 * this.a);
            endShape();

            beginShape();
            curveVertex(this.x - 3.3 * this.a / 20, this.y - 0.9 * this.a);
            curveVertex(this.x - 3.395 * this.a / 20, this.y - 0.5501 * this.a);
            curveVertex(this.x - this.a / 20, this.y - 0.5 * this.a);
            curveVertex(this.x + 2 * this.a / 20, this.y - 0.47 * this.a);
            curveVertex(this.x + 4.6 * this.a / 20, this.y - 0.4501 * this.a);
            curveVertex(this.x + 8.3 * this.a / 20, this.y - 0.55 * this.a);
            endShape();
        } else {
            fill(165, 42, 42);
            beginShape();
            curveVertex(this.x - 6.5 * this.a / 40, this.y - 3 * this.a / 8);
            curveVertex(this.x - this.a / 20, this.y - 0.75 * this.a);
            curveVertex(this.x + this.a / 20, this.y - 0.75 * this.a);
            curveVertex(this.x + 6.5 * this.a / 40, this.y - 3 * this.a / 8);
            endShape();
        }
    }
}
