let CELL = { void: 'void', apple: 'apple', wall: 'wall', snake: 'snake'};

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

    get(pos) {
        // Field topology can be determined here
        // Now the filed is bordered
        if (pos.x < 0 || pos.y < 0 || pos.x >= SIZE_X || pos.y >= SIZE_Y)
            return CELL.wall;
        return this.field[pos.x][pos.y];
    }

    set(pos, value) {
        // Field topology can be determined here
        // Now the filed is bordered
        if (pos.x < 0 || pos.y < 0 || pos.x >= SIZE_X || pos.y >= SIZE_Y)
            return;
        this.field[pos.x][pos.y] = value;
    }

    check_obstacle(pos) {
        return (
            this.get(pos) == CELL.wall || 
            this.get(pos) == CELL.snake
        );
    }

    click_action(x, y) {
        if (x < SIZE_X && y < SIZE_Y) {
            if (this.field[x][y] == CELL.void) 
                this.field[x][y] = CELL.wall;
            else if (this.field[x][y] == CELL.wall) 
                this.field[x][y] = CELL.void;
        }
    }

    step() {
        let apple_num = 0;
        // Adding walls
        if (CLICKED) {
            CLICKED = false;
            this.click_action(CLICKED_X, CLICKED_Y);
        }
        for (let x = 0; x < SIZE_X; x++) {
            for (let y = 0; y < SIZE_Y; y++) {
                // Counting apples 
                if (this.field[x][y] == 'apple')
                    apple_num++;

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
        // Adding apples
        let rnd_x = random(0, SIZE_X - 1);
        let rnd_y = random(0, SIZE_Y - 1);
        if (apple_num < APPLE_LIMIT && this.field[rnd_x][rnd_y] == CELL.void)
            this.field[rnd_x][rnd_y] = CELL.apple;
    }

}