function Pipe() {
    this.gap = random(4 * bird.r + 4, 8 * bird.r);
    this.top = random(0, height - 8 * bird.r);
    this.bottom = height - (this.top + this.gap);
    this.x = width;
    this.w = 26;
    this.highlight = false;

    this.hits = function (bird) {
        if (bird.y - bird.r < this.top || bird.y + bird.r > height - this.bottom) {
            if (bird.x + bird.r > this.x && bird.x - bird.r < this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }
        return false;
    }

    this.show = function () {
        fill(255);
        if (this.highlight) {

        }
        // rect(this.x, 0, this.w, this.top);
        //rect(this.x, height - this.bottom, this.w, this.bottom);

        if (!this.highlight) {
            image(downtree, this.x - this.w, 0, 3 * this.w, this.top);
            image(uptree, this.x - this.w, height - this.bottom, 3 * this.w, this.bottom);
        }
    }

    this.update = function () {
        this.x -= speed;
        this.highlight = false;
    }

    this.offscreen = function () {
        return this.x < -this.w;
    }
}
