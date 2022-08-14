//// 2D vector ////
class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // clone
    clone() {
        return new Vec2(this.x, this.y);
    }
}

// +
function plus(a, b) {
    return (new Vec2(a.x + b.x, a.y + b.y));
}

// -
function minus(a, b) {
    return (new Vec2(a.x - b.x, a.y - b.y));
}

// Multiply
function mult(a, b) {
    return (new Vec2(a.x * b, a.y * b));
}

// Divide
function div(a, b) {
    return (new Vec2(a.x / b, a.y / b));
}

// Distance
function dist(a, b) {
    var x = a.x - b.x;
    var y = a.y - b.y;
    return Math.abs(x) + Math.abs(y);
}

let Vec2_ZERO = new Vec2(0, 0);

//// RANDOM ////

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function random_float(min, max) {
    return (Math.random() * (max - min) + min);
}

function normalDistribution(min, max, iterations) {
    var sum = 0;
    for (var i = 0; i < iterations; i++)
        sum += random(min, max);
    return Math.round(sum / iterations);
}

function normalRoll(min, max, iterations) { // gives value from min to max with normal distribution
    let roll = normalDistribution(-max + min, +max - min, iterations);
    return Math.abs(roll) + min;
}

//// DIRECTIONS ////
let UP = 0;
let RIGHT = 1;
let DOWN = 2;
let LEFT = 3;

let DIRECTION_VECTORS = [];
DIRECTION_VECTORS[UP]    = new Vec2( 0, -1),
DIRECTION_VECTORS[RIGHT] = new Vec2( 1,  0),
DIRECTION_VECTORS[DOWN]  = new Vec2( 0,  1),
DIRECTION_VECTORS[LEFT]  = new Vec2(-1,  0)

function shift_clockwise(dir) {
    return (dir + 1) % 4;
}

function shift_counterclockwise(dir) {
    return (dir + 4 - 1) % 4;
}