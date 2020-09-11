class Treats {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.type;
    let probability = random();
    if (probability < 0.1) {
      this.type = "EXTRA LIFE";
    } else if (probability < 0.3) {
      this.type = "DOUBLE";
    } else if (probability < 0.5) {
      this.type = "MAGNET";
    } else if (probability < 0.7) {
      this.type = "BEAM";
    } else {
      this.type = "DROP PARTY";
    }
  }

  update() {
    // make the treat fall
    this.y += 1;
  }

  show() {
    switch (this.type) {
      case "EXTRA LIFE":
        image(spriteXLife, this.x, this.y, BLOCK.width, BLOCK.height);
        break;
      case "DOUBLE":
        image(spriteDouble, this.x, this.y, BLOCK.width, BLOCK.height);
        break;
      case "MAGNET":
        image(spriteMagnet, this.x, this.y, BLOCK.width, BLOCK.height);
        break;
      case "BEAM":
        image(spriteBeamPot, this.x, this.y, BLOCK.width, BLOCK.height);
        break;
      case "DROP PARTY":
        image(spriteDropParty, this.x, this.y, BLOCK.width, BLOCK.height);
        break;
      default:
        break;
    }
  }

  hitPaddle() {
    if (
      this.y > paddle.y - BLOCK.height &&
      this.y < paddle.y + PADDLE.height &&
      this.x > paddle.x - BLOCK.width &&
      this.x < paddle.x + paddle.width
    ) {
      switch (this.type) {
        case "EXTRA LIFE":
          lives += 1;
          // play a sound
          break;
        case "DOUBLE":
          balls[0].double();
          // play a sound
          break;
        case "MAGNET":
          game.clearTreats();
          balls.forEach((ball) => ball.magnetize());
          break;
        case "BEAM":
          game.clearTreats();
          paddle.startBeam();
          break;
        case "DROP PARTY":
          balls[0].dropParty();
        default:
          break;
      }
      // debugger
      return true;
    }
    return false;
  }
}