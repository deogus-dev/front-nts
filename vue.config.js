// vue.config.js

const path = require("path");

module.exports = {
  devServer: {
    port: 7888,
    proxy: {
      "/auth": {
        target: "http://localhost:8080",
        changeOrigin: true,
        withCredentials: true,
      },
      "/user/v1": {
        target: "http://localhost:8080",
        changeOrigin: true,
        withCredentials: true,
      },
    },
  },
  lintOnSave: false,
  publicPath: "/front-nts/",
  outputDir: "./docs",
  // outputDir: path.resolve(__dirname, "../src/main/resources/static/"),
};
