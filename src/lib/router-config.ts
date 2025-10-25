import { createRouter, createWebHistory } from "vue-router";
import SignIn  from "@app/signin/page.vue";
import Landing from "@app/landing/page.vue";
import SignUp  from "@app/signup/page.vue";
import Main    from "@app/main/page.vue";

const routes = [
  { path: "/signin",    name: "SignIn",      component: SignIn },
  { path: "/",          name: "LandingPage", component: Landing},
  { path: "/signup",    name: "SignUp",      component: SignUp},
  { path: '/main-page', name: "Main",        component: Main}
];

const router = createRouter({
   history: createWebHistory(),
  routes,
});

export default router;
