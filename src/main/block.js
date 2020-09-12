class Block {
  constructor(x, y, type) {
    this.x = SPACING.left + WALL.left + x * BLOCK.width + 6;
    this.y = SPACING.top + WALL.top + y * BLOCK.height;
    this.type = type;
    // Use infinity to create unbreakable blocks
    if (this.type == 1) {
      // Type 1 blocks are unbreakable
      this.hp = Infinity;
    } else if (this.type == 2) {
      // Type 2 blocks take 2 hits to break
      this.hp = 2;
    } else {
      // All other blocks with values > 2 will break in a single hit
      this.hp = 1;
    }
  }

  show() {
    switch (this.type) {
      case 1:
        image(spriteBlock1, this.x, this.y, BLOCK.width, BLOCK.height);
        break;
      case 2:
        image(spriteBlock2, this.x, this.y, BLOCK.width, BLOCK.height);
        break;
      case 3:
        image(spriteBlock3, this.x, this.y, BLOCK.width, BLOCK.height);
        break;
      case 4:
        image(spriteBlock4, this.x, this.y, BLOCK.width, BLOCK.height);
        break;
      case 5:
        image(spriteBlock5, this.x, this.y, BLOCK.width, BLOCK.height);
        break;
      case 6:
        image(spriteBlock6, this.x, this.y, BLOCK.width, BLOCK.height);
        break;
      case 7:
        image(spriteBlock7, this.x, this.y, BLOCK.width, BLOCK.height);
        break;
      default:
        break;
    }
  }
}