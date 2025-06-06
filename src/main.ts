import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import Toast from "vue-toastification";
import 'element-plus/dist/index.css'
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from "@/router/index.js";
import '@/assets/css/style.css'
import pinia from "@/store/index.js";

const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
app.use(router)
// @ts-ignore
app.use(Toast)

app.mount('#app')
