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
function moveCounter(){
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

deck.addEventListener("click", function (e) {

    //check if the target is li
    if (e.target.tagName.toLowerCase() == "li") {
        
        showCard(e.target);
        console.log(e.target.getAttribute("id"));
        const extractCardString = e.target.children[0].classList[1].replace(/fa-/gi, "");
        if (Object.keys(currentCard).length == 1) {
            let firstCard = Object.keys(currentCard)[0];
            if ( firstCard === extractCardString) {
                setTimeout(() => {
                    console.log(document.getElementById(currentCard[extractCardString]))
                    removeAnimations(currentCard[extractCardString], e.target.getAttribute("id"));

                    document.getElementById(currentCard[extractCardString]).classList.add("match", "animated", "bounce");
                    document.getElementById(e.target.getAttribute("id")).classList.add("match", "animated", "bounce");
                    currentCard = {};
                }, 500);
                console.log(document.getElementById(currentCard[extractCardString]))


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
document.querySelector(".restart").addEventListener("click", function(){
    console.log("click")
    const newCards = shuffle(Array.from(cards));
    console.log(newCards)
    deck.innerHTML = "";
    newCards.forEach(card => {
        deck.appendChild(card);
    });
});

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