import axios from 'axios'

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL as string,
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

// 请求拦截器
request.interceptors.response.use(result => {
    return result.data
}, error => {
    return Promise.reject(error)
})

export default request
