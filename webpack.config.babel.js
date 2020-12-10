import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import NodemonPlugin from "nodemon-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const src = path.resolve(__dirname, "src");

const config = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: [src],
    output: {
      path: path.join(__dirname, "dist"),
      publicPath: "/",
      filename: isProduction ? "app.js" : "app.[contenthash].js",
    },
    plugins: [
      new CleanWebpackPlugin(),
      new NodemonPlugin({
        watch: [
          path.resolve("./dist"),
          path.resolve(".env"),
          path.resolve("package.json"),
        ],
        ignore: ["./node_modules"],
        verbose: true,
        delay: "1000",
      }),
      new CopyPlugin({ patterns: [{ from: ".env" }] }),
    ],
    target: "node",
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false, // if you don't put this is, __dirname
      __filename: false, // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    stats: {
      warnings: false,
    },
  };
};

export default config;
