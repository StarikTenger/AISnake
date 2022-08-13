class Snake {
    constructor() {
        // !HARDCODE!
        this.body = [];
        this.body.push(new SnakeBlock(new Vec2(1, 1)));
        this.body.push(new SnakeBlock(new Vec2(2, 1)));

        // For turning
        this.directions_clockwise = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 };
        this.direction = this.directions_clockwise.RIGHT;
    }

    // Moves snake by a single cell
    move() {
        let x = 0;
        let y = 0;
        switch(this.direction) {
            case this.directions_clockwise.UP:
                y--;
                break;
            case this.directions_clockwise.DOWN:
                y++;
                break;
            case this.directions_clockwise.RIGHT:
                x++;
                break;
            case this.directions_clockwise.LEFT:
                x--;
                break;
        }
        if (Math.random() < 0.05) {
            for (let i = 0; i < this.body.length; i++) {
                this.body[i].pos.x += x;
                this.body[i].pos.y += y;
            }
        }
        // TODO: check new_head for collisions
    }

    turn_right() {
        this.direction = (this.direction + 1) % 4;
    }

    turn_left() {
        this.direction = (this.direction + 4 - 1) % 4;
    }

    draw() {
        for (let i = 0; i < this.body.length; i++) {
            draw.rect(this.body[i].pos.x * CELL_SIZE, this.body[i].pos.y * CELL_SIZE, CELL_SIZE, CELL_SIZE, "green");
            if (i == this.body.length - 1) {
                draw.rect(this.body[i].pos.x * CELL_SIZE, this.body[i].pos.y * CELL_SIZE, CELL_SIZE, CELL_SIZE, "blue");
            }
        }
    }
}