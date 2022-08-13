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

        var elem = document.getElementById('screen'),
        elemLeft = elem.offsetLeft + elem.clientLeft,
        elemTop = elem.offsetTop + elem.clientTop,
        elements = [];

        // Add event listener for `click` events.
        elem.addEventListener('click', function(event) {
            CLICKED_X = Math.floor(event.x / SCALE / CELL_SIZE);
            CLICKED_Y = Math.floor(event.y / SCALE / CELL_SIZE);
            CLICKED = true;
        }, false);
    }

    add_wall(x, y) {
        if (x < SIZE_X && y < SIZE_Y && this.field[x][y] == 'void') {
            this.field[x][y] = 'wall';
        }
    }

    step() {
        this.apple_num = 0;
        // Adding walls
        if (CLICKED) {
            CLICKED = false;
            this.add_wall(CLICKED_X, CLICKED_Y);
        }
        for (let x = 0; x < SIZE_X; x++) {
            for (let y = 0; y < SIZE_Y; y++) {
                // Adding apples
                if (this.field[x][y] == 'void' && Math.random() < (APPLES_APPEARANCE_PROBABILITY / (1 << this.apple_num)))
                    this.field[x][y] = CELL.apple;

                // Counting apples 
                if (this.field[x][y] == 'apple')
                    this.apple_num++;

                // Drawing grid
                switch(this.field[x][y]) {
                    case 'void':
                        draw.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE, "black");
                        break;
                    case 'apple':
                        draw.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE, "red");
                        break;
                    case 'wall':
                        draw.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE, "white");
                        break;
                }
            }
        }
    }

}