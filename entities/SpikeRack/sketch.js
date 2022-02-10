var spikes;
var size;
var floorPos_y;

function setup() {
    createCanvas(400, 400);

    size = 20;
    floorPos_y = height / 2;

    spikes = [
        new SpikeRack(width / 4 - 40, floorPos_y, 80, 20, 8, true),
        new SpikeRack(3 * width / 4 - 40, floorPos_y, 80, 20, 8, false),
    ];

}

function draw() {
    background(255)

    //draw ground
    fill(70, 130, 180);
    rect(0, floorPos_y, width, height - floorPos_y);

    for (var i = 0; i < spikes.length; i++) {
        spikes[i].draw();
        hitSpikes = spikes[i].checkContact(mouseX, mouseY);

        if (hitSpikes) {
            fill("white")
            textAlign(CENTER);
            textSize(20);
            textStyle(BOLD);
            text("MADE\nCONTACT", spikes[i].x + spikes[i].w / 2, spikes[i].y + 30);
        }
    }

    //reference point
    stroke("lightgreen");
    strokeWeight(5);
    point(spikes.x, spikes.y);

    //create a dummy object for the interactions
    noStroke();
    fill(218, 112, 214);
    rectMode(CENTER);
    rect(mouseX, mouseY, size, size);
    rectMode(CORNER);
}
