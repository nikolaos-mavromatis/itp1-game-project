var character;

function setup() {
    createCanvas(600, 600);
    
    character = new BubbleMan(width / 2, 0.8*height, 100);
}

function draw() {
    background(25, 25, 112);
    
    character.draw();
}

function keyPressed() {
    character.keyPressedInteraction();
}

function keyReleased() {
    character.keyReleasedInteraction();
}
