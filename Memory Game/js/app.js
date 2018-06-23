let currentCard = {};
const deck = document.querySelector(".deck");
const cards = document.querySelectorAll(".card");
let moves = document.querySelectorAll(".moves");

let stopDisplayTimer = false;

//To check if local storage has item highscore, if exists then fetch it else nothing
localStorage.getItem("highscore") ? document.querySelector("table").innerHTML = localStorage.getItem("highscore") : null;

//Game object which has info regarding the current game 
let Game = {
    correct: 0,
    set correctAnswers(val) {
        this.correct += 1;
    },
    get correctAnswers() {
        return this.correct;
    },
    hasGameStartedYet: false,
    totalTime: 0
}

//Shuffle function which shuffles the array passed to it, used to shuffle cards
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Storing scores as cookies
const localScoreStorage = () => {
    const highscore = document.querySelector("table").innerHTML;
    localStorage.setItem("highscore", highscore);
}

//Tracking moves made by user
const moveCounter = val => {
    //if val is not provided then increment the counter by 1 else make it 0
    moves.forEach(move => move.textContent = (val === undefined) ? +move.textContent + 1 : 0);
}

//Function to show card
const showCard = obj => {
    obj.classList.add("open", "show", "animated", "flipInY");
}

//Remove/reset animations based on the ids passed
const removeAnimations = (id1, id2) => {
    document.getElementById(id1).classList.remove("animated", "flipInY", "bounce", "shake");
    document.getElementById(id2).classList.remove("animated", "flipInY", "bounce", "shake");
}

//show hide modal based on the value passed
const showHideModal = val => {
    if (val === "show") {
        document.querySelector("div.container").classList.add("hide");
        document.querySelector("section.container").classList.remove("hide");
    } else {
        document.querySelector("div.container").classList.remove("hide");
        document.querySelector("section.container").classList.add("hide");
    }
}

//Function to remove number of stars based on the moves made  
const numberOfStars = () => {
    const stars = document.querySelector(".stars");
    const numberOfMoves = +moves[0].textContent;
    if (numberOfMoves < 13) {
        //do nothing!
    } else if (numberOfMoves >= 13 && numberOfMoves <= 20) {
        stars.children.length === 2 ? null : stars.removeChild(stars.children[0]);

    } else {
        stars.children.length === 1 ? null : stars.removeChild(stars.children[0]);
    }
}

//Display timer

const displayTimer = () => {
    let i = 0;
    let j = 0;
    const stop = setInterval(() => {
        if (!stopDisplayTimer) {
            document.querySelector("#sec").innerHTML = (i < 10 ? "0" + i : i < 60 ? i : (i = 0, j++));
            document.querySelector("#min").innerHTML = (j < 10 ? "0" + j : j < 60 ? j : j = 0);
            let ms = 0;
            let x = setInterval(() => {
                document.querySelector("#ms").innerHTML = ms;
                ms += 1;
                if (ms > 100) {
                    clearInterval(x);
                    document.querySelector("#ms").innerHTML = "00";
                }
            }, 10);
            i++;
        } else {
            clearInterval(stop);
        }

    }, 1000);
}

//EventListener for the deck
deck.addEventListener("click", function (e) {
    const sameCardsClicked = () => {
        let card1 = currentCard[Object.keys(currentCard)[0]];
        let card2 = e.target.getAttribute("id");
        return card1 == card2;
    }
    //check if the target is li and the clicked li doesnt have match class 
    if (e.target.tagName.toLowerCase() == "li" && ![...e.target.classList].includes("match") && !sameCardsClicked()) {
        if (!Game.hasGameStartedYet) { //if false, start the game and get the time stamp, store it in the Game object

            //Create Date object and getting the time stamp
            const time1 = new Date();
            Game.relativeTime1 = [time1.getHours(), time1.getMinutes(), time1.getSeconds()];
            Game.hasGameStartedYet = true;
            stopDisplayTimer = false;
            displayTimer();
        }

        showCard(e.target);

        //Extracting string from the class and comparing that with the previous clicked card to match 
        const extractCardString = e.target.children[0].classList[1].replace(/fa-/gi, "");

        if (Object.keys(currentCard).length == 1) { //Checking for the currentCard length (0 means no prev card clicked 1 means a card was clicked), based on that checking with the extracted string
            moveCounter();
            numberOfStars();
            let firstCard = Object.keys(currentCard)[0];
            if (firstCard === extractCardString) { //Checking with the extracted string

                //Copying the object so that we can reset the currentObject before the animation end and the animations work seemlessly
                const currentCardCopy = JSON.parse(JSON.stringify(currentCard));
                setTimeout(() => {
                   
                    //Resetting animations first
                    removeAnimations(currentCardCopy[extractCardString], e.target.getAttribute("id"));

                    //Adding animations
                    document.getElementById(currentCardCopy[extractCardString]).classList.add("match", "animated", "bounce");
                    document.getElementById(e.target.getAttribute("id")).classList.add("match", "animated", "bounce");

                    //Restting the object to do the same process again
                   

                    setTimeout(() => {
                        //Updating the Game object
                        Game.correctAnswers = 1;
                        if (Game.correctAnswers == 8) { //Final checking for total correct answer
                            const stars = document.querySelectorAll(".stars");

                            //Creating 2nd time object and getting time stamp to get the total time
                            const time2 = new Date();
                            const relativeTime2 = [time2.getHours(), time2.getMinutes(), time2.getSeconds()];

                            //To find totalTimeTaken using reduce method (basically substracting relative times), proud of coming up on my own #totallyReadable, i!==2 for seconds
                            const totalTimeTaken = relativeTime2.reduce((accum, curr, i) => i !== 2 ? (accum += (curr - Game.relativeTime1[i]) * 60) && accum : (accum += (curr - Game.relativeTime1[i])) && accum, 0);

                            Game.totalTime = totalTimeTaken;

                            //Updating the win modal
                            document.getElementById("minutes").innerHTML = Math.floor(totalTimeTaken / 60);
                            document.getElementById("seconds").innerHTML = totalTimeTaken % 60;
                            stars[1].innerHTML = stars[0].children.length;
                            showHideModal("show");

                            stopDisplayTimer = true;

                        }
                    }, 400)

                }, 300);
                currentCard = {};
            } else { //else if the cards dont match

                //Removing animations and classes since cards dont match
                removeAnimations(currentCard[firstCard], e.target.getAttribute("id"));
                document.getElementById(currentCard[firstCard]).classList.add("wrong", "shake", "animated");
                document.getElementById(e.target.getAttribute("id")).classList.add("wrong", "shake", "animated");
                setTimeout(() => {

                    removeAnimations(currentCard[firstCard], e.target.getAttribute("id"));
                    document.getElementById(currentCard[firstCard]).classList.remove("show", "open", "wrong");
                    document.getElementById(e.target.getAttribute("id")).classList.remove("show", "open", "wrong");

                    //failsafe
                    cards.forEach(card => card.classList.remove("show", "open", "wrong"));

                    currentCard = {};
                }, 300);

            }


        } else {
            currentCard[extractCardString] = e.target.getAttribute("id");
        }

    }
}, true);

//Restart event listener, forEach cause 2 restart
document.querySelectorAll(".restart").forEach((restart, index) => {
    restart.addEventListener("click", function () {

        //emptying the deck and adding shuffle cards to deck
        const newCards = shuffle(Array.from(cards));
        deck.innerHTML = "";
        newCards.forEach(card => {
            card.classList.value = "";
            card.classList.add("card");
            deck.appendChild(card);
        });

        //adding stars back to the main page
        const star = document.querySelector(".stars");
        star.innerHTML = "";
        Array(1, 2, 3).forEach(val => star.insertAdjacentHTML("afterbegin", `<li><i class="fa fa-star"></i></li>`));

        //resetting the move counter
        moveCounter(0);

        //hiding modal if its the second one 
        index === 0 ? null : showHideModal("hide");

        //restting the correct answers count
        Game.correct = 0;

        Game.hasGameStartedYet = false;
        //clear current card
        currentCard = {};

        //Resetting display timer

        document.querySelector("#sec").innerHTML = "00"
        document.querySelector("#min").innerHTML = "00"
        document.querySelector("#ms").innerHTML = "00"
        stopDisplayTimer = true;

    });
})

//Save score event listener
document.querySelector("#save").addEventListener("click", () => {
    const name = (n) => document.querySelector(".save-dialog input").value;
    const stars = (star) => document.querySelectorAll(".stars")[1].textContent;

    //Winner saving format
    const winner = {
        name: name(),
        stars: stars(),
        time: Game.totalTime
    }
    //Another reducer to make a table with the above object
    document.querySelector("table").insertAdjacentHTML("beforeend", `<tr>${Array(0, 1, 2).reduce((accum, curr) => (accum += `<td>${winner[Object.keys(winner)[curr]]}</td>`) && accum, "")}</tr>`);
    localScoreStorage();
});

//Simple toggler for showing scoreboard
document.querySelector(".show-score").addEventListener("click", () => {
    const score = document.querySelector(".score");
    score.classList.toggle("hide");
});