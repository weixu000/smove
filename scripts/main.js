var food;
var enemyList = [];
var player;

harder.onclick = () => {
    if (n > nMin) {
        normal.style.visibility = 'visible';
        n -= 1;
        boxSize = cellSize * n;
        totalEnemies *= 0.85;
        enemySpeed *= 1.2;
        foodRespawnWait *= 1.1;
        enemyTargetRange *= 0.8;
        play();
    } else if (n == nMin) {
        harder.style.visibility = 'hidden';
    }
};

normal.onclick = () => {
    harder.style.visibility = 'visible';
    normal.style.visibility = 'hidden';
    initParams();
    play();
}

function play() {
    let bestScore = localStorage.getItem('best');
    if (bestScore) {
        best.textContent = 'Best:' + bestScore;
    }
    score.textContent = 0;

    enemyList = [];
    food = undefined;
    if (foodRespawnID) {
        clearTimeout(foodRespawnID);
    }
    foodRespawnID = undefined;
    player = new Player(random(0, n - 1), random(0, n - 1));

    playDiv.style.visibility = 'hidden';
    tryAgain.style.visibility = 'hidden';

    state = GameState.play;
    resume();
    window.onfocus = resume;
    window.onblur = pause;
}
playDiv.querySelector('.center').onclick = play;
tryAgain.querySelector('.center').onclick = play;

function over() {
    state = GameState.halt;
    pause(false);
    window.onfocus = null;
    window.onblur = null;
    tryAgain.style.visibility = 'visible';

    let bestScore = localStorage.getItem('best');
    if (!bestScore || bestScore < Number(score.textContent)) {
        localStorage.setItem('best', Number(score.textContent));
    }
}

function collision(ball1, ball2) {
    let dx = ball1.x - ball2.x,
        dy = ball1.y - ball2.y;
    return Math.sqrt(dx * dx + dy * dy) <= 1.8 * ballRadius;
}

var foodRespawnID;

function update() {
    player.update();
    if (food) {
        foodRespawnID = undefined;
        food.update();
        if (collision(food, player)) {
            score.textContent = Number(score.textContent) + (nMax + 1 - n);
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

const updateInterval = 10;
const controlInterval = updateInterval * 10;

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