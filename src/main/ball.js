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
    // if (this.moving) {
    //   // Check for collission along the sides
    //   if (
    //     this.x < WALL.left + SPACING.left + BALL_RADIUS ||
    //     this.x > GAME_WIDTH - SPACING.right - WALL.right - BALL_RADIUS
    //   )
    //     this.dx *= -1;
    //   if (this.y < WALL.top + SPACING.top + BALL_RADIUS) this.dy *= -1;

    //   // paddle collision
    //   if (this.dy > 0) {
    //     let pt = ballInterceptPaddle(this);
    //     if (pt) {
    //       this.hitPaddle(pt);
    //       if (this.magnet) {
    //         // Play sound
    //         this.moving = false;
    //         this.offset = this.x - paddle.x;
    //       } else {
    //         // Play sound
    //       }
    //     }
    //   }

    //   // brick collision
    //   for (var i = blocks.length - 1; i > -1; i--) {
    //     var pt = ballInterceptBrick(this, blocks[i]);
    //     if (pt) {
    //       this.hitBrick(pt);
    //       blocks[i].hp--;
    //       if (blocks[i].hp == 0) {
    //         game.updateScore(blocks[i]);
    //         // 8% power chance
    //         if (random() > 0.6 && blocks[i].type != 2)
    //           powerUps.push(new PowerUp(blocks[i].x, blocks[i].y));
    //         blocks.splice(i, 1);
    //         S_Hit_02.play(); // normal hit
    //       } else {
    //         S_Hit_03.play(); // metal hit
    //       }
    //     }
    //   }

    //   this.dx = constrain(this.dx, -10, 10);
    //   this.dy = constrain(this.dy, -10, 10);

    //   this.x += this.dx;
    //   this.y += this.dy;

    //   this.x = constrain(
    //     this.x,
    //     SPACING.l + WALL.l + BALL_RADIUS - 1,
    //     GAME_WIDTH - SPACING.r - WALL.r - BALL_RADIUS + 1
    //   );
    //   this.y = constrain(
    //     this.y,
    //     SPACING.t + WALL.t + BALL_RADIUS - 1,
    //     GAME_HEIGHT + 2 * BALL_RADIUS
    //   );
    // } else {
    //   if (this.magnet) {
    //     this.x = paddle.x + this.offset;
    //     this.y = GAME_HEIGHT - 3 * BLOCK.h - BALL_RADIUS;
    //   } else this.x = paddle.x + PADDLE.w / 2;
    // }
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