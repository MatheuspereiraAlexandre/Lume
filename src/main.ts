import { createApp } from "vue";
import App from "@/App.vue";
import router from "@lib/router-config";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import Menu from "primevue/menu";
import "primeicons/primeicons.css";
import "./assets/global.css";
import "primeicons/primeicons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.component("Menubar", Menubar);
app.component("Dialog", Dialog);
app.component("Button", Button);
app.component("Menu", Menu);

app.mount("#app");
