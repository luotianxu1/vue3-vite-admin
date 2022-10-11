import { App } from 'vue'
import copy from './modules/copy'
import waterMarker from './modules/waterMark'
import draggable from './modules/draggable'
import longpress from './modules/longPress'
import throttle from './modules/throttle'
import debounce from './modules/debounce'

const directivesList: any = {
    copy,
    waterMarker,
    draggable,
    longpress,
    throttle,
    debounce
}

const directives = {
    install: function (app: App<Element>) {
        Object.keys(directivesList).forEach((key) => {
            // 注册自定义指令
            app.directive(key, directivesList[key])
        })
    }
}

export default directives
