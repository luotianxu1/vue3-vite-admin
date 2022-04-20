import { App } from 'vue'
import MList from './list'
import MTextEditor from './textEditor'

const components = [MList, MTextEditor]

export default {
    install(app: App) {
        components.map(item => {
            app.use(item)
        })
    }
}
