/*
The screen should scroll with the character standing on the platform. 
Maybe different scrollPos values for various reasons. 
*/
class Platform {
    constructor(x, y, size, range) {
        this.x = x;
        this.y = y;
        this.w = size;
        this.range = range;

        this.h = 20;
        if (range > 0) {
            this.isMoving = true;
        }
        else {
            this.isMoving = false;
        }
        this.walkLevel = this.y - this.h;
        this.currentX = x;
        this.inc = 1;
    }

    update() {
        this.currentX += this.inc;

        if (this.currentX >= this.x + this.range || this.currentX < this.x) {
            this.inc *= -1;
        }
    }

    draw() {
        if (this.isMoving) {
            this.update();
        }

        noStroke();
        var alpha = map(this.w, 0, width, 0, 30);

        // draw soil
        fill(233, 133, 45);
        rect(
            this.currentX - 0.9 * this.w / 2,
            this.y - this.h,
            0.9 * this.w,
            this.h,
            alpha
        );
        // draw grass
        fill(70, 130, 180);
        var grassH = this.h / 2.5
        rect(
            this.currentX - this.w / 2,
            this.y - this.h,
            this.w,
            grassH,
            alpha
        );

        // draw curved grass
        var curvedGrassH = grassH / 2;
        var spaceX = (this.w - 2 * alpha) / 6;
        var bottomGrassLevel = this.y - this.h + grassH;
        var curvedStartX = this.currentX - this.w / 2 + alpha;

        beginShape();
        curveVertex(this.currentX - 3.5 * spaceX, bottomGrassLevel - curvedGrassH);
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
        curveVertex(this.currentX + 3.5 * spaceX, bottomGrassLevel - curvedGrassH);
        endShape();
    }

    checkContact(x, y) {
        if (x > this.currentX - this.w / 2 && x < this.currentX + this.w / 2) {
            var d = y - this.walkLevel
            if (d >= 0 && d < 5) {
                return true;
            }
        }

        return false;
    }
}
