import { createApp } from 'vue'
import './style.css'
import App from "./App.vue";
import routes from "./utils/routes.js";
import store from "@/store/store.js";

createApp(App).use(store).use(routes).mount('#app');
