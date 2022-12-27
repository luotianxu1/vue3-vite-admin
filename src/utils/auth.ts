/**
 *
 * @param key 设置token
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
 *
 * @param key 获取token
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
