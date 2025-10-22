import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../views/Sign-in.vue";
import Landing from "../views/Landing-page.vue";
import SignUp from "../views/Sign-up.vue";
import Main from "../views/Main-page.vue";

const routes = [
  { path: "/signin", name: "SignIn", component: SignIn },
  { path: "/", name: "LandingPage", component: Landing},
  { path: "/signup", name: "SignUp", component: SignUp},
  { path: '/mainPage', name: "Main", component: Main}
];

const router = createRouter({
   history: createWebHistory(),
  routes,
});

export default router;
