class SnakeBlock {
    constructor(pos, direction) {
        this.pos = pos;
        this.direction = direction;
        this.prev_direction = direction;
    }
    clone() {
        return new SnakeBlock(this.pos.clone(), this.direction);
    }

    set_direction(new_direction) {
        this.prev_direction = this.direction;
        this.direction = new_direction;
    }
}