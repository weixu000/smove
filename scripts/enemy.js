function Enemy(x, y, vx, vy) {
    let v = Math.sqrt(vx * vx + vy * vy);
    vx = v ? vx * enemySpeed / v : 0;
    vy = v ? vy * enemySpeed / v : 0;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
}
const enemySpeed = playerSpeed * 10;
Enemy.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(this.x, this.y, ballRadius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}
Enemy.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
}

function cleanupEnemy() {
    enemyList.forEach((e, index) => {
        if (e.x < -drawX - ballRadius * 2 || e.x > drawX + ballRadius * 2 || e.y < -drawY - ballRadius * 2 || e.y > drawY + ballRadius * 2) {
            delete enemyList[index];
        }
    })
    enemyList = enemyList.filter((e) => {
        return e !== undefined;
    })
}

function respawnEnemy() {
    let x, y;
    if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? -drawX / 2 - ballRadius : drawX / 2 + ballRadius;
        y = (Math.random() - 0.5) * drawY;
    } else {
        x = (Math.random() - 0.5) * drawX;
        y = Math.random() < 0.5 ? -drawY / 2 - ballRadius : drawY / 2 + ballRadius;
    }
    let tx = (Math.random() - 0.5) * boxSize * 1.1;
    let ty = (Math.random() - 0.5) * boxSize * 1.1;
    let vx = tx - x;
    let vy = ty - y;
    enemyList.push(new Enemy(x, y, vx, vy));
}

function controlEnemy() {
    cleanupEnemy();
    if (enemyList.length < totalEnemies) {
        respawnEnemy();
    }
}