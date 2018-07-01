//Score node selector
const score = document.querySelector(".score");

//Enemy Class
class Enemy {
    constructor(x, y) {
        this.sprite = "images/enemy-bug.png";
        this.x = x;
        this.y = y;
        //Random speed when instansciated
        this.speed = Math.floor(Math.random() * (250 - 100) + 100);
    }
    //Update method that updates the movement
    update(dt) {
        if (this.x >= 500) {
            this.x = 1;
        } else {
            this.x += dt * this.speed;
        }
        this.collision();
    }
    //Checking if collison happened
    collision() {
        if (this.x + 70 >= player.x && this.x - 70 <= player.x && this.y + 30 >= player.y && this.y - 50 <= player.y) {
            player.x = 200;
            player.y = 450;
            const modal = document.querySelector(".modal");
            modal.children[0].children[1].textContent = "You Lost!";
            modal.classList.remove("hide");
            score.textContent = 0;
            allEnemies = [];
        }
    }
    //Render on canvas
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//Player class
class Player {
    constructor() {
        this.sprite = "images/char-boy.png"
        this.x = 200;
        this.y = 450;
    }
    update(dt) {
        //winning condition
        if (this.y == 0) {
            setTimeout(() => {
                this.x = 200;
                this.y = 450;
                score.textContent = +score.textContent + 5;
                game = new Game();
                allEnemies = [new Enemy(0, 50), new Enemy(0, 140), new Enemy(0, 225), new Enemy(0, 50), new Enemy(0, 140), new Enemy(0, 225)];
            }, 50);
        }
    }
    render() {
        this.sprite = this.sprite.replace(/^\.\//, "");
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //For controlling with keyboard
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

        //Offscreen prevent
        if (this.x >= 420 || this.x <= -25) {
            Math.sign(this.x) == 1 ? (this.x -= 450) : (this.x += 450);
        }
    }
}

//Game class
class Game {
    constructor() {
        this.gemBlue = this.coords();
        this.gemBlue.sprite = "images/Gem Blue.png";

        this.gemGreen = this.coords();
        this.gemGreen.sprite = "images/Gem Green.png"

        this.gemOrange = this.coords();
        this.gemOrange.sprite = "images/Gem Orange.png"

        this.rock = this.coords();
        this.rock.sprite = "images/Rock.png"
    }
    coords() {
        //Generating random coordinates for items
        let x = [15, 115, 215, 315, 415];
        let y = [90, 175, 260, 345];
        return [x[Math.floor(Math.random() * 5)], y[Math.floor(Math.random() * 4)]];
    }
    collision() {
        if (this.gemBlue[0] + 70 >= player.x && this.gemBlue[0] - 70 <= player.x && this.gemBlue[1] + 30 >= player.y && this.gemBlue[1] - 50 <= player.y) {
            this.gemBlue[0] = -100;
            this.gemBlue[1] = -1000;
            score.textContent = +score.textContent + 5;
        }
        if (this.gemGreen[0] + 70 >= player.x && this.gemGreen[0] - 70 <= player.x && this.gemGreen[1] + 30 >= player.y && this.gemGreen[1] - 50 <= player.y) {
            this.gemGreen[0] = -100;
            this.gemGreen[1] = -1000;
            score.textContent = +score.textContent + 10;
        }
        if (this.gemOrange[0] + 70 >= player.x && this.gemOrange[0] - 70 <= player.x && this.gemOrange[1] + 30 >= player.y && this.gemOrange[1] - 50 <= player.y) {
            this.gemOrange[0] = -100;
            this.gemOrange[1] = -1000;
            score.textContent = +score.textContent + 15;
        }
        if (this.rock[0] + 70 >= player.x && this.rock[0] - 70 <= player.x && this.rock[1] + 30 >= player.y && this.rock[1] - 50 <= player.y) {
            this.rock[0] = -100;
            this.rock[1] = -1000;
            score.textContent = +score.textContent - 30;
        }

    }
    render() {
        ctx.drawImage(Resources.get(this.gemBlue.sprite), this.gemBlue[0], this.gemBlue[1]);
        ctx.drawImage(Resources.get(this.gemGreen.sprite), this.gemGreen[0], this.gemGreen[1]);
        ctx.drawImage(Resources.get(this.gemOrange.sprite), this.gemOrange[0], this.gemOrange[1]);
        ctx.drawImage(Resources.get(this.rock.sprite), this.rock[0], this.rock[1]);
        this.collision();
    }
}

//Instancing from Enemey, Game and Player class
let allEnemies, player;
let e1 = new Enemy(0, 50);
let e2 = new Enemy(0, 225);
let e3 = new Enemy(0, 140);

let p1 = new Player();
let game = new Game();
allEnemies = [e1, e2, e3];
player = p1;



// This listens for key presses and sends the keys to your
document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

window.onload = function () {
    //Event to select avatar
    document.querySelector(".avatar").addEventListener("click", function (e) {
        e.stopPropagation();
        player.sprite = "./" + e.target.getAttribute("src").replace(/^\.\//, "");
    }, true);
    //Event to close the modal
    document.querySelector(".close").addEventListener("click", function () {
        document.querySelector(".modal").classList.add("hide");
        allEnemies = [new Enemy(0, 50), new Enemy(0, 140), new Enemy(0, 225), new Enemy(0, 50), new Enemy(0, 140), new Enemy(0, 225)];
    })
};