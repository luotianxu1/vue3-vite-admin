import { createApp } from 'vue'
import router from './router'
import pinia from '@/store/index'
import I18n from '@/lang/index'
import App from './App.vue'
import directives from '@/directives/index'
import '@/assets/scss/main.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(I18n)
app.use(directives)
app.mount('#app')
