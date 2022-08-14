class Animation {
    constructor(frames, pos) {
        this.frames = frames; // Images
        this.pos = new Vec2(pos.x, pos.y); // Position
        this.currentFrame = 0; // id of current frame
        this.alive = 1; // If 0 - animation must be deleted

        this.direction = 0;
        this.flip = 0;
    }

    step() {
        this.timer -= DT;
        if (this.timer <= 0) {
            this.currentFrame++;
            this.timer = this.frameTime;
            if (this.currentFrame >= this.frames.length)
            {
                if (this.repeating == 0) { // Repeating check
                    this.alive = 0;
                }
                else if (this.repeating == 1) {
                    this.currentFrame = 0;
                }
            }
        }
    }

    get_frame() {
        return this.frames[this.currentFrame];
    }

    draw() { // TODO - how to rotate pictures? 
        if (!this.alive) {
            return;
        }

        var img = this.get_frame();
        var x = this.pos.x;
        var y = this.pos.y;

        draw.ctx.save();

        // draw.ctx.translate(x, y);
        // draw.ctx.rotate(- this.rot * 90 * Math.PI / 180);

        // draw.image(
        //     img, 
        //     - CELL_SIZE / 2,
        //     - CELL_SIZE / 2, 
        //     CELL_SIZE, CELL_SIZE);

        draw.image(
            img, 
            x,
            y, 
            CELL_SIZE, CELL_SIZE);

        draw.ctx.restore();
    }
};

function get_img(src) { // Load images
    let img = new Image(); 
    img.src = src;
    return img;
}

class AnimationHolder {
    constructor(path, extension, frame_cnt) {
        this.frames = []
        for (let i = 0; i < frame_cnt; i++) {
            this.frames.push(get_img(path + "/" + i.toString() + "." + extension))
        }

        this.cycle_time = cycle_time
        this.repeating = repeating
    }

    spawn(pos) {
        var anm = new Animation(this.frames, pos, 1 / this.cycle_time, 0 , this.repeating); // 0 is for interface bind, we dont use it

        game.stepebal.push(anm);
        game.animations.push(anm);
    }

    spawn_with_rot_and_dirs(pos, rot, dir_cur, dir_next) {
        var anm = new Animation(this.frames, pos, 1 / this.cycle_time, 0 , this.repeating); // 0 is for interface bind, we dont use it

        anm.rot = rot

        game.stepebal.push(anm);
        game.animations.push(anm);
    }
};