import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import index from "@/views/index.vue";
import login from "@/views/login.vue";
import signup from "@/views/signup.vue";
import FrameDefault from "@/layouts/workFrame.vue";
import pageRouter from "./pageRouter";
import signupFinish from "@/views/signup-finish";

Vue.use(VueRouter);

const requireAuth = () => (to, from, next) => {
  if (!store.getters["isLoggedIn"]) {
    return next("/index");
  } else {
    return next();
  }
};

const routes = [
  {
    //앱 메인
    path: "/index",
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
    // 회원가입
    path: "/signup",
    name: "signup",
    component: signup,
  },
  {
    //회원가입 완료
    path: "/signup-finish",
    name: "signup-finish",
    component: signupFinish,
  },
  {
    path: "/",
    component: FrameDefault,
    children: [...pageRouter],
    // beforeEnter: requireAuth(),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
