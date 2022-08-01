import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
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
    //로그인
    path: "/login",
    name: "login",
    component: login,
  },
  // {
  //   //회원가입
  //   path : '/signUp',
  //   name : 'signUp',
  //   component : signUp
  // },
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
