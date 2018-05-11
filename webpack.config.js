const path = require("path");
const fs = require("fs");
const BannerPlugin = require("webpack").BannerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");

var nodeModules = {};
fs
  .readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

module.exports = {
  target: "node",
  entry: "./src/www.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.js"
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "./src")],
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "public"),
        to: path.resolve(__dirname, "build", "public")
      },
      {
        from: path.resolve(__dirname, "package.json"),
        to: path.resolve(__dirname, "build")
      }
    ])
  ],
  devtool: "sourcemap"
};
