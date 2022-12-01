import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import index from "@/views/index.vue";
import login from "@/views/member/login.vue";
import signup from "@/views/member/signup.vue";
import layout from "@/layouts/layout.vue";
import pageRouter from "./pageRouter";
import commonRouter from "./common-router";
import signupFinish from "@/views/member/signup-finish.vue";

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
    name: "로그인",
    component: login,
  },
  {
    // 회원가입
    path: "/signup",
    name: "회원가입",
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
    component: layout,
    children: [...pageRouter, ...commonRouter],
    beforeEnter: requireAuth(),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 라우터 이동 스플래시 적용
router.beforeEach(function (to, from, next) {
  store.commit("loadingStart");
  setTimeout(() => {
    next();
  }, 250);
});

router.afterEach((to, from) => {
  store.commit("loadingEnd");
});

export default router;
