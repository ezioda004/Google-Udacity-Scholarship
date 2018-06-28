// Enemies our player must avoid


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
        this.speed = Math.floor((Math.random() * (250 - 100)) + 100);
        // console.log(this.x, this.y)
    }
    update(dt) {
        if (this.x >= 500) {
            this.x = 1;
        } else {
            this.x += (dt * this.speed);
        }
        this.collision();
        
        // console.log(this.x, this.y);
    }
    collision(){
        
        // if (player.x > this.x && this.y > player.y){
        //     console.log(player.x > this.x && this.y > player.y)
        // }
        // if (((this.x + 10) <= player.x) &&  ((this.x - 10) >= player.x)){
        //     console.log("hit")
        // }
        // if ((player.x + 5 >= this.x && player.x - 5 <= this.x) &&(player.y + 5 >= this.y && player.y - 5 <= this.y)){
        //     // console.log("here");
        //     return "ok";
        // }
        if ((((this.x + 70) >= player.x) && ((this.x - 70) <= player.x)) && ((this.y + 30) >= player.y) && ((this.y - 50) <= player.y)){
            console.log("collided")
            player.x = 200;
            player.y = 450;
        }
    }
    render() {
        // console.log(this.x, this.y);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}



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
        if (key == "up") {
            this.y -= 50;
        } else if (key == "down") {
            if (this.y >= 450) {
                this.y = 450;
            } else {
                this.y += 50;
            }

        } else if (key == "right") {
            this.x += 50;
        }
        if (key == "left") {
            this.x -= 50;
        }
        if (this.x >= 420 || this.x <= -25) {
            Math.sign(this.x) == 1 ? this.x -= 450 : this.x += 450;


        }
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let allEnemies, player;
let e1 = new Enemy(0, 0);
let e2 = new Enemy(0, 200);
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