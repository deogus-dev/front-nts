export default [
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/common/profile.vue"),
    props: true,
  },
  {
    path: "/notice",
    name: "notice",
    component: () => import("@/views/common/notice.vue"),
    props: true,
  },
  {
    path: "/noticedetl",
    name: "noticedetl",
    component: () => import("@/views/common/noticeDetl.vue"),
    props: true,
  },
  {
    path: "/terms",
    name: "terms",
    component: () => import("@/views/common/terms.vue"),
    props: true,
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () => import("@/views/common/privacy.vue"),
    props: true,
  },
  {
    path: "/version",
    name: "version",
    component: () => import("@/views/common/version.vue"),
    props: true,
  },
];
