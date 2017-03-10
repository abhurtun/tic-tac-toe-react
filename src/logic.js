// The players
var X = "X";
var O = "0";
var EMPTY = " ";

// Winning combos
var WIN_COMBOS = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diags
];

var togglePlayer = function (who) {
  return who === X ? O : X;
};

var validIndex = function (square) {
  return square >= 0 && square < 9;
};

var squareAvailable = function (board, square) {
  return validIndex(square) && (board[square] === EMPTY);
};

var whoWon = function (board) {
  return WIN_COMBOS.find(function (combo) {
    return board[combo[0]] !== EMPTY &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]];
  });
};

// win or a draw?
var isBoardFull = function (board) {
  return board.every(function (square) {
    return square !== EMPTY;
  });
};


var game = function (board, player) {
  return {

    play: function (square) {
      if (this.isOver(board) || !squareAvailable(board, square)) {
        // If the move is invalid, don't advance the state.
        return this;
      } else {
        // If the move is valid, update the board with the acquired
        // spot and switch whose turn it is.
        var newBoard = board.map(function (oldVal, idx) {
          return square === idx ? player : oldVal;
        });
        return game(newBoard, togglePlayer(player));
      }
    },

    playerAt: function (idx) {
      return validIndex(idx) ? board[idx] : null;
    },

    isOver: function () {
      return whoWon(board) || isBoardFull(board);
    },

    message: function () {
      var status = this.isOver();
      if (!status) {
        return "In progress";
      } else if (Array.isArray(status)) {
        return this.playerAt(status[0]) + " wins!";
      } else {
        return "A tie!";
      }
    }
  }
};

module.exports = {
  // Starts a new game.
  createNewGame: function () {
    var initialPlayer = X;
    var emptyBoard = [EMPTY,EMPTY,EMPTY,
                      EMPTY,EMPTY,EMPTY,
                      EMPTY,EMPTY,EMPTY];
    return game(emptyBoard, initialPlayer);
  }
};
