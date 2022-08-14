 
// Main class that controls everything

class Game {
    constructor() {
        this.grid = new Grid();
        this.score = 0;
        this.tickable = [];
        let snake = new Snake();
        snake.init_example();
        this.tickable.push(snake);

        this.stepebal = [];

        this.animations = [];
    }
    
    increase_score() {
        this.score++;
        document.getElementById('score').innerHTML = "Score: " + this.score;
    }

    step() {
        this.grid.step();

        for (let i = 0; i < this.stepebal.length; i++) {
            this.stepebal[i].step();
        }
    }

    tick() {
        for (let i = 0; i < this.tickable.length; i++) {
            this.tickable[i].tick();
        }
    }
}