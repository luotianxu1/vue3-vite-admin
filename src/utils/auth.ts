import { TOKEN_NAME, TOKEN_TIME, TOKEN_VALUE } from '@/utils/constant'

// 设置token
export const setToken = (val) => {
    localStorage.setItem(TOKEN_NAME, val)
}

// 获取token
export const getToken = () => {
    return localStorage.getItem(TOKEN_NAME)
}

// 登录时设置时间
export const setTokenTime = () => {
    localStorage.setItem(TOKEN_TIME, String(Date.now()))
}

// 获取时间
export const getTokenTime = () => {
    return localStorage.getItem(TOKEN_TIME)
}

// 对比是否过期
export const diffTokenTime = () => {
    const currentTime = Date.now()
    const tokenTime = getTokenTime()
    return currentTime - Number(tokenTime) > TOKEN_VALUE
}
