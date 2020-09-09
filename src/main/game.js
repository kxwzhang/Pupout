const CONTROLS = { W: 87, A: 65, D: 68, Q: 81, R: 82, SPACE: 32 };
const GAME_WIDTH = 656;
const GAME_HEIGHT = 534;
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

// Canvas Setup
function setup() {
    createCanvas(GAME_WIDTH, GAME_HEIGHT);
}

function draw() {
    background('burlywood');
    ellipse(100, 100, 100, 100);
    // text(`Score: ${score}`, width - 100, 50);
    fill(255);
}

// Game Class
class Game {
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
            // Draw the board
            // Display game info
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
                points = 60;
                break;
            case 4:
                points = 70;
                break;
            case 5:
                points = 80;
                break;
            case 6:
                points = 90;
                break;
            case 7:
                points = 100;
                break;
            case 8:
                points = 110;
                break;
            case 9:
                points = 120;
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
}