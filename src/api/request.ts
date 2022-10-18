import axios, {
    AxiosInstance,
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse
} from 'axios'
import { checkStatus } from './checkStatus'
// import { diffTokenTime, getToken } from '@/utils/auth'

const request: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL as string,
    timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // if (getToken()) {
        //     if (diffTokenTime()) {
        //         return Promise.reject(new Error('请重新登录！'))
        //     }
        // }

        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    (result: AxiosResponse) => {
        const { data } = result
        if (data.status && data.status !== 200) {
            checkStatus(data.status)
            return Promise.reject(data)
        }
        return data
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

export default request
