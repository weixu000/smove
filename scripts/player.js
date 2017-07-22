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

window.onkeydown = (e) => {
    if (state === GameState.play) {
        switch (e.key) {
            case 's':
            case 'S':
            case 'ArrowDown':
                player.updatePosition(Motion.down);
                break;
            case 'w':
            case 'W':
            case 'ArrowUp':
                player.updatePosition(Motion.up);
                break;
            case 'a':
            case 'A':
            case 'ArrowLeft':
                player.updatePosition(Motion.left);
                break;
            case 'd':
            case 'D':
            case 'ArrowRight':
                player.updatePosition(Motion.right);
                break;
        }
    }

}

var touchPos;
window.ontouchstart = (e) => {
    let touch = e.changedTouches[0];
    if (touch.target === canvas) {
        event.preventDefault();
        touchPos = {
            x: touch.clientX,
            y: touch.clientY
        };
    }
}
window.ontouchmove = (e) => {
    let touch = e.changedTouches[0];
    if (touch.target === canvas) {
        event.preventDefault();
        let m = Math.min(width, height) / drawMin * cellSize / n;
        let dx = touch.clientX - touchPos.x,
            dy = touch.clientY - touchPos.y;
        if (Math.abs(dx) > m || Math.abs(dy) > m) {
            if (Math.abs(dx) >= Math.abs(dy)) {
                player.updatePosition(dx <= 0 ? Motion.left : Motion.right);
            } else {
                player.updatePosition(dy <= 0 ? Motion.up : Motion.down);
            }
            touchPos = {
                x: touch.clientX,
                y: touch.clientY
            };
        }
    }
}