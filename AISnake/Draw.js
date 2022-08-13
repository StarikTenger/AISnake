
// This class is responsible for drawing
class Draw {
    constructor(ctx) {
       this.ctx = ctx;

       this.cam = new Vec2(0, 0); // Camera position
       this.center = new Vec2(32, 27); // Screen center (здфнукы ы)
    }
}

Draw.prototype.image = function(texture, x, y, w, h, flip) {
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
    this.ctx.drawImage(texture, width*(x + w * flip - this.cam.x + this.center.x) * SCALE, (y - this.cam.y + this.center.y) * SCALE, w * SCALE, h * SCALE);
    this.ctx.restore();
};

Draw.prototype.rect = function(x, y, w, h, color) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);

    this.ctx.imageSmoothingEnabled = 0;
    this.ctx.fillStyle = color;
    this.ctx.fillRect((x - this.cam.x + this.center.x) * SCALE, (y - this.cam.y + this.center.y) * SCALE, w * SCALE, h * SCALE);
};

Draw.prototype.draw = function(game) {

    // Focusing camera
    this.cam = game.player.pos;
    this.center = new Vec2(32, 27);

    // Filling background
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 10000, 10000);

    // Grid
    for (let x = 0; x < SIZE_X; x++) {
        for (let y = 0; y < SIZE_Y; y++) {
            
        }
    }    
};