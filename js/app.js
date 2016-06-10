// TODO: Add a collision mechanism
// TODO: Add a score count and other features


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png'; // Setup enemy image
    this.x = 0; // Start the x value of the enemy at 0
    enemyRows = [60, 140, 230]; // Create an array of rows that the Enemy can start on
    enemySpeeds = [200, 300, 400, 500, 600] // Create an array of speeds that can be randomly chosen
    this.y = enemyRows[Math.floor(Math.random()*3)]; // Setup a random lane
    this.speed = enemySpeeds[Math.floor(Math.random()*5)]; // Setup a random speed
    this.addNewEnemy = true; // Setup a boolean variable corresponding to if an enemy has been added or not
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed; // Update x value accoding to speed and dt
    if (Math.floor(this.x) >= 200 && this.addNewEnemy) {
        // Add a new enemy instance after an enmy crosses
        // 200 pixels
        allEnemies.push(new Enemy());
        this.addNewEnemy = false;
    }
    if (this.x > 1500) {
        // Remove an enemy after it has exited the screen
        // completely
        allEnemies.shift();
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
    this.sprite = 'images/char-boy.png'; // Setup image of Player
    this.x = 200; // Setup initial x position of Player
    this.y = 400; // Setup initial y position of Player
};

Player.prototype.update = function() {};

Player.prototype.handleInput = function(key) {
    if (key == 'up') {
        // Setup up key to move player up
        this.y -= 90;
        if (this.y <= 0) {
            // Reset player if up key would move player into water
            this.x = 200;
            this.y = 400
        }
    }
    else if (key == 'down' && this.y <= 310) {
        // Setup down key to move player down if inside screen
        this.y += 90;
    }
    else if (key == 'left' && this.x >= 85) {
        // Setup left key to move player left if inside screen
        this.x -= 100;
    }
    else if (key == 'right' && this.x <= 315) {
        // Setup right key to move player right if inside screen
        this.x += 100;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [new Enemy()]; // Setup an array of Enemies
player = new Player(); // Setup Player



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
