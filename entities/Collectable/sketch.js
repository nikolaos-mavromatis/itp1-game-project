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

    game_score = 0;
    size = 100
    collectables = [
        new Collectable(width / 4, height / 2, size, "coin"),
        new Collectable(3 * width / 4, height / 2, size, "diamond")
    ];

}

function draw() {
    background(255);

    for (var i = 0; i < collectables.length; i++) {
        if (!collectables[i].isFound) {
            collectables[i].draw();
            collectables[i].checkCollectable(mouseX, mouseY);

            // test functionality
            //checks
            fill(0);
            textSize(20);
            textAlign(CENTER, TOP);
            text("d: " + floor(dist(collectables[i].x, collectables[i].y, mouseX, mouseY)), collectables[i].x, 30);
            text("isFound: " + collectables[i].isFound, collectables[i].x, 60);

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

        fill(0);
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
