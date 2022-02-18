var idx;
var angle = 0;

class World {
    constructor(level) {
        this.levels = [
            {
                // level 1
                length: 4096,
                setup: function () {
                    sky = new NightSky(500);

                    character = new BubbleMan(0.2 * width, floorPos_y, 80);

                    // World elements
                    trees = [
                        new Tree(350, floorPos_y, 170),
                        new Tree(1500, floorPos_y, 190),
                        new Tree(2200, floorPos_y, 190),
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

                    spikes = [];

                    platforms = [
                        new Platform(520, floorPos_y - 60, 80, 0),
                        new Platform(775, floorPos_y - 60, 80, 0),
                        new Platform(990, floorPos_y - 120, 250, 0),
                        new Platform(1260, floorPos_y - 180, 200, 0),
                        new Platform(2555, floorPos_y - 60, 150, 485),
                    ];

                    enemies = [
                        new BoltWheelie(420, floorPos_y, 35, 150),
                        new BoltWheelie(900, floorPos_y, 35, 150),
                        new BoltWheelie(platforms[3].x - platforms[3].w / 2, platforms[3].walkLevel, 35, platforms[3].w),
                        new BoltWheelie(2000, floorPos_y, 35, 250),
                    ];

                    collectables = [];
                    var c1 = collectables2DArray(1, 1, platforms[0].x, platforms[0].y, 30, "diamond", 60);
                    var c2 = collectables2DArray(1, floor(platforms[2].w / 30), platforms[2].x, platforms[2].walkLevel, 30, "coin");
                    var c3 = collectables2DArray(1, 3, platforms[3].x, platforms[3].walkLevel - 70, 30, "coin");
                    var c4 = collectables2DArray(1, 1, 1700, floorPos_y, 30, "diamond");

                    // ==================================================================== //
                    // collectables array with pattern 
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
                    // ==================================================================== //

                    var c6 = collectables2DArray(1, 1, 3584, floorPos_y - 50, 30, "diamond", 50);
                    collectables = collectables.concat(c1, c2, c3, c4, c5, c6);

                    flagpole = new Flagpole(3946, floorPos_y, 200);
                },
                render: function () {
                    sky.render();

                    push();
                    translate(scrollPos, 0);

                    fill(70, 130, 180);
                    rect(0, floorPos_y, this.length, height / 4)

                    drawMountains();

                    drawClouds();

                    drawTrees();

                    drawCanyons();

                    drawPlatforms();

                    drawCollectables();

                    flagpole.render();

                    drawEnemies();

                    pop();

                    character.draw();
                }
            },
            // level 2 just for confirmation
            {
                length: 4096,
                setup: function () {
                    sky = new NightSky(500);

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
                        new Mountain(800, floorPos_y, 450, false),
                        new Mountain(520, floorPos_y, 350, true),
                        new Mountain(1100, floorPos_y, 350, true),
                        new Mountain(1750, floorPos_y, 200, true),
                        new Mountain(1900, floorPos_y, 350, false),
                    ];

                    canyons = [
                        new Canyon(1216, floorPos_y, 640),
                        new Canyon(1842, floorPos_y, 100),
                        new Canyon(2972, floorPos_y, 100),
                    ];

                    spikes = [
                        new SpikeRack(400, floorPos_y, 50, 30, 5, true),
                        new SpikeRack(2304, floorPos_y, 50, 30, 5, false),
                        new SpikeRack(2560, floorPos_y, 50, 30, 5, false),
                        new SpikeRack(3328, floorPos_y, 512, 30, 30, true)
                    ]

                    platforms = [
                        new Platform(936, floorPos_y - 40, 100, 560),
                        new Platform(1216, floorPos_y - 120, 220, 0),
                        new Platform(3378, floorPos_y - 50, 100, 0),
                        new Platform(3565, floorPos_y - 100, 220, 0),
                        new Platform(3784, floorPos_y - 140, 100, 0),
                    ];

                    enemies = [
                        new BoltWheelie(512, floorPos_y, 35, 250),
                        new BoltWheelie(646, floorPos_y, 35, 250),
                        new BoltWheelie(platforms[3].x - platforms[3].w / 2, platforms[3].walkLevel, 35, platforms[3].w)
                    ];

                    collectables = [];
                    var c1 = collectables2DArray(1, 1, 646, floorPos_y, 30, "diamond");
                    var c2 = collectables2DArray(3, 10, platforms[1].x, platforms[1].walkLevel, 30, "coin");
                    var c3 = collectables2DArray(1, 6, 2083, floorPos_y, 30, "coin");
                    var c4 = collectables2DArray(1, 1, 2452, floorPos_y, 30, "diamond");
                    var c5 = collectables2DArray(1, 1, 3584, platforms[4].walkLevel - 60, 30, "diamond", 50);
                    collectables = collectables.concat(c1, c2, c3, c4, c5);

                    flagpole = new Flagpole(3946, floorPos_y, 200);
                },
                render: function () {
                    sky.render();

                    push();
                    translate(scrollPos, 0);

                    fill(70, 130, 180);
                    rect(0, floorPos_y, this.length, height / 4)

                    drawMountains();

                    drawClouds();

                    drawTrees();

                    drawCanyons();

                    drawSpikes();

                    drawPlatforms();

                    drawCollectables();

                    flagpole.render();

                    drawEnemies();

                    pop();

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
        if (!enemies[i].isDead) {
            enemies[i].draw();
            enemies[i].checkDead(character.worldX, character.y);
        }
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

function drawSpikes() {
    for (var i = 0; i < spikes.length; i++) {
        spikes[i].draw();
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
                collectables[i][j].checkCollectable(character.worldX, character.y - collectables[i][j].size);
            }
        }
    }
}
