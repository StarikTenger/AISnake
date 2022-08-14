var tex_ = "resources/textures";
var snk_ = tex_ + "snake";

var FRAME_CNT_SNAKE = 16;

var EXT_PNG = "png";


let AH_snake_head_enter = new AnimationHolder(
    tex_ + "/snake/head/enter",
    EXT_PNG,
    FRAME_CNT_SNAKE,
    ANM_CYCLE_TIME,
    false
)

let AH_snake_head_leave = new AnimationHolder(
    tex_ + "/snake/head/leave",
    EXT_PNG,
    FRAME_CNT_SNAKE,
    ANM_CYCLE_TIME,
    false
)

let AH_snake_head_leave_rot = new AnimationHolder(
    tex_ + "/snake/head/leave_rot",
    EXT_PNG,
    FRAME_CNT_SNAKE,
    ANM_CYCLE_TIME,
    false
)