class SnakeBlock {
    constructor(pos, direction) {
        this.pos = pos;
        this.direction = direction;
    }
    clone() {
        return SnakeBlock(this.pos.clone(), this.direction);
    }
}