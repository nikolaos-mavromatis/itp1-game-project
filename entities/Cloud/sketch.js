var cloud;

function setup() {

    createCanvas(1200, 800);

    cloud = new Cloud(0.5 * width, 0.75 * height, 800);
}

function draw() {
    background(100, 155, 255);

    noStroke();
    // cloud.showSketch();
    cloud.draw();
}
