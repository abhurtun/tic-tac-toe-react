var React = require("react");
var ReactDOM = require("react-dom");
var ReactTestUtils = require('react-addons-test-utils');
var Board = require("../src/board");

// Test the UI of our game. This suite uses React's Test Utilities
// (https://facebook.github.io/react/docs/test-utils.html) for driving
// the UI. It can inspect the content of DOM nodes and simulate click
// events on them as well.

describe("The board view", function () {

  var instance;

  // Create a new React component (our game board) for each test.
  beforeEach(function () {
    instance = ReactTestUtils.renderIntoDocument(React.createElement(Board));
  });

  // Helper functions
  var getAllSquares = function () {
    return ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, "square");
  };
  var getSquare = function (num) {
    return ReactTestUtils.findRenderedDOMComponentWithClass(instance, "square" + num);
  };
  var getRestartView = function () {
    return ReactTestUtils.findRenderedDOMComponentWithClass(instance, "restart");
  };
  var getRestartButton = function () {
    return ReactTestUtils.findRenderedDOMComponentWithTag(instance, "button");
  };

  it("shows nine squares", function () {
    expect(getAllSquares().length).toEqual(9);
  });

  it("lets a player click an empty square", function () {
    var squareComponent = getSquare(0);
    var squareDOM = ReactDOM.findDOMNode(squareComponent);

    expect(squareDOM.textContent).toEqual(" ");

    ReactTestUtils.Simulate.click(squareComponent);

    expect(squareDOM.textContent).not.toEqual(" ");
  });

  it("highlights a win", function () {

    var winCombo = [0, // X 
                    4, // O 
                    1, // X 
                    3, // O 
                    2];// X 


    winCombo.forEach(function (index) {
      ReactTestUtils.Simulate.click(getSquare(index));
    });

    [0,1,2].forEach(function (index) {
      var dom = ReactDOM.findDOMNode(getSquare(index));
      expect(dom.classList.contains("winner")).toBe(true);
    });

    // The rest should not.
    [3,4,5,6,7,8].forEach(function (index) {
      var dom = ReactDOM.findDOMNode(getSquare(index));
      expect(dom.classList.contains("winner")).toBe(false);
    });
  });

  describe("restart button", function () {

    var restartIsHidden = function () {
      var restart = ReactDOM.findDOMNode(getRestartView());
      return restart.classList.contains("hidden");
    };

    var playCombo = function (moves) {
      moves.forEach(function (index) {
        ReactTestUtils.Simulate.click(getSquare(index));
      });
    };

    it("is hidden during the game", function () {
      expect(restartIsHidden()).toBe(true);
    });
    it("appears after a tie", function () {
      var draw = [0,4,8,3,5,2,6,7,1];
      playCombo(draw);
      expect(restartIsHidden()).toBe(false);
    });
    it("appears after a win", function () {
      var win = [0,4,1,3,2];
      playCombo(win);
      expect(restartIsHidden()).toBe(false);
    });
    it("restarts the game when clicked", function () {

      var gameOver = [0,4,1,3,2];
      playCombo(gameOver);


      expect(restartIsHidden()).toBe(false);
      ReactTestUtils.Simulate.click(getRestartButton());

      expect(restartIsHidden()).toBe(true);

      getAllSquares().forEach(function (square) {
        expect(ReactDOM.findDOMNode(square).textContent).toEqual(" ");
      });
    });
  });
});
