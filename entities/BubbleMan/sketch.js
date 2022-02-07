var character;
var thruster;
var suitColor;

function setup() {
    createCanvas(600, 600);
    suitColor = color(119, 136, 153);
    character = new BubbleMan(width / 2, 0.7 * height, 80);
    thruster = new ParticleSystem(createVector(character.x, 0.95 * character.y), character.h / 2);
}

function draw() {
    background(25, 25, 112);
    thruster.addParticle();
    thruster.run();
    character.draw();
}

class BubbleMan {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.h = size;
        this.w = size / 2;

        this.direction = 1;
        this.velocity = 5;

        this.isLeft = false;
        this.isRigth = false;
        this.isFalling = true;
        this.isPlummeting = false;
    }

    draw() {
        this.stand();
        // this.#drawGrid();
    }

    stand() {
        noStroke();
        this.#drawLegs();
        this.#drawBody();
        this.#drawArms();
        this.#drawHead();
    }

    #drawGrid() {
        stroke(255);
        strokeWeight(1);
        line(
            this.x - 1.5 * this.w / 2, this.y,
            this.x + 1.5 * this.w / 2, this.y
        );
        line(
            this.x - 1.5 * this.w / 2, this.y - this.h,
            this.x + 1.5 * this.w / 2, this.y - this.h
        );
        line(
            this.x - this.w / 2, this.y + 0.13 * this.h,
            this.x - this.w / 2, this.y - 1.13 * this.h
        );
        line(
            this.x + this.w / 2, this.y + 0.13 * this.h,
            this.x + this.w / 2, this.y - 1.13 * this.h
        );

        strokeWeight(5);
        point(this.x, this.y);
        noStroke();
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

    #drawBody() {
        let waistCy = this.y - 7 * this.h / 20;
        let waistW = 0.65 * this.w;
        // draw white waist lining 
        stroke(255, 255, 255, 130);
        strokeWeight(1);
        noFill();
        ellipse(this.x, waistCy + 1, waistW - 4, waistW / 2 - 2);
        noStroke();

        // draw waist
        fill(suitColor);
        ellipse(this.x, waistCy, waistW, waistW / 2)

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
}

class Particle {
    constructor(position, lifespan) {
        this.acceleration = createVector(0, 0.05);
        this.velocity = createVector(random(-lifespan / 220, lifespan / 220), random(-1, 0));
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
        this.lifespan -= 0.8;
    }

    display() {
        fill(255, 215, 0, this.lifespan ** 3);
        ellipse(this.position.x, this.position.y, this.lifespan / 5, this.lifespan / 5);
    }
}


class ParticleSystem {
    constructor(position, lifespan) {
        this.origin = position.copy();
        this.lifespan = lifespan;
        this.particles = [];
    }
    addParticle() {
        this.particles.push(new Particle(this.origin, this.lifespan));
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
