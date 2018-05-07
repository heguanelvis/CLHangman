
var Letter = require("./Letter.js");

var Word = function (word) {

    this.word = word;

    this.letters = [];

    this.underscores = [];
    
    // this function splits the word into an array of letters
    // it also creates an attribute that stores underscores equal
    // to the length of the word
    this.splitWord = function () {

        this.letters = this.word.split("");

        underscoresNum = this.letters.length;
        
        // if there is no underscore, push them;
        // if the underscores have already shown,
        // stop adding new underscores
        if (this.underscores.length == 0) {

            for (var i = 0; i < underscoresNum; i++) {

                this.underscores.push("_ ");

            }

        }

        console.log(this.underscores.join(" "));

    }
    
    // connect with the Letter Constructor and 
    // use the Constructor to show the letters
    // array created above
    this.generateLetters = function () {

        for (i = 0; i < this.letters.length; i++) {

            this.letters[i] = new Letter(this.letters[i]);

            this.letters[i].showLetter();

        }

    }
    
}

module.exports = Word;
