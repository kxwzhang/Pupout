// Game constants
const CONTROLS = { W: 87, A: 65, D: 68, Q: 81, L: 76, SPACE: 32, P: 80 };
const GAME_WIDTH = 653;
const GAME_HEIGHT = 554; // 534
const ROWS = 30;
const COLS = 15;
const WALL = {
    top: 14, right: 5, left: 5
};
const BOARD = {
    width: 455, height: 520
};
const SPACING = {
    top: 14, right: 158, left: 42
};
const PADDLE = {
    width: 60, height: 40
};
const BLOCK = {
    width: 29, height: 14
};
const BALL_RADIUS = 8;

// Game status
let options;
let paused;
let stopped;

// Game values
let paddle;
let balls;
let blocks;
let treats;
let beams;
let score;
let lives;
let level;
let numFrames;

// Canvas Setup
function setup() {
    createCanvas(GAME_WIDTH, GAME_HEIGHT);
    game = new Game();
    game.initialize();
}

// p5 draw
function draw() {
    game.update();
    game.show();
}
// p5 keyPressed handling game controls
function keyPressed() {
    if (!options) {
        if (keyCode === CONTROLS.P) {
            paused = !paused;
        }
        if (keyCode === CONTROLS.W && !paused) {
            balls.forEach(ball => {
                if (!ball.moving) ball.launch();
            });
        }
        if (keyCode === CONTROLS.SPACE && !paused) {
            paddle.fire();
        }
        if (paused && keyCode === CONTROLS.Q) {
            game.initialize();
        }
    }
    if (options) {
        if (keyCode === CONTROLS.L) {
            game.switchLevel();
        }
        if (keyCode === ENTER) {
            game.startGame();
        }
    }
    return false;
}

// Game Class
class Game {
    initialize() {
        // PlaySound
        options = true;
        paused = false;
        stopped = false;
        paddle = new Paddle(); 
        balls = [new Ball()]; 
        blocks = [];
        treats = [];
        beams = [];
        score = 0;
        level = 1;
        lives = 3;
        numFrames = 0;
    }

    update() {
        if (!options && !paused && !stopped) {
            // 1. should first update the paddle
            paddle.update();
            // 2. iterate through the balls and update them
            for (let i = balls.length - 1; i > -1; i--) {
                balls[i].update();
                if (balls[i].destroyed()) {
                    balls.splice(i, 1);
                    if (balls.length === 0) {
                        lives -= 1;
                        treats = [];
                        paddle = new Paddle();
                        if (lives > 0) {
                            // Play sound
                            balls.push(new Ball());
                            this.displayMessage('\n\n\nPUPPER READY FOR ACTION', 100, 'f')
                        } else {
                            game.handleGameOver();
                        }
                    }
                }
            }
            // 3. iterate through the treats and update them

            // 4. iterate through the beams and update them

            // Check if not on the options, then check if all the blocks have been cleared
            // If all blocks cleared then initialize next level
            // Increment the numFrames
            if (!options) {
                if (this.checkEmptyBlocks()) {
                    this.nextLevel();
                }
            }
        }
        numFrames += 1;
        if (numFrames === 0) {
            console.log('numFrames',numFrames)
            stopped = false;
        }
    }

    show() {
        if (!stopped) {
            background('lightblue');
            // console.log('stopped ', stopped);
            this.drawBoard(); // Draw the board
            this.displayInfo(); // Display game info
            if (!options) {
                // console.log('options ', options);
                paddle.show(); // render paddle
                // render each of the other elements
                balls.forEach(ball => ball.show());
                // debugger
                blocks.forEach(block => block.show());
                treats.forEach(treat => treat.show());
                // beams.forEach(beam => beam.show());
            } else if (options) {
                // show the options otherwise
                this.displayMenu();
            }
        }
    }

