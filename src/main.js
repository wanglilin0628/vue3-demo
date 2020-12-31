import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import * as echarts from 'echarts'

const app = createApp(App)

app.config.devtools = true
app.config.performance = true
app.config.globalProperties.$echarts = echarts

// if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in window) {
//   window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
// }

app.use(store).use(router).use(ElementPlus, {locale}).mount('#app')
