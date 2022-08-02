import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import index from "@/views/index.vue";
import login from "@/views/login.vue";
import Home from "@/views/HomeView.vue";
import FrameDefault from "@/layouts/workFrame.vue";

Vue.use(VueRouter);

const requireAuth = () => (to, from, next) => {
  if (!store.getters["isLoggedIn"]) {
    return next("/login");
  } else {
    return next();
  }
};

const routes = [
  {
    //앱 메인
    path: "/",
    name: "appmain",
    component: index,
  },
  {
    //로그인
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/",
    component: FrameDefault,
    children: [
      {
        path: "/",
        name: "main",
        component: Home,
      },
    ],
    beforeEnter: requireAuth(),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
