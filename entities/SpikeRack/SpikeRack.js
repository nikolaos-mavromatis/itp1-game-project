class SpikeRack {
    constructor(x, y, w, h, n, inGround) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.boxH = h;
        this.spikeH = h;
        this.n = n;
        this.inGround = inGround;

        if (this.inGround) {
            this.y += this.boxH;
            this.spikeH -= 5;
        }
        this.margin = 3;
        this.spikeW = (w - 2 * this.margin) / n;
    }

    draw() {
        noStroke();

        fill(105);
        rect(this.x, this.y, this.w, 10);

        if (this.inGround) {
            fill(211);
            rect(this.x, this.y - this.boxH, this.w, this.boxH);
        }

        for (let i = 0; i < this.n; i++) {
            fill(47, 79, 79);
            triangle(
                this.x + this.margin + i * this.spikeW,
                this.y,
                this.x + this.margin + i * this.spikeW + this.spikeW,
                this.y,
                this.x + this.margin + i * this.spikeW + 0.5 * this.spikeW,
                this.y - this.spikeH
            );
            fill(192, 192, 192, 50);
            triangle(
                this.x + this.margin + i * this.spikeW + 0.5 * this.spikeW,
                this.y,
                this.x + this.margin + i * this.spikeW + this.spikeW,
                this.y,
                this.x + this.margin + i * this.spikeW + 0.5 * this.spikeW,
                this.y - this.spikeH
            );
        }
    }
}
