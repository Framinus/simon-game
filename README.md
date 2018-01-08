# Patterns

This is a memory game inspired by Simon, but with a more soothing color palette. Play on regular mode, where a wrong answer allows you to try the sequence again, or strict mode, where one wrong move sends you back to start! This app is built in Node and Express, with a significant amount of front end logic. It taught me a great deal about timing events in JavaScript!

### Developed features:

- User can start a game and optionally choose Strict Mode.
- The computer plays a series of connected lights and sounds, and adds one more chime to the sequence after each successful user turn.
- The user gets feedback through light and sound when pressing a button, and is informed of an incorrect button press through a buzzer and visual feedback on the screen.
- The user gets a victory fanfare if they manage to get through a sequence of 20 correct button presses!

### Instructions

If you want to dig into this code yourself:

- Fork and clone the repository.
- Run ```npm install``` to get the required packages.
- Run ```npm start``` to start the server.
