class Snake {
    constructor() {
        // !HARDCODE!
        this.body = [];
        this.body.push(new SnakeBlock(new Vec2(4, 1), RIGHT));
        this.body.push(new SnakeBlock(new Vec2(3, 1), RIGHT));
        this.body.push(new SnakeBlock(new Vec2(2, 1), RIGHT));
        this.body.push(new SnakeBlock(new Vec2(1, 1), RIGHT));
        this.body.push(new SnakeBlock(new Vec2(0, 1), RIGHT));
    }

    head_direction() {
        return this.body[0].direction;
    }

    head_pos() {
        return this.body[0].pos;
    }

    pos_relative(pos) {
        let front = DIRECTION_VECTORS[this.head_direction()];
        let right = DIRECTION_VECTORS[shift_clockwise(this.head_direction())];
        let pos_abs = plus(
            mult(front, -pos.y),
            mult(right, pos.x)
        );
        pos_abs = plus(pos_abs, this.head_pos());
        //console.log(pos_abs);
        return pos_abs;
    }

    check_obstacle_relative(pos) {
        return game.grid.check_obstacle(
            this.pos_relative(pos)
        )
    }

    tick() {
        this.think();
        this.move();
    }

    think() {
        // Turn if there is a border ahead
        if (this.check_obstacle_relative(DIRECTION_VECTORS[UP])) {
            if (this.check_obstacle_relative(DIRECTION_VECTORS[LEFT]))
                this.turn_right();
            else if (this.check_obstacle_relative(DIRECTION_VECTORS[RIGHT]))
                this.turn_left();
            else {
                if (random(0,1))
                    this.turn_left();
                else
                    this.turn_right();
            }
        }
    }

    // Moves snake by a single cell
    move() {
        // Moving
        for (let i = 0; i < this.body.length; i++) {
            this.body[i].pos.x += DIRECTION_VECTORS[this.body[i].direction].x;
            this.body[i].pos.y += DIRECTION_VECTORS[this.body[i].direction].y;
        }
        // Changing the direction of all parts of the snake
        for (let i = this.body.length - 1; i >= 0; i--) {
            if (i != 0) {
                this.body[i].direction = this.body[i - 1].direction;
            }
        }
        // TODO: check new_head for collisions
    }

    turn_right() {
        this.body[0].direction = shift_clockwise(this.body[0].direction)
    }

    turn_left() {
        this.body[0].direction = shift_counterclockwise(this.body[0].direction)
    }

    draw() {
        for (let i = 0; i < this.body.length; i++) {
            draw.rect(this.body[i].pos.x * CELL_SIZE, this.body[i].pos.y * CELL_SIZE, CELL_SIZE, CELL_SIZE, "green");
            // head
            if (i == 0) {
                draw.rect(this.body[i].pos.x * CELL_SIZE, this.body[i].pos.y * CELL_SIZE, CELL_SIZE, CELL_SIZE, "blue");
            }
        }
    }
}