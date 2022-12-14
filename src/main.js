import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueMoment from "vue-moment";
import dateUtil from "@/utils/date-util";
import "./axios.js";
import "@/assets/js/fontAwesomeIcon";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "@/assets/css/main.css";
import "@/assets/css/common.css";
import "@/assets/css/transition.css";
import "@/assets/css/font.css";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$dateUtil = dateUtil;

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

Vue.component("globalAlert", () => import("@/components/alert/global.vue"));
Vue.component("backComponent", () => import("@/components/backComponent.vue"));
Vue.component("loading", () => import("@/components/loading.vue"));

Vue.filter("timeFormat", function (val) {
  if (!val) {
    return "--:--:--";
  } else {
    return (
      val.substring(0, 2) +
      ":" +
      val.substring(2, 4) +
      ":" +
      val.substring(4, 6)
    );
  }
  // return (
  //   val.substring(0, 2) + ":" + val.substring(2, 4) + ":" + val.substring(4, 6)
  // );
});

Vue.use(VueMoment);

new Vue({
  router,
  store,
  axios,
  render: (h) => h(App),
}).$mount("#app");
