import dayjs from "dayjs"
/**
 * 毫秒转时分秒
 * @param val
 * @returns
 */
export const formatterSToHMS = (val: number) => {
	const time = val * 1000
	const days = time / 1000 / 60 / 60 / 24
	const daysRound = Math.floor(days)
	const hours = time / 1000 / 60 / 60 - 24 * daysRound
	const hoursRound = Math.floor(hours)
	const minutes = time / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound
	const minutesRound = Math.floor(minutes)
	const seconds = time / 1000 - 24 * 60 * 60 * daysRound - 60 * 60 * hoursRound - 60 * minutesRound
	return hoursRound + ":" + minutesRound + ":" + seconds
}

/**
 *
 * @param val 获取当前星期
 * @returns
 */
export const getWeek = (val: number) => {
	let day = dayjs(val).day()
	let week = ""
	switch (day) {
		case 1:
			week = "星期一"
			break
		case 2:
			week = "星期二"
			break
		case 3:
			week = "星期三"
			break
		case 4:
			week = "星期四"
			break
		case 5:
			week = "星期五"
			break
		case 6:
			week = "星期六"
			break
		case 0:
			week = "星期日"
			break
		default:
			week = ""
	}
	return week
}

/**
 * 格式化时间
 * @param val
 * @param type
 * @returns
 */
export const transformTime = (val, type) => {
	return dayjs(val).format(type)
}

/**
 * @description 获取当前时间对应的提示语
 * @return string
 */
export function getTimeState() {
	// 获取当前时间
	let timeNow = new Date()
	// 获取当前小时
	let hours = timeNow.getHours()
	// 判断当前时间段
	if (hours >= 6 && hours <= 10) return `早上好 ⛅`
	if (hours >= 10 && hours <= 14) return `中午好 🌞`
	if (hours >= 14 && hours <= 18) return `下午好 🌞`
	if (hours >= 18 && hours <= 24) return `晚上好 🌛`
	if (hours >= 0 && hours <= 6) return `凌晨好 🌛`
}
