var suitColor;

class BubbleMan {
    /* Renders the game character.
    The character features a thruster engine. 
    */
    constructor(x, y, size) {
        suitColor = color(176, 196, 222);

        this.x = x;
        this.y = y - 100;
        this.h = size;
        this.w = size / 2;

        this.direction = 1;
        this.velocity = 5;
        this.gravity = 3;
        this.verticalJump = 100;

        this.isLeft = false;
        this.isRight = false;
        this.isFalling = true;
        this.isPlummeting = false;

        this.thruster = new Thruster(createVector(this.x, this.y), this.h / 2);
    }

    draw() {
        if (!this.isPlummeting) {
            // the thruster should not work in case the character is falling into a canyon
            this.thruster.addParticle();
            this.thruster.run();
        }

        if (this.isLeft) {
            // add your walking left code
            this.turnLeft();
        }
        else if (this.isRight) {
            // add your walking right code
            this.turnRight();
        }
        else {
            // add your standing front facing code
            this.stand();
        }
    }

    move() {
        // Logic to make the game character move or the background scroll.
        if (this.isLeft) {
            if (this.x > width * 0.2) {
                this.x -= this.velocity;
                this.thruster.origin.x -= this.velocity;

                for (var i = 0; i < this.thruster.particles.length; i++) {
                    this.thruster.particles[i].position.x -= this.velocity / 10;
                }
            }
            else {
                for (var i = 0; i < this.thruster.particles.length; i++) {
                    this.thruster.particles[i].position.x += this.velocity;
                }
                scrollPos += 5;
            }
        }

        if (this.isRight) {
            if (this.x < width * 0.8) {
                this.x += this.velocity;
                this.thruster.origin.x += this.velocity;
                for (var i = 0; i < this.thruster.particles.length; i++) {
                    this.thruster.particles[i].position.x += this.velocity / 10;
                }
            }
            else {
                for (var i = 0; i < this.thruster.particles.length; i++) {
                    this.thruster.particles[i].position.x -= this.velocity;
                }
                scrollPos -= 5; // negative for moving against the background
            }
        }

        // logic to prevent the character from going further then the start of the world
        if (this.worldX <= 0) {
            this.isLeft = false;
        }

        // Logic to make the game character rise and fall.
        if (this.y < floorPos_y) {
            // check if character is on any platform
            for (var i = 0; i < platforms.length; i++) {
                this.isOnPlatform = platforms[i].checkContact(this.worldX, this.y);

                if (this.isOnPlatform) {
                    this.isFalling = false;

                    // move character with the moving platform
                    if (platforms[i].isMoving) {
                        this.x += platforms[i].inc;
                        this.thruster.origin.x += platforms[i].inc;

                        if (character.x <= width * 0.2 || character.x >= width * 0.8) {
                            this.x -= platforms[i].inc
                            this.thruster.origin.x -= platforms[i].inc
                            scrollPos -= platforms[i].inc;
                        }
                    }

                    break;
                }
            }

            if (!this.isOnPlatform) {
                this.y = min(floorPos_y, this.y + this.gravity) // min was need because of the multiples
                this.thruster.origin.y = min(floorPos_y, this.thruster.origin.y + this.gravity); // min was need because of the multiples
                this.isFalling = true;
            }
        }
        else {
            this.isFalling = false;
        }

        if (this.isPlummeting) {
            this.y += this.gravity;

            this.isLeft = false;
            this.isRight = false;
        }

        this.worldX = this.x - scrollPos;
    }

    keyPressedInteraction() {
        if (key == 'A' || keyCode == 37) {
            this.isLeft = true;
        }

        if (key == 'D' || keyCode == 39) {
            this.isRight = true;
        }

        if ((key == 'W' || keyCode == 32) && !flagpole.isReached && !this.isPlummeting) {
            if (!this.isFalling || this.isOnPlatform) {
                jumpSound.play();
                this.y -= this.verticalJump;
                this.thruster.origin.y -= this.verticalJump;
            }
        }
    }

    keyReleasedInteraction() {
        if (key == 'A' || keyCode == 37) {
            this.isLeft = false;
        }

        if (key == 'D' || keyCode == 39) {
            this.isRight = false;
        }
    }

    checkPlayerDie() {
        /*
        Ways for character to lose a life:
            - came in contact with an enemy
            - came in contact with spikes
            - fell into a canyon
        */
        for (var i = 0; i < enemies.length; i++) {
            if (!enemies[i].isDead) {
                this.hitEnemy = enemies[i].checkContact(this.worldX, this.y);

                if (this.hitEnemy) {
                    break;
                }
            }
        }

        for (var i = 0; i < spikes.length; i++) {
            this.hitSpikes = spikes[i].checkContact(this.worldX, this.y);

            if (this.hitSpikes) {
                break;
            }
        }

        if (this.y > height + this.h || this.hitEnemy || this.hitSpikes) {
            lives -= 1;
            if (lives > 0) {
                loseLifeSound.play();
                game = new Game(level);
            }
            else {
                gameOverSound.play();
            }
        }
    }

    stand() {
        noStroke();
        this.#drawLegs();
        this.#drawFrontBody();
        this.#drawArms();
        this.#drawHead();
    }

    turnLeft() {
        noStroke();
        this.#drawLegs();
        this.#drawFrontBody();
        this.#drawLeftSideArm();
        this.#drawSideHead();
    }

    turnRight() {
        noStroke();
        this.#drawLegs();
        this.#drawFrontBody();
        this.#drawRightSideArm();
        this.#drawSideHead();
    }

    drawLife(x, y, size) {
        // draw white helmet lining under the chin
        stroke(255, 255, 255, 130);
        strokeWeight(1);
        noFill();
        ellipse(x, y + 1, size - 4, size - 1);
        noStroke();
        // draw helmet
        fill(suitColor);
        ellipse(x, y, size, size);

        //draw head
        fill(0);
        let headD = size / 1.5;
        let headCy = y + headD / 5 - 3;
        ellipse(x, headCy, headD, headD);

        // draw eyes
        fill(255);
        let eyeline = headCy - headD / 8;
        let leftEyeCx = x - headD / 6;
        let leftEyeW = headD / 5;
        let leftEyeH = headD / 15;
        rect(leftEyeCx - leftEyeW / 2, eyeline - leftEyeH / 2, leftEyeW, leftEyeH, 10);

        let rightEyeCx = x + headD / 6;
        let rightEyeW = headD / 3.5;
        let rightEyeH = headD / 3;
        ellipse(rightEyeCx, eyeline, rightEyeW, rightEyeH);

        // draw eyeball
        fill(0);
        let rand = size / 150000
        ellipse(
            rightEyeCx + random(-rand, rand) * rightEyeCx,
            eyeline + headD / 20 + random(-rand, rand) * eyeline,
            rightEyeW / 1.5,
            rightEyeW / 1.5
        );

        // draw mouth
        fill(255);
        ellipse(x, headCy + headD / 6, headD / 3, headD / 4);
        fill(0);
        push();
        translate(x, headCy + headD / 9);
        rotate(PI / 15);
        ellipse(0, 0, headD / 2.5, headD / 4.2);
        pop();

        // draw helmet glass
        fill(70, 130, 180, 150);
        let d2 = 0.85 * size;
        ellipse(x, y, d2, d2);
    }

    #drawLegs() {
        let r1 = this.h / 12;
        let w1 = 6 * this.w / 16;
        let c1y = this.y - this.h / 12;
        fill(suitColor);
        // draw legs
        ellipse(this.x, c1y, w1, 2 * r1);

        let r2 = 1.1 * r1;
        let w2 = 1.15 * w1;
        let c2y = this.y - this.h / 6;
        // draw white waist lining 
        stroke(255, 255, 255, 130);
        strokeWeight(1);
        noFill();
        ellipse(this.x, c2y + 1, w2 - 4, 2 * r2 - 2);
        noStroke();

        fill(suitColor);
        ellipse(this.x, c2y, w2, 2 * r2);

