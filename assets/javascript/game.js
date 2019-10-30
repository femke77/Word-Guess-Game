var wordArray = ["persian", "bengal", "siamese", "sphynx", "abyssinian", "chartreux", "savannah", "himalayan", "ragamuffin", "peterbald", "ocicat", "korat",
    "tonkinese", "lykoi", "burmilla"];
var resultArray = [];
var incorrectGuessArray = [];
var wordArrayIndex = 0;
var wins = 0;
var numGuesses;
var word;
var incorrect = document.querySelector("#incorrect");
var charResult = document.querySelector("#charResult");
var wordResult = document.querySelector("#wordResult");
var gameResult = document.querySelector("#gameResult");
var wordID = document.querySelector("#word");

function renderWord() {
    //we use the onkeyupHolder to detach event listening during the timeout transition
    document.onkeyup = document.onkeyupHolder
    document.onkeyupHolder = null;
    
    //clear messages and incorrect guess array, re-up numGuesses, display underscores for new word
    incorrect.innerHTML = " ";
    gameResult.innerHTML = " ";
    charResult.innerHTML = " ";
    wordResult.innerHTML = " ";
    if (wordArrayIndex < wordArray.length) {
        word = wordArray[wordArrayIndex];
        resultArray = new Array(word.length).fill("_");
        incorrectGuessArray.length = 0;
        numGuesses = 4; //here is where you should try and make it dependent. You already have a word with the number of characters, maybe base it off of that :)
        wordID.innerHTML = resultArray.join(" ");
    
    //if the word array is out of words, end the game
    } else {
        gameResult.innerHTML = "Game Over";
        charResult.innerHTML = "You scored " + wins + " out of " + wordArray.length;        
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


//find all the matching char(s) or let user know if no match. guesses only go down when user is wrong.                                   
document.onkeyup = (event) => {
    var userGuess = event.key.toLowerCase();
    var match = wonGame = lostGame = false;
    
    //iterate over each character in the word with split then join back to array if match after all "_" updated to char
    word.split("").forEach((val, index) => {
        if (userGuess === val) {
            match = true;
            resultArray[index] = val;
            charResult.innerHTML = "Yes, " + userGuess + " is a correct guess!"
            wordID.innerHTML = resultArray.join(" ");
        }
    });

    //if there is not a match, user loses a guess and the wrong guess renders
    if (!match) {
        numGuesses--;
        charResult.innerHTML = "That letter is not in the word. " + "&nbsp" +numGuesses + " guesses remaining.";
        incorrectGuessArray.push(userGuess);
        incorrect.innerHTML = incorrectGuessArray.join(" ");      
    }
    
    //after each guess check if user won, if not, check if they lost and if so, give them the word
    wonGame = checkForWon();
    if (wonGame) {
        wins++;
        gameResult.innerHTML = "You won this round!";
        charResult.innerHTML = "";
    } else {
        lostGame = checkForLost();
        if (lostGame){
            wordResult.innerHTML = "The word was " + "<span style='color:red'>" + word + "</span>" + ".";
        }
    }
    
    //if the game is won or lost, its over, so start a new word after a small timeout
    if (wonGame || lostGame) {
        wordArrayIndex++;
        document.onkeyupHolder = document.onkeyup;
        document.onkeyup = null;
        setTimeout(() => {
            renderWord()
        }, 4000
        )
    }
}

