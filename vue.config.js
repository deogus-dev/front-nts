// vue.config.js

const path = require("path");

module.exports = {
  // devServer: {
  //   port: 7888,
  //   proxy: process.env.VUE_APP_API_URL,
  // },
  lintOnSave: false,
  publicPath: "/front-nts/",
  outputDir: "./docs",
  // outputDir: path.resolve(__dirname, "../src/main/resources/static/"),
};
