import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "./axios.js";

import "bootstrap-icons/font/bootstrap-icons.css";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  axios,
  render: (h) => h(App),
}).$mount("#app");
