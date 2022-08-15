 
// Main class that controls everything

class Game {
    constructor() {
        this.timer = 0;
        this.grid = new Grid();
        this.score = 0;
        this.tickable = [];
        let snake = new Snake();
        snake.init_example();
        this.tickable.push(snake);

        this.stepebal = [];

        this.animations = [];

        this.all_dead = false;

        this.RELOAD = false;
    }
    
    increase_score() {
        this.score++;
        document.getElementById('score').innerHTML = "Score: " + this.score;
    }

    step() {
        this.grid.step();
        this.timer++;
        for (let i = 0; i < this.stepebal.length; i++) {
            this.stepebal[i].step();
        }
    }

    tick() {
        this.all_dead = true;
        for (let i = 0; i < this.tickable.length; i++) {
            this.tickable[i].tick();
            if (this.tickable[i] instanceof Snake) {
                this.all_dead &= this.tickable[i].dead;
            }
        }
        if (this.all_dead) {
            // HARDCODED
            draw.rect(0, 0, 10000, 10000, "rgba(0, 0, 0, 0.4)");
            
            document.getElementById('final_score').innerHTML = 'Your score: ' + this.score;
            document.getElementById('final_score').style.top = "45%";
            document.getElementById('final_score').style.display = "inline";
            document.getElementById('restart').style.top = "55%";
            document.getElementById('restart').style.display = "inline";

            document.getElementById('score').style.display = 'none';

            document.addEventListener('keydown', function(event) {
                if(event.keyCode == 82) {
                    document.location.reload(true);
                }
            });
        }
    }
}