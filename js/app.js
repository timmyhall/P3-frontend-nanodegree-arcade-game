//Create random speeds for enemy using Math.random() function
// Speed is in pixels per second

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getRandomEnemySpeed() {
    return getRandomIntInclusive(100, 250);
};
    

// Enemies our player must avoid. This is a class constructor. d
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // X and Y parameters as placeholders
    this.x = x;
    this.y = y;
    //Speed parameter using math.random for bugs to move at individual speeds
    this.speed = getRandomEnemySpeed(); 

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //500 is off of the right edge of the canvas
    //-200 is starting point off of the left side of canvas
    if(this.x < 500) {
        this.x += (dt) * this.speed; //use "+=" 
    }
    else {
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
var Player = function(x, y) {
    this.x = 200
    this.y = 340

    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    this.x * (dt);
    this.y * (dt);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if(direction === 'left' && this.x > 0){
        this.x -= 100;
    }
    if(direction === 'right' && this.x < 400){
        this.x += 100;
    }
    if(direction === 'up' && this.y > 0){
        this.y -= 100;
    }
    if(direction === 'down' && this.y < 400){
        this.y += 100;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//Set enemies initially offscreen. Y values correspond to 3 stone tiles on canvas

var allEnemies = [
    new Enemy(-200, 40),
    new Enemy(-200, 140),
    new Enemy(-200, 240)
];

// Place the player object in a variable called player
var player = new Player(); //player is an instance of the Player Class

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
