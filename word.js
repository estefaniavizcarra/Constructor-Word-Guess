


// * An array of `new` Letter objects representing the letters of the underlying word

// * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) 
// that displays the character or an underscore and concatenate those together.

// * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)


var Letter = require("./letter.js");
var colors = require('colors');
// Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

function Word(answer) {
  //Letter objects array
  this.objArray = [];

  for (var i = 0; i < answer.length; i++) {
    var letter = new Letter(answer[i]);
    this.objArray.push(letter);
  }

  this.log = function() {
    answerLog = "";
    for (var i = 0; i < this.objArray.length; i++) {
      answerLog += this.objArray[i] + " ";
    }
    console.log(colors.bgBlack(answerLog));
  };

  this.userGuess = function(input) {
    for (var i = 0; i < this.objArray.length; i++) {
      this.objArray[i].guess(input);
    }
  };
}

module.exports = Word;