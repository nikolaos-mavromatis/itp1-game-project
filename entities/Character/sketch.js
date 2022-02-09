var character;
var floorPos_y;
var gameChar_world_x;

function setup() {
    createCanvas(400, 400);

    floorPos_y = height - 50;
    gameChar_world_x = width / 2;

    character = new Character(width / 2, floorPos_y);
}

function draw() {
    background(220);

    character.draw();
    character.move();

    // reference point
    stroke(0);
    strokeWeight(5);
    point(character.x, character.y);
}
