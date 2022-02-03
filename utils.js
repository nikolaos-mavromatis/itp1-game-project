function getCollectablesArray(startX, startY, n, size, type = "diamond") {
    let collArr = [];
    for (var i = 0; i < n; i++) {
        collArr.push(
            new Collectable(
                x = startX + i * size,
                y = startY - size,
                size = size,
                type = type
            )
        );
    }

    return collArr
}


function drawPauseButton(x, y, size) {
    let w = 0.8 * size;
    let barW = w / 2.5;

    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + size) {
        y *= 0.85;
        size = 1.2 * size;
    }

    fill(255, 168, 0);
    rect(x, y, barW, size, 10);
    rect(x + 1.5 * barW, y, barW, size, 20);

}
