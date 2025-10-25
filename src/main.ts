import { createApp } from "vue";

import App    from "@/App.vue";  
import router from "@lib/router-config";

import "./assets/global.css"
import PrimeVue from "primevue/config";
import Aura from '@primeuix/themes/aura';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.mount("#app");
