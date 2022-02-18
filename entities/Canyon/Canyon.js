var sidewallWidth = 15;
var circles;
var lines;

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

        this.innerW = this.w - 2 * sidewallWidth
        let maxD = 10;
        lines = [];
        for (var i = 0; i < this.innerW / 4; i++) {
            let p1 = createVector(random(this.x - this.innerW / 2, this.x + this.innerW / 2), random(this.y, this.y + this.h));
            let p2 = createVector(
                constrain(p1.x + random(-2 * maxD, 2 * maxD), this.x - this.innerW / 2, this.x + this.innerW / 2),
                constrain(p1.y + random(-2 * maxD, 2 * maxD), this.y, this.y + this.h)
            );
            lines.push([p1, p2]);
        }
        circles = [];
        for (var i = 0; i < this.innerW / 4; i++) {
            let c = createVector(random(this.x - this.innerW / 2 + 2 * maxD, this.x + this.innerW / 2 - 2 * maxD), random(this.y + 2 * maxD, this.y + this.h - 2 * maxD));
            let r = random(0, maxD);
            circles.push([c, r]);
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
        let pitWidth = this.w - 2 * sidewallWidth
        fill(222, 184, 135);
        rect(this.x - pitWidth / 2, this.y, pitWidth, this.h);

        stroke(139, 69, 19, 50);
        strokeWeight(2);
        for (var i = 0; i < lines.length; i++) {
            let l = lines[i];
            line(l[0].x, l[0].y, l[1].x, l[1].y);
        }
        noStroke();

        fill(139, 69, 19, 50);
        for (var i = 0; i < circles.length; i++) {
            let c = circles[i];
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
