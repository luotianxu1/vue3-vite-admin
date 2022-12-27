/**
 * 设置token
 * @param key
 * @param value
 */
export const setToken = (key, value) => {
    let data = value
    if (typeof value === 'object') {
        data = JSON.stringify(value)
    }
    localStorage.setItem(key, data)
}

/**
 * 获取token
 * @param key
 * @returns
 */
export const getToken = (key) => {
    const data = localStorage.getItem(key)
    if (!data) {
        return
    }
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}

/**
 * 删除所有token
 */
export const removeAllToken = () => {
    window.localStorage.clear()
}
