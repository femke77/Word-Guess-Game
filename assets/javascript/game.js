
//TODO:  
//       link to portfolio with screen shot
//       add cats to array and pick numGuesses
//       readme.md

//Bonus: Add callbacks, move incorrect guesses to a sidebar, make querySelector a var for each div

var wordArray = ["cat", "tiger"];
var resultArray = [];
var incorrectGuessArray = [];
var wordArrayIndex = 0;
var wins = 0;
var numGuesses;
var word;


function renderWord() {
    //clear messages and incorrect guess array, re-up numGuesses, display underscores for new word
    document.querySelector("#incorrect").innerHTML = " ";
    document.querySelector("#gameResult").innerHTML = " ";
    document.querySelector("#charResult").innerHTML = " ";
    document.querySelector("#wordResult").innerHTML = " ";
    if (wordArrayIndex < wordArray.length) {
        word = wordArray[wordArrayIndex];
        resultArray = new Array(word.length).fill("_");
        incorrectGuessArray.length = 0;
        numGuesses = 2;
        document.querySelector("#word").innerHTML = resultArray.join(" ");
    //if the word array is out of words, end the game
    } else {
        document.querySelector("#gameResult").innerHTML = "Game Over";
        document.querySelector("#charResult").innerHTML = "You scored " + wins + " out of " + wordArray.length;        
    }
}

function checkForLost(){
    return (numGuesses === 0);
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
    var match = wonGame = lostGame = false;
    document.querySelector("#gameResult").innerHTML = " ";
    //iterate over each character in the word with split then join back to array if match after all "_" updated to char
    word.split("").forEach((val, index) => {
        if (userGuess === val) {
            match = true;
            resultArray[index] = val;
            document.querySelector("#charResult").innerHTML = "Yes, " + userGuess + " is a correct guess!"
            document.querySelector("#word").innerHTML = resultArray.join(" ");
        }
    });
    //if there is not a match, user loses a guess and the wrong guess renders
    if (!match) {
        numGuesses--;
        document.querySelector("#charResult").innerHTML = "That letter is not in the word. " + numGuesses + " guess remaining.";
        incorrectGuessArray.push(userGuess);
        document.querySelector("#incorrect").innerHTML = incorrectGuessArray.join(" ");      
    }
    //after each guess check if user won, if not, check if they lost and if so, give them the word
    wonGame = checkForWon();
    if (wonGame) {
        wins++;
        document.querySelector("#gameResult").innerHTML = "You won this round!";
        document.querySelector("#charResult").innerHTML = "";
    } else {
        lostGame = checkForLost();
        if (lostGame){
            document.querySelector("#wordResult").innerHTML = "The word was " + word + "."
        }
    }
    //if the game is won or lost, its over, so start a new word after a small timeout
    if (wonGame || lostGame) {
        wordArrayIndex++;
        setTimeout(() => {
            renderWord()
        }, 4000
        )
    }
}

