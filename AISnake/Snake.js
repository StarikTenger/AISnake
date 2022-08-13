class Snake {
    constructror() {
        // !HARDCODE!
        this.body = new Deque();
        this.body.addFront(new Vec2(4, 4))
        this.body.addFront(new Vec2(5, 4))
        this.direction = RIGHT;

        // For turning
        this.directions_clockwise = [UP, RIGHT, DOWN, LEFT]
    }

    // Moves snake by a single cell
    move() {
        let new_head =  body.peekFront().
            plus(DIRECTION_VECTORS[this.direction]);
        this.body.addFront(new_head.clone());
        this.body.removeBack();

        // TODO: check new_head for collisions
    }

    turn_right() {
        this.direction = (this.direction + 1) % this.directions_clockwise.length;
    }

    turn_left() {
        this.direction = (this.direction - 1) % this.directions_clockwise.length;
    }

}