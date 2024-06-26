import path from "path";
import { Configuration } from "webpack";
import "webpack-dev-server";

const HtmlWebpackPlugin = require("html-webpack-plugin");
//現在の構成ではcssをモジュールとしてバンドルできないので、htmlファイルに直接記載した。
//開発にはcssファイルの方が都合がいいので、tsc --watchを使う。

const config: Configuration = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, //出力ファルダ内のファイルを全て削除してから、出力する
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // injects bundle.js to our new index.html
      inject: true,
      // copys the content of the existing index.html to the new /build index.html
      template: path.resolve("./index.html"),
    }),
  ],
};

export default config;
