var idx;
var angle = 0;

class World {
    constructor(level) {
        this.levels = [
            {
                // level 1
                setup: function () {
                    // character = new Character(0.2 * width, floorPos_y);
                    character = new BubbleMan(0.2 * width, floorPos_y, 80);

                    // World elements
                    trees = [
                        new Tree(350, floorPos_y, 170),
                    ];

                    clouds = [
                        new Cloud(50, 150, 50),
                        new Cloud(300, 170, 100),
                        new Cloud(400, 140, 80),
                        new Cloud(800, 140, 120),
                        new Cloud(1300, 140, 90),
                        new Cloud(1700, 140, 100),
                        new Cloud(1800, 140, 60),
                        new Cloud(2200, 140, 120),
                    ];

                    mountains = [
                        // new Mountain(x = 100, y = floorPos_y, size = 400, dark = false),
                        new Mountain(800, floorPos_y, 450, false),
                        new Mountain(520, floorPos_y, 350, true),
                        new Mountain(1100, floorPos_y, 350, true),
                        new Mountain(1750, floorPos_y, 200, true),
                        new Mountain(1900, floorPos_y, 350, false),
                    ];

                    canyons = [
                        new Canyon(620, floorPos_y, 100),
                        new Canyon(1140, floorPos_y, 100),
                        new Canyon(1600, floorPos_y, 100),
                        new Canyon(1800, floorPos_y, 100),
                        new Canyon(2800, floorPos_y, 600),
                    ];

                    platforms = [
                        new Platform(520, floorPos_y - 60, 80, 0),
                        new Platform(775, floorPos_y - 60, 80, 0),
                        new Platform(990, floorPos_y - 120, 250, 0),
                        new Platform(1260, floorPos_y - 180, 200, 0),
                        new Platform(2555, floorPos_y - 60, 150, 485),
                    ];

                    enemies = [
                        new BoltWheelie(420, floorPos_y, 40, 150),
                        new BoltWheelie(900, floorPos_y, 40, 150),
                        new BoltWheelie(platforms[3].x - platforms[3].w / 2, platforms[3].walkLevel, 40, platforms[3].w),
                        new BoltWheelie(2000, floorPos_y, 40, 250),
                    ];

                    collectables = [];
                    var c1 = collectables2DArray(1, 1, platforms[0].x, platforms[0].walkLevel, 30, "coin");
                    var c2 = collectables2DArray(1, floor(platforms[2].w / 30), platforms[2].x, platforms[2].walkLevel, 30, "coin");
                    var c3 = collectables2DArray(1, 3, platforms[3].x, platforms[3].walkLevel - 70, 30, "coin");
                    var c4 = collectables2DArray(1, 1, 1700, floorPos_y, 30, "diamond");
                    collectables = collectables.concat(c1, c2, c3, c4);

                    // ==================================================================== //
                    var pattern = [];
                    var nCoins = 8;
                    for (var i = 0; i < 2; i++) {
                        var p = [];
                        for (var j = 0; j < nCoins; j++) {
                            p.push((i + j) % 2 !== 0);
                        }
                        pattern.push(p);
                    }
                    var c5 = collectables2DArray(2, nCoins, canyons[4].x, platforms[4].walkLevel - 50, 30, "coin", pattern);
                    collectables = collectables.concat(c5);

                    // ==================================================================== //
                    rotatingCollectable = new Collectable(3495, floorPos_y - 20, 30, "diamond");

                    flagpole = new Flagpole(3946, floorPos_y);
                },
                render: function () {
                    // fill the sky blue
                    // TODO:dim the sky the closer the character gets to the flagpole
                    // background(100, 155, 255); //original
                    background(25, 25, 112);

                    // draw some green ground
                    // fill(0, 155, 0); // original
                    fill(70, 130, 180);
                    rect(0, floorPos_y, width, height / 4);

                    push();
                    translate(scrollPos, 0);

                    // Draw world elements
                    drawMountains();

                    drawClouds();

                    drawTrees();

                    drawCanyons();

                    drawPlatforms();

                    drawCollectables();

                    flagpole.render();

                    drawEnemies();

                    pop();

                    // Draw the game character
                    character.draw();
                }
            },
            // level 2 just for confirmation
            {
                setup: function () {
                    character = new Character(0.2 * width, floorPos_y);

                    // World elements
                    trees = [
                        new Tree(350, floorPos_y, 170),
                    ];

                    clouds = [
                        new Cloud(50, 150, 50),
                        new Cloud(300, 170, 100),
                        new Cloud(400, 140, 80),
                        new Cloud(800, 140, 120),
                        new Cloud(1300, 140, 90),
                        new Cloud(1700, 140, 100),
                        new Cloud(1800, 140, 60),
                        new Cloud(2200, 140, 120),
                    ];

                    mountains = [
                        // new Mountain(x = 100, y = floorPos_y, size = 400, dark = false),
                        new Mountain(800, floorPos_y, 450, false),
                        new Mountain(520, floorPos_y, 350, true),
                        new Mountain(1100, floorPos_y, 350, true),
                        new Mountain(1750, floorPos_y, 200, true),
                        new Mountain(1900, floorPos_y, 350, false),
                    ];

                    canyons = [
                        new Canyon(620, floorPos_y, 100),
                        new Canyon(1140, floorPos_y, 100),
                        new Canyon(1600, floorPos_y, 100),
                        new Canyon(1800, floorPos_y, 100),
                        new Canyon(2800, floorPos_y, 600),
                    ];

                    platforms = [
                        new Platform(520, floorPos_y - 60, 80, 0),
                        new Platform(775, floorPos_y - 60, 80, 0),
                        new Platform(990, floorPos_y - 120, 250, 0),
                        new Platform(1260, floorPos_y - 180, 200, 0),
                        new Platform(2555, floorPos_y - 60, 150, 485),
                    ];

                    enemies = [
                        new BoltWheelie(420, floorPos_y, 40, 150),
                        // new BoltWheelie(900, floorPos_y, 40, 150),
                        // new BoltWheelie(platforms[3].x - platforms[3].w / 2, platforms[3].walkLevel, 40, platforms[3].w),
                        // new BoltWheelie(2000, floorPos_y, 40, 250),
                    ];

                    collectables = [];
                    var c1 = collectables2DArray(1, 1, platforms[0].x, platforms[0].walkLevel, 30, "coin");
                    var c2 = collectables2DArray(1, floor(platforms[2].w / 30), platforms[2].x, platforms[2].walkLevel, 30, "coin");
                    var c3 = collectables2DArray(1, 3, platforms[3].x, platforms[3].walkLevel - 70, 30, "coin");
                    var c4 = collectables2DArray(1, 1, 1700, floorPos_y, 30, "diamond");
                    collectables = collectables.concat(c1, c2, c3, c4);

                    // ==================================================================== //
                    var pattern = [];
                    var nCoins = 8;
                    for (var i = 0; i < 2; i++) {
                        var p = [];
                        for (var j = 0; j < nCoins; j++) {
                            p.push((i + j) % 2 !== 0);
                        }
                        pattern.push(p);
                    }
                    var c5 = collectables2DArray(2, nCoins, canyons[4].x, platforms[4].walkLevel - 50, 30, "coin", pattern);
                    collectables = collectables.concat(c5);

                    // ==================================================================== //
                    rotatingCollectable = new Collectable(3495, floorPos_y - 20, 30, "diamond");

                    flagpole = new Flagpole(3946, floorPos_y);
                },
                render: function () {
                    // fill the sky blue
                    // TODO:dim the sky the closer the character gets to the flagpole
                    background(100, 155, 255);

                    // draw some green ground
                    fill(0, 155, 0);
                    rect(0, floorPos_y, width, height / 4);

                    push();
                    translate(scrollPos, 0);

                    // Draw world elements
                    drawMountains();

                    drawClouds();

                    drawTrees();

                    drawCanyons();

                    drawPlatforms();

                    drawCollectables();

                    flagpole.render();

                    drawEnemies();

                    pop();

                    // Draw the game character
                    character.draw();
                }
            }
        ];
        idx = level - 1;
        this.isCompleted = level > this.levels.length;

        this.levels[idx].setup();
    }

