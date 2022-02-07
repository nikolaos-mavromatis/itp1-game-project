var v;
var angle;

function setup() {
    createCanvas(400, 400);

    collectable = new Collectable(width / 2, 3 * height / 4, 30, "diamond");

    angle = 0;
}

function draw() {
    background(220);

    push();
    translate(width / 2, height - 20 - 4 * collectable.size);
    v = createVector(2 * collectable.size, 2 * collectable.size);
    v.rotate(angle);
    collectable.x = v.x;
    collectable.y = v.y;
    collectable.draw();
    angle += 0.01;
    pop();

}
