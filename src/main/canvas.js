// Canvas Setup
function setup() {
  createCanvas(GAME_WIDTH, GAME_HEIGHT);
  game = new Game();
  getScores();
}

// p5 draw
function draw() {
  game.update();
  game.show();
}
// // p5 keyPressed handling game controls

function keyPressed() {
  if (!options) {
    if (keyCode === CONTROLS.P) {
      paused = !paused;
    } else if (keyCode === CONTROLS.W && !paused) {
      balls.forEach((ball) => {
        if (!ball.moving) ball.launch();
      });
    } else if (keyCode === CONTROLS.SPACE && !paused) {
      paddle.fire();
    } 
    if (paused && keyCode === CONTROLS.Q) {
      game.initialize();
    }
  }
  if (options) {
    if (keyCode === CONTROLS.L) {
      game.switchLevel();
    } else if (keyCode === ENTER) {
      game.startGame();
    }
  }
  return false;
}

