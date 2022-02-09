var flagpole;

function setup() {
    createCanvas(400, 400);

    flagpole = new Flagpole(width / 2, 3 * height / 4, 200)
}

function draw() {
    background(220);

    flagpole.render();

    // reference point
    stroke(0);
    strokeWeight(5);
    point(flagpole.x, flagpole.y);
}
