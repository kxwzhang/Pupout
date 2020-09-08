module.exports = {
  entry: "./src/main/game.js",
  output: {
    filename: "./bundle.js",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js"],
  },
};
