// Game constants
const CONTROLS = { W: 87, A: 65, D: 68, Q: 81, L: 76, SPACE: 32, P: 80 };
const GAME_WIDTH = 653;
const GAME_HEIGHT = 534; // 534 ---> CURRENT 554
const ROWS = 30;
const COLS = 15;
const WALL = {
  top: 14,
  right: 5,
  left: 5,
};
const BOARD = {
  width: 455,
  height: 520,
};
const SPACING = {
  top: 14,
  right: 158,
  left: 42,
};
const PADDLE = {
  width: 60,
  height: 40,
};
const BLOCK = {
  width: 29,
  height: 14,
};
const BALL_RADIUS = 8;

// Game status
let options;
let paused;
let stopped;

// Game values
let paddle;
let balls;
let blocks;
let treats;
let beams;
let score;
let lives;
let level;
let numFrames;
let firestore;
// let name;