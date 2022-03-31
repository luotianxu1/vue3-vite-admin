import axios from 'axios'

const requests = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL as string,
    timeout: 10000
})

// 请求拦截器
requests.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

// 请求拦截器
requests.interceptors.response.use(result => {
    return result.data
}, error => {
    return Promise.reject(error)
})

export default requests
