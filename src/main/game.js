// Canvas Setup
function setup() {
    createCanvas(800, 700);
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
        this.menu = true;
        this.paused = false;
        this.stopped = false;
        // this.paddle = new Paddle(); // add new Paddle class
        // this.balls = [new balls()]; // an array of balls with new ball 
        this.treats = [];
        this.blocks = [];
        this.beams = [];
        this.level = 1;
        this.score = 0;
        this.lives = 3;
        this.numFrames = 0;
    }

    update() {
        if (!this.menu && !this.paused && !this.stopped) {
            // 1. should first update the paddle

            // 2. iterate through the balls and update them

            // 3. iterate through the treats and update them

            // 4. iterate through the beams and update them

            // Check if not on the menu, then check if all the blocks have been cleared
            // If all blocks cleared then initialize next level
            // Increment the numFrames
        }
    }

    show() {
        if (!this.stopped) {
            background('lightblue');
            // Draw the board
            // Display game info
            if (!this.menu) {
                // render paddle
                // render each of the other elements
            } else if (this.menu) {
                // show the menu otherwise
            }
        }
    }

    // Initializes the level
    initLevel() {
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
        })
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
}