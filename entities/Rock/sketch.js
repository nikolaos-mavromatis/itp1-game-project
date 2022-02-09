var rock;
function setup() {
    createCanvas(400, 400);
    rock = new Rock(width / 2, height / 2, 200);
}

function draw() {
    background(220);
    rock.draw();
}
