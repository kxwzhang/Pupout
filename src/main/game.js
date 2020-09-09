// Game constants
const CONTROLS = { W: 87, A: 65, D: 68, Q: 81, L: 76, SPACE: 32 };
const GAME_WIDTH = 656;
const GAME_HEIGHT = 554; // 534
const ROWS = 30;
const COLS = 15;
const WALL = {
    top: 14, right: 14, left: 14
};
const BOARD = {
    width: 450, height: 520
};
const SPACING = {
    top: 14, right: 168, left: 42
};
const PADDLE = {
    width: 70, height: 14
};
const BLOCK = {
    width: 28, height: 14
};
const BALL_RADIUS = 8;

// Game values
// let options;
// let paused;
// let stopped;
// // let paddle;
// // let balls;
// let blocks;
// let treats;
// let beams;
// let score;
// let lives;
// let level;
// let numFrames;

// Canvas Setup
function setup() {
    createCanvas(GAME_WIDTH, GAME_HEIGHT);
    game = new Game();
    // game.initialize();
}

function draw() {
    // game.update();
    game.show();
}

// Game Class
class Game {
    // initialize() {
    //     // PlaySound
    //     options = true;
    //     paused = false;
    //     stopped = false;
    //     // paddle = new Paddle();
    //     // balls = [ new Ball() ];
    //     blocks = [];
    //     treats = [];
    //     beams = [];
    //     score = 0;
    //     level = 1;
    //     lives = 3;
    //     numFrames = 0;
    // }
    constructor() {
        // Play sound
        this.options = true;
        this.paused = false;
        this.stopped = false;
        // this.paddle = new Paddle(); // add new Paddle class
        // this.balls = [new Ball()]; // an array of balls with new ball 
        this.treats = [];
        this.blocks = [];
        this.beams = [];
        this.level = 1;
        this.score = 0;
        this.lives = 3;
        this.numFrames = 0;
    }

    update() {
        if (!this.options && !this.paused && !this.stopped) {
            // 1. should first update the paddle

            // 2. iterate through the balls and update them

            // 3. iterate through the treats and update them

            // 4. iterate through the beams and update them

            // Check if not on the options, then check if all the blocks have been cleared
            // If all blocks cleared then initialize next level
            // Increment the numFrames
        }
    }

    show() {
        if (!this.stopped) {
            background('lightblue');
            this.drawBoard(); // Draw the board
            this.displayInfo(); // Display game info
            if (!this.options) {
                // render paddle
                // render each of the other elements
            } else if (this.options) {
                // show the options otherwise
            }
        }
    }

    // Initializes the level
    initLevel(lvl) {
        // clear the blocks
        // generate new blocks
        let message = 'LEVEL ' + this.level + '\nGET READY'
        // display message using this.displayMessage()
        // Add sounds
    }

    // Clears the blocks
    clearBlocks() {
        this.blocks = [];
    }

    // Clears the treats
    clearTreats() {
        paddle.shrink(); // shrink the paddle
        paddle.stopBeam(); // stop the beam
        this.balls.forEach(ball => {
            if (ball.magnet) ball.demagnetize;
            ball.launch();
        });
    }

    // Check if all blocks have been cleared
    checkEmptyBlocks() {
        let isEmpty = true;
        this.blocks.forEach(block => {
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
                points = 50 * this.level;
                break;
            case 3:
                points = 60 * this.level;
                break;
            case 4:
                points = 70 * this.level;
                break;
            case 5:
                points = 80 * this.level;
                break;
            case 6:
                points = 90 * this.level;
                break;
            case 7:
                points = 190;
                break;
            case 8:
                points = 200;
                break;
            case 9:
                points = 220;
                break;
            default:
                break;
        }
        this.score += points; // update score with points
    }

    // Invoking this will generate the next level
    nextLevel() {
        this.level += 1; // increment the level by 1
        this.paddle = new Paddle();
        this.balls = [new Ball()];
        this.blocks = [];
        this.beams = [];
        this.treats = [];
        this.numFrames = 0;
        // Check to make sure our level is below 10, otherwise reset to level 1
        if (this.level > 10) {
            this.level = 1;
        }
        this.initLevel(LEVELS['level' + this.level]);
    }

    startGame() {
        this.paddle = new Paddle();
        this.numFrames = 0;
        this.initLevel(LEVELS['level' + this.level])
        this.options = false;
    }

    switchLevel() {
        this.level += 1;
        // Reset to level 1 if level goes beyond 10
        if (this.level > 10) this.level = 1;
    }

    drawBoard() {
        image(spriteGameBackground, SPACING.left, SPACING.top, BOARD.width, BOARD.height);
    }

    displayInfo() {
        stroke(255, 55, 0);
        fill(255, 255, 0);
        textSize(28);
        textAlign(LEFT);
        // get a cool font
        text(
          "SCORE",
          GAME_WIDTH - SPACING.right + SPACING.left,
          SPACING.top + WALL.top + 2 * BLOCK.height, // 100
          SPACING.right,
          BOARD.height / 2
        );
        text(
          "BALLS",
          GAME_WIDTH - SPACING.right + SPACING.left,
          SPACING.top + WALL.top + 2 * BLOCK.height + 175,
          SPACING.right,
          BOARD.height / 2
        );
        image(
          spriteHeart,
          GAME_WIDTH - SPACING.right + 92 + SPACING.left,
          SPACING.top + WALL.top + 2 * BLOCK.height + 178,
          20,
          20
        );
        text(
          "LEVEL",
          GAME_WIDTH - SPACING.right + SPACING.left,
          SPACING.top + WALL.top + 2 * BLOCK.height + 300,
          SPACING.right,
          BOARD.height / 2
        );
        stroke(255);
        fill(255);
        text(
          this.score,
          GAME_WIDTH - SPACING.right + SPACING.left,
          SPACING.top + WALL.top + 2 * BLOCK.height + 30, // 125
          SPACING.right,
          BOARD.height / 2
        );
        text(
          this.lives,
          GAME_WIDTH - SPACING.right + SPACING.left,
          SPACING.top + WALL.top + 2 * BLOCK.height + 205,
          SPACING.right,
          BOARD.height / 2
        );
        text(
          this.level,
          GAME_WIDTH - SPACING.right + SPACING.left,
          SPACING.top + WALL.top + 2 * BLOCK.height + 330,
          SPACING.right,
          BOARD.height / 2
        );
        this.displayPaused(); // Render pause if player hits enter
    }

    displayPaused() {
        if (this.paused) {
            stroke(188, 25, 0);
            fill(188, 25, 0);
            textSize(28);
            textAlign(LEFT);
            text(
              "PAUSED",
              GAME_WIDTH - SPACING.right + SPACING.left,
              SPACING.top + WALL.top + 2 * BLOCK.height + 250,
              SPACING.right,
              BOARD.height / 2
            );
        }
    }

    displayMenu() {
        // DISPLAY MENU OPTIONS HERE
    }

    displayMessage(message, time, status) {
        if (status) {
            this.blocks.forEach(block => {
                block.show();
            });
            this.paddle.show();
            this.balls[0].show();
        }
        this.stopped = true;
        this.numFrames = -time;

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