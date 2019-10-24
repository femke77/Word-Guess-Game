//cases: res array is full (no more '_') before numGuesses run out. (win)
//       numGuesses runs out and res array is missing 1 or more letters (has 1 or more '_'). (lose)

//--------------------------------------------------------------------------------------------------



var wordArray = [];

//win will be for guessing a word (e.g. filling out the resultArray) before guesses run out
var wins = 0;

//guesses could be done dynamically depending on word length????? 
var numGuesses = 2;

//eventually this will be an array of words and we will go through the array for a game
var word = "doll";

//i think we will render the result at an array
var resultArray = new Array(word.length).fill("_");

//show the user the wrong guesses
var incorrectGuessArray = [];

document.querySelector("#word").innerHTML = resultArray.join(" ");

//will find all the matching char or let you know if no match, guesses only go down when user is wrong.                                   
document.onkeyup = (event) => {
    var userGuess = event.key.toLowerCase();
    var match = false;   
    var gameWon = false;
    word.split("").forEach((val, index) => {
        if (userGuess === val){
            match = true;
            resultArray[index] = val;
            document.querySelector("#result").innerHTML = "Yes, " + userGuess + " is a correct guess!"
            document.querySelector("#word").innerHTML = resultArray.join(" ");
        } 
    });
    if (!match){
        numGuesses--;
        document.querySelector("#result").innerHTML = "That letter is not in the word.";
        incorrectGuessArray.push(userGuess);
        document.querySelector("#wrongGuesses").innerHTML = incorrectGuessArray.join(" ");

    }   
    gameWon = checkForWin();
    if (gameWon){
        wins++;
        document.querySelector("#result").innerHTML = "You won! Your score is " + wins + " out of __<arr.len>s____"; 
    }
    if (numGuesses === 0){
        document.querySelector("#result").innerHTML = "No more guesses remaining.";
        document.querySelector("#word").innerHTML = "The word was " + word;
    }
}

//if no more '_' in array and guesses > 0 user won
function checkForWin() {
    var wonGame = true;
    resultArray.forEach((val) => {
        if (val === "_"){
            wonGame = false;
        }
    });
    return wonGame;
}
