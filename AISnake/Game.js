 
// Main class that controls everything

class Game {
    constructor() {
        this.grid = new Grid();
        this.tickable = [];
        let snake = new Snake();
        snake.init_example();
        this.tickable.push(snake);
    }

    step() {
        this.grid.step();
    }

    tick() {
        for (let i = 0; i < this.tickable.length; i++) {
            this.tickable[i].tick();
        }
    }
}