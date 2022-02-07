var diamond;

function setup() {
    createCanvas(400, 400);

    diamond = new Diamond(width / 2, height / 2, height / 2);
}

function draw() {
    background(220);

    diamond.draw();
}
