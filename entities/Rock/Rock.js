var p;
class Rock {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.n = size / 20;
        this.pX = x;
        this.spacing = size / this.n;

        this.points = [];

        p = createVector(this.x - 5 * this.spacing, this.y + 5 * this.spacing);
        this.points.push(p);
        p = createVector(this.x, this.y);
        this.points.push(p);
        for (var i = 1; i < this.n + 1; i++) {
            p = createVector(this.pX + this.spacing, random(0.2, 1));
            p.mult(1, -size / 3);
            p.add(0, height);
            this.points.push(p);
            this.pX += this.spacing;
        }
        p = createVector(this.pX + this.spacing, this.y);
        this.points.push(p);
        p = createVector(this.pX + 5 * this.spacing, this.y + 5 * this.spacing);
        this.points.push(p);



    }

    draw() {
        fill(188, 143, 143);

        stroke(0);
        strokeWeight(2);
        line(0, this.y, width, this.y);
        strokeWeight(5);
        point(this.x, this.y);
        noStroke();
        beginShape();
        for (var i = 1; i < this.points.length; i++) {
            curveVertex(this.points[i].x, this.points[i].y);
        }
        endShape();
    }   
}
