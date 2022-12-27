import { TIME_STAMP, TOKEN_TIME_VALUE } from '@/config/config'
import { getToken, setToken } from './token'

/**
 * 设置时间戳
 */
export const setTimeStamp = (): void => {
    setToken(TIME_STAMP, Date.now())
}

/**
 * 获取时间戳
 */
export const getTimeStamp = (): number => {
    return getToken(TIME_STAMP)
}

/**
 * 是否超时
 * @returns
 */
export const isCheckTimeout = (): boolean => {
    // 当前时间
    const currentTime = Date.now()
    // 缓存时间
    const timeStamp = getTimeStamp()
    return currentTime - timeStamp > TOKEN_TIME_VALUE
}
