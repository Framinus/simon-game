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
  let sequence = [];

  // dom manipulation
  const victoryDOM = () => {
    victory.play();
    $('#counter').html('WIN!');
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
    $('#counter').html("--");
    simon.reset();
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

  // model and dom manipulation - will refactor.
  const reset = () => {
    game = true;
    sequence = [];
    step = 0;
    turns = 0;
    $("#counter").html("--");
  }

  const nextSequence = () => {
    if (checkForWin() === true) {
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

  const lightAndSound = (index, timer) => {
    const interval = setTimeout(() => {
      soundFiles[index].play();
      colors[index].dom.fadeOut(300);
      colors[index].dom.fadeIn(300);
      }, timer);
  }

// our interactive jquery that allows player to click buttons to select colors.

  // these pass the color clicked to the sequence to check it, as well as playing the sound and making the button fadeOut and fadeIn.
   $("#green").click(() => {
     if (game) {
     humanColor(green.colorId);
     sound1.play();
     $('#green').fadeOut(200);
     $('#green').fadeIn(200);
    }
   });

    $("#red").click(() => {
      if (game) {
      humanColor(red.colorId);
      sound2.play();
      $('#red').fadeOut(200);
      $('#red').fadeIn(200);
    }
   });

    $("#yellow").click(() => {
      if (game) {
      humanColor(yellow.colorId);
      sound3.play();
      $('#yellow').fadeOut(200);
      $('#yellow').fadeIn(200);
      }
    });

    $("#blue").click(() => {
      if (game) {
      humanColor(blue.colorId);
      sound4.play();
      $('#blue').fadeOut(200);
      $('#blue').fadeIn(200);
      }
    });

  // starts a game when the start button is clicked.
    $("#start").click(() => {
      reset();
      game = true;
      $('#switch').css("background-color", "orange");
      startupSound.play();
      nextSequence();
    });

  // enables strict mode when the button is clicked.
    $("#strict").click(() => {
      if (!strict) {
      strict = true;
      $('#strict').css("background-color", "red");
      } else {
        strict = false;
        $('#strict').css("background-color", "yellow");
      }
    });
});
