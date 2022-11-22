export default [
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/common/profile.vue"),
  },
  {
    path: "/notice",
    name: "notice",
    component: () => import("@/views/common/notice.vue"),
  },
  {
    path: "/terms",
    name: "terms",
    component: () => import("@/views/common/terms.vue"),
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () => import("@/views/common/privacy.vue"),
  },
  {
    path: "/version",
    name: "version",
    component: () => import("@/views/common/version.vue"),
  },
];
