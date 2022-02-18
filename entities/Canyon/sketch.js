var canyon;

function setup() {
    createCanvas(400, 400);
    let w = 200;
    canyon = new Canyon(width / 2, 3 * height / 4, w);
}

function draw() {
    background(220);

    canyon.draw();

    //reference point
    stroke(0);
    strokeWeight(5);
    point(canyon.x, canyon.y);
}
