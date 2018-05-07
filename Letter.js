
var Letter = function (letter) {

    this.letter = letter.toUpperCase();

    // correctGuess is a boolean that can be changed elsewhere
    this.correctGuess = false;

    // if this letter is correct, the letter will be shown
    this.showLetter = function () {

        if (this.correctGuess) {

            console.log(this.letter);

        }

    }

}

module.exports = Letter

