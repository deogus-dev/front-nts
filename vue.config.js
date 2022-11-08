// vue.config.js

const path = require("path");

module.exports = {
  // devServer: {
  //   port: 7888,
  // proxy: {
  //   "/auth": {
  //     target: "http://localhost:8080",
  //     changeOrigin: true,
  //     withCredentials: true,
  //   },
  //   "/user/v1": {
  //     target: "http://localhost:8080",
  //     changeOrigin: true,
  //     withCredentials: true,
  //   },
  // },
  //   proxy: "http://3.36.236.131:8080",
  // },
  lintOnSave: false,
  publicPath: "/front-nts/",
  outputDir: "./docs",
  // outputDir: path.resolve(__dirname, "../src/main/resources/static/"),
};
