
var Word = require("./Word.js")
var chalk = require("chalk");
var inquirer = require("inquirer");
var isLetter = require("is-letter");
var boxen = require("boxen");
var figlet = require("figlet");

var correctStyle = chalk.green.bold
var incorrectStyle = chalk.red.bold
var textStyle = chalk.white.bold

var UserCorrectGuess = false;
var wordList = ["zucchini", "asparagus", "celery", "parsely", "okra", "radish", "beet", "sprout"];

var wins = 0;
var losses = 0;
var guessesLeft = 12;

var letterGuessed = "";
var letterGuessedArr = [];

var randomWord;
var currentWord;
var guessedLength = 0;


figlet("HANGMAN", function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)

    console.log(textStyle("Vegetable Ninja!"));
    console.log(textStyle("How many types of vegetables do you know?"));

    var instructions =
        "-------------------------------------------------------------------------\r\n" +
        "Press letters to make guesses on the word.\r\n" +
        "Press Ctrl + C to exit game at any time.\r\n" +
        "-------------------------------------------------------------------------\r\n"
    console.log(textStyle(instructions));
    prepareGame();
});

function prepareGame() {
    var gameReady = [
        {
            type: 'text',
            name: 'playerName',
            message: 'What is your name?'
        },
        {
            type: 'confirm',
            name: 'readyToPlay',
            message: 'Are you ready to play?',
            default: true
        }
    ];

    inquirer.prompt(gameReady).then(answers => {
        if (answers.readyToPlay) {
            console.log(textStyle("Let's start, " + answers.playerName + "!"));
            startGame();
        }

        else {
            console.log(textStyle("See you next time, " + answers.playerName + "!"));
            return;
        }
    });
}

function startGame() {
    guessesRemaining = 10;
    pickRandomWord();
    letterGuessed = "";
    letterGuessedArr = [];
}


function pickRandomWord() {

    randomWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

    currentWord = new Word(randomWord);

    console.log(textStyle("This contains " + randomWord.length + " letters."));
    console.log(textStyle("Hangman Word:"));

    currentWord.splitWord();
    currentWord.generateLetters();
    makeGuesses();
}

function makeGuesses() {
    if (guessedLength < currentWord.letters.length || guessesRemaining > 0) {
        inquirer.prompt([
            {
                name: "lettervalue",
                message: "Type a Letter",
                validate: function (value) {
                    if (isLetter(value)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        ]).then(letterGuess => {
            var guess = letterGuess.lettervalue.toUpperCase();
            console.log(textStyle("You guessed: " + guess));
            UserCorrectGuess = false;
            if (letterGuessedArr.indexOf(guess) != -1) {
                console.log(textStyle("You have already guessed that letter. Try another one."));
                console.log(textStyle("---------------------------------------------------------------------"));
                makeGuesses()
            } 
            
            else if (letterGuessedArr.indexOf(guess) == -1) {
                letterGuessed = letterGuessed.concat(" " + guess);
                letterGuessedArr.push(guess);
                console.log(boxen(textStyle('Letters already guessed: ') + letterGuessed, { padding: 1 }));

                for (i = 0; i < currentWord.letters.length; i++) {
                    if (guess == currentWord.letters[i].letter && currentWord.letters[i].correctGuess == false) {
                        currentWord.letters[i].correctGuess = true;
                        UserCorrectGuess = true;
                        currentWord.underscores[i] = guess;
                        guessedLength++;
                    }
                }
                console.log(textStyle("Hangman Word:"));
                console.log(currentWord.letters.length)
                currentWord.splitWord();
                currentWord.generateLetters();

                if (UserCorrectGuess) {
                    console.log(correctStyle("That's Correct!"));
                    guessesLeft--;
                    console.log(textStyle("---------------------------------------------------------------------"));
                    checkIfUserWon();
                }

                else {
                    console.log(incorrectStyle('Sorry, that is wrong'));
                    guessesLeft--;
                    console.log(textStyle("You have " + guessesLeft + " guesses left."));
                    console.log(textStyle("---------------------------------------------------------------------"));
                    checkIfUserWon();
                }
            }
        });
    }
}

function checkIfUserWon() {

    if (guessesLeft <= 0) {
        console.log(textStyle("---------------------------------------------------------------------"));
        console.log(incorrectStyle('You Lost! Maybe next time!'));
        console.log(textStyle("The vegetable is: " + randomWord));
        losses++;

        console.log(textStyle("Wins: " + wins));
        console.log(textStyle("Losses: " + losses));
        console.log(textStyle("---------------------------------------------------------------------"));
        restartGame();
    }

    else if (guessedLength == currentWord.letters.length) {
        console.log(textStyle("---------------------------------------------------------------------"));
        console.log(correctStyle("You won! Congratulations!"));
        wins++;

        console.log(textStyle("Wins: " + wins));
        console.log(textStyle("Losses: " + losses));
        console.log(textStyle("---------------------------------------------------------------------"));

        restartGame();
    }

    else {
        makeGuesses("");
    }

}

function restartGame() {
    var restart = [
        {
            type: 'confirm',
            name: 'replay',
            message: 'Want to play again?',
            default: true
        }
    ];

    inquirer.prompt(restart).then(restartcommand => {
        if (restartcommand.replay) {
            letterGuessed = "";
            letterGuessedArr = [];
            guessedLength = 0;
            guessesLeft = 12;
            console.log(textStyle("Let's begin the adventure again!"));
            startGame();
        }

        else {
            console.log(textStyle("See you next time!"));
            return;
        }
    });
}