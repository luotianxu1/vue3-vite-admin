export function globalStaticAssets(url) {
	return new URL(`../assets/img/${url}`, import.meta.url).href
}

export function getStyle(el, prop) {
	return parseInt(window.getComputedStyle(el, null)[prop], 0)
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export function isType(val: any) {
	if (val === null) return "null"
	if (typeof val !== "object") return typeof val
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}
