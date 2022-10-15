import dayjs from 'dayjs'
// 秒转换为HH:mm:ss
export const formatterSToHMS = (val: number) => {
    const time = val * 1000
    const days = time / 1000 / 60 / 60 / 24
    const daysRound = Math.floor(days)
    const hours = time / 1000 / 60 / 60 - 24 * daysRound
    const hoursRound = Math.floor(hours)
    const minutes = time / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound
    const minutesRound = Math.floor(minutes)
    const seconds =
        time / 1000 -
        24 * 60 * 60 * daysRound -
        60 * 60 * hoursRound -
        60 * minutesRound
    return hoursRound + ':' + minutesRound + ':' + seconds
}

// 获取当前星期
export const getWeek = (val: number) => {
    let day = dayjs(val).day()
    let week = ''
    switch (day) {
        case 1:
            week = '星期一'
            break
        case 2:
            week = '星期二'
            break
        case 3:
            week = '星期三'
            break
        case 4:
            week = '星期四'
            break
        case 5:
            week = '星期五'
            break
        case 6:
            week = '星期六'
            break
        case 0:
            week = '星期日'
            break
        default:
            week = ''
    }
    return week
}

export const transformTime = (val, type) => {
    return dayjs(val).format(type)
}
