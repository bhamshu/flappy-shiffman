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
        if (userimg) picture = userimg;
        else if (kid == "vaibhav") picture = s[2]
        else if (kid == "ahana") picture = s[4]
        else if (kid == "harman") picture = s[5]
        else
            picture = s[pic_num]
        image(picture, this.x, this.y, 2 * this.r, 2 * this.r);
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
