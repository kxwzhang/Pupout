class Beam {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.y -= 1;
  }

  show() {
    image(spriteBlueBeam, this.x. this.y, 5, 10);
  }

  hitBlock(block) {
    if (this.y < block.y + block.height && 
        this.x < block.x + block.width && 
        this.x > block.x - 5) {
      return true;
    }
    return false;
  }

  destroyed() {
    return (this.y < SPACING.top + WALL.top) ? true : false;
  }
}