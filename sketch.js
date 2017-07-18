var c;
var bird;
var pipes = [];
//var img;
var pause = false;
var frameCunt = 0;
var speed;
var uptree, downtree;
var pic;
var userimg;
var msgcount = 2;

function preload() {
    torus = loadImage('torus.png');
    s1 = loadImage('s1.png');
    s2 = loadImage('s2.png');
    s3 = loadImage('s3.png');
    uptree = loadImage('spooky_tree_upright.png');
    downtree = loadImage('spooky_tree_inverted.png')
    bg = loadImage('pexels-photo.jpg');

}

function setup() {
    //var c = createCanvas(1300, 580);
    c = createCanvas(innerWidth, innerHeight);
    bird = new Bird;
    chbox = createCheckbox();
    chbox.position(width - 20, 53);
    chbox.checked(true);
    slider = createSlider(0, 10, 4, 1);
    slider.position(width - 150, 50);
    pic = floor(random(4));
    pipes.push(new Pipe());
    pipes.push(new Pipe());
    pipes[1].x = width / 2 + 1360 / 4;
    pipes[0].x = width / 2;

    c.drop(gotFile);
}

window.onresize = function () {
    if (width != innerWidth || height != innerHeight) {
        c.size(innerWidth, innerHeight);

        chbox.position(width - 20, 53);

        slider.position(width - 150, 50);
        bird.r = 24 * height / 600;

        pipes.splice(0, pipes.length);
        pipes.push(new Pipe());
        pipes.push(new Pipe());
        pipes[1].x = width / 2 + 1360 / 4;
        pipes[0].x = width / 2;
    }
}

function gotFile(file) {
    // If it's an image file
    if (file.type === 'image') {
        // Create an image DOM element but don't show it
        userimg = createImg(file.data).hide();
    } else {
        alert("Not an image file!");
    }
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

        bird.update();
        bird.show();

        if (frameCunt % floor(1360 / (4 * speed)) == 0) {
            pipes.push(new Pipe());
        }

        if (chbox.checked()) tutorial();
        else chbox.remove();

        frameCunt++;
    }
}

function tutorial() {
    textSize(20);
    if (frameCunt < 200)
        text("Press spacebar to lift.", 0, height / 2);

    else if (frameCunt == 400) {
        pause = true;
        text("You can pause/unpause the game by pressing p", 0, height / 2);
    } else if (frameCunt == 800 && msgcount) {
        pause = true;
        text("You can drag and drop your own image on this page!", 0, height / 2);
        msgcount--;
    }
    if (frameCunt < 1250 && frameCunt > 900 && frameCunt % 3 == 0)
        text("Control Speed", width - 150 - 20 * sin(map(frameCunt, 900, 1250, 0, 2 * 3.1416)), 30);
    if (frameCunt > 1250 && frameCunt < 1500) {
        text("Uncheck ", 0, height / 2);
        text("this", frameCunt < 1400 ? map(frameCunt, 1250, 1400, 80, width - 30) : width - 30, frameCunt < 1400 ? map(frameCunt, 1250, 1400, height / 2, 80) : 80);
        text(" check box next time if you don't want the tutorial", 109, height / 2);
    }
    if (frameCunt > 1500) chbox.remove();
}

function keyPressed() {
    if (key == " " && !pause) {
        bird.up();
    }
    if (key == "p" || key == "P") {
        pause = !pause;
        if (pause && msgcount) {
            alert("Did you know that you can drag and drop your own image on this page!");
            msgcount--;
        }
    }
}

function mousePressed() {
    bird.up();
}
