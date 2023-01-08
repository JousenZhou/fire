var canvas = document.getElementById("cas");
var ocas = document.createElement("canvas");
var octx = ocas.getContext("2d");
var ctx = canvas.getContext("2d");
ocas.width = canvas.width = window.innerWidth;
ocas.height = canvas.height = window.innerHeight;
var bigbooms = [];
// const shapes = document.querySelectorAll(".shape")
const host = './'
const shapes = opt.shapes;
let shapesNumber = 0;
console.log(shapes);
const boomPlayer = new Audio()
const firePlayer = new Audio()
const backgroundPlayer = new Audio()
const backgroundStartPlayer = new Audio()
backgroundPlayer.src = host + 'shengri.mp3'
backgroundPlayer.src = host + 'shengri.mp3'
backgroundPlayer.loop = true;
backgroundStartPlayer.src = host + 'Luv Letter.mp3'
boomPlayer.src = host + 'boom.mp3'
firePlayer.src = host + 'fire.mp3'
const $bgi = new Image()
if (opt.bgi) $bgi.src = opt.bgi
window.onload = function () {
    initAnimate();
};

// document.getElementById("iframMusic").onload = function () {
//   var music = document.getElementById("music");
//   music.src = "https://production-4gnv3qeqb070546b-1312154413.tcloudbaseapp.com/heart/bgm/%E7%88%86%E7%AB%B9%E5%A3%B0%E5%A3%B0%E5%93%8D.mp3";
//   music.oncanplay = function () {
//     music.play();
//   };
// };

function initAnimate() {
    drawBg();
    lastTime = new Date();
    animate();
}

var lastTime;

function animate() {
    ctx.save();
    ctx.fillStyle = "rgba(0,5,24,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    ctx.drawImage($bgi, canvas.width / 2 - $bgi.width / 2, canvas.height / 2 - $bgi.height / 2, $bgi.width, $bgi.height);
    // var newTime = new Date();
    stars.foreach(function () {
        this.paint();
    });
    drawMoon();

    // if (newTime - lastTime > 3000 + (window.innerHeight - 767) / 2) {
    //     var random = Math.random() * 100 > 80 ? true : false;
    //     var x = getRandom(canvas.width / 5, (canvas.width * 4) / 5);
    //     var y = getRandom(50, 200);console.log('random',random)
    //     if (random) {
    //         var bigboom = new Boom(
    //             getRandom(canvas.width / 3, (canvas.width * 2) / 3),
    //             2,
    //             "#FFF",
    //             {
    //                 x: x,
    //                 y: y,
    //             }
    //         );
    //         bigbooms.push(bigboom);
    //     } else {
    //         var bigboom = new Boom(
    //             getRandom(canvas.width / 3, (canvas.width * 2) / 3),
    //             2,
    //             "#FFF",
    //             {
    //                 x: canvas.width / 2,
    //                 y: 200,
    //             },
    //             shapes[
    //                 parseInt(getRandom(0, shapes.length))
    //                 ]
    //         );
    //         bigbooms.push(bigboom);
    //     }
    //     lastTime = newTime;
    // }

    bigbooms.foreach(function (index) {
        var that = this;
        if (!this.dead) {
            this._move();
            this._drawLight();
        } else {
            this.booms.foreach(function (index) {
                if (!this.dead) {
                    this.moveTo(index);
                } else {
                    if (index === that.booms.length - 1) {
                        // bigbooms[bigbooms.indexOf(that)] = null;
                        bigbooms.splice(bigbooms.indexOf(that), 1)
                    }
                }
            });
        }
    });
    raf(animate);
}

function drawMoon() {
    // var moon = document.getElementById("moon");

    const moon = new Image()
    moon.src = host + 'moon.png'
    var centerX = canvas.width - 200,
        centerY = 100,
        width = 80;
    if (moon.complete) {
        ctx.drawImage(moon, centerX, centerY, width, width);
    } else {
        moon.onload = function () {
            ctx.drawImage(moon, centerX, centerY, width, width);
        };
    }

    // 鏈堜寒鍏夋檿
    var index = 0;
    for (var i = 0; i < 10; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(
            centerX + width / 2,
            centerY + width / 2,
            width / 2 + index,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = "rgba(240,219,120,0.005)";
        index += 2;
        ctx.fill();
        ctx.restore();
    }

}

Array.prototype.foreach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] !== null) {
            callback.apply(this[i], [i]);
        }
    }
};
var raf =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

// shapes时间
let shapesTime = null;
let startMusic = false;
canvas.onclick = function () {
    if (startMusic === false) {
        backgroundStartPlayer.play()
        startMusic = true;
    }
    var newTime = new Date().getTime();
    var x = event ? event.clientX : getRandom(0,canvas.width);
    var y = event ? event.clientY : getRandom(0,canvas.height);
    var random =  newTime - shapesTime < 3000 || shapesTime === null || shapesNumber > shapes.length;
    if (random) {
        var bigboom = new Boom(
            getRandom(canvas.width / 3, (canvas.width * 2) / 3),
            2,
            "#FFF",
            {
                x: x,
                y: y,
            }
        );
        bigbooms.push(bigboom);
        if (shapesTime === null) shapesTime = newTime
    } else {
        var bigboom = new Boom(
            getRandom(canvas.width / 3, (canvas.width * 2) / 3),
            2,
            "#FFF",
            {
                x: canvas.width / 2,
                y: 200,
            },
            shapes[shapesNumber]
        );
        if (shapesNumber === 12) {
           setTimeout(()=>{
               backgroundStartPlayer.pause();
               backgroundPlayer.play();
               let numx = 0;

               let x = setInterval(() => {
                   canvas.onclick();
                   numx++;
                   if(numx === 50){
                       timestamp = 300;
                       window.clearInterval(x);
                       setInterval(()=>{
                           canvas.onclick();
                       },300)
                   }
               }, 100)
           },1000)
        }
        shapesNumber++;
        if(shapesNumber > shapes.length){
            shapesNumber = 0
        }
        shapesTime = newTime;
        bigbooms.push(bigboom);
    }


};
var Boom = function (x, r, c, boomArea, shape) {
    this.booms = [];
    this.x = x;
    this.y = canvas.height + r;
    this.r = r;
    this.c = c;
    this.shape = shape || false;
    this.boomArea = boomArea;
    this.theta = 0;
    this.dead = false;
    this.ba = parseInt(getRandom(80, 200));
    // 鍜粇~
    // firePlayer.cloneNode(true).play();
    firePlayer.play();
};
Boom.prototype = {
    _paint: function () {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.c;
        ctx.fill();
        ctx.restore();
    },
    _move: function () {
        var dx = this.boomArea.x - this.x,
            dy = this.boomArea.y - this.y;
        this.x = this.x + dx * 0.01;
        this.y = this.y + dy * 0.01;
        if (Math.abs(dx) <= this.ba && Math.abs(dy) <= this.ba) {
            if (this.shape) {
                this._shapBoom();
            } else {
                this._boom();
            }
            this.dead = true;
        } else {
            this._paint();
        }
    },
    _drawLight: function () {
        ctx.save();
        ctx.fillStyle = "rgba(255,228,150,0.3)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r + 3 * Math.random() + 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    },
    _boom: function () {
        var fragNum = getRandom(30, 200);
        var style = getRandom(0, 10) >= 5 ? 1 : 2;
        var color;
        if (style === 1) {
            color = {
                a: parseInt(getRandom(128, 255)),
                b: parseInt(getRandom(128, 255)),
                c: parseInt(getRandom(128, 255)),
            };
        }
        var fanwei = parseInt(getRandom(300, 400));
        for (var i = 0; i < fragNum; i++) {
            if (style === 2) {
                color = {
                    a: parseInt(getRandom(128, 255)),
                    b: parseInt(getRandom(128, 255)),
                    c: parseInt(getRandom(128, 255)),
                };
            }
            var a = getRandom(-Math.PI, Math.PI);
            var x = getRandom(0, fanwei) * Math.cos(a) + this.x;
            var y = getRandom(0, fanwei) * Math.sin(a) + this.y;
            var radius = getRandom(0, 2);
            var frag = new Frag(this.x, this.y, radius, color, x, y);
            this.booms.push(frag);
            // boomPlayer.play();
        }
        boomPlayer.cloneNode(true).play();
    },
    _shapBoom: function () {
        var that = this;
        putValue(ocas, octx, this.shape, 5, function (dots) {
            var dx = canvas.width / 2 - that.x;
            var dy = canvas.height / 2 - that.y;
            for (var i = 0; i < dots.length; i++) {
                color = {
                    a: dots[i].a,
                    b: dots[i].b,
                    c: dots[i].c,
                };
                var x = dots[i].x;
                var y = dots[i].y;
                var radius = 1;
                var frag = new Frag(that.x, that.y, radius, color, x - dx, y - dy);
                that.booms.push(frag);


            }
            boomPlayer.cloneNode(true).play();

        });
    },
};

function putValue(canvas, context, ele, dr, callback) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // if (ele.innerHTML.indexOf("img") >= 0) {
    if (ele.type === 'image') {
        var img = new Image();
        img.crossOrigin = true; // 瑙ｅ喅璺ㄥ煙闂
        img.src = ele.value
        imgload(img, function () {
            context.drawImage(
                img,
                canvas.width / 2 - img.width / 2,
                canvas.height / 2 - img.width / 2
            );
            dots = getimgData(canvas, context, dr);
            callback(dots);
        });
    } else {
        var text = ele.value;
        context.save();
        var fontSize = ele.size || 60;
        context.font = fontSize + "px 瀹嬩綋 bold";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle =
            "rgba(" +
            255 +
            "," +
            255 +
            "," +
            255 +
            " , 1)";
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        context.restore();
        dots = getimgData(canvas, context, dr);
        callback(dots);
    }
}

