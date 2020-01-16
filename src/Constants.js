export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const JUMP_RAMP = 'jumpRamp';
export const RHINO = 'rhino';

export const SKIER_STARTING_SPEED = 5;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;

export const STATE_SKIING  = 'skiing';
export const STATE_JUMPING = 'jumping';
export const STATE_CRASHED = 'crashed';
export const STATE_EATING  = 'eating';
export const ASSETS = {
    skier: {
        [STATE_SKIING]: {
            [SKIER_CRASH]:     'img/skier_crash.png',
            [SKIER_LEFT]:      'img/skier_left.png',
            [SKIER_LEFTDOWN]:  'img/skier_left_down.png',
            [SKIER_DOWN]:      'img/skier_down.png',
            [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
            [SKIER_RIGHT]:     'img/skier_right.png',
        },
        [STATE_JUMPING]: {
            [SKIER_LEFT]:      'img/skier_jump_1.png',
            [SKIER_LEFTDOWN]:  'img/skier_jump_2.png',
            [SKIER_DOWN]:      'img/skier_jump_3.png',
            [SKIER_RIGHTDOWN]: 'img/skier_jump_4.png',
            [SKIER_RIGHT]:     'img/skier_jump_5.png',
        },
        [STATE_CRASHED]: 'img/skier_crash.png',
        [STATE_EATING]: 'img/fire.png',
    },
    rhino: {
        [STATE_SKIING]: 'img/rhino_default.png',
        [STATE_EATING]: 'img/rhino_lift_eat_4.png'
    },
    obstacle: {
        [STATE_SKIING]: {
            [TREE] :           'img/tree_1.png',
            [TREE_CLUSTER] :   'img/tree_cluster.png',
            [ROCK1] :          'img/rock_1.png',
            [ROCK2] :          'img/rock_2.png',
            [JUMP_RAMP] :      'img/jump_ramp.png',
        },
        [STATE_JUMPING]: {
            [ROCK1] :          'img/fire.png',
            [ROCK2] :          'img/fire.png',
            [JUMP_RAMP] :      'img/fire.png',
        },
    },
};

export const SKIER_DIRECTIONS = {
    CRASH : 0,
    LEFT : 1,
    LEFT_DOWN : 2,
    DOWN : 3,
    RIGHT_DOWN : 4,
    RIGHT : 5
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH] : SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT
};

export const KEYS = {
    LEFT : 37,
    RIGHT : 39,
    UP : 38,
    DOWN : 40,
    SPACE: 32,
    ESC: 27
};

export const OBSTACLES = {
    DISTANCE_BETWEEN: 50
}
export const SKIER_JUMPING_DISTANCE = 10 * OBSTACLES.DISTANCE_BETWEEN;