    render() {
        this.levels[idx].render();
    }
}

function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}

function drawTrees() {
    for (var i = 0; i < trees.length; i++) {
        trees[i].draw();
    }
}

function drawClouds() {
    for (var i = 0; i < clouds.length; i++) {
        clouds[i].draw();
    }
}

function drawMountains() {
    for (let i = 0; i < mountains.length; i++) {
        mountains[i].draw();
    }
}

function drawCanyons() {
    for (var i = 0; i < canyons.length; i++) {
        canyons[i].draw();
        canyons[i].checkCanyon();
    }
}

function drawPlatforms() {
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }
}

function drawCollectables() {
    for (var i = 0; i < collectables.length; i++) {
        for (var j = 0; j < collectables[i].length; j++) {
            if (!collectables[i][j].isFound) {
                collectables[i][j].draw();
                collectables[i][j].checkCollectable();
            }
        }
    }

    if (!rotatingCollectable.isFound) {
        push();
        translate(3495, floorPos_y - 2.5 * rotatingCollectable.size);
        var v = createVector(rotatingCollectable.size, rotatingCollectable.size);
        v.rotate(angle);
        rotatingCollectable.x = v.x;
        rotatingCollectable.y = v.y;
        rotatingCollectable.draw();
        angle += 0.02;
        pop();
        rotatingCollectable.x = 3495 + v.x;
        rotatingCollectable.y = floorPos_y - 2 * rotatingCollectable.size + v.y;
        rotatingCollectable.checkCollectable();
    }
}
