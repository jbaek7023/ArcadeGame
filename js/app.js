var score = 5;
//player's position
var playerX = 200;
var playerY = 400;


//possible random y value for enemies
var enemyY = [50, 135, 220];

//Possible Star Coordinate
var starX = [0, 100, 200, 300, 400];
var starY = -10;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100 * Math.random() - 100;
    this.y = enemyY[Math.floor(Math.random() * 3)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * 300);
    //y value can be 50, 135, 220
    this.y = this.y;

    if (this.x > 600) {
        this.x = -100 * Math.random();
        this.y = enemyY[Math.floor(Math.random() * 3)];
    }
    //distance between player and enemy 
    var distanceX = Math.abs(this.x - playerX);
    var distanceY = Math.abs(this.y - playerY);
    //if the bug hits the player,
    if (distanceX < 50 && distanceY < 50) {
        //collision occur
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = playerX;
    this.y = playerY;
};

//update plyer's position
Player.prototype.update = function(dt) {
    this.x = playerX;
    this.y = playerY;
};

//render player's position
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handle player's input
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            if (playerY > 0) {
                playerY -= 82;
            }
            break;
        case 'down':
            if (playerY < 400) {
                playerY += 82;
            }
            break;
        case 'left':
            if (playerX > 0) {
                playerX -= 101;
            }
            break;
        case 'right':
            if (playerX < 400) {
                playerX += 101;
            }
            break;
    }
};

//reset player's position and score.
Player.prototype.reset = function() {
    playerX = 200;
    playerY = 400;
    score = 5;
    document.getElementById("score_board").innerHTML = score;
};

//star constructor
var Star = function() {
    this.sprite = 'images/Star.png';
    this.x = starX[Math.floor(Math.random() * 5)];
    this.y = starY;
};

//update star's position and check collision
Star.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;

    //collision between star and player
    var distanceX = Math.abs(this.x - playerX);
    var distanceY = Math.abs(this.y - playerY);
    //if the bug hits the player,
    if (distanceX < 50 && distanceY < 50) {
        //collision occur
        playerX = 200;
        playerY = 400;
        score--;
        //change the star position if collision occurs
        this.x = starX[Math.floor(Math.random() * 5)];
        if (score === 0) {
            window.alert("YOU WON");
            score = 5;
        }
        document.getElementById("score_board").innerHTML = score;

    }
};

//render star object
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
}

var player = new Player();
var star = new Star();

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