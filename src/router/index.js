import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/info/:id",
      name: "info",
      component: () => import("@/views/PhotoPage.vue"),
    },
  ],
});

export default router;
