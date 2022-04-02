import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import system, { SystemStateType } from '@/store/modules/system'
import user, { UserSate } from '@/store/modules/user'
import createPersistedState from 'vuex-persistedstate'

export type State = {
    user?: UserSate
    system?: SystemStateType
}

// eslint-disable-next-line symbol-description
export const Key: InjectionKey<Store<State>> = Symbol()

const store = createStore({
    plugins: [
        createPersistedState({
            key: 'vue3-vite-admin'
        })
    ],
    modules: {
        system,
        user
    }
})

export default store
