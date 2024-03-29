var c;
var bird;
var pipes = [];
//var img;
var pause = false;
var frameCunt = 0;
var speed;
var uptree, downtree;
var number_of_pictures = 6;
var pic_num;
var s = [];
var kid;
var userimg;
var resources_dir = "resources/"
var msgcount = 2;
window.mobilecheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
var mobile = mobilecheck();

function preload() {
    var i = 0
    while (i < number_of_pictures) {
        s.push(loadImage(resources_dir+'s'+i+'.png'))
        i = i + 1
    }
    uptree = loadImage(resources_dir+'spooky_tree_upright.png');
    downtree = loadImage(resources_dir+'spooky_tree_inverted.png')
    bg = loadImage(resources_dir+'pexels-photo.jpg');

}

function setup() {
    //var c = createCanvas(1300, 580);
    kid = "null"
    if (getURLParams().kid)
        kid = getURLParams().kid.toLowerCase();
    c = createCanvas(innerWidth, innerHeight);
    bird = new Bird;
    if (!mobile) {
        chbox = createCheckbox();
        chbox.position(width - 20, 53);
        chbox.checked(true);
        slider = createSlider(0, 10, 4, 1);
        slider.position(width - 150, 50);
    }
    pic_num = floor(random(number_of_pictures));
    pipes.push(new Pipe());
    pipes.push(new Pipe());
    pipes[1].x = width / 2 + 1360 / 4;
    pipes[0].x = width / 2;
    c.drop(gotFile);
}

window.onresize = function () {
    if (width != innerWidth || height != innerHeight) {
        c.size(innerWidth, innerHeight);
        if (!mobile) {
            chbox.position(width - 20, 53);
            slider.position(width - 150, 50);
        }

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

        if (!mobile) {
            speed = slider.value();
        } else speed = 4;

        for (var i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
            pipes[i].update();

            if (pipes[i].hits(bird)) {
                //console.log("HIT");
                pic_num = floor(random(number_of_pictures));
            }

            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
            }
        }

        bird.update();
        bird.show();

        if (mobile && window.innerHeight > window.innerWidth) {
            textSize(40);
            text("Use landscape mode (tilt the phone) for best experience.", 0, 40);
        }
        else if (mobile) {
            if (frameCunt < 300){
                textSize(20);
                text("Tap anywhere to lift.", 0, height / 2);
            }
        }
        
        if (frameCunt % floor(1360 / (4 * speed)) == 0) {
            pipes.push(new Pipe());
        }

        if (!mobile) {
            if (chbox.checked()) tutorial();
            else chbox.remove();
        }
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
    } else if (!userimg && frameCunt == 800 && msgcount) {
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
        if (!userimg && pause && msgcount) {
            alert("Did you know that you can drag and drop your own image on this page!");
            msgcount--;
        }
    }
}

function mousePressed() {
    bird.up();
}
