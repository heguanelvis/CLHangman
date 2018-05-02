
var Letter = require("./Letter.js");

var Word = function (word) {

    this.word = word;

    this.letters = [];

    this.underscores = [];

    this.splitWord = function () {

        this.letters = this.word.split("");

        underscoresNum = this.letters.length;
        
        if (this.underscores.length == 0) {
            for (var i = 0; i < underscoresNum; i++) {
                this.underscores.push("_ ");
            }
        }

        console.log(this.underscores.join(" "));

    }

    this.generateLetters = function () {

        for (i = 0; i < this.letters.length; i++) {
            this.letters[i] = new Letter(this.letters[i]);
            this.letters[i].showLetter();
        }
    }
}

module.exports = Word;
