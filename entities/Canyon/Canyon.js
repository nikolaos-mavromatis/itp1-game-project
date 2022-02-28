var sidewallWidth = 15;

class Canyon {
    /*
    Constructs a canyon using rectangles for the pit
    and the sidewalls.

    The canyon is positioned using the midpoint at ground level..
    */
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height - this.y;

        this.circles = [];
        this.lines = [];
        this.innerW = this.w - 2 * sidewallWidth
        let maxD = 10;
        this.lines = [];
        for (var i = 0; i < this.innerW / 4; i++) {
            let p1 = createVector(random(this.x - this.innerW / 2, this.x + this.innerW / 2), random(this.y, this.y + this.h));
            let p2 = createVector(
                constrain(p1.x + random(-2 * maxD, 2 * maxD), this.x - this.innerW / 2, this.x + this.innerW / 2),
                constrain(p1.y + random(-2 * maxD, 2 * maxD), this.y, this.y + this.h)
            );
            this.lines.push([p1, p2]);
        }
        this.circles = [];
        for (var i = 0; i < this.innerW / 4; i++) {
            let c = createVector(random(this.x - this.innerW / 2 + 2 * maxD, this.x + this.innerW / 2 - 2 * maxD), random(this.y + 2 * maxD, this.y + this.h - 2 * maxD));
            let r = random(0, maxD);
            this.circles.push([c, r]);
        }
    }

    draw() {
        noStroke();
        //sidewalls
        if (2 * sidewallWidth >= this.w) {
            sidewallWidth = 0.1 * this.w;
        }

        // fill(205, 133, 63);
        fill(233, 133, 45);
        rect(this.x - this.w / 2, this.y, sidewallWidth, this.h);
        rect(this.x + this.w / 2 - sidewallWidth, this.y, sidewallWidth, this.h);

        //pit
        fill(222, 184, 135);
        rect(this.x - this.innerW / 2, this.y, this.innerW, this.h);

        //pebbles
        stroke(139, 69, 19, 50);
        strokeWeight(2);
        for (var i = 0; i < this.lines.length; i++) {
            let l = this.lines[i];
            line(l[0].x, l[0].y, l[1].x, l[1].y);
        }
        noStroke();

        fill(139, 69, 19, 50);
        for (var i = 0; i < this.circles.length; i++) {
            let c = this.circles[i];
            ellipse(c[0].x, c[0].y, c[1], c[1]);
        }
    }

    checkCanyon() {
        if (
            (abs(character.worldX - this.x) < this.w / 2)
            &&
            (character.y == floorPos_y)
        ) {
            character.isPlummeting = true;
        }
    }
}
