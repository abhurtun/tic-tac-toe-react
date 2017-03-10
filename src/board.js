var React = require("react");
var Engine = require("./logic");

var Restart = React.createClass({
  render: function () {
    var game = this.props.game;

    // Restart button is hidden if game is not over.
    var classes = game.isOver() ? "restart" : "restart hidden";

    return (
      <div className={classes}>
        <p>{game.message()}</p>
        <button onClick={this.props.onClick}>
          New Game
        </button>
      </div>
    );
  }
});

// A React component for displaying an individual square in the board.
var Square = React.createClass({
  handleClick: function (e) {
    this.props.onPlay(this.props.position);
  },
  render: function () {
    var position = this.props.position;
    var gameOver = this.props.game.isOver();

    // Each square has a class of "square" and "squareX" where X is
    // its position in the board Array. Additionally, a square may
    // have a class of "winner" if it is part of the winning
    // combination.
    var classes = ["square", "square" + position];
    if (Array.isArray(gameOver) && gameOver.includes(position)) {
      classes.push("winner");
    }
    classes = classes.join(" ");

    return (
      <div className={classes} onClick={this.handleClick}>
        {this.props.game.playerAt(position)}
      </div>
    );
  }
});


var Board = React.createClass({

  // Set our initial state to be an empty game.
  getInitialState: function() {
    return Engine.createNewGame();
  },

  handlePlay: function (square) {
    this.setState(this.state.play(square));
  },

  restart: function () {
    this.setState(Engine.createNewGame());
  },

  render: function () {
    var attrs = {game:this.state, onPlay:this.handlePlay};
    return (
      <div>
        <div className="board">
          <div className="row">
            <Square position={0} {...attrs} />
            <Square position={1} {...attrs} />
            <Square position={2} {...attrs} />
          </div>
          <div className="row">
            <Square position={3} {...attrs} />
            <Square position={4} {...attrs} />
            <Square position={5} {...attrs} />
          </div>
          <div className="row">
            <Square position={6} {...attrs} />
            <Square position={7} {...attrs} />
            <Square position={8} {...attrs} />
          </div>
        </div>
        <Restart game={this.state} onClick={this.restart} />
      </div>
    );
  }
});

module.exports = Board;
