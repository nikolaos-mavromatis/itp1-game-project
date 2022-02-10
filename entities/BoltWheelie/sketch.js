var scrollPos = 0;
function setup() {
    createCanvas(400, 400);

    enemy = new BoltWheelie(width / 4, 0.9 * height, 100, 200);
}

function draw() {
    background(120);

    if (!enemy.isDead) {
        enemy.draw();
        enemy.checkDead(mouseX, mouseY);

        hitEnemy = enemy.checkContact(mouseX, mouseY);
    }

    //testing
    //reference point
    stroke("lightgreen");
    strokeWeight(5);
    point(enemy.currentX, enemy.y);

    //interaction area
    point(enemy.currentX, enemy.y - enemy.size + enemy.r);

    noFill();
    stroke(255);
    strokeWeight(1);
    ellipse(enemy.currentX, enemy.y - enemy.size + enemy.r, 2 * enemy.r);
}
