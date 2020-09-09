class Ball {
  constructor(x, y, dx, dy) {
    this.x = (BOARD.width / 2) + SPACING.left + 10;
    this.y = GAME_HEIGHT - (4 * BLOCK.height) - BALL_RADIUS;
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
  }

  show() {
      image(
          spriteTennisball, 
          this.x - BALL_RADIUS, 
          this.y - BALL_RADIUS,
          2 * BALL_RADIUS,
          2 * BALL_RADIUS)
  }
}