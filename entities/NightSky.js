class NightSky {
    constructor(n) {
        this.n = n;

        //populate array of n stars
        this.stars = [];
        for (var i = 0; i < this.n; i++) {
            let p = createVector(random(0, width), random(0, floorPos_y));
            let s = new Star(p);
            this.stars.push(s);
        }

    }

    render() {
        background(25, 25, 112);

        for (var i = this.n - 1; i >= 0; i--) {
            this.stars[i].draw();

            if (this.stars[i].isDead) {
                this.stars.splice(i, 1);
                let p = createVector(random(0, width), random(0, floorPos_y));
                let s = new Star(p);
                this.stars.push(s);
            }
        }
    }
}

var fallingThreshold = 0.0001;
class Star {
    constructor(position) {
        this.origin = position.copy();
        this.position = position.copy();

        this.velocityX = random(-2, 2);
        this.velocityY = random(-0.8, 0.8);
        this.size = random(1, 4);
        this.isFalling = random() < fallingThreshold;
        this.isDead = false;
        this.distanceFallen = 0;
        this.maxFallingDistance = this.size * 30;
    }

    draw() {
        fill(255, 215, 0);
        this.update();
        if (this.isFalling) {
            let distanceMapped = map(this.distanceFallen, 0, this.maxFallingDistance, 255, 50);
            stroke(255, 215, 0, distanceMapped);
            strokeWeight(this.size);
            point(this.position.x, this.position.y);
            noStroke();
        }

        if (!this.isFalling) {
            noStroke();
            ellipse(this.position.x, this.position.y, this.size);
        }
    }

    update() {
        if (!this.isFalling) {
            this.isFalling = random() < fallingThreshold / 10;
        }
        else {
            this.position.add(this.velocityX, this.velocityY);
            this.origin.add(this.velocityX / 2, this.velocityY / 2)
        }

        this.distanceFallen = dist(
            this.origin.x, this.origin.y,
            this.position.x, this.position.y
        );
        this.isDead = this.distanceFallen > this.maxFallingDistance;
    }
}
