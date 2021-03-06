class Beam {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.y -= 6;
  }

  show() {
    image(spriteBlueBeam, this.x, this.y, 15, 20);
  }

  hitBlock(block) {
    if (this.y < block.y + BLOCK.height && this.x < block.x + BLOCK.width && this.x + 5 > block.x) {
      return true;
    }
    return false;
  }

  destroyed() {
    return (this.y < SPACING.top + WALL.top) ? true : false;
  }
}