        let r3 = 1.1 * r2;
        let w3 = 1.15 * w2;
        let c3y = this.y - this.h / 4;
        // draw white lining 
        stroke(255, 255, 255, 130);
        strokeWeight(1);
        noFill();
        ellipse(this.x, c3y + 1, w3 - 4, 2 * r3 - 2);
        noStroke();

        fill(suitColor);
        ellipse(this.x, c3y, w3, 2 * r3);
    }

    #drawArms() {
        let armW = this.w / 5;
        let armH = this.h / 4;
        let leftArmCx = this.x - 3.2 * this.w / 8;
        let rightArmCx = this.x + 3.2 * this.w / 8;
        let armCy = this.y - 4.4 * this.h / 8;

        // draw hands
        fill(255);
        rect(
            leftArmCx - armW / 4,
            armCy + 0.9 * armH / 2,
            armW / 2,
            armH / 6,
            this.h / 70
        );
        rect(
            leftArmCx - armW / 4,
            armCy + 1.05 * armH / 2,
            armW / 3,
            armH / 5,
            this.h / 50
        );
        rect(
            leftArmCx,
            armCy + 1.05 * armH / 2,
            armW / 4,
            armH / 7,
            this.h / 50
        );

        fill(255);
        rect(
            rightArmCx - armW / 4,
            armCy + 0.9 * armH / 2,
            armW / 2,
            armH / 6,
            this.h / 70
        );
        rect(
            rightArmCx - armW / 12,
            armCy + 1.05 * armH / 2,
            armW / 3,
            armH / 5,
            this.h / 50
        );
        rect(
            rightArmCx - armW / 4,
            armCy + 1.05 * armH / 2,
            armW / 4,
            armH / 7,
            this.h / 50
        );

        //draw arms
        fill(suitColor);
        rect(leftArmCx - armW / 2, armCy - armH / 2, armW, armH, this.h / 15);

        fill(suitColor);
        rect(rightArmCx - armW / 2, armCy - armH / 2, armW, armH, this.h / 15);
    }

    #drawLeftSideArm() {
        let armW = this.w / 5;
        let armH = this.h / 4;
        let leftArmCx = this.x;
        let armCy = this.y - 4.4 * this.h / 8;

        // draw hands
        fill(255);
        rect(
            leftArmCx,
            armCy + 0.9 * armH / 2,
            armW / 2,
            armH / 6,
            this.h / 70
        );
        rect(
            leftArmCx,
            armCy + 1.05 * armH / 2,
            armW / 3,
            armH / 5,
            this.h / 50
        );
        rect(
            leftArmCx,
            armCy + 1.05 * armH / 2,
            armW / 4,
            armH / 7,
            this.h / 50
        );

        //draw arms
        fill(suitColor);
        rect(leftArmCx, armCy - armH / 2, armW, armH, this.h / 15);


    }

    #drawRightSideArm() {
        let armW = this.w / 5;
        let armH = this.h / 4;
        let rightArmCx = this.x;
        let armCy = this.y - 4.4 * this.h / 8;

        fill(255);
        rect(
            rightArmCx,
            armCy + 0.9 * armH / 2,
            armW / 2,
            armH / 6,
            this.h / 70
        );
        rect(
            rightArmCx,
            armCy + 1.05 * armH / 2,
            armW / 3,
            armH / 5,
            this.h / 50
        );
        rect(
            rightArmCx,
            armCy + 1.05 * armH / 2,
            armW / 4,
            armH / 7,
            this.h / 50
        );

        //draw arms
        fill(suitColor);
        rect(rightArmCx, armCy - armH / 2, armW, armH, this.h / 15);


    }

    #drawFrontBody() {
        let waistCy = this.y - 7 * this.h / 20;
        let waistW = 0.65 * this.w;
        // draw white waist lining 
        stroke(255, 255, 255, 130);
        strokeWeight(1);
        noFill();
        ellipse(this.x, waistCy + 1, waistW - 4, waistW / 2 - 2);
        noStroke();

        // draw waist
        fill(255);
        ellipse(this.x, waistCy, waistW, waistW / 2)

        fill(suitColor);
        let torsoCy = this.y - 3 * this.h / 4;
        let torsoW = 0.85 * this.w;
        let torsoH = 0.9 * this.w;
        rect(this.x - torsoW / 2, torsoCy, torsoW, torsoH, this.h / 7);
    }

    #drawHead() {
        let helmetD = this.h / 3;
        let helmetCy = this.y - this.h + helmetD / 2;
        // draw white helmet lining under the chin
        stroke(255, 255, 255, 130);
        strokeWeight(1);
        noFill();
        ellipse(this.x, helmetCy + 1, helmetD - 4, helmetD - 1);
        noStroke();
        // draw helmet
        fill(suitColor);
        ellipse(this.x, helmetCy, helmetD, helmetD);

        //draw head
        fill(0);
        let headD = this.h / 5;
        let headCy = helmetCy + headD / 5 - 3;
        ellipse(this.x, headCy, headD, headD);

        // draw eyes
        fill(255);
        let eyeline = headCy - headD / 8;
        let leftEyeCx = this.x - headD / 6;
        let leftEyeW = headD / 5;
        let leftEyeH = headD / 15;
        rect(leftEyeCx - leftEyeW / 2, eyeline - leftEyeH / 2, leftEyeW, leftEyeH, 10);

        let rightEyeCx = this.x + headD / 6;
        let rightEyeW = headD / 3.5;
        let rightEyeH = headD / 3;
        ellipse(rightEyeCx, eyeline, rightEyeW, rightEyeH);

        // draw eyeball
        fill(0);
        let rand = this.h / 150000
        ellipse(
            rightEyeCx + random(-rand, rand) * rightEyeCx,
            eyeline + headD / 20 + random(-rand, rand) * eyeline,
            rightEyeW / 1.5,
            rightEyeW / 1.5
        );

        // draw mouth
        fill(255);
        ellipse(this.x, headCy + headD / 6, headD / 3, headD / 4);
        fill(0);
        push();
        translate(this.x, headCy + headD / 9);
        rotate(PI / 15);
        ellipse(0, 0, headD / 2.5, headD / 4.2);
        pop();


        // draw helmet glass
        fill(70, 130, 180, 150);
        let d2 = 0.85 * helmetD;
        ellipse(this.x, helmetCy, d2, d2);

    }

    #drawSideHead() {
        let helmetD = this.h / 3;
        let helmetCy = this.y - this.h + helmetD / 2;
        // draw white helmet lining under the chin
        stroke(255, 255, 255, 130);
        strokeWeight(1);
        noFill();
        ellipse(this.x, helmetCy + 1, helmetD - 4, helmetD - 1);
        noStroke();

        // draw helmet glass
        fill(70, 130, 180, 150);
        let d2 = 0.85 * helmetD;
        if (this.isLeft) {
            ellipse(this.x - 7, helmetCy, d2, d2);
        }
        if (this.isRight) {
            ellipse(this.x + 7, helmetCy, d2, d2);
        }

        // draw helmet
        fill(suitColor);
        ellipse(this.x, helmetCy, helmetD, helmetD);

    }
}

class Sparkle {
    constructor(position, lifespan) {
        this.acceleration = createVector(0, 0.05);
        this.velocity = createVector(random(-0.5, 0.5), random(-1, 0));
        this.position = position.copy();
        this.lifespan = lifespan;

        this.isDead = function () { return this.lifespan < 0; }
    }

    run() {
        this.update();
        this.display();
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 1;
    }

    display() {
        fill(255, 215, 0, this.lifespan ** 3);
        ellipse(this.position.x, this.position.y, this.lifespan / 5, this.lifespan / 5);
    }
}


class Thruster {
    constructor(position, lifespan) {
        this.origin = position.copy();
        this.lifespan = lifespan;
        this.particles = [];
    }
    addParticle() {
        this.particles.push(new Sparkle(this.origin, this.lifespan));
    }

    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.run();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
}
