# Pupout

[Live Demo](https://kxwzhang.github.io/Pupout/)

Pupout is a breakout-type game that is built with p5.js and pure JavaScript.
The objective of the game is to break as many blocks as possible and occasionally 
be awarded with special treats to powerup your pupper. 
![Image of Pupout UI](https://github.com/kxwzhang/Pupout/blob/master/screenshots/pupout-ui.png)

## Gameplay and Instructions
Play as a pupper to catch and bounce the ball back at blocks. 
The main gameplay is to break as many blocks as possible with only 3 balls available per level. 
There are 5 levels to choose from and each gets progressively harder. 
Sometimes blocks will generate a treat which will award you with an ability if it is successfully caught. Additionally, some blocks take multiple hits to break and gold color blocks are unbreakable. 

## Technologies
* JavaScript
* p5.js
* CSS
* Firebase
* GitHub Pages

## Features and Implementation

### Ball Object
Implementing the Ball class object was tough because there were many design decisions involved. 
Initially, my attempts at handling multiple treats for players to interactive with was not very efficient.
Also different objects were all handling the same event for ball collision. 
So my solution was to let the Ball class handle all the collisions it deals with including walls,
blocks, and the paddle. This lead to much cleaner code and made implementing the collisions much more streamlined.
Below is a code snippet of how I implemented collision detection: 
```javascript
// Check paddle collision
if (this.dy > 0) {
  let action = ballInterceptPaddle(this);
  if (action) {
    this.hitPaddle(action);
    if (this.magnet) {
      // Play sound
      this.moving = false;
      this.offset = this.x - paddle.x;
    } else {
      // Play sound
    }
  }
}

// Check Block collision
for (let i = 0; i < blocks.length; i++) {
  let action = ballInterceptBlock(this, blocks[i]);
  if (action) {
    this.hitBlock(action);
    blocks[i].hp -= 1;
    if (blocks[i].hp === 0) {
      game.updateScore(blocks[i]);
      // add treats in here
      // higher probability on level 1 to 3
      let probability = random();
      if (level < 4) {
        if (probability > 0.5 && blocks[i].type !== 2) {
          // add new treat in
          treats.push(new Treats(blocks[i].x, blocks[i].y));
        }
      } else {
        if (probability > 0.8 && blocks[i].type !== 2) {
          treats.push(new Treats(blocks[i].x, blocks[i].y));
        }
      }
      blocks.splice(i, 1);
      // play normal sound
    } else {
      // play alt sound
    }
  }
}
```
![Image of Pupout UI](https://github.com/kxwzhang/Pupout/blob/master/screenshots/treats.png)

### Sidebar
The sidebar is something that initially only housed basic information for how the game can be played.
However, as I was thinking about how I wanted to store highscores, I chose to use Google Firebase Firestore
to handle the storage of a players highscores. This also meant that I need to render the highscores somewhere
on the page. Therefore, I went with implementing a tab feature so that players can swap between the
game play info and the highscores tab, while also saving screen space.
Below is a code snippet of how I fetch the scores from Firebase as well as how I initialized the highscores:
```javascript
// sidebar.js
function getScores() {
  let scoreDetails = document.getElementById("score-details");
  scoreDetails.innerHTML = "";
  let scoreArr = [];
  firestore.collection('highscores').get().then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      scoreArr.push(parseFloat(doc.get('score')));
    });
    scoreArr.sort().reverse();
    scoreArr.forEach((scr, idx) => {
      let div = document.createElement('div');
      div.setAttribute('class', 'score-number');
      let numLabel = document.createElement('label');
      numLabel.innerHTML = (idx + 1);
      div.appendChild(numLabel);
      let scoreLabel = document.createElement('label');
      scoreLabel.innerHTML = scr;
      div.appendChild(scoreLabel);
      scoreDetails.appendChild(div);
    })    
  });
}
// canvas.js
function setup() {
  createCanvas(GAME_WIDTH, GAME_HEIGHT);
  game = new Game();
  getScores();
}
```

## Future Features
* Players can record their name along with highscores
* More levels and custom levels
* Gameplay sounds
* More treats and more object interaction

## Attribution
This project was built for educational purposes only. All assets listed below are the property of:
* [Music: Dolphins by Septahelix](http://dig.ccmixter.org/files/septahelix/59235)
* [Dog sprites by pzUH](https://opengameart.org/content/cat-dog-free-sprites)
* [Powerup treat sprites by Broccoli](https://broccolibusiness.itch.io/basic-items)
* [Beam sprite by Rawdanitsu](https://opengameart.org/content/lasers-and-beams)