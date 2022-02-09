class Mountain {
    /*
    Creates a mountain using a trapezoid for the main body
    and a curve to make the top rounded.

    The position of the mountain is controlled by the 
    bottom left corner.
    */
    constructor(x, y, size, dark) {
        this.x = x;
        this.y = y;
        this.a = size;
        this.dark = dark;
    }

    draw() {
        noStroke();
        if (this.dark) {
            fill(47, 79, 79);
        } else {
            fill(119, 136, 153);
        }
        // round tip
        beginShape();
        curveVertex(this.x + 13.5 * this.a / 40, this.y - 3 * this.a / 8);
        curveVertex(this.x + + 9 * this.a / 20, this.y - 0.75 * this.a);
        curveVertex(this.x + 11 * this.a / 20, this.y - 0.75 * this.a);
        curveVertex(this.x + 26.5 * this.a / 40, this.y - 3 * this.a / 8);
        endShape();

        // main body
        beginShape();
        vertex(this.x, this.y);
        vertex(this.x + 9 * this.a / 20, this.y - 0.75 * this.a);
        vertex(this.x + 11 * this.a / 20, this.y - 0.75 * this.a);
        vertex(this.x + this.a, this.y);
        endShape();
    }
}
