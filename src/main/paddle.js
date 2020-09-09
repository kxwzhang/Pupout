class Paddle {
    constructor() {
        this.width = PADDLE.width;
        this.x = SPACING.left + (BOARD.width/2) - (this.width/2);
        this.y = GAME_HEIGHT - 3 * BLOCK.height;
        this.onCD = false;
        this.cooldown = 30;
        this.supersized = false;
        this.beam = false;
        this.frame;
    }

    update() {
        // HANDLE UPDATING STATUS
    }

    show() {
        // RENDER PADDLE
    }

    supersize() {
        // MAKE PADDLE BIGGER
    }

    shrink() {
        // MAKE PADDLE SMALLER
    }

    // ADD BEAM FUNCTION
    // REMOVE BEAM FUNCTION
    // ADD ABILITY TO FIRE BEAM ON BUTTON PRESS
}