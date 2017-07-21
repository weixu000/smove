function Food(x_, y_) {
    this.x_ = x_;
    this.y_ = y_;
    this.x = computePos(x_);
    this.y = computePos(y_);
    this.angle = Math.random() * 2 * Math.PI;
}
Food.prototype.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = 'gold';
    ctx.fillRect(-ballRadius, -ballRadius, 2 * ballRadius, 2 * ballRadius);
    ctx.restore();
}
const foodRotationSpeed = 0.05 * playerSpeed;
Food.prototype.update = function () {
    this.angle += foodRotationSpeed;
}