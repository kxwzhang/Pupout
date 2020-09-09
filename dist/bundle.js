/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/game.js":
/*!**************************!*\
  !*** ./src/main/game.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { LEVELS } = __webpack_require__(/*! ./levels */ "./src/main/levels.js");

// import { LEVELS } from './levels';
// LEVELS

// Canvas Setup
function setup() {
    createCanvas(800, 700);
}

function draw() {
    background('burlywood');
    ellipse(100, 100, 100, 100);
    // text(`Score: ${score}`, width - 100, 50);
    fill(255);
}

// Game Class
class Game {
    constructor() {
        // Play sound
        this.menu = true;
        this.paused = false;
        this.stopped = false;
        // this.paddle = new Paddle(); // add new Paddle class
        // this.balls = [new Ball()]; // an array of balls with new ball 
        this.treats = [];
        this.blocks = [];
        this.beams = [];
        this.level = 1;
        this.score = 0;
        this.lives = 3;
        this.numFrames = 0;
    }

    update() {
        if (!this.menu && !this.paused && !this.stopped) {
            // 1. should first update the paddle

            // 2. iterate through the balls and update them

            // 3. iterate through the treats and update them

            // 4. iterate through the beams and update them

            // Check if not on the menu, then check if all the blocks have been cleared
            // If all blocks cleared then initialize next level
            // Increment the numFrames
        }
    }

    show() {
        if (!this.stopped) {
            background('lightblue');
            // Draw the board
            // Display game info
            if (!this.menu) {
                // render paddle
                // render each of the other elements
            } else if (this.menu) {
                // show the menu otherwise
            }
        }
    }

    // Initializes the level
    initLevel(lvl) {
        // clear the blocks
        // generate new blocks
        let message = 'LEVEL ' + this.level + '\nGET READY'
        // display message using this.displayMessage()
        // Add sounds
    }

    // Clears the blocks
    clearBlocks() {
        this.blocks = [];
    }

    // Clears the treats
    clearTreats() {
        paddle.shrink(); // shrink the paddle
        paddle.stopBeam(); // stop the beam
        this.balls.forEach(ball => {
            if (ball.magnet) ball.demagnetize;
            ball.launch();
        });
    }

    // Check if all blocks have been cleared
    checkEmptyBlocks() {
        let isEmpty = true;
        this.blocks.forEach(block => {
            if (block.type !== 1) {
                isEmpty = false;
            }
        });
        return isEmpty;
    }

    // Updates the score
    updateScore(block) {
        let points = 0;
        switch (block.type) {
            case 2:
                points = 50 * this.level;
                break;
            case 3:
                points = 60;
                break;
            case 4:
                points = 70;
                break;
            case 5:
                points = 80;
                break;
            case 6:
                points = 90;
                break;
            case 7:
                points = 100;
                break;
            case 8:
                points = 110;
                break;
            case 9:
                points = 120;
                break;
            default:
                break;
        }
        this.score += points; // update score with points
    }

    // Invoking this will generate the next level
    nextLevel() {
        this.level += 1; // increment the level by 1
        this.paddle = new Paddle();
        this.balls = [new Ball()];
        this.blocks = [];
        this.beams = [];
        this.treats = [];
        this.numFrames = 0;
        // Check to make sure our level is below 10, otherwise reset to level 1
        if (this.level > 10) {
            this.level = 1;
        }
        let message = 'Level ' + this.level;
        this.initLevel(this.level)
    }
}

/***/ }),

/***/ "./src/main/levels.js":
/*!****************************!*\
  !*** ./src/main/levels.js ***!
  \****************************/
/*! exports provided: LEVELS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEVELS", function() { return LEVELS; });
const LEVELS = {
  level1: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  level2: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 7, 0, 0, 0, 0, 0, 0, 0, 7, 8],
    [8, 7, 4, 0, 0, 0, 0, 0, 4, 7, 8],
    [8, 7, 4, 5, 0, 0, 0, 5, 4, 7, 8],
    [8, 7, 4, 5, 3, 0, 3, 5, 4, 7, 8],
    [8, 7, 4, 5, 3, 8, 3, 5, 4, 7, 8],
    [8, 7, 4, 5, 3, 8, 7, 5, 4, 7, 8],
    [8, 7, 4, 5, 3, 8, 7, 4, 4, 7, 8],
    [8, 7, 4, 5, 3, 8, 7, 4, 5, 7, 8],
    [8, 7, 4, 5, 3, 8, 7, 4, 5, 3, 8],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
};

// export default LEVELS;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map