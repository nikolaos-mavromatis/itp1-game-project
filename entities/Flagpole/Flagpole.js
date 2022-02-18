class Flagpole {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.w = size / 10;
        this.h = size;
        this.isReached = false;
    }

    render() {
        noStroke();
        let baseW = this.w;
        let baseH = 0.2 * this.h;
        let poleW = 0.2 * this.w;
        let flagW = 2 * this.w;
        let flagH = this.h / 10;

        fill(75, 0, 13);
        if (this.isReached) {
            triangle(
                this.x, this.y - this.h + 0.04 * this.h,
                this.x, this.y - this.h + 0.04 * this.h + flagH,
                this.x - flagW, this.y - this.h + 0.04 * this.h + flagH / 2
            );
        }
        else {
            triangle(
                this.x, this.y - baseH - flagH,
                this.x, this.y - baseH,
                this.x - flagW, this.y - baseH - flagH / 2
            );
        }


        fill(47, 79, 79);
        beginShape();
        vertex(this.x - baseW / 2, this.y);
        vertex(this.x - baseW / 2, this.y - baseH / 2);
        vertex(this.x - 0.8 * baseW / 2, this.y - baseH);
        vertex(this.x + 0.8 * baseW / 2, this.y - baseH);
        vertex(this.x + baseW / 2, this.y - baseH / 2);
        vertex(this.x + baseW / 2, this.y);
        vertex(this.x - baseW / 2, this.y);
        endShape();
        fill(70, 130, 180);
        rect(this.x - poleW / 2, this.y - this.h, poleW, this.h - baseH / 2, 20);
    }

    checkReached() {
        if (abs(character.worldX - this.x) <= 30) {
            this.isReached = true;
            levelCompleteSound.play();
        }
    }
}
