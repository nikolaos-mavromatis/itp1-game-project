var lastX;

class Character {
    /*
    Draws the different states of the character.
    */
    constructor(x, y) {
        this.x = x;
        this.y = y - 200;

        this.isLeft = false;
        this.isRigth = false;
        this.isFalling = true;
        this.isPlummeting = false;
        this.isOnPlatform = false;
        this.hitEnemy = false;
    }

    draw() {
        noStroke();
        // console.log(this.x, gameChar_world_x);
        if (this.isLeft && this.isFalling) {
            // add your jumping-left code
            this.jumpLeft();
        }
        else if (this.isRight && this.isFalling) {
            // add your jumping-right code
            this.jumpRight();
        }
        else if (this.isLeft) {
            // add your walking left code
            this.walkLeft();
        }
        else if (this.isRight) {
            // add your walking right code
            this.walkRight();
        }
        else if (this.isFalling || this.isPlummeting) {
            // add your jumping facing forwards code
            this.jump();
        }
        else {
            // add your standing front facing code
            this.stand();
        }
    }

    stand() {
        // legs
        fill(255, 228, 181);
        // left leg
        rect(this.x - 8, this.y - 17, 4, 12, 2);
        // right leg
        rect(this.x + 4, this.y - 17, 4, 12, 2);

        // body
        fill(244, 164, 96);
        rect(this.x - 15, this.y - 45, 30, 30, 5);

        // arms
        fill(255, 228, 181);
        // left arm
        rect(this.x - 17, this.y - 42, 4, 20, 2);
        // right arm
        rect(this.x + 13, this.y - 42, 4, 20, 2);

        // head
        ellipse(this.x, this.y - 55, 25);

        // shoes
        fill(60, 50, 113);
        // left shoe
        rect(this.x - 10, this.y - 8, 8, 8, 2);
        // right shoe
        rect(this.x + 2, this.y - 8, 8, 8, 2);
    }

    walkLeft() {
        // legs
        fill(255, 228, 181);
        // left leg
        rect(this.x - 7, this.y - 17, 4, 12, 2);
        // right leg
        rect(this.x + 3, this.y - 17, 4, 12, 2);

        // body
        fill(244, 164, 96);
        rect(this.x - 10, this.y - 45, 20, 30, 5);

        // arm
        fill(255, 228, 181);
        // left arm
        rect(this.x - 2, this.y - 42, 4, 20, 2);

        // head
        ellipse(this.x, this.y - 56, 25);

        // shoes
        fill(60, 50, 113);
        // left shoe
        rect(this.x - 9, this.y - 12, 8, 8, 2);
        // right shoe
        rect(this.x + 1, this.y - 8, 8, 8, 2);
    }

    walkRight() {
        // legs
        fill(255, 228, 181);
        // left leg
        rect(this.x - 7, this.y - 17, 4, 12, 2);
        // right leg
        rect(this.x + 3, this.y - 17, 4, 12, 2);

        // body
        fill(244, 164, 96);
        rect(this.x - 10, this.y - 45, 20, 30, 5);

        // arm
        fill(255, 228, 181);
        rect(this.x - 2, this.y - 42, 4, 20, 2);

        // head
        ellipse(this.x, this.y - 56, 25);

        // shoes
        fill(60, 50, 113);
        // left shoe
        rect(this.x - 9, this.y - 8, 8, 8, 2);
        // right shoe
        rect(this.x + 1, this.y - 12, 8, 8, 2);
    }

    jump() {
        // legs
        fill(255, 228, 181);
        // left leg
        rect(this.x - 8, this.y - 22, 4, 17, 2);
        // right leg
        rect(this.x + 4, this.y - 22, 4, 17, 2);

        // body
        fill(244, 164, 96);
        rect(this.x - 15, this.y - 45, 30, 25, 5);

        // arms
        fill(255, 228, 181);
        // left arm
        rect(this.x - 17, this.y - 57, 4, 20, 2);
        // right arm
        rect(this.x + 13, this.y - 57, 4, 20, 2);

        // head
        ellipse(this.x, this.y - 55, 25);

        // shoes
        fill(60, 50, 113);
        // left shoe
        rect(this.x - 10, this.y - 8, 8, 8, 2);
        // right shoe
        rect(this.x + 2, this.y - 8, 8, 8, 2);
    }

    jumpLeft() {
        // legs
        fill(255, 228, 181);
        // left leg
        rect(this.x - 8, this.y - 22, 4, 17, 2);
        // right leg
        rect(this.x + 4, this.y - 22, 4, 17, 2);

        // body
        fill(244, 164, 96);
        rect(this.x - 10, this.y - 45, 20, 25, 5);

        // arm
        fill(255, 228, 181);
        rect(this.x - 2, this.y - 42, 4, 20, 2);

        // head
        ellipse(this.x, this.y - 55, 25);

        // shoes
        fill(60, 50, 113);
        // left shoe
        rect(this.x - 10, this.y - 9, 8, 8, 2);
        // right shoe
        rect(this.x + 2, this.y - 8, 8, 8, 2);
    }

    jumpRight() {
        // legs
        fill(255, 228, 181);
        // left leg
        rect(this.x - 8, this.y - 22, 4, 17, 2);
        // right leg
        rect(this.x + 4, this.y - 22, 4, 17, 2);

        // body
        fill(244, 164, 96);
        rect(this.x - 10, this.y - 45, 20, 25, 5);

        // arm
        fill(255, 228, 181);
        rect(this.x - 2, this.y - 42, 4, 20, 2);

        // head
        ellipse(this.x, this.y - 55, 25);

        // shoes
        fill(60, 50, 113);
        // left shoe
        rect(this.x - 10, this.y - 8, 8, 8, 2);
        // right shoe
        rect(this.x + 2, this.y - 9, 8, 8, 2);
    }

    move() {
        // Logic to make the game character move or the background scroll.
        if (this.isLeft) {
            if (this.x > width * 0.2) {
                this.x -= 5;
            }
            else {
                scrollPos += 5;
            }
        }

        if (this.isRight) {
            if (this.x < width * 0.8) {
                this.x += 5;
            }
            else {
                scrollPos -= 5; // negative for moving against the background
            }
        }

        // Logic to make the game character rise and fall.
        if (this.y < floorPos_y) {
            // check if character is on any platform
            for (var i = 0; i < platforms.length; i++) {
                this.isOnPlatform = platforms[i].checkContact(gameChar_world_x, this.y);

                if (this.isOnPlatform) {
                    this.isFalling = false;

                    if (platforms[i].isMoving) {
                        this.x += platforms[i].inc;
                    }

                    break;
                }
            }

            if (!this.isOnPlatform) {
                this.y = min(floorPos_y, this.y + 3) // min was need because of the multiples
                this.isFalling = true;
            }
        }
        else {
            this.isFalling = false;
        }

        if (this.isPlummeting) {
            this.y += 5;

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
                this.y -= 100;
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
        for (var i = 0; i < enemies.length; i++) {
            this.hitEnemy = enemies[i].checkContact(gameChar_world_x, this.y);

            if (this.hitEnemy) {
                break;
            }
        }

        if (this.y > height + 100 || this.hitEnemy) {
            lives -= 1;
            if (lives > 0) {
                loseLifeSound.play();
                startGame();
            }
            else {
                gameOverSound.play();
            }
        }
    }
}
