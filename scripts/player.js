function Player(x_, y_) {
    this.x_ = x_;
    this.y_ = y_;
    this.x = computePos(x_);
    this.y = computePos(y_);
}
Player.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(this.x, this.y, ballRadius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}
Player.prototype.update = function () {
    this.x += playerSpeed * (computePos(this.x_) - this.x);
    this.y += playerSpeed * (computePos(this.y_) - this.y);
}
const Motion = {
    none: 0,
    up: 1,
    down: 2,
    left: 3,
    right: 4,
};
Player.prototype.updatePosition = function (m) {
    switch (m) {
        case Motion.up:
            if (this.y_ !== 0) {
                this.y_ -= 1;
            }
            break;
        case Motion.down:
            if (this.y_ !== n - 1) {
                this.y_ += 1;
            }
            break;
        case Motion.left:
            if (this.x_ !== 0) {
                this.x_ -= 1;
            }
            break;
        case Motion.right:
            if (this.x_ !== n - 1) {
                this.x_ += 1;
            }
            break;
        default:
            break;
    }
}

var player = new Player(random(0, n - 1), random(0, n - 1));
window.onkeydown = (e) => {
    switch (e.code) {
        case "KeyS":
        case "ArrowDown":
            player.updatePosition(Motion.down);
            break;
        case "KeyW":
        case "ArrowUp":
            player.updatePosition(Motion.up);
            break;
        case "KeyA":
        case "ArrowLeft":
            player.updatePosition(Motion.left);
            break;
        case "KeyD":
        case "ArrowRight":
            player.updatePosition(Motion.right);
            break;
    }
}