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

    check_obstacle_front(pos) {
        
    }

    // Moves snake by a single cell
    move() {
        // Turn if there is a border ahead
        if (this.body[0].pos.x + DIRECTION_VECTORS[this.body[0].direction].x < 0 ||
            this.body[0].pos.x + DIRECTION_VECTORS[this.body[0].direction].x >= SIZE_X ||
            this.body[0].pos.y + DIRECTION_VECTORS[this.body[0].direction].y < 0 ||
            this.body[0].pos.y + DIRECTION_VECTORS[this.body[0].direction].y >= SIZE_Y) {
            alert("turn");
            this.turn_left();
        }
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
        this.body[0].direction = (this.body[0].direction + 1) % 4;
    }

    turn_left() {
        this.body[0].direction = (this.body[0].direction + 4 - 1) % 4;
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