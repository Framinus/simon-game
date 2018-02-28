$(document).ready(function() {

  const sound1 = document.getElementById('sound1');
  const sound2 = document.getElementById('sound2');
  const sound3 = document.getElementById('sound3');
  const sound4 = document.getElementById('sound4');

  const green = {
    name: 'green',
    colorId: 0,
    sound: sound1,
    dom: $('#green')
  }

  const red = {
    name: 'red',
    colorId: 1,
    sound: sound2,
    dom: $('#red')
  }

  const yellow = {
    name: 'yellow',
    colorId: 2,
    sound: sound3,
    dom: $('#yellow')
  }

  const blue = {
    name: 'blue',
    colorId: 3,
    sound: sound4,
    dom: $('#blue')
  }

  // array of four color objects
  const colors = [green, red, yellow, blue];
  // variables that represent each audio file.
  const soundFiles = [sound1, sound2, sound3, sound4];

  const startupSound = document.querySelector('#startupSound');
  const wrong = document.getElementById('wrong');
  const victory = document.getElementById('victory');

  let game = false;
  let strict = false;
  let turns = 0;
  let step = 0;
  let playerTurn = false;
  let sequence = [];

  // dom manipulation
  const victoryDOM = () => {
    victory.play();
    setTimeout(reset, 5000);
  }

  // dom manipulation
  const wrongAnswerRegular = () => {
    step = 0;
    wrong.play();
    playSequence();
  }

  // dom manipulation
  const wrongAnswerStrict = () => {
    wrong.play();
    reset();
  }

  // model
  const checkForWin = () => {
    if (sequence.length >= 5) {
      game = false;
      victoryDOM();
      return true;
    } else {
      return false;
    }
  }

  // model
  const checkForSequenceEnd = () => {
    if (step === sequence.length -1) {
      step = 0;
      nextSequence();
      return true;
    } else {
      step++
      return false;
    }
  }

  // model
  const humanColor = (color) => {
    if (color === sequence[step]) {
      checkForSequenceEnd();
    } else {
        if (!strict) {
          wrongAnswerRegular();
        } else {
          wrongAnswerStrict();
        }
      }
    $('#counter').html(turns);
    return;
  }

  // model and dom manipulation
  const reset = () => {
    game = true;
    sequence = [];
    step = 0;
    turns = 0;
    $("#counter").html("--");
  }

  // if the game hasn't been won, add a new color to the sequence array, increment the turn marker, and then call playSequence to change the DOM.
  const nextSequence = () => {
    playerTurn = false;
    if (checkForWin()) {
      turns = 'YOU WIN!';
      return;
    } else {
      let nextColor = colors[Math.floor (Math.random() * 4)].colorId;
      sequence.push(nextColor);
      console.log('sequence', sequence);
      turns += 1;
      playSequence();
    }
  }

  // sets up a timer, loops through the simon.sequence array, calls the function that actually works on the DOM, and then increments the timer.
  const playSequence = () => {
    let timer = 1200;
    for (let i = 0; i < sequence.length; i++) {
      lightAndSound(sequence[i], timer);
      timer +=700;
    }
  }

  // makes the sounds and lights go!
  const lightAndSound = (index, timer) => {
    const interval = setTimeout(() => {
      soundFiles[index].play();
      colors[index].dom.fadeOut(300);
      colors[index].dom.fadeIn(300);
      }, timer);
      playerTurn = true;
  }

  // generic click function that takes in the dom node, a color, and a sound.

  const pressColorButton = (domColor, colorId, sound) => {
    if (game) {
      humanColor(colorId);
      sound.play();
      domColor.fadeOut(200);
      domColor.fadeIn(200);
    }
  }

    $("#green").click(() => {
      pressColorButton(green.dom, green.colorId, green.sound);
    })

    $("#red").click(() => {
      pressColorButton(red.dom, red.colorId, red.sound);
   });

    $("#yellow").click(() => {
      pressColorButton(yellow.dom, yellow.colorId, yellow.sound);
    });

    $("#blue").click(() => {
      pressColorButton(blue.dom, blue.colorId, blue.sound);
    });

  // starts a game when the start button is clicked.
    $("#start").click(() => {
      reset();
      startupSound.play();
      nextSequence();
    });

  // enables strict mode when the button is clicked.
    $("#strict").click(() => {
      if (!strict) {
      strict = true;
      $('#strict').css("background-color", "#EECBF2");
      } else {
        strict = false;
        $('#strict').css("background-color", "white");
      }
    });
});
