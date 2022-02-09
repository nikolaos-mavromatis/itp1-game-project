var spikes;
function setup() {
    createCanvas(400, 400);

    spikes = new SpikeRack(width / 4, height / 2, 200, 20, 20, true);
}

function draw() {
    background(255);
    noStroke();
    spikes.draw();
}
