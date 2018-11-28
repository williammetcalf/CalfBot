const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Environment = require("./src/config/Environment");
const NodemonPlugin = require("nodemon-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
  entry: ["@babel/polyfill", "./src/client/index.js"],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.ejs$/,
        loader: "ejs-loader?variable=env"
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   favicon: "./public/favicon.ico",
    //   template: "./public/index.html.ejs",
    //   inject: "body",
    //   templateParameters: new Environment().public
    // }),
    new NodemonPlugin({})
  ]
};
