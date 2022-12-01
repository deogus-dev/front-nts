export default [
  {
    path: "/",
    name: "",
    component: () => import("@/views/attend/appMain.vue"),
  },
  {
    path: "/attendhistory",
    name: "내 근무기록",
    component: () => import("@/views/attend/attendHistory.vue"),
  },
  {
    path: "/mypage",
    name: "설정",
    component: () => import("@/views/common/myPage.vue"),
  },
];
