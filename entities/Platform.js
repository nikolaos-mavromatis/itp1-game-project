class Platform {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.w = size;
        this.h = 20;

        this.walkLevel = this.y - this.h;
    }

    draw() {
        noStroke();
        var alpha = map(this.w, 0, width, 0, 30);

        // draw soil
        fill(233, 133, 45);
        rect(
            this.x - 0.9 * this.w / 2,
            this.y - this.h,
            0.9 * this.w,
            this.h,
            alpha
        );
        // draw grass
        fill(0, 155, 0);
        var grassH = this.h / 2.5
        rect(
            this.x - this.w / 2,
            this.y - this.h,
            this.w,
            grassH,
            alpha
        );

        // draw curved grass
        var curvedGrassH = grassH / 2;
        var spaceX = (this.w - 2 * alpha) / 6;
        var bottomGrassLevel = this.y - this.h + grassH;
        var curvedStartX = this.x - this.w / 2 + alpha;

        beginShape();
        curveVertex(this.x - 3.5 * spaceX, bottomGrassLevel - curvedGrassH);
        for (var i = 0; i < 7; i++) {
            var h;
            if (i % 2 == 0) {
                h = bottomGrassLevel;
            }
            else {
                h = bottomGrassLevel + curvedGrassH;
            }
            curveVertex(curvedStartX + i * spaceX, h);
        }
        curveVertex(this.x + 3.5 * spaceX, bottomGrassLevel - curvedGrassH);
        endShape();
    }

    checkContact(x, y) {
        if (x > this.x - this.w / 2 && x < this.x + this.w / 2) {
            var d = character.y - this.walkLevel
            if (d >= 0 && d < 5) {
                return true;
            }
        }

        return false;
    }
}
