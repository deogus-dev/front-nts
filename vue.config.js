// vue.config.js

const path = require("path");

module.exports = {
  devServer: {
    port: 7888,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/main": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  lintOnSave: false,
  outputDir: path.resolve(__dirname, "../src/main/resources/static/"),
};
