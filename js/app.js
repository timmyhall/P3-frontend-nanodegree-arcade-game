// Enemies our player must avoid. This is a class constructor. 
var Enemy = function(x, y, speed) {

    // Variables applied to each of our instances go here,
    // X and Y parameters as placeholders
    this.x = x;
    this.y = y;

    // Added height and width in order to detect collisions
    this.width = 40;
    this.height = 40;

    // Speed parameter
    this.speed = speed;

    // Enemy image
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // 500 is off of the right edge of the canvas
    // -200 is starting point off of the left edge of canvas
    if (this.x < 500) {
        this.x += (dt) * this.speed;
    } else {
        this.x = -200;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Player starting point and player image.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.sprite = 'images/char-boy.png';
};

// Update player position once player has reached water. Since water is static, use player y coordinate. 
Player.prototype.update = function(dt) {
    if (this.y <= 0) {
        this.reset(202, 415);
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player movement is equal to width and height of the squares on canvas
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (direction === 'right' && this.x < 400) {
        this.x += 101;
    }
    if (direction === 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += 83;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Set enemies initially offscreen. 
// Y values correspond to 3 stone tiles on canvas
// Random speed selected for each enemy 
// var Enemy = function (x, y, speed) { ...

var allEnemies = [
    new Enemy(-200, 83, 170),
    new Enemy(-200, 166, 265),
    new Enemy(-200, 249, 225)
];

// Place the player object in a variable called player
// var Player = function (x,y) {...
var player = new Player(202, 415);

// Reset player postions after collison with enemies 
Player.prototype.reset = function(x, y) {
    this.x = x;
    this.y = y;
};

// Check collisions using Axis-Aligned 2D Collision Detection
function checkCollisions(allEnemies, player) {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < player.x + player.width &&
            allEnemies[i].x + allEnemies[i].width > player.x &&
            allEnemies[i].y < player.y + player.height &&
            allEnemies[i].height + allEnemies[i].y > player.y) {
            player.reset(202, 415);
        }
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});