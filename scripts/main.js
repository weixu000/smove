var food;
var enemyList = [];
var player;

const gameState = {
    halt: 0,
    play: 1,
};
var state = gameState.halt;

function play() {
    score.textContent = 0;
    enemyList = [];
    food = undefined;
    player = new Player(random(0, n - 1), random(0, n - 1));
    state = gameState.play;
    playDiv.style.visibility = 'hidden';
    tryagain.style.visibility = 'hidden';
    resume();
    window.onfocus = resume;
    window.onblur = pause;
}
playDiv.querySelector('.center').onclick = play;
tryagain.querySelector('.center').onclick = play;

function over() {
    state = gameState.halt;
    pause();
    window.onfocus = null;
    window.onblur = null;
    tryagain.style.visibility = 'visible';
}

window.onkeydown = (e) => {
    if (state === gameState.play) {
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

}

var foodRespawnID;

function update() {
    player.update();
    if (food) {
        foodRespawnID = undefined;
        food.update();
        if (collision(food, player)) {
            score.textContent = Number(score.textContent) + 1;
            food = undefined;
        }
    }
    enemyList.forEach((e) => {
        e.update();
        if (collision(e, player)) {
            over();
        }
    })
    if (!food && !foodRespawnID) {
        foodRespawnID = window.setTimeout(() => {
            do {
                var x_ = random(0, n - 1),
                    y_ = random(0, n - 1);
            } while (x_ === player.x_ && y_ === player.y_);
            food = new Food(x_, y_);
        }, foodRespawnWait);
    }
}

var updateID, controlID;

function resume() {
    updateID = window.setInterval(update, updateInterval);
    controlID = window.setInterval(controlEnemy, controlInterval);
}

function pause() {
    window.clearInterval(updateID);
    window.clearInterval(controlID);
}

function redraw() {
    drawBackground();
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(Math.min(width, height) / drawMin, Math.min(width, height) / drawMin);

    drawBox();
    enemyList.forEach((e) => {
        e.draw();
    })
    if (food) {
        food.draw();
    }
    if (player) {
        player.draw();
    }

    ctx.restore();
    window.requestAnimationFrame(redraw);
}
redraw();