    // Initializes the level
    initLevel(lvl) {
        this.clearBlocks(); // clear the blocks
        // generate new blocks
        for (let y = 0; y < ROWS - 8; y++) {
          for (let x = 0; x < COLS; x++) {
            if (lvl[y][x] !== 0) {
              blocks.push(new Block(x, y, lvl[y][x]));
            }
          }
        }
        let message = 'LEVEL ' + level + '\nGET READY PUPPER'
        // display message
        this.displayMessage(message, 150);
        // Add sounds
    }

    // Clears the blocks
    clearBlocks() {
        blocks = [];
    }

    // Clears the treats
    clearTreats() {
        paddle.shrink(); // shrink the paddle
        paddle.stopBeam(); // stop the beam
        balls.forEach(ball => {
            if (ball.magnet) ball.demagnetize;
            ball.launch();
        });
    }

    // Check if all blocks have been cleared
    checkEmptyBlocks() {
        let isEmpty = true;
        blocks.forEach(block => {
            // Check to make sure that the 
            // only blocks remaining are the unbreakable ones
            if (block.type !== 1) {
                isEmpty = false;
            }
        });
        return isEmpty;
    }

    // Updates the score
    updateScore(block) {
        let points = 0;
        switch (block.type) {
            case 2:
                points = 50 * level;
                break;
            case 3:
                points = 60 * level;
                break;
            case 4:
                points = 70 * level;
                break;
            case 5:
                points = 80 * level;
                break;
            case 6:
                points = 90 * level;
                break;
            case 7:
                points = 200;
                break;
            default:
                break;
        }
        score += points; // update score with points from each block
    }

    // Invoking this will generate the next level
    nextLevel() {
        level += 1; // increment the level by 1
        paddle = new Paddle();
        balls = [new Ball()];
        blocks = [];
        beams = [];
        treats = [];
        numFrames = 0;
        // Check to make sure our level is below 5, otherwise reset to level 1
        if (level > 5) {
            level = 1;
        }
        this.initLevel(LEVELS['level' + level]);
    }

    startGame() {
        paddle = new Paddle();
        numFrames = 0;
        this.initLevel(LEVELS['level' + level])
        options = false;
    }

    switchLevel() {
        level += 1;
        // Reset to level 1 if level goes beyond 5
        if (level > 5) level = 1;
    }

    drawBoard() {
        image(spriteGameBackground, SPACING.left, SPACING.top, BOARD.width, BOARD.height);
    }

    displayInfo() {
        stroke(255, 55, 0);
        fill(255, 255, 0);
        textSize(28);
        textAlign(LEFT);
        text(
          'SCORE',
          GAME_WIDTH - SPACING.right + SPACING.left - 10,
          SPACING.top + WALL.top + (2 * BLOCK.height), // 100
          SPACING.right,
          (BOARD.height / 2)
        );
        text(
          'BALLS',
          GAME_WIDTH - SPACING.right + SPACING.left - 10,
          SPACING.top + WALL.top + (2 * BLOCK.height) + 175,
          SPACING.right,
          (BOARD.height / 2)
        );
        image(
          spriteTennisball,
          GAME_WIDTH - SPACING.right + 92 + SPACING.left - 10,
          SPACING.top + WALL.top + (2 * BLOCK.height) + 178,
          20,
          20
        );
        text(
          'LEVEL',
          GAME_WIDTH - SPACING.right + SPACING.left - 10,
          SPACING.top + WALL.top + (2 * BLOCK.height) + 300,
          SPACING.right,
          (BOARD.height / 2)
        );
        stroke(255);
        fill(255);
        text(
          score,
          GAME_WIDTH - SPACING.right + SPACING.left - 10,
          SPACING.top + WALL.top + (2 * BLOCK.height) + 30, // 125
          SPACING.right,
          (BOARD.height / 2)
        );
        text(
          lives,
          GAME_WIDTH - SPACING.right + SPACING.left - 10,
          SPACING.top + WALL.top + (2 * BLOCK.height) + 205,
          SPACING.right,
          (BOARD.height / 2)
        );
        text(
          level,
          GAME_WIDTH - SPACING.right + SPACING.left - 10,
          SPACING.top + WALL.top + (2 * BLOCK.height) + 330,
          SPACING.right,
          (BOARD.height / 2)
        );
        this.displayPaused(); // Render pause if player hits enter
    }

