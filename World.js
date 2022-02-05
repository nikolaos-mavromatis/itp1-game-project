var currLevel;

class World {
    constructor(level) {
        currLevel = new Level(level);
    }

    render() {
        currLevel.render();
    }

}
