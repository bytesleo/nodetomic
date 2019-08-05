import path from "path";
import nodeExternals from "webpack-node-externals";
import NodemonPlugin from "nodemon-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const src = path.resolve(__dirname, "src");

const config = {
  entry: [src],
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "server.js"
  },
  plugins: [new NodemonPlugin(), new CopyPlugin([{ from: ".env" }])],
  target: "node",
  node: {
    fs: "empty",
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  stats: {
    warnings: false
  }
};

export default config;
