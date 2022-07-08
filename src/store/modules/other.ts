import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'

export const UserStore = defineStore({
    id: 'OtherState',
    state: () => ({

    }),
    getters: {
    },
    actions: {
    },
    persist: piniaPersistConfig('OtherState')
})
