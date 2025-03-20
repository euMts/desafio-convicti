import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Login from "../views/LoginView.vue";
import App from "../views/AppView.vue";
import Logout from "@/views/LogoutView.vue";
import NotFound from "@/views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/", component: App, meta: { requiresAuth: true } },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.path === "/login" && isAuthenticated) {
    next("/"); // if the user is authenticated he cant go to /login
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
