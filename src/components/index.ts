import { App } from 'vue'
import List from './list'

const components = [List]

export default {
    install(app: App) {
        components.map(item => {
            app.use(item)
        })
    }
}
