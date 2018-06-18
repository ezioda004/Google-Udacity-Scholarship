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

function showCard(obj) {
    obj.classList.add("open", "show");
}

//Event listener on cards

const deck = document.querySelector(".deck");
console.log(deck);
deck.addEventListener("click", function (e) {

    //check if the target is li
    if (e.target.tagName.toLowerCase() == "li") {
        console.log(e.target.getAttribute("id"));
        const extractCardString = e.target.children[0].classList[1].replace(/fa-/gi, "");
        if (Object.keys(currentCard).length == 1){
            if (Object.keys(currentCard)[0] === extractCardString) {
                document.getElementById(currentCard[extractCardString]).classList.add("match");
                document.getElementById(e.target.getAttribute("id")).classList.add("match");
                console.log("here");
            }
            else {

            }
            currentCard = {};
        }
        else {
            currentCard[extractCardString] = e.target.getAttribute("id");
        }

        
        
        showCard(e.target);
    }


    // if (currentCard.length == 0){

    // }

}, true)

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