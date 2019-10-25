//win/lose cases: res array is full (no more '_') before numGuesses run out. (win)
//       numGuesses runs out and res array is missing 1 or more letters (has 1 or more '_'). (lose)


// user input cases: user picks the same letter twice (ok - doesn't matter)
//                   user picks a non-alpha char (needs coding)
//                                      
//--------------------------------------------------------------------------------------------------

//  REFACTOR THIS CODE!!!!!!  --- REFACTOR THIS CODE!!!!!!!!!!!! ---- REFACTOR THIS CODE!!!!!!
// proper documentation
//theme will be cats

//Fix the messages and add numGuesses remaining

var wordArray = ["cat", "dog"];
var resultArray = [];
var incorrectGuessArray = [];
var wordArrayIndex = 0;
var wins = 0;
var numGuesses;
var word;


function renderWord() {
    document.querySelector("#wrongGuesses").innerHTML = " ";
    if (wordArrayIndex < wordArray.length) {
        word = wordArray[wordArrayIndex];
        resultArray = new Array(word.length).fill("_");
        incorrectGuessArray = [];
        numGuesses = 2;
        document.querySelector("#word").innerHTML = resultArray.join(" ");
        document.querySelector("#result").innerHTML = " ";

    } else {
        document.querySelector("#info").innerHTML = "Game OVER";
        document.querySelector("#result").innerHTML = "You scored " + wins + " out of " + wordArray.length;
        
    }


}

function checkForLost() {
    var lost = false;
    if (numGuesses === 0) {
        lost = true;
    }
    return lost;
}

function checkForWon() {
    var won = true;
    resultArray.forEach((val) => {
        if (val === "_") {
            won = false;
        }
    });
    return won;
}


//------GAME------------------

renderWord();


//will find all the matching char or let you know if no match, guesses only go down when user is wrong.                                   
document.onkeyup = (event) => {
    var userGuess = event.key.toLowerCase();
    var match = false;
    var wonGame = false;
    var lostGame = false;
    document.querySelector("#won").innerHTML = " ";
    //iterate over each character in the word with split then join back to array if match
    word.split("").forEach((val, index) => {
        if (userGuess === val) {
            match = true;
            resultArray[index] = val;
            document.querySelector("#result").innerHTML = "Yes, " + userGuess + " is a correct guess!"
            document.querySelector("#word").innerHTML = resultArray.join(" ");
        }
    });
    if (!match) {
        numGuesses--;
        document.querySelector("#result").innerHTML = "That letter is not in the word.";
        incorrectGuessArray.push(userGuess);
        document.querySelector("#wrongGuesses").innerHTML = incorrectGuessArray.join(" ");      
    }
    wonGame = checkForWon();
    if (wonGame) {
        wins++;
        document.querySelector("#won").innerHTML = "You won this round!";
    } else {
        lostGame = checkForLost();
        if (lostGame){
            document.querySelector("#info").innerHTML = "The word was " + word + ". Try a new word."
        }
    }
    if (wonGame || lostGame){
        wordArrayIndex++;
        renderWord();
    }
}

