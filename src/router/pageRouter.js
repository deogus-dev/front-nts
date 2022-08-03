export default [
  {
    path: "/",
    name: "page1",
    component: () => import("@/views/pages/page1.vue"),
  },
  {
    path: "/",
    name: "page2",
    component: () => import("@/views/pages/page2.vue"),
  },
  {
    path: "/",
    name: "page3",
    component: () => import("@/views/pages/page3.vue"),
  },
  {
    path: "/",
    name: "page4",
    component: () => import("@/views/pages/page4.vue"),
  },
  {
    path: "/",
    name: "page5",
    component: () => import("@/views/pages/page5.vue"),
  },
];