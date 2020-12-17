import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in window) {
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
}

app.config.devtools = true

app.use(store).use(router).use(ElementPlus).mount('#app')
