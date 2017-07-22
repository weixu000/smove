var food;
var enemyList = [];
var player;

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

function play() {
    score.textContent = 0;
    enemyList = [];
    food = undefined;
    foodRespawnID = undefined;
    player = new Player(random(0, n - 1), random(0, n - 1));
    state = GameState.play;
    playDiv.style.visibility = 'hidden';
    tryagain.style.visibility = 'hidden';
    resume();
    window.onfocus = resume;
    window.onblur = pause;
}
playDiv.querySelector('.center').onclick = play;
tryagain.querySelector('.center').onclick = play;

function over() {
    state = GameState.halt;
    pause(false);
    window.onfocus = null;
    window.onblur = null;
    tryagain.style.visibility = 'visible';
}

function goHarder() {
    if (n > 2) {
        n -= 1;
        calcCell();
        enemySpeed *= 1.1;
        totalEnemies *= 1.5;
        play();
    }
}
harder.onclick = goHarder;

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
    pauseDiv.style.visibility = 'hidden';
    if (!updateID) {
        updateID = window.setInterval(update, updateInterval);
    }
    if (!controlID) {
        controlID = window.setInterval(controlEnemy, controlInterval);
    }
}

function pause(showDiv = true) {
    if (showDiv) {
        pauseDiv.style.visibility = 'visible';
    }
    window.clearInterval(updateID);
    updateID = undefined;
    window.clearInterval(controlID);
    controlID = undefined;
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