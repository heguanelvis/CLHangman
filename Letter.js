
var Letter = function(letter) {
    this.letter = letter.toUpperCase();
    this.correctGuess = false;
    this.showLetter = function() {
        if (this.correctGuess) {
            console.log(this.letter);
        }
    }
}

module.exports = Letter

