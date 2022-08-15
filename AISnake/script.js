var game = new Game();
var draw = new Draw(CTX);
var step_count = 0;

var myAudio = new Audio('music/main_theme.mp3');
myAudio.loop = true;

var gameover = new Audio('sounds/gameover.mp3');
var build = new Audio('sounds/build.mp3');
var death = new Audio('sounds/death.mp3');
var eat = new Audio('sounds/eat.mp3');
var split = new Audio('sounds/split.mp3');

function play_sound(sound) {
    sound.currentTime = 0;
    sound.volume = VOLUME * 2;
    sound.play();
}

function step() {
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 82) {
            document.getElementById('score').style.display = 'inline';
            RELOAD = false;
        }
    });
    if (RELOAD) {
        draw.loading_screen();
        return;
    }
    if (game.all_dead) {
        return;
    }
    step_count++;
    if (step_count == TICK_STEPS_NUM) {
        step_count = 0;
        game.tick();
        if (game.all_dead) {
            myAudio.pause();
            play_sound(gameover)
            return;
        }
    }   
    myAudio.volume = VOLUME;
    myAudio.play();
    draw.draw(game);
    game.step();

    if (KEY_MINUS) {
        VOLUME = Math.max(0, VOLUME - 0.1);
    }
    if (KEY_PLUS) {
        VOLUME = Math.min(1, VOLUME + 0.1);
    }
}

var interval = setInterval(step, DT * 1000);
