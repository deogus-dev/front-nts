// vue.config.js

const path = require("path");

module.exports = {
  devServer: {
    port: 7888,
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        withCredentials: true,
      },
      "/main": {
        target: "http://localhost:8081",
        changeOrigin: true,
        withCredentials: true,
      },
    },
  },
  lintOnSave: false,
  outputDir: path.resolve(__dirname, "../src/main/resources/static/"),
};
