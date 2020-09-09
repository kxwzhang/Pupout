class Ball {
  constructor(x, y, dx, dy) {
    this.x = (BOARD.width/2) + SPACING.left;
    this.y = GAME_HEIGHT - (3*BLOCK.height) - BALL_RADIUS;
    this.dx = 3;
    this.dy = 3;
    // Check if the ball exists on X 
    if (x) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
    this.offset = 0;
    this.moving = false;
    this.magnet = false;
  }

  update() {
    // CHECK FOR COLLISIONS
    // ?
  }
}