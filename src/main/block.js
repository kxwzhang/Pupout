class Block {
    constructor(x, y, type) {
        this.x = SPACING.left + WALL.left + x * BLOCK.width + 6;
        this.y = SPACING.top + WALL.top + y * BLOCK.height;
        this.type = type;
        // Use infinity to create unbreakable blocks
        if (this.type == 1) { // Type 1 blocks are unbreakable
            this.hp = Infinity;
        } else if (this.type == 2) { // Type 2 blocks take 2 hits to break
            this.hp = 2;        
        } else { // All other blocks with values > 2 will break in a single hit
            this.hp = 1;
        }     
    }

    show() {
        switch (this.type) {
            case 1:
                image();
                break;
        
            default:
                break;
        }
    }
}