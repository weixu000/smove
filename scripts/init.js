var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width, height;
const drawMin = 2000;
var drawMax, drawX, drawY;

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

var n = 4;
const boxSize = 0.6 * drawMin;
var cellSize = boxSize / n;
var ballRadius = 0.2 * cellSize;
const playerSpeed = 0.2;

function drawBox() {
    const radius = 0.18 * boxSize;
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

function collision(ball1, ball2) {
    let dx = ball1.x - ball2.x,
        dy = ball1.y - ball2.y;
    return Math.sqrt(dx * dx + dy * dy) <= 2 * ballRadius;
}

const totalEnemies = 10;