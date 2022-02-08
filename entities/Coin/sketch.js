var coin;

function setup() {
    createCanvas(400, 400);

    coin = new Coin(width / 2, height / 2, height / 2);
}

function draw() {
    background(255);
    coin.draw();
}
