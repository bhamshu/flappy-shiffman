function Bird() {
    this.y = height / 2;
    this.x = 200;
    this.r = 24 * height / 600;

    this.gravity = speed > 7 ? 0.8 : 0.6;
    this.lift = -15;
    this.velocity = 0;

    this.show = function () {
        fill(255);
        //ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
        imageMode(CENTER);
        if (userimg) lol = userimg;
        else
            switch (pic) {
                case 0:
                    lol = s1;
                    break;
                case 1:
                    lol = s2;
                    break;
                case 2:
                    lol = s3;
                    break;
                case 3:
                    lol = torus;
            }
        image(lol, this.x, this.y, 2 * this.r, 2 * this.r);
    }

    this.up = function () {
        this.velocity += this.lift;
    }

    this.update = function () {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;
        this.y = constrain(this.y, this.r, height - this.r);
    }
}
