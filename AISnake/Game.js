 
// Main class that controls everything

class Game {
    constructor() {
        this.grid = new Grid();
        this.tickable = [];
        let snake = new Snake();
        this.tickable.push(snake);
    }

    step() {
        if (CLICKED) {
            CLICKED = false;
            this.grid.click_action(CLICKED_X, CLICKED_Y);
            for (let i = 0; i < this.tickable.length; i++) {
                if (this.tickable[i] instanceof Snake) {
                    let result = this.tickable[i].divide(CLICKED_X, CLICKED_Y);
                    if (result) {
                        this.tickable[i] = result[0];
                        this.tickable.push(result[1]);
                    }
                }
            }
        }
        this.grid.step();
        for (let i = 0; i < this.tickable.length; i++) {
            this.tickable[i].draw();
        }
    }

    tick() {
        for (let i = 0; i < this.tickable.length; i++) {
            this.tickable[i].tick();
        }
    }
}