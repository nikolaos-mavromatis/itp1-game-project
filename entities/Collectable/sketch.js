var size;
var collectables;
var game_score;
var coinCollectedSound;

function preload() {
    soundFormats('mp3', 'wav');

    coinCollectedSound = loadSound("coinCollected.wav");
    coinCollectedSound.setVolume(0.05);
}

function setup() {
    createCanvas(400, 400);

    size = 50;
    game_score = 0;
    angle = 0;

    // collectables = [
    //     new Collectable(width / 4, height / 2, size, "coin"),
    //     new Collectable(3 * width / 4, height / 2, size, "diamond")
    // ];

    collectables = [new Collectable(width / 2, height / 2 - 30, size, "diamond", r = 60)];

}

function draw() {
    background(255);

    for (var i = 0; i < collectables.length; i++) {
        if (!collectables[i].isFound) {
            collectables[i].draw();
            collectables[i].checkCollectable(mouseX, mouseY);
        }

        if (collectables[i].isRotating) {
            // reference points
            stroke(0);
            strokeWeight(5);
            //the center of the trajectory
            point(collectables[i].x, collectables[i].y)

            stroke(130);
            strokeWeight(1);
            noFill();
            //circular trajectory
            ellipse(collectables[i].x, collectables[i].y, 2 * collectables[i].r);
            //radius
            line(collectables[i].x, collectables[i].y, collectables[i].x + collectables[i].r, collectables[i].y);

            stroke(0);
            strokeWeight(5);
            //the current position of the collectable and the center of the interaction circle
            point(collectables[i].currentX, collectables[i].currentY);
            stroke(130);
            strokeWeight(1);
            noFill();
            //interaction circle
            ellipse(collectables[i].currentX, collectables[i].currentY, collectables[i].size);
            noStroke();

            fill(0);
            textSize(15);
            text("r", collectables[i].x + collectables[i].r / 4, collectables[i].y - 20);
            text("(x, y)", collectables[i].x, collectables[i].y + 10);
            textAlign(CENTER);
            text("(currentX, currentY): (" + round(collectables[i].currentX, 0) + ", " + round(collectables[i].currentY, 0) + ")", width / 2, 20);
        }
        else {
            // test functionality
            //checks
            fill(0);
            textSize(20);
            textAlign(CENTER, TOP);
            text("d: " + floor(dist(collectables[i].x, collectables[i].y, mouseX, mouseY)), collectables[i].x, 30);

            //reference point
            stroke(0);
            strokeWeight(5);
            point(collectables[i].x, collectables[i].y);

            //interaction area
            stroke(130);
            noFill();
            strokeWeight(2);
            ellipse(collectables[i].x, collectables[i].y, collectables[i].size);
            noStroke();

        }

        // test functionality
        //checks
        fill(0);
        textSize(20);
        textAlign(CENTER, TOP);
        text("isFound: " + collectables[i].isFound, collectables[i].x, 60);

        text("Click anywhere outside\nthe circles to reset...", width / 2, height - 120)

        text("Score: " + game_score, width / 2, height - 40);
    }


}

function mousePressed() {
    for (var i = 0; i < collectables.length; i++) {
        collectables[i].isFound = false;
        game_score = 0;
    }
}
