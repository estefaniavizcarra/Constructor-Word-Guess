
// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

// * Randomly selects a word and uses the `Word` constructor to store it

// * Prompts the user for each guess and keeps track of the user's remaining guesses

// 3. `Letter.js` *should not* `require` any other files.

// 4. `Word.js` *should only* require `Letter.js`



var Word = require("./word.js");
var inquirer = require("inquirer");
var colors = require('colors');


var letras = "abcdefghijklmnopqrstuvwxyz";

var zodiac = [

    "aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
// Arrays para almacenar las letras correctas e incorrectas

    var incorrectLetters = [];
    var correctLetters = [];
// Escgoe random una palabra  del array ZODIAC
var index = Math.floor(Math.random() * zodiac.length);
var palabraRandom = zodiac[index];

// Pass random word through Word constructor
var eleccion = new Word(palabraRandom);

var palabraNueva = false;



// intentos  que le quedan al usuario
var guessesLeft = 10;

function game() {
  // si la palabra del constructor ha sido adivinada se cambia a true
  if (palabraNueva) {
    // Selects random UnitedStates array
    var index = Math.floor(Math.random() * zodiac.length);
    var palabraRandom = zodiac[index];

    // Escoge random una palabra para aser adivinada
    eleccion = new Word(palabraRandom);

    palabraNueva = false;
  }

  // Verifica si es correcta la letra que ha sido ingresada
  var palabra = [];
  eleccion.objArray.forEach(completeCheck);

  // Dependiendo de cuantas letras restantes quedan verifica si a se perdio o si ya se ingreso esa letra o si esa letra ingresada es incorrecta
  if (palabra.includes(false)) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Guess a letter....(a-z)",
          name: "userinput"
        }
      ])
      .then(function(input) {
        if (
          !letras.includes(input.userinput) ||
          input.userinput.length > 1
        ) {
          console.log("\ntry again!\n");
          game();
        } else {
          if (
            incorrectLetters.includes(input.userinput) ||
            correctLetters.includes(input.userinput) ||
            input.userinput === ""
          ) {
            console.log(colors.random("\nYou have already guess that letter or have not enter any letter\n"));
            game();
          } else {
            // Si la letra infresada es correcta...
            var verifyArr = [];

            eleccion.userGuess(input.userinput);

            //si la letra ingresada  coincide con alguna de computer word entonces pone correcto y si  no entonce incorrecto
            eleccion.objArray.forEach(wordCheck);
            if (verifyArr.join("") === palabra.join("")) {
              console.log(colors.rainbow("\nIncorrect\n"));

              incorrectLetters.push(input.userinput);
              guessesLeft--;
            } else {
              console.log(colors.bgMagenta("\nCorrect!\n"));

              correctLetters.push(input.userinput);
            }

            eleccion.log();

            //cada vez imprime cuanto le queda
            console.log(colors.bgCyan("Guesses Left: " + guessesLeft + "\n"));

            // cada oportunidad imprime que letras han sido ya adivinadas
            console.log(colors.magenta(
              "Letters tried: " + incorrectLetters.join(" ") + "\n"
            ));

            // Si los tintentos son maores a cero sigue gustando y se llama la funcion cada vez
            if (guessesLeft > 0) {
              // Call funct
              game();
              // de lo contratio consologua si si perdio y se vuelve a preguntar si quiere jugar de nuevo o no
            } else {
              console.log(colors.red("YOU LOOSE!\n"));

              playAgain();
            }

            function wordCheck(key) {
              verifyArr.push(key.guessed);
            }
          }
        }
      });
  } else {
    // y si gana pues consolguea que ganó y se pregunta si quiere seguir jugando o no
    console.log(colors.america("Y O U     W I N \n"));

    playAgain();
  }

  function completeCheck(key) {
    palabra.push(key.guessed);
  }
}
// funcion que sirve para preguntaar si se quiere jugar de nuevo o si se quiere salir
function playAgain() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What do you want to do:",
        choices: ["Play Again", "Exit"],
        name: "playAgain"
      }
    ])
    // si se quiere salir se llama la funcion 
    .then(function(input) {
      if (input.playAgain === "Play Again") {
        palabraNueva = true;
        incorrectLetters = [];
        correctLetters = [];
        guessesLeft = 10;
        game();
      } else {
        return;
      }
    });
}

game();