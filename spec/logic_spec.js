var Engine = require("../src/logic");

describe("The game engine", function () {

  var game;

  beforeEach(function () {
    game = Engine.createNewGame();
  });

  it("creates a new game", function () {
    expect(game).toBeDefined();
  });

  it("takes a turn as a player", function () {
    var square = 5;
    var nextState = game.play(square);

    expect(game.playerAt(square)).not.toEqual(nextState.playerAt(square));
  });

  it("toggles players between turns", function () {

    var noPlayer = game.playerAt(4);

    var stepOne = game.play(4);
    var firstPlayer = stepOne.playerAt(4);

    var stepTwo = stepOne.play(2);
    var secondPlayer = stepTwo.playerAt(2);

    expect(noPlayer).not.toEqual(firstPlayer);
    expect(firstPlayer).not.toEqual(secondPlayer);
    expect(secondPlayer).not.toEqual(noPlayer);
  });

  it("prevents taking an already taken square", function () {

    var square = 3;


    var noPlayer = game.playerAt(square);

    var nextState = game.play(square);

    var ourPlayer = nextState.playerAt(square);
    expect(noPlayer).not.toEqual(ourPlayer);

    var invalidMove = nextState.play(square);

    expect(invalidMove.playerAt(square)).toEqual(ourPlayer);
  });

  it("detects a draw", function () {

    var drawCombo = [0, // X
                     4, // O 
                     8, // X 
                     3, // O 
                     5, // X 
                     2, // O 
                     6, // X 
                     7, // O 
                     1];// X 

    var drawState = drawCombo.reduce(function (state, move) {
      expect(state.isOver()).toBe(false);
      return state.play(move);
    }, game);

    expect(drawState.isOver()).toBeTruthy();
    expect(drawState.isOver()).toBe(true);
  });

  it("detects a win", function () {
    var winCombo = [0, // X
                    4, // O
                    1, // X
                    3, // O
                    2];// X

    var winState = winCombo.reduce(function (state, move) {
      expect(state.isOver()).toBe(false);
      return state.play(move);
    }, game);

    expect(winState.isOver()).toBeTruthy();
    expect(winState.isOver()).toEqual([0,1,2]);
  });

  it("prevents further turns after a win", function () {

    var emptyIndex = 6;
    var emptyPlayer = game.playerAt(emptyIndex);

    var winCombo = [0, 4, 1, 3, 2];
    var winState = winCombo.reduce(function (state, move) {
      return state.play(move);
    }, game);

    expect(winState.isOver()).toBeTruthy();
    expect(winState.playerAt(emptyIndex)).toEqual(emptyPlayer);

    var invalid = winState.play(emptyIndex);
    expect(invalid.playerAt(emptyIndex)).toEqual(emptyPlayer);
    expect(invalid.isOver()).toBeTruthy();
  });
});
