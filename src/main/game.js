// Game Variables
let score = 0;

// Canvas Setup
function setup() {
    createCanvas(800, 700);
}

function draw() {
    background('burlywood');
    ellipse(100, 100, 100, 100);
    text(`Score: ${score}`, width - 100, 50);
    fill(255);
}