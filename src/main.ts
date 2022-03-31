import { createApp } from 'vue'
import router from './router'
import store, { Key } from '@/store'
import I18n from '@/lang/index'
import App from './App.vue'
import '@/assets/main.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(store, Key)
app.use(I18n)
app.config.globalProperties.$I18n = I18n
app.mount('#app')
