import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueMoment from "vue-moment";
import "./axios.js";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "@/assets/css/main.css";
import "@/assets/css/transition.css";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.component("globalAlert", () => import("@/components/alert/global.vue"));

Vue.use(VueMoment);

new Vue({
  router,
  store,
  axios,
  render: (h) => h(App),
}).$mount("#app");
