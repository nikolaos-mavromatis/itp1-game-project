var mountain;

function setup() {
    createCanvas(800, 600);

    mountain = new Mountain(width / 2, 0.75 * height, 400, snow = true);
}

function draw() {
    background(100, 155, 255);

    mountain.draw();
}
