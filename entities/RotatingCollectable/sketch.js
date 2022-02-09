var v;
var r;
var angle;

function setup() {
    createCanvas(400, 400);

    collectable = new Collectable(width / 2, height / 2, 50, "diamond", 150);

    r = 2 * collectable.size;
    angle = 0;
}

function draw() {
    background(220);

    collectable.draw();

    // reference points
    stroke(130);
    strokeWeight(1);
    noFill();
    line(collectable.x, collectable.y, collectable.x + collectable.r, collectable.y)
    ellipse(collectable.x, collectable.y, 2 * collectable.r);

    stroke(0);
    strokeWeight(5);
    point(collectable.x, collectable.y)

    point(collectable.currentX, collectable.currentY);
    noStroke();

    fill(0);
    text(round(collectable.currentX, 0) + ", " + round(collectable.currentY, 0), 10, 10);
    text("r", collectable.x + 3 * collectable.r / 8, collectable.y - 10);
    text("(x, y)", collectable.x - 13, collectable.y + 15);
}
