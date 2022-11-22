export default [
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/attend/appMain.vue"),
  },
  {
    path: "/attendhistory",
    name: "attendhistory",
    component: () => import("@/views/attend/attendHistory.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () => import("@/views/common/myPage.vue"),
  },
];
