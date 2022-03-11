const ratio = 2;

class Cloud {
    /*
    Creates a cloud using 4 circles/ellipses and a 
    rectangle that makes the bottom of the cloud flat.

    The cloud has a 1:2 height:width ratio. The size 
    input is essentially the width of the cloud from 
    edge to edge.
    
    The position of the cloud is controlled by the
    intersection point of the two diagonals if we were
    to inscribe the cloud into a rectangle.

    The positions of the individual elements are relative
    to the x and y inputs (i.e. where the user would like
    the cloud to appear on screen). x and y are the anchor 
    points based on the description.
    */
    constructor(x, y, size) {
        this.x = x;
        this.y = y;

        this.w = size; // the width of the cloud as a whole
        this.h = this.w / ratio; // the height of the cloud as a whole
    }

    draw() {
        // Calculate the dimensions of the individual objects
        // Rectangle size
        let rec_h = this.h / 3;

        // Circles radii
        let r1 = rec_h;
        let r2 = rec_h;
        let r3 = rec_h;
        let r4 = rec_h / 2;

        let rec_w = this.w - r1 - r4;

        let rec_x = this.x - this.w / 2 + r1;
        let rec_y = this.y + this.h / 2 - rec_h;

        fill(255);
        // rectangle to make the bottom flat
        rect(rec_x, rec_y, rec_w, rec_h);

        // from left to right
        // Circle 1
        ellipse(
            rec_x,
            rec_y,
            2 * r1
        );
        // Circle 2
        ellipse(
            this.x - this.w / 14,
            this.y,
            3 * r2
        );
        // Circle 3
        ellipse(
            this.x + this.w / 4,
            this.y + this.h / 2 - rec_h,
            2.2 * r3,
            2 * r3
        );
        // Circle 4
        ellipse(
            this.x + this.w / 2 - r4,
            this.y + this.h / 2 - r4,
            2.4 * r4,
            2 * r4
        );
    }
}
