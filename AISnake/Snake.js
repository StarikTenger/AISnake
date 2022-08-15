class Snake {
    constructor() {        
        this.body = [];
        this.starvation = 0;
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

        // Getting lifetime score
        game.increase_score();

        // Thinking
        this.think();

        // Moving
        this.move();
    }

    think() {
        // Turn if there is a border ahead
        let apple_left = game.grid.get(
            this.pos_relative(DIRECTION_VECTORS[LEFT])
            ) == CELL.apple;
        let apple_right = game.grid.get(
            this.pos_relative(DIRECTION_VECTORS[RIGHT])
            ) == CELL.apple;
        
        if (apple_left) {
            this.turn_left();
            return;
        }
        else if (apple_right) {
            this.turn_right();
            return;
        }

        if (this.check_obstacle_relative(DIRECTION_VECTORS[UP])) {
            if (this.check_obstacle_relative(DIRECTION_VECTORS[LEFT]))
                this.turn_right();
            else if (this.check_obstacle_relative(DIRECTION_VECTORS[RIGHT]))
                this.turn_left();
            else
                if (random(0,1)) 
                    this.turn_left();
                else 
                    this.turn_right();
        }
    }

    // Moves snake by a single cell
    move() {
        // Check for collision
        if (this.check_obstacle_relative(DIRECTION_VECTORS[UP])) { 
            this.die();
            return;
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
                this.body[i].set_direction(this.body[i - 1].direction);
            }
        }
        
        // Animation
        AH_snake_head_enter.spawn(this.head_pos(), this.head_direction());
        AH_snake_head_leave.spawn(this.body[1].pos, this.body[1].direction);

        // Eating
        if (game.grid.get(this.head_pos()) == CELL.apple) {
            play_sound(eat);
            this.grow();
            //game.increase_score(); // scores for eating apple
            game.grid.set(this.head_pos(), CELL.void);
            this.starvation = 0;
        }
        this.starvation ++;
        if (this.starvation > SNAKE_STARVATION_DEATH_LIMIT) {
            this.die();
            return;
        }

        AH_snake_tail_enter.spawn(
            this.body[this.body.length - 2].pos, 
            this.body[this.body.length - 2].direction);
        AH_snake_tail_leave.spawn(
            this.body[this.body.length - 1].pos, 
            this.body[this.body.length - 1].direction);

        // Spliting
        if (this.body.length >= SNAKE_CRITICAL_LENGTH) {
            this.split(SNAKE_TAIL_DROP_LENGTH);
        }

        // Set shadow
        game.grid.set(
            this.head_pos(),
            CELL.snake)

        // this.spawn_animations();
    }

    die() {
        play_sound(death);   
        this.dead = true;
        this.body.pop();
    }

    spawn_animations() {
        for (let i = 0; i < this.body.length; i++) {

            var block = this.body[i];

            if (i == 0) { // head
                draw.image(
                    IMG_DIRS[this.body[i].direction], 
                    this.body[i].pos.x * CELL_SIZE, 
                    this.body[i].pos.y * CELL_SIZE, 
                    CELL_SIZE, CELL_SIZE);
            } else if (i == this.body.length - 1) { // tail
                draw.image(
                    IMG_DIRS[2], 
                    this.body[i].pos.x * CELL_SIZE, 
                    this.body[i].pos.y * CELL_SIZE, 
                    CELL_SIZE, CELL_SIZE, );
            } else { // body
                var cur_dir = block.direction;
                var prev_dir_of_next_block =  this.body[i - 1];

                AH_snake_body_stand.spawn_with_rot_and_dirs(mult(block.pos, CELL_SIZE), block.direction, cur_dir, prev_dir_of_next_block);
            }
        }
    }

    grow() {
        this.body.push(this.body[this.body.length - 1].clone())
        this.body[this.body.length - 1].pos =  minus(
                this.body[this.body.length - 1].pos,
                DIRECTION_VECTORS[this.body[this.body.length - 1].direction]
            )
        // Set shadow
        game.grid.set(
            this.body[this.body.length - 1].pos,
            CELL.snake)
    }

    split(tail) {
        play_sound(split);
        let new_snake = new Snake();
        let dir_acc = this.body[this.body.length - 1].direction;
        for (let i = 0; i < tail; i++) {
            let block = this.body.pop();
            let save_dir = block.direction;
            block.set_direction((dir_acc + 2) % 4);
            new_snake.body.push(block);
            dir_acc = save_dir;
        }
        game.tickable.push(new_snake);
    }

    turn_right() {
        this.body[0].set_direction(shift_clockwise(this.body[0].direction));
    }

    turn_left() {
        this.body[0].set_direction(shift_counterclockwise(this.body[0].direction));
    }

    head_direction() {
        return this.body[0].direction;
    }

    head_pos() {
        return this.body[0].pos;
    }

    head() {
        return this.body[0];
    }

    tail() {
        return this.body[this.body.length - 1];
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
        let imgs = IMG_DIRS;
        if (this.dead) {
            imgs = IMG_DIRS_DEAD;
        }
        for (let i = 0; i < this.body.length; i++) {
            game.grid.set(this.body[i].pos, CELL.snake);
        }
        let start_ind = 0;
        let end_ind = 0;
        if (!this.dead) {
            start_ind = 2;
            end_ind = 2;
        }
        for (let i = start_ind; i < this.body.length - end_ind; i++) {
            var block = this.body[i];

            if (i == 0) { // head
                let texture_num = 0;
                if (this.body[i].direction != this.body[i + 1].direction) {
                    if ((this.body[i].direction + 1) % 4 == this.body[i + 1].direction) {
                        texture_num = 3;
                    }
                    else {
                        texture_num = 6;
                    }
                }
                draw.image(
                    imgs[texture_num], 
                    this.body[i].pos.x * CELL_SIZE, 
                    this.body[i].pos.y * CELL_SIZE, 
                    CELL_SIZE, CELL_SIZE, this.body[i].direction * 90);
            } else if (i == this.body.length - 1) { // tail
                draw.image(
                    imgs[4], 
                    this.body[i].pos.x * CELL_SIZE, 
                    this.body[i].pos.y * CELL_SIZE, 
                    CELL_SIZE, CELL_SIZE, this.body[i].direction * 90);
            } else { // body
                let texture_num = 1;
                if (this.body[i].direction != this.body[i + 1].direction) {
                    if ((this.body[i].direction + 1) % 4 == this.body[i + 1].direction) {
                        texture_num = 2;
                    }
                    else {
                        texture_num = 5;
                    }  
                }
                draw.image(
                    imgs[texture_num], 
                    this.body[i].pos.x * CELL_SIZE, 
                    this.body[i].pos.y * CELL_SIZE, 
                    CELL_SIZE, CELL_SIZE, this.body[i + 1].direction * 90);    
            }
        }


        let s_delta = mult(
            DIRECTION_VECTORS[this.body[0].direction],
            ((game.timer + 1) % 16) / 16);
        let s_pos = plus(
            this.body[0].pos,
            s_delta);
        let d_delta = new Vec2(0, 0);
        if (this.head_direction() == RIGHT) d_delta = new Vec2(0, -0.5);
        if (this.head_direction() == LEFT) d_delta = new Vec2(1, -0.5);
        if (this.head_direction() == UP) d_delta = new Vec2(0.5, 0);
        if (this.head_direction() == DOWN) d_delta = new Vec2(0.5, -1);

        s_pos = plus(s_pos, d_delta)
        if (!this.dead && this.starvation >= SNAKE_STARVATION_LIMIT) {
            draw.image(IMG_STARVATION,
                (s_pos.x) * CELL_SIZE, 
                (s_pos.y) * CELL_SIZE, 
                CELL_SIZE, CELL_SIZE);
        }

        // CTX.beginPath(); 
        // CTX.strokeStyle = 'white';
        // CTX.moveTo(
        //     (this.body[0].pos.x * CELL_SIZE + CELL_SIZE / 2) * SCALE, 
        //     (this.body[0].pos.y * CELL_SIZE + CELL_SIZE / 2)* SCALE
        //     );
        // for (let i = 1; i < this.body.length; i++) {
        //     CTX.lineTo(
        //         (this.body[i].pos.x * CELL_SIZE + CELL_SIZE / 2) * SCALE, 
        //         (this.body[i].pos.y * CELL_SIZE + CELL_SIZE / 2)* SCALE
        //         );
        // }

        // CTX.stroke();
    }
}