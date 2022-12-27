import { defineStore } from 'pinia'
import { UserState } from '../interface/user'
// import piniaPersistConfig from '@/config/piniaPersist'
import { loginApi, getUserInfoApi } from '@/api/system/userApi'
import md5 from 'md5'
import { TOKEN } from '@/config/config'
import { setToken, getToken, removeAllToken } from '@/utils/token'
import router from '@/router/index'
import { setTimeStamp } from '@/utils/auth'

export const UserStore = defineStore({
    id: 'UserState',
    state: (): UserState => ({
        USER_INFO: {},
        TOEKN: getToken(TOKEN) || ''
    }),
    getters: {},
    actions: {
        /**
         * 用户登录
         * @param userInfo
         * @returns
         */
        login(userInfo) {
            const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                loginApi({ username, password: md5(password) })
                    .then((res) => {
                        if (res.data?.isLogin) {
                            ElMessage.success(res.message)
                            setToken(TOKEN, res.data.token)
                            this.getUserInfo()
                            router.push('/system/user')
                            // 保存登录时间
                            setTimeStamp()
                        }
                        resolve(res)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        /**
         * 获取用户信息
         */
        async getUserInfo() {
            const res = await getUserInfoApi(this.TOEKN)
            res.data && (this.USER_INFO = res.data)
        },
        /**
         * 退出登录
         */
        logout() {
            this.USER_INFO = {}
            this.TOEKN = ''
            removeAllToken()
            router.push('/login')
        }
    }
    // persist: piniaPersistConfig('UserState')
})
