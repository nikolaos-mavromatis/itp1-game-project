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
    }

    draw() {
        noStroke();
        //sidewalls
        let sidewallWidth = 15;
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
