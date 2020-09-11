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
}