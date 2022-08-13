 
// Main class that controls everything

class Game {
    constructor() {
        this.grid = new Grid()
    }

    step() {
        this.grid.step()
    }

    // Checks is the cell is in bounds
    checkCell(pos) {
        if(pos.x < 0 || pos.y < 0 || pos.x >= SIZE_X || pos.y >= SIZE_Y)
            return 1;
        return 0;
    }
    // Checks is the cell is in bounds
    checkMargin(pos) {
        if(pos.x < 0 || pos.y < 0 || pos.x >= SIZE_X || pos.y >= SIZE_Y)
            return 1;
        return 0;
    }
}