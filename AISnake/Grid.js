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
        this.apple_num = 0;
        for (let x = 0; x < SIZE_X; x++) {
            for (let y = 0; y < SIZE_Y; y++) {
                if (this.field[x][y] == 'void' && Math.random() < (APPLES_APPEARANCE_PROBABILITY / (1 << this.apple_num)))
                    this.field[x][y] = CELL.apple;
                if (this.field[x][y] == 'apple')
                    this.apple_num++;
                switch(this.field[x][y]) {
                    case 'void':
                        draw.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE, "black");
                        break;
                    case 'apple':
                        draw.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE, "red");
                        break;
                    case 'void':
                        draw.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE, "white");
                        break;
                }
            }
        }
    }

}