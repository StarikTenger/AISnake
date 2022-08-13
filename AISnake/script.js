var game = new Game();
var draw = new Draw(CTX);

var myAudio = new Audio('music/main_theme.mp3'); 
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myAudio.play();

function step() {
    //myAudio.volume = VOLUME;
    //myAudio.play();
    game.step();
    draw.draw(game);

    if (KEY_MINUS) {
        VOLUME = Math.max(0, VOLUME - 0.1);
    }
    if (KEY_PLUS) {
        VOLUME = Math.min(1, VOLUME + 0.1);
    }

    // Previous keys
    if (game.RELOAD == 1) {
        game = new Game();
    }
}

var interval = setInterval(step, DT * 1000);