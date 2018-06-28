// Enemies our player must avoid
// var Enemy = function(x, y) {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started

//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
//     this.x = x;
//     this.y = y;
// };

// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
//     this.x = this.x * dt;
//         this.y = this.y * dt;
// };

// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };


// The Enemy function, which initiates the Enemy by:
// Loading the image by setting this.sprite to the appropriate image in the image folder (already provided)
// Setting the Enemy initial location (you need to implement)
// Setting the Enemy speed (you need to implement)
// The update method for the Enemy
// Updates the Enemy location (you need to implement)
// Handles collision with the Player (you need to implement)
// You can add your own Enemy methods as needed

class Enemy {
    constructor(x, y) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = 2;
        // console.log(this.x, this.y)
    }
    update(dt) {
        // console.log(dt);
        // console.log(this.x, this.y);
        this.x += this.x * dt;
        // console.log(this.x, this.y);
    }
    render() {
        // console.log(this.x, this.y);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// The Player function, which initiates the Player by:
// Loading the image by setting this.sprite to the appropriate image in the image folder (use the code from the Enemy function as an example on how to do that)
// Setting the Player initial location
// The update method for the Player (can be similar to the one for the Enemy)
// The render method for the Player (use the code from the render method for the Enemy)
// The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input. In particular:
// Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down.
// Recall that the player cannot move off screen (so you will need to check for that and handle appropriately).
// If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that).
// You can add your own Player methods as needed.


class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 450;
    }
    update(dt) {
        // this.x = this.x * dt;
        // this.y = this.y * dt;
    }
    render() {
        // console.log(this.x, this.y)
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(key) {

    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let allEnemies, player;
let e1 = new Enemy(10, 10);
let e2 = new Enemy(15, 40);
let p1 = new Player();
allEnemies = [e1, e2];
console.log(allEnemies);
player = p1;



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});