class Animation {
    constructor(frames, pos, t, interface_bind, repeating) {
        this.frames = frames; // Images
        this.pos = new Vec2(pos.x, pos.y); // Position
        this.frameTime = t; // Frame change period
        this.timer = this.frameTime; // Countdown to change frame
        this.currentFrame = 0; // id of current frame
        this.alive = 1; // If 0 - animation must be deleted

        if (interface_bind) {
            this.interface_bind = 1; // drawn at very top of all layers
        } else {
            this.interface_bind = 0;
        }
        if (repeating) { // 0 - dying after repeating, 1 - repeating, 2 - last frame alive
            this.repeating = repeating;
        } else {
            this.repeating = 0;
        }
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
};

function get_img(src) { // Load images
    let img = new Image(); 
    img.src = src;
    return img;
}

class AnimationHolder {
    constructor(frames_names, cycle_time, repeating) {
        this.frames = []
        for (let i = 0; i < frames_names.length; i++) {
            this.frames.push(get_img(frames_names))
        }

        this.cycle_time = cycle_time
        this.repeating = repeating
    }

    spawn(pos) {
        return new Animation(this.frames, pos, 1 / this.cycle_time, 0 , this.repeating); // 0 is for interface bind, we dont use it
    }
};