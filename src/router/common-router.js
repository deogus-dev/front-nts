export default [
  {
    path: "/profile",
    name: "프로필정보",
    component: () => import("@/views/common/profile.vue"),
    props: true,
  },
  {
    path: "/notice",
    name: "공지사항",
    component: () => import("@/views/common/notice.vue"),
    props: true,
  },
  {
    path: "/noticedetl",
    name: "공지사항",
    component: () => import("@/views/common/noticeDetl.vue"),
    props: true,
  },
  {
    path: "/terms",
    name: "이용약관",
    component: () => import("@/views/common/terms.vue"),
    props: true,
  },
  {
    path: "/privacy",
    name: "개인정보처리방침",
    component: () => import("@/views/common/privacy.vue"),
    props: true,
  },
  {
    path: "/version",
    name: "버전정보",
    component: () => import("@/views/common/version.vue"),
    props: true,
  },
];
