
// This class is responsible for drawing
class Draw {
    constructor(ctx) {
       this.ctx = ctx;
    }

    image(texture, x, y, w, h, flip) {
        x = Math.round(x);
        y = Math.round(y);
        w = Math.round(w);
        h = Math.round(h);
    
        if(!flip)
            flip = 0;
            
        this.ctx.save();
        let width = 1;
        if (flip) {
            this.ctx.scale(-1, 1);
            width = -1;
        }
        this.ctx.imageSmoothingEnabled = 0;
        this.ctx.drawImage(texture, width*(x + w * flip) * SCALE, (y) * SCALE, w * SCALE, h * SCALE);

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

        for (let i = 0; i < game.tickable.length; i++) {
            game.tickable[i].draw();
        }

        for (let i = 0; i < game.animations.length; i++) {
            game.animations[i].draw();
        }
    };
}