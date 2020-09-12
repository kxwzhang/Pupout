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
}