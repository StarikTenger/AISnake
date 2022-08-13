'use strict'

//// CONSTANTS ////
// Directions
let NONE = 0
let RIGHT = 3;
let DOWN = 2;
let LEFT = 4;
let UP = 1;

//// GAME PREFERENCES ////
let DT = 0.050; // Tick time in seconds
let CELL_SIZE = 8;
let TEXTURE_SIZE = 8;
let APPLES_APPEARANCE_PROBABILITY = 0.02;

let CELL = { void: 'void', apple: 'apple', wall: 'wall' };

let EPS = 0.0001;

// Map parameters
let SIZE_X = 20;
let SIZE_Y = 20;

// Music
let VOLUME = 1;


//// DRAW PREFERENCES ////
// не ебу, зачем оно, но пусть будет
let SCALE = 1; // 1 Cell in px
while (64 * SCALE <= Math.min(window.innerHeight, window.innerWidth)) {
    SCALE += 1;
}
SCALE -= 1;


// Canvas
let SCREEN = document.getElementById("screen");
SCREEN.width = SCREEN.height = 64 * SCALE;
let CTX = SCREEN.getContext("2d");

// Images
function getImg(src) { // Load images
    let img = new Image(); 
    img.src = src;
    return img;
}

// Loading current imgs 
// *saved just for examples*
/*
// Endgame screens
let IMG_DEAD = getImg("textures/interface/deathscreen.png");
let IMG_DELIRIOUS = getImg("textures/interface/deliriumscreen.png");
let IMG_WIN = getImg("textures/interface/winscreen.png");
let IMG_START_SCREEN = getImg("textures/interface/startscreen.png");


// Fnimations
let ANM_BLOOD = [
    getImg("textures/particles/blood/blood0.png"),
    getImg("textures/particles/blood/blood1.png"),
    getImg("textures/particles/blood/blood2.png")
];
*/

//// KEY CONFIG ////
// Keys (0 - released, 1 - pressed)
let KEY_W = 0; let KEY_W_PREV = 0; 
let KEY_A = 0; let KEY_A_PREV = 0; 
let KEY_S = 0; let KEY_S_PREV = 0; 
let KEY_D = 0; let KEY_D_PREV = 0;
let KEY_X = 0; let KEY_X_PREV = 0;
let KEY_F = 0; let KEY_F_PREV = 0; 
let KEY_1 = 0; let KEY_1_PREV = 0;
let KEY_2 = 0; let KEY_2_PREV = 0;
let KEY_UP = 0; let KEY_UP_PREV = 0; 
let KEY_DOWN = 0; let KEY_DOWN_PREV = 0; 
let KEY_LEFT = 0; let KEY_LEFT_PREV = 0; 
let KEY_RIGHT = 0; let KEY_RIGHT_PREV = 0; 
let KEY_ENTER = 0; let KEY_ENTER_PREV = 0;
let KEY_PLUS = 0; let KEY_PLUS_PREV = 0;
let KEY_MINUS = 0; let KEY_MINUS_PREV = 0;

function checkKey(e, t) {
    if(e.keyCode == 87)
        KEY_W = t;	
    if(e.keyCode == 65)
        KEY_A = t;  
    if(e.keyCode == 83)
        KEY_S = t;
    if(e.keyCode == 68)
        KEY_D = t;
    if(e.keyCode == 88)
        KEY_X = t;
    if(e.keyCode == 70)
        KEY_F = t;
    if(e.keyCode == 49)
        KEY_1 = t;
    if(e.keyCode == 50)
        KEY_2 = t;
    if(e.keyCode == 37)
        KEY_LEFT = t;
    if(e.keyCode == 38)
        KEY_UP = t;
    if(e.keyCode == 39)
        KEY_RIGHT = t;
    if(e.keyCode == 40)
        KEY_DOWN = t;
    if (e.keyCode == 13)
        KEY_ENTER = t;
    if (e.keyCode == 189)
        KEY_MINUS = t;
    if (e.keyCode == 187)
        KEY_PLUS = t;
    
}

window.addEventListener('keydown',this.checkDown,false);
function checkDown(e) {
   
    // Checking for buttons pressed
    checkKey(e, 1);
    if (e.keyCode >= 37 && e.keyCode <= 40) {
        e.preventDefault();
    }
}

window.addEventListener('keyup',this.checkUp,false);
function checkUp(e) {
   
    // Checking for buttons pressed
    checkKey(e, 0);
}