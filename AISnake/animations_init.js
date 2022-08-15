var tex_ = "resources/textures";
var snk_ = tex_ + "snake";

var FRAME_CNT_SNAKE = 16;
var FRAME_CNT_STATIC = 1;

var EXT_PNG = "png";


let AH_snake_head_enter = new AnimationHolder(
    tex_ + "/snake/head/enter",
    EXT_PNG,
    FRAME_CNT_SNAKE
)

let AH_snake_head_leave = new AnimationHolder(
    tex_ + "/snake/head/leave",
    EXT_PNG,
    FRAME_CNT_SNAKE
)

let AH_snake_tail_enter = new AnimationHolder(
    tex_ + "/snake/butt_anim",
    EXT_PNG,
    FRAME_CNT_SNAKE
)

let AH_snake_tail_leave = new AnimationHolder(
    tex_ + "/snake/butt_anim",
    EXT_PNG,
    FRAME_CNT_SNAKE
)

let AH_snake_head_leave_rot = new AnimationHolder(
    tex_ + "/snake/head/leave_rot",
    EXT_PNG,
    FRAME_CNT_SNAKE
)

let AH_snake_body_stand = new AnimationHolder(
    tex_ + "/snake/body/stand",
    EXT_PNG,
    FRAME_CNT_STATIC
)

let AH_snake_body_stand_rot = new AnimationHolder(
    tex_ + "/snake/body/stand_rot",
    EXT_PNG,
    FRAME_CNT_STATIC
)
