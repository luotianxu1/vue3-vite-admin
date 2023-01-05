import { createApp } from "vue"
import router from "./router"
import pinia from "@/store/index"
import I18n from "@/lang/index"
import App from "./App.vue"
import directives from "@/directives/index"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "@/assets/scss/main.scss"
import * as globalVariables from "@/utils/global.js"

const app = createApp(App)
for (const key in globalVariables) {
	app.config.globalProperties[`$${key}`] = globalVariables[key]
}
app.use(router)
app.use(pinia)
app.use(I18n)
app.use(directives)
app.mount("#app")
