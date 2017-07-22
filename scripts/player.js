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
    if (Math.abs(this.x - computePos(this.x_)) > 0.1 * cellSize || Math.abs(this.y - computePos(this.y_) > 0.1 * cellSize)) {
        return;
    }
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