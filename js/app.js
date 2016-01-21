// Enemy Class constructor
var Enemy = function(x, y, speed) {

    // Add X and Y parameters as placeholders
    this.x = x;
    this.y = y;

    // Added height and width in order to detect collisions
    this.width = 80;
    this.height = 50;

    // Speed parameter
    this.speed = speed;

    // Enemy image
    this.sprite = 'images/enemy-bug.png';
};

// Update's enemy position
Enemy.prototype.update = function(dt) {

    // X coordinates used to reset enemies position after they move off of canvas
    if (this.x < 500) {
        this.x += (dt) * this.speed;
    } else {
        this.x = -200;
    }
};

// Draw's enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player Class constructor
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 75;
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


// Instantiates enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(-200, 83, 170),
    new Enemy(-200, 166, 265),
    new Enemy(-200, 249, 225)
];

// Instantiates player object 
var player = new Player(202, 415);

// Reset's player postion after collison with enemies 
Player.prototype.reset = function(x, y) {
    this.x = x;
    this.y = y;
};

// Checks collisions using Axis-Aligned 2D Collision Detection
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

// Listens for key presses and sends the keys to
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});