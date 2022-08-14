
// This class is responsible for drawing
class Draw {
    constructor(ctx) {
       this.ctx = ctx;
    }

    image(texture, x, y, w, h, degrees = 0) {
        x = Math.round(x);
        y = Math.round(y);
        w = Math.round(w);
        h = Math.round(h);

        this.ctx.save();
        this.ctx.translate(x * SCALE, y * SCALE);
        this.ctx.translate(w*SCALE/2, h*SCALE/2);
        this.ctx.rotate(degrees*Math.PI/180);
        this.ctx.translate(-w*SCALE/2, -h*SCALE/2);

        this.ctx.imageSmoothingEnabled = 0;
        this.ctx.drawImage(texture, 0, 0, w*SCALE, h*SCALE);

        this.ctx.restore();
    }


    rect(x, y, w, h, color) {
        x = Math.round(x);
        y = Math.round(y);
        w = Math.round(w);
        h = Math.round(h);
    
        this.ctx.imageSmoothingEnabled = 0;
        this.ctx.fillStyle = color;
        this.ctx.fillRect((x) * SCALE, (y) * SCALE, w * SCALE, h * SCALE);
    }

    text(text, x, y) {
        this.ctx.fillStyle = "white";
        this.ctx.font = "48px serif";
        this.ctx.fillText(text, x, y);
    }

    draw(game) {  
        // Filling background
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, 0, 10000, 10000);
        for (let x = 0; x < SIZE_X; x++) {
            for (let y = 0; y < SIZE_Y; y++) {
                draw.image(IMGS[0], x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }

        for (let i = 0; i < game.tickable.length; i++) {
            game.tickable[i].draw();
        }

        for (let i = 0; i < game.animations.length; i++) {
            game.animations[i].draw();
        }
    };
}