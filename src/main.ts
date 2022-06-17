import { createApp } from 'vue'
import router from './router'
import pinia from '@/store/index'
import I18n from '@/lang/index'
import App from './App.vue'
import '@/assets/scss/main.scss'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(pinia)
app.use(I18n)
app.mount('#app')
