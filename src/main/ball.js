class Ball {
  constructor(x, y, dx, dy) {
      this.x = (BOARD.width/2) + SPACING.left;
      this.y = GAME_HEIGHT - (3*BLOCK.height) - BALL_RADIUS;
    
  }
}