    displayPaused() {
        if (paused) {
            stroke(188, 25, 0);
            fill(188, 25, 0);
            textSize(28);
            textAlign(LEFT);
            text(
              'PAUSED',
              GAME_WIDTH - SPACING.right + SPACING.left - 10,
              SPACING.top + WALL.top + (2 * BLOCK.height) + 90,
              SPACING.right,
              (BOARD.height / 2)
            );
        }
    }

    displayMenu() {
        // DISPLAY MENU OPTIONS HERE
        stroke(255);
        fill(255);
        textSize(35);
        textAlign(CENTER);
        text(
          'BARKANOID',
          SPACING.left + WALL.left,
          SPACING.top + WALL.top + (2 * BLOCK.height),
          BOARD.width - WALL.left - WALL.right,
          (BOARD.height / 2)
        );

        textSize(14);
        textAlign(CENTER);
        text(
          'GAMEPLAY INFO',
          SPACING.left + WALL.left + 210,
          GAME_HEIGHT - (17 * BLOCK.height)
        );

        textAlign(LEFT);
        text(
          'CONTROLS: ',
          SPACING.left + WALL.left + WALL.left + 11,
          GAME_HEIGHT - (15 * BLOCK.height)
        );
        text(
          'MOVE : \'A\', \'D\'',
          SPACING.left + WALL.left + WALL.left + WALL.left + BLOCK.width - 21,
          GAME_HEIGHT - (13 * BLOCK.height)
        );
        text(
          'LAUNCH BALL: \'W\'',
          SPACING.left + WALL.left + WALL.left + WALL.left + BLOCK.width - 21,
          GAME_HEIGHT - (11 * BLOCK.height)
        );
        text(
          'BEAM SPECIAL: \'SPACEBAR\'',
          SPACING.left + WALL.left + WALL.left + WALL.left + BLOCK.width - 21,
          GAME_HEIGHT - (9 * BLOCK.height)
        );
        text(
          'PAUSE: \'P\'',
          SPACING.left + WALL.left + WALL.left + WALL.left + BLOCK.width - 21,
          GAME_HEIGHT - (7 * BLOCK.height)
        );
        text(
          'QUIT: \'Q\'',
          SPACING.left + WALL.left + WALL.left + WALL.left + BLOCK.width - 21,
          GAME_HEIGHT - (5 * BLOCK.height)
        );
        text(
          'PICK A LEVEL: \'L\'',
          SPACING.left + WALL.left + WALL.left + WALL.left + BLOCK.width - 21,
          GAME_HEIGHT - (3 * BLOCK.height)
        );
        stroke(255, 55, 0);
        fill(255, 255, 0);
        textAlign(CENTER);
        text(
          'HIT \'ENTER\' TO START THE BALL GAME!',
          SPACING.left + WALL.left,
          SPACING.top + WALL.top + (2 * BLOCK.height) + 200,
          BOARD.width - WALL.left - WALL.right,
          (BOARD.height / 2)
        );
    }

    displayMessage(message, time, status) {
        if (status) {
            blocks.forEach(block => block.show());
            paddle.show();
            balls[0].show();
        }
        stopped = true;
        numFrames = -time;

        stroke(255);
        fill(255);
        textSize(25);
        textAlign(CENTER);
        text(
          message,
          SPACING.left,
          SPACING.top + WALL.top + 2 * BLOCK.height + 100,
          BOARD.width,
          BOARD.height / 2
        );
    }

    handleGameOver() {
        new Game();
        this.displayMessage('WOOF, GAME OVER!', 150);
    }
}