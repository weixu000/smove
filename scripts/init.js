const drawMin = 2000;
const cellSize = 0.1 * drawMin;
const ballRadius = 0.2 * cellSize;
var width, height;
var drawMax, drawX, drawY;

const playerSpeed = 0.2;

const nMax = 8,
    nMin = 2;
var n;
var boxSize;

var totalEnemies;
var enemySpeed;
var foodRespawnWait;
var enemyTargetRange;

function initParams() {
    n = nMax;
    boxSize = cellSize * n;
    totalEnemies = 30;
    enemySpeed = playerSpeed * 20;
    foodRespawnWait = 2000;
    enemyTargetRange = 1.5;
}
initParams();

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

function autoSize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    if (width >= height) {
        drawMax = drawMin * width / height;
        drawX = drawMax;
        drawY = drawMin;
    } else {
        drawMax = drawMin * height / width;
        drawX = drawMin;
        drawY = drawMax;
    }
}
window.onresize = autoSize;
autoSize();

function drawBackground() {
    var gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'fuchsia');
    gradient.addColorStop(1, 'blueviolet');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

function drawBox() {
    const radius = 0.5 * cellSize;
    const gap = boxSize / 50;

    ctx.strokeStyle = 'white';
    ctx.lineWidth = gap;
    ctx.lineCap = 'round';
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-boxSize / 2, boxSize / 2 - radius);
    for (let i = 0; i < 4; i++) {
        ctx.lineTo(-boxSize / 2, -boxSize / 2 + radius);
        ctx.arcTo(-boxSize / 2, -boxSize / 2, -boxSize / 2 + radius, -boxSize / 2, radius);
        ctx.rotate(Math.PI / 2);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    ctx.lineWidth = gap / 2;
    for (let i = 1; i < n; i++) {
        ctx.beginPath();
        ctx.moveTo(-boxSize / 2 + i * boxSize / n, -boxSize / 2 + gap);
        ctx.lineTo(-boxSize / 2 + i * boxSize / n, boxSize / 2 - gap);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-boxSize / 2 + gap, -boxSize / 2 + i * boxSize / n);
        ctx.lineTo(boxSize / 2 - gap, -boxSize / 2 + i * boxSize / n);
        ctx.closePath();
        ctx.stroke();
    }
}

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function computePos(x_) {
    return -boxSize / 2 + cellSize * x_ + cellSize * 0.5;
}

var playDiv = document.querySelector('#play');
var tryAgain = document.querySelector('#tryagain');
var pauseDiv = document.querySelector('#pause');
var score = document.querySelector('#score');
var best = document.querySelector('#best');
var normal = document.querySelector('#normal');
var harder = document.querySelector('#harder');

const GameState = {
    halt: 0,
    play: 1,
};
var state = GameState.halt;