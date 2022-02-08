var scrollPos = 0;

function setup() {
    createCanvas(400, 400);
    noStroke();

    enemy = new BoltWheelie(width / 4, 0.9 * height, 20, 200);
}

function draw() {
    background(120);

    push();
    translate(scrollPos);
    enemy.draw();
    pop();

    stroke(0)
    strokeWeight(3);
    line(width / 2 - scrollPos, 0, width / 2 - scrollPos, height);
    noStroke();
}

function keyPressed() {
    if (keyCode == 37) {
        scrollPos += 5;
    }
    if (keyCode == 39) {
        scrollPos -= 5;
    }

}
