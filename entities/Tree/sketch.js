var tree;

function setup() {
    createCanvas(400, 400);

    tree = new Tree(width / 2, 3 * height / 4, 200);
}

function draw() {
    background(220);

    tree.draw();

    // reference point
    stroke(0);
    strokeWeight(5);
    point(tree.x, tree.y);
}
