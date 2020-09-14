class Paddle {
  constructor() {
    this.width = PADDLE.width;
    this.x = SPACING.left + BOARD.width / 2 - this.width / 2;
    this.y = GAME_HEIGHT - 4 * BLOCK.height;
    this.onCD = false;
    this.cooldown = 30;
    this.beam = false;
    this.frame;
  }

  update() {
    if (keyIsDown(CONTROLS.A)) {
      this.x -= 5; // move left 5
      // console.log('hitting A', this.x);
    }
    if (keyIsDown(CONTROLS.D)) {
      this.x += 5; // move right 5
      // console.log('hitting D', this.x);
    }
    this.x = constrain(
      this.x,
      SPACING.left + WALL.left,
      GAME_WIDTH - SPACING.right - WALL.right - this.width
    );
    // If it's on cooldown then check if the frame is bigger than
    // the current frame plus the cooldown and reset the cooldown
    if (this.onCD) {
      if (numFrames > this.frame + this.cooldown) {
        this.onCD = false;
      }
    }
  }

  show() {
    // RENDER PADDLE AND CONDITIONALLY RENDER SUPER DOG
    if (this.beam) {
      image(spriteSuperDog2, this.x, this.y, this.width, PADDLE.height + 17);
    } else {
      image(spriteSuperDog, this.x, this.y, this.width, PADDLE.height + 17);
    }
  }

  // ADD BEAM FUNCTION
  startBeam() {
    this.beam = true;
  }

  // REMOVE BEAM FUNCTION
  stopBeam() {
    this.beam = false;
  }
  // ADD ABILITY TO FIRE BEAM ON BUTTON PRESS
  fire() {
    if (this.beam && !this.onCD) {
      this.frame = numFrames;
      // fire sounds
      beams.push(new Beam(this.x + PADDLE.width / 3, this.y));
      this.onCD = true;
    }
  }
}