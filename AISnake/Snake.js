class Snake {
    constructor() {        
        this.body = [];
        this.dead = false;
    }

    // Init example snake
    init_example() {
        // !HARDCODE!
        this.body.push(new SnakeBlock(new Vec2(4, 1), RIGHT));
        this.body.push(new SnakeBlock(new Vec2(3, 1), RIGHT));
        this.body.push(new SnakeBlock(new Vec2(2, 1), RIGHT));
        this.body.push(new SnakeBlock(new Vec2(1, 1), RIGHT));
        this.body.push(new SnakeBlock(new Vec2(0, 1), RIGHT));
    }

    // Entery point
    tick() {
        if (this.dead)
            return;

        // Thinking
        this.think();

        // Moving
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
        // Check for collision
        if (this.check_obstacle_relative(DIRECTION_VECTORS[UP])) { 
            console.log(this.body[0].pos);      
            this.dead = true;
            return
        }
        
        // Remove shadow
        game.grid.set(
            this.body[this.body.length - 1].pos,
            CELL.void);

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

    // Eating
    if (game.grid.get(this.head_pos()) == CELL.apple) {
        this.grow();
        game.grid.set(this.head_pos(), CELL.void);
    }

    // Spliting
    if (this.body.length >= SNAKE_CRITICAL_LENGTH) {
        this.split(SNAKE_TAIL_DROP_LENGTH);
    }

    // Set shadow
    game.grid.set(
        this.head_pos(),
        CELL.snake)
    }

    grow() {
        this.body.push(this.body[this.body.length - 1].clone())
        this.body[this.body.length - 1].pos =  minus(
                this.body[this.body.length - 1].pos,
                DIRECTION_VECTORS[this.body[this.body.length - 1].direction]
            )
    }

    split(tail) {
        let new_snake = new Snake();
        let dir_acc = this.body[this.body.length - 1].direction;
        for (let i = 0; i < tail; i++) {
            let block = this.body.pop();
            let save_dir = block.direction;
            block.direction = (dir_acc + 2) % 4;
            new_snake.body.push(block);
            dir_acc = save_dir;
        }
        game.tickable.push(new_snake);
    }

    turn_right() {
        this.body[0].direction = shift_clockwise(this.body[0].direction)
    }

    turn_left() {
        this.body[0].direction = shift_counterclockwise(this.body[0].direction)
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

    draw() {
        for (let i = 0; i < this.body.length; i++) {
            draw.rect(this.body[i].pos.x * CELL_SIZE, this.body[i].pos.y * CELL_SIZE, CELL_SIZE, CELL_SIZE, "green");
            // head
            if (i == 0) {
                draw.rect(this.body[i].pos.x * CELL_SIZE, this.body[i].pos.y * CELL_SIZE, CELL_SIZE, CELL_SIZE, "blue");
            }
            draw.image(
                IMG_DIRS[this.body[i].direction], 
                this.body[i].pos.x * CELL_SIZE, 
                this.body[i].pos.y * CELL_SIZE, 
                CELL_SIZE, CELL_SIZE);
            if (this.dead) {
                draw.rect(this.body[i].pos.x * CELL_SIZE, this.body[i].pos.y * CELL_SIZE, CELL_SIZE, CELL_SIZE, "rgba(255, 255, 255, 0.5)");
            }
        }
        CTX.beginPath(); 
        CTX.strokeStyle = 'white';
        CTX.moveTo(
            (this.body[0].pos.x * CELL_SIZE + CELL_SIZE / 2) * SCALE, 
            (this.body[0].pos.y * CELL_SIZE + CELL_SIZE / 2)* SCALE
            );
        for (let i = 1; i < this.body.length; i++) {
            CTX.lineTo(
                (this.body[i].pos.x * CELL_SIZE + CELL_SIZE / 2) * SCALE, 
                (this.body[i].pos.y * CELL_SIZE + CELL_SIZE / 2)* SCALE
                );
        }

        CTX.stroke();
    }
}