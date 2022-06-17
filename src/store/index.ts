import { defineStore , createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { GlobalState } from './interface'
import piniaPersistConfig from '@/config/piniaPersist'

export const GlobalStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: 'GlobalState',
    state: (): GlobalState => ({
        // 系统语言
        SYSTEM_LANGUAGE: 'zh',
        // 是否收缩侧边栏
        SYSTEM_COLLAPSE: false,
        // 当前页面路由
        SYSTEM_ACTIVE_ROUTER: '',
        // 历史路由
        SYSTEM_ROUTER: []
    }),
    getters: {},
    actions: {
    },
    persist: piniaPersistConfig('GlobalState')
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
