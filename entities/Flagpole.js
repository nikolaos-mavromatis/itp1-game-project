class Flagpole {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 0.01 * width;
        this.h = 0.5 * height;
        this.isReached = false;
    }

    render() {
        let w = 0.02 * width;
        let h = 0.5 * height;
        let baseW = w;
        let baseH = 0.2 * h;
        let poleW = 0.2 * w;
        let flagW = 2 * w;
        let flagH = h / 10;

        fill(75, 0, 13);
        if (this.isReached) {
            triangle(
                this.x, this.y - h + 0.04 * h,
                this.x, this.y - h + 0.04 * h + flagH,
                this.x - flagW, this.y - h + 0.04 * h + flagH / 2
            );
        }
        else {
            triangle(
                this.x, this.y - baseH - flagH,
                this.x, this.y - baseH,
                this.x - flagW, this.y - baseH - flagH / 2
            );
        }

        fill(70, 130, 180);
        rect(this.x - poleW / 2, this.y - h, poleW, h, 20);

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
    }

    checkReached() {
        if (abs(gameChar_world_x - this.x) <= 30) {
            this.isReached = true;
        }
    }
}
