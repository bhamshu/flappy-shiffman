var bird;
var pipes = [];
//var img;
var pause = false;
var frameCunt = 0;
var speed;
var uptree, downtree;
var pic;

function preload() {
    taurus = loadImage('torus.png');
    s1 = loadImage('s1.png');
    s2 = loadImage('s2.png');
    s3 = loadImage('s3.png');
    uptree = loadImage('spooky_tree_upright.png');
    downtree = loadImage('spooky_tree_inverted.png')
    bg = loadImage('pexels-photo.jpg');
}

function setup() {
    createCanvas(1360, 600);
    //createCanvas(displayWidth, displayHeight * 0.8);
    bird = new Bird;
    slider = createSlider(0, 10, 4, 1);

    pic = floor(random(4));
    pipes.push(new Pipe());
    pipes.push(new Pipe());
    pipes[1].x = 3 * width / 4;
    pipes[0].x = width / 2;
}

function draw() {
    if (!pause) {
        imageMode(CORNER);
        background(bg);

        speed = slider.value();


        for (var i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
            pipes[i].update();

            if (pipes[i].hits(bird)) {
                //console.log("HIT");
                pic = floor(random(4));
            }

            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
            }
        }

        bird.update(speed);
        bird.show();

        if (frameCunt % floor(width / (4 * speed)) == 0) {
            pipes.push(new Pipe());
        }
        frameCunt++;
    }
}

function keyPressed() {
    if (key == " " && !pause) {
        bird.up();
    }
    if (key == "p" || key == "P") {
        pause = !pause;
    }
}

function mousePressed() {
    bird.up();
}
