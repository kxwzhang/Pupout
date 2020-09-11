class Treats {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type;
        let probability = random();
        if (probability < 0.10) {
            this.type = 'EXTRA LIFE';
        } else if (probability < 0.30) {
            this.type = 'DOUBLE';
        } else if (probability < 0.5) {
            this.type = 'MAGNET';
        } else if (probability < 0.7) {
            this.type = 'BEAM';
        } else {
            this.type = 'DROP PARTY';
        }
    }

    update() {
        // make the treat fall
        this.y +=  1;
    }

    show() {
        switch (this.type) {
            case 'EXTRA LIFE':
                image(spriteXLife, this.x, this.y, BLOCK.width, BLOCK.height);
                break;
            case 'DOUBLE':
                image(spriteDouble, this.x, this.y, BLOCK.width, BLOCK.height);
                break;
            case 'MAGNET':
                image(spriteMagnet, this.x, this.y, BLOCK.width, BLOCK.height);
                break;
            case 'BEAM':
                image(spriteBeamPot, this.x, this.y, BLOCK.width, BLOCK.height);
                break;
            case 'DROP PARTY':
                image(spriteDropParty, this.x, this.y, BLOCK.width, BLOCK.height);g
                break;
            default:
                break;
        }
    }
}