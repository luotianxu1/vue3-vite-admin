import { defineStore } from 'pinia'
import { UserState } from '../interface/user'
// import piniaPersistConfig from '@/config/piniaPersist'
import { loginApi } from '@/api/system/userApi'
import md5 from 'md5'
import { TOKEN } from '@/utils/constane'
import { setToken, getToken } from '@/utils/auth'
import router from '@/router/index'

export const UserStore = defineStore({
    id: 'UserState',
    state: (): UserState => ({
        USER_INFO: {},
        TOEKN: getToken(TOKEN) || ''
    }),
    getters: {},
    actions: {
        login(userInfo) {
            const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                loginApi({ username, password: md5(password) })
                    .then((res) => {
                        if (res.data?.isLogin) {
                            ElMessage.success(res.message)
                            setToken(TOKEN, res.data.token)
                            router.push('/system/user')
                        }
                        resolve(res)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        }
    }
    // persist: piniaPersistConfig('UserState')
})
