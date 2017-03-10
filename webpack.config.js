var path = require("path");

// css-loader requires a recent version of node since they removed the
// shim for Promise. Bring in babel-polyfill in case running on an old
// system.
// https://github.com/webpack/css-loader/issues/144
require("babel-polyfill");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['react']
      }
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }]
  }
};
