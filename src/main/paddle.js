class Paddle {
    constructor() {
        this.width = PADDLE.width;
        this.x = SPACING.left + BOARD.width / 2 - this.width / 2;
        this.y = GAME_HEIGHT - 3 * BLOCK.height;
        this.onCD = false;
        this.cooldown = 30;
        this.supersized = false;
        this.beam = false;
        this.frame;
    }

    update() {
        // HANDLE UPDATING STATUS
        if (keyIsDown(CONTROLS.A)) this.x -= 5; // move left 5
        if (keyIsDown(CONTROLS.D)) this.x += 5; // move right 5
        this.x = constrain(
          this.x,
          SPACING.left + WALL.left,
          GAME_WIDTH - SPACING.right - WALL.right - this.width
        );
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