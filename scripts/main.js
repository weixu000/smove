var food = new Food(2, 2);

var score = document.querySelector('#score');

function update() {
    player.update();
    food.update();
    enemyList.forEach((e) => {
        e.update();
        if (collision(e, player)) {
            score.textContent = 0;
        }
    })
    if (collision(food, player)) {
        score.textContent = Number(score.textContent) + 1;
    }
}

var updateID, controlID;
const updateInterval = 10;
const controInterval = updateInterval * 10;

window.onfocus = () => {
    updateID = window.setInterval(update, updateInterval);
    controlID = window.setInterval(controlEnemy, controInterval);
}

window.onblur = () => {
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
    food.draw();
    player.draw();

    ctx.restore();
    window.requestAnimationFrame(redraw);
}
redraw();