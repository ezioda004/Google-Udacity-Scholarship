/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

let currentCard = {};
const deck = document.querySelector(".deck");
const cards = document.querySelectorAll(".card");

let Game = {
    correct: 0,
    set correctAnswers(val) {
        this.correct += 1;
    },
    get correctAnswers() {
        return this.correct;
    },
    hasGameStartedYet: false
}

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

//tracking moves made by user
function moveCounter() {
    let moves = document.querySelector(".moves")
    moves.textContent = +moves.textContent + 1;
}

function showCard(obj) {
    obj.classList.add("open", "show", "animated", "flipInY");
}

//Event listener on cards
function removeAnimations(id1, id2) {
    document.getElementById(id1).classList.remove("animated", "flipInY", "bounce", "shake");
    document.getElementById(id2).classList.remove("animated", "flipInY", "bounce", "shake");
}

function hasPlayerWon() {

}

function showHideModal(val) {
    if (val === "show") {
        document.querySelector("div.container").classList.add("hide");
        document.querySelector("section.container").classList.remove("hide");
    }
    else {
        document.querySelector("div.container").classList.remove("hide");
        document.querySelector("section.container").classList.add("hide");
    }
}

deck.addEventListener("click", function (e) {

    //check if the target is li and the clicked li doesnt have match class 
    if (e.target.tagName.toLowerCase() == "li" && ![...e.target.classList].includes("match")) {

        if (!Game.hasGameStartedYet){ //if false, start the game and get the time stamp, store it in the Game object
            const time1 = new Date();
            Game.relativeTime1 = [time1.getHours(), time1.getMinutes(), time1.getSeconds()];
            Game.hasGameStartedYet = true;

        }
        console.log(Game.relativeTime1);

        showCard(e.target);
        const extractCardString = e.target.children[0].classList[1].replace(/fa-/gi, "");
        if (Object.keys(currentCard).length == 1) {
            let firstCard = Object.keys(currentCard)[0];
            if (firstCard === extractCardString) {
                setTimeout(() => {

                    removeAnimations(currentCard[extractCardString], e.target.getAttribute("id"));

                    document.getElementById(currentCard[extractCardString]).classList.add("match", "animated", "bounce");
                    document.getElementById(e.target.getAttribute("id")).classList.add("match", "animated", "bounce");
                    currentCard = {};

                    setTimeout(() => {
                        Game.correctAnswers = 1;
                        console.log(Game.correctAnswers);
                        if (Game.correctAnswers == 7) {
                            console.log("won");
                            // document.querySelector("div.container").classList.add("hide");
                            // document.querySelector("section.container").classList.remove("hide");
                            const time2 = new Date();
                            const relativeTime2 = [time2.getHours(), time2.getMinutes(), time2.getSeconds()];
                            const totalTimeTaken = relativeTime2.reduce((accum, curr, i) =>  i !== 2 ? (accum += (curr - Game.relativeTime1[i]) * 60) && accum :  (accum += (curr - Game.relativeTime1[i])) && accum, 0)
                            console.log(totalTimeTaken);
                            document.getElementById("minutes").innerHTML = Math.floor(totalTimeTaken/60);
                            document.getElementById("seconds").innerHTML = totalTimeTaken % 60;
                            showHideModal("show");
                        }
                    }, 400)

                }, 500);



            } else {
                removeAnimations(currentCard[firstCard], e.target.getAttribute("id"));
                document.getElementById(currentCard[firstCard]).classList.add("wrong", "shake", "animated");
                document.getElementById(e.target.getAttribute("id")).classList.add("wrong", "shake", "animated");
                setTimeout(() => {

                    removeAnimations(currentCard[firstCard], e.target.getAttribute("id"));
                    document.getElementById(currentCard[firstCard]).classList.remove("show", "open", "wrong");
                    document.getElementById(e.target.getAttribute("id")).classList.remove("show", "open", "wrong");
                    currentCard = {};
                }, 500);

            }
            moveCounter();

        } else {
            currentCard[extractCardString] = e.target.getAttribute("id");
        }

    }
}, true);

//restart shuffles
document.querySelectorAll(".restart").forEach((restart, index) => {
    restart.addEventListener("click", function () {
        console.log("click")
        const newCards = shuffle(Array.from(cards));

        deck.innerHTML = "";
        newCards.forEach(card => {
            card.classList.value = "";
            card.classList.add("card");
            deck.appendChild(card);
        });

        document.querySelector(".moves").textContent = 0;
        index === 0 ?  null: showHideModal("hide");
       
    });
})

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */