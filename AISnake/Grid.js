class Grid {
    constructor() {
        // Filling grid
        this.field = [];
        for (let x = 0; x < SIZE_X; x++) {
                this.field.push([]);
                for (let y = 0; y < SIZE_Y; y++) {
                    this.field[x].push(CELL.void);
                }
        }
    }

    step() {
        for (let x = 0; x < SIZE_X; x++) {
            for (let y = 0; y < SIZE_Y; y++) {
                if (this.field[x][y] == 'void' && Math.random() < APPLES_APPEARANCE_PROBABILITY)
                    this.field[x][y] = CELL.apple
                switch(this.field[x][y]) {
                    case 'void':
                        draw.rect(x, y, 1, 1, "black");
                        break;
                    case 'apple':
                        draw.rect(x, y, 1, 1, "red");
                        break;
                    case 'void':
                        draw.rect(x, y, 1, 1, "white");
                        break;
                }
            }
        }
    }

}