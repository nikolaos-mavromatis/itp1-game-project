var enemy;
function setup() {
    createCanvas(400, 400);
    enemy = new Enemy(width / 2, 3 * height / 4, 100);
}

function draw() {
    background(220);

    enemy.draw();
}
