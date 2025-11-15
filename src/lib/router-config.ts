import { createRouter, createWebHistory } from "vue-router";
import SignIn from "@app/signin/page.vue";
import Landing from "@app/landing/page.vue";
import SignUp from "@app/signup/page.vue";
import Main from "@app/main/page.vue";
import ActivityPage from "@/app/components/UI/ActivityPage.vue";
import profile from "@/app/components/UI/UserProfile.vue"
const routes = [
  { path: "/signin", name: "SignIn", component: SignIn },
  { path: "/", name: "LandingPage", component: Landing },
  { path: "/signup", name: "SignUp", component: SignUp },
  { path: "/main-page", name: "Main", component: Main },
  {
    path: "/teams/:id",
    name: "Team",
    component: () => import("../app/components/UI/teams-page.vue"),
    props: true,
  },
   {
    path: "/activity/:id",
    name: "activity",
    component: ActivityPage,
  },
  {
    path: "/UserProfile",
    name: "Profile",
    component: profile
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
