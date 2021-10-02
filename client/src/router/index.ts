import Login from "@/components/Login.vue";
import Registration from "@/components/Registration.vue";
import AfterLogin from "@/components/AfterLogin.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  { path: "/", component: Login },
  { path: "/registration", component: Registration },
  { path: "/home/", component: AfterLogin,name:'home' },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
