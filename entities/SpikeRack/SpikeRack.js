class SpikeRack {
    constructor(x, y, w, h, n, inGround) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.n = n;
        this.inGround = inGround;

        if (this.inGround) {
            this.y += this.h;
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
            rect(this.x, this.y - this.h, this.w, this.h);
        }

        for (let i = 0; i < this.n; i++) {
            fill(47, 79, 79);
            triangle(
                this.x + this.margin + i * this.spikeW,
                this.y,
                this.x + this.margin + i * this.spikeW + this.spikeW,
                this.y,
                this.x + this.margin + i * this.spikeW + 0.5 * this.spikeW,
                this.y - this.h
            );
            fill(192, 192, 192, 50);
            triangle(
                this.x + this.margin + i * this.spikeW + 0.5 * this.spikeW,
                this.y,
                this.x + this.margin + i * this.spikeW + this.spikeW,
                this.y,
                this.x + this.margin + i * this.spikeW + 0.5 * this.spikeW,
                this.y - this.h
            );
        }
    }

    checkContact(x, y) {
        /**
         * 3 ways to make contact:
         * - char falls into the spikes (rack is in the ground)
         * - char touches the sides of the rack (rack is above the ground)
         * - char lands on the rack (rack is above the ground)
         */

        if (
            (abs(x - (this.x + this.w / 2)) < this.w / 2)
            &&
            (y >= floorPos_y || y >= (this.y - this.h))
        ) {
            return true;
        }

        return false;
    }
}
