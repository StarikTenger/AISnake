class Animation {
    constructor(frames, pos, box, t, interface_bind, repeating) {
        this.frames = frames; // Images
        this.pos = new Vec2(pos.x, pos.y); // Position
        this.box = box; // Size
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
};

Animation.prototype.step = function() {
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

Animation.prototype.getFrame = function() {
    return this.frames[this.currentFrame];
}