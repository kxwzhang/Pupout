class Ball {
  constructor(x, y, dx, dy) {
    this.x = (BOARD.width / 2) + SPACING.left;
    this.y = GAME_HEIGHT - (4 * BLOCK.height) - BALL_RADIUS;
    this.dx = 3;
    this.dy = -3;
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
    if (this.moving) {
      // Check for collission along the sides
      if (
        this.x < WALL.left + SPACING.left + BALL_RADIUS ||
        this.x > GAME_WIDTH - SPACING.right - WALL.right - BALL_RADIUS
      )
        this.dx *= -1;
      if (this.y < WALL.top + SPACING.top + BALL_RADIUS) this.dy *= -1;

      // Check paddle collision
      if (this.dy > 0) {
        let action = ballInterceptPaddle(this);
        if (action) {
          this.hitPaddle(action);
          if (this.magnet) {
            // Play sound
            this.moving = false;
            this.offset = this.x - paddle.x;
          } else {
            // Play sound
          }
        }
      }

      // Check Block collision
      for (let i = blocks.length - 1; i > -1; i--) {
          let action = ballInterceptBlock(this, blocks[i]);
          if (action) {
              this.hitBlock(action);
              blocks[i].hp -= 1;
              if (blocks[i].hp === 0) {
                game.updateScore(blocks[i]);
                // add treats in here
                blocks.splice(i, 1);
                // play normal sound
              } else {
                // play alt sound
              }
          }
      }

      this.dx = constrain(this.dx, -10, 10);
      this.dy = constrain(this.dy, -10, 10);
      this.x += this.dx;
      this.y += this.dy;
      this.x = constrain(
        this.x,
        SPACING.left + WALL.left + BALL_RADIUS - 1,
        GAME_WIDTH - SPACING.right - WALL.right - BALL_RADIUS + 1
      );
      this.y = constrain(
        this.y,
        SPACING.top + WALL.top + BALL_RADIUS - 1,
        GAME_HEIGHT + (2 * BALL_RADIUS)
      );
    } else {
      if (this.magnet) {
        this.x = paddle.x + this.offset;
        this.y = GAME_HEIGHT - (3 * BLOCK.height) - BALL_RADIUS;
      } else this.x = paddle.x + (PADDLE.width / 2);
    }
  }

  show() {
    image(
        spriteTennisball, 
        this.x - BALL_RADIUS + 10, 
        this.y - BALL_RADIUS,
        2 * BALL_RADIUS,
        2 * BALL_RADIUS)
  }

  hitPaddle(action) {
    console.log('hitPaddle action ', action);
    switch (action.dir) {
      case 'TOP':
        this.y = action.y;
        this.dy *= -1;
        break;
      case 'TOP_RIGHT':   
      case 'TOP_LEFT':
        this.x = action.x;
        this.dx *= -1;
        this.y = action.y;
        this.dy *= -1;
        break;
      case 'RIGHT':
      case 'LEFT':
        this.x = action.x;
        this.dx *= -1;
        break;
      default:
        break;
    }
    if (keyIsDown(CONTROLS.A)) this.dx = this.dx * (this.dx > 0 ? 0.6 : 1.05);
    if (keyIsDown(CONTROLS.D)) this.dx = this.dx * (this.dx < 0 ? 0.6 : 1.05);
  }

  hitBlock(action) {
    console.log('hitBlock action ', action)
    switch (action.dir) {
        case 'TOP':
        case 'BOTTOM':
            this.y = action.y;
            this.dy = -this.dy;
            break;
        case 'RIGHT':
        case 'LEFT':
            this.x  = action.x;
            this.dx = -this.dx;
            break;
        default:
            break;
    }
    // after each hit, increment the speed
    if (this.dx > 0) this.dx += 0.1 * (1 - this.dx / 10);
    if (this.dx < 0) this.dx -= 0.1 * (1 - this.dx / 10);
    if (this.dy > 0) this.dy += 0.1 * (1 - this.dy / 10);
    if (this.dy < 0) this.dy -= 0.1 * (1 - this.dy / 10);
  }

  launch() {
      this.moving = true;
      if (this.magnet) {
        if (this.offset > paddle.w / 2) {
            this.dx = Math.abs(this.dx);
        } else {
            this.dx = Math.abs(this.dx) * -1;
        }
      }
  }

  destroyed() {
      return (this.y > GAME_HEIGHT + BALL_RADIUS) ? true : false;
  }
  
  magnetize() {
      this.magnet = true;
  }

  demagnetize() {
      this.magnet = false;
      this.launch();
  }

  double() {
      balls.push(new Ball(this.x, this.y, random(-3, 3), Math.abs(this.dy) * -1 + random(-0.5, 0.5)));
      balls.forEach(ball => {
          ball.moving = true;
          if (this.magnet) ball.magnetize();
      });
  }

  dropParty() {
      for (let i = 0; i < 5; i++) {
          this.double();
      }
  }
}