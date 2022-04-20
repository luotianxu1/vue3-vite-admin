import axios from 'axios'
import { ElMessage } from 'element-plus'
// import { diffTokenTime, getToken } from '@/utils/auth'

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL as string,
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // if (getToken()) {
        //     if (diffTokenTime()) {
        //         return Promise.reject(new Error('请重新登录！'))
        //     }
        // }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 请求拦截器
request.interceptors.response.use(
    (result) => {
        if (result.data.status && result.data.status !== 200) {
            ElMessage.error(result.data.msg || '请求失败，请稍后重试！')
            return Promise.reject(result.data)
        }
        return result.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default request
