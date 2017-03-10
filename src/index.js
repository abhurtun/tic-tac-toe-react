var React = require("react");
var ReactDOM = require("react-dom");
var Board = require("./board");

require("babel-polyfill");
require("./styles.scss");

ReactDOM.render(
  React.createElement(Board),
  document.getElementById("tic-tac-toe-container")
);