function imgload(img, callback) {
    if (img.complete) {
        callback.call(img);
    } else {
        img.onload = function () {
            callback.call(this);
        };
    }
}

function getimgData(canvas, context, dr) {
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var dots = [];
    for (var x = 0; x < imgData.width; x += dr) {
        for (var y = 0; y < imgData.height; y += dr) {
            var i = (y * imgData.width + x) * 4;
            if (imgData.data[i + 3] > 128) {
                var dot = {
                    x: x,
                    y: y,
                    a: imgData.data[i],
                    b: imgData.data[i + 1],
                    c: imgData.data[i + 2],
                };
                dots.push(dot);
            }
        }
    }
    return dots;
}

function getRandom(a, b) {
    return Math.random() * (b - a) + a;
}

var maxRadius = 1,
    stars = [];

function drawBg() {
    for (var i = 0; i < 100; i++) {
        var r = Math.random() * maxRadius;
        var x = Math.random() * canvas.width;
        var y = Math.random() * 2 * canvas.height - canvas.height;
        var star = new Star(x, y, r);
        stars.push(star);
        star.paint();
    }
}

var Star = function (x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
};
Star.prototype = {
    paint: function () {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255,255,255," + this.r + ")";
        ctx.fill();
        ctx.restore();
    },
};
var focallength = 250;
var Frag = function (centerX, centerY, radius, color, tx, ty) {
    this.tx = tx;
    this.ty = ty;
    this.x = centerX;
    this.y = centerY;
    this.dead = false;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.color = color;
    this.tiem = new Date().getTime();
};
Frag.prototype = {
    paint: function () {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle =
            "rgba(" + this.color.a + "," + this.color.b + "," + this.color.c + ",1)";
        ctx.fill();
        ctx.restore();
    },
    moveTo: function (index) {
        this.ty = this.ty + 0.3;
        var dx = this.tx - this.x,
            dy = this.ty - this.y;
        this.x = Math.abs(dx) < 0.1 ? this.tx : this.x + dx * 0.1;
        this.y = Math.abs(dy) < 0.1 ? this.ty : this.y + dy * 0.1;
        if (dx === 0 && Math.abs(dy) <= 80 && new Date().getTime() - this.tiem > 2000) {
            this.dead = true;
        }
        this.paint();
    },
};