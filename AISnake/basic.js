//// 2D vector ////
class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// +
function plus(a, b) {
    return new Vec2(a.x + b.x, a.y + b.y);
}

// -
function minus(a, b) {
    return new Vec2(a.x - b.x, a.y - b.y);
}

// Multiply
function mult(a, b) {
    return new Vec2(a.x * b.x, a.y * b.y);
}

// Divide
function div(a, b) {
    return new Vec2(a.x / b.x, a.y / b.y);
}

// Distance
function dist(a, b) {
    var x = a.x - b.x;
    var y = a.y - b.y;
    return Math.abs(x) + Math.abs(y);
}

// clone
function clone() {
    return new Vec2(this.x, this.y);
}

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