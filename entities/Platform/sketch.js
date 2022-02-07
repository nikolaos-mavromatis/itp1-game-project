var platform;

function setup() {
    createCanvas(1000, 1000);

    platform = new Platform(width / 2, height / 2, width / 2);
}

function draw() {
    background(220);

    platform.draw();

}
