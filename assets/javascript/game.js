var letter = 'c';

document.onkeyup = (event) => {
    var userGuess = event.key;
    document.querySelector("#userChoice").innerHTML = userGuess;
    if (userGuess === letter){
        document.querySelector("#result").innerHTML = "Correct!"
    } else {
        document.querySelector("#result").innerHTML = "Sorry, Incorrect"
    }
}

