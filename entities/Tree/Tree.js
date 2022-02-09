class Tree {
    /*
    Creates a tree using 3 triangles and a rectangle for the trunk.

    The tree is positioned using the bottom midpoint of the trunk.
    */
    constructor(x, y, height) {
        this.x = x;
        this.y = y;
        this.h = height;
        this.w = (2 * this.h) / 3;

        this.trunk_w = this.w / 4;
        this.trunk_h = this.h / 4;
    }

    draw() {
        noStroke();
        //trunk
        // fill(160, 85, 45);
        fill(205, 133, 63);
        rect(
            this.x - this.trunk_w / 2,
            this.y - this.trunk_h,
            this.trunk_w,
            this.trunk_h
        );
        // canopy
        // fill(0, 100, 0);
        fill(240, 128, 128);
        triangle(
            this.x - this.w / 2,
            this.y - this.trunk_h,
            this.x + this.w / 2,
            this.y - this.trunk_h,
            this.x,
            this.y - this.h,
        );
        var a = 0.95;
        var b = 1.6;
        triangle(
            this.x - a * this.w / 2,
            this.y - b * this.trunk_h,
            this.x + a * this.w / 2,
            this.y - b * this.trunk_h,
            this.x,
            this.y - this.h,
        );
        a = 0.85;
        b = 2.2;
        triangle(
            this.x - a * this.w / 2,
            this.y - b * this.trunk_h,
            this.x + a * this.w / 2,
            this.y - b * this.trunk_h,
            this.x,
            this.y - this.h,
        );
    }
}
