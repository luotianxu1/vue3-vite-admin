/**
 * 扁平化数组
 */
export function getFlatArr(menuList: any) {
	let newMenuList: any = JSON.parse(JSON.stringify(menuList))
	return newMenuList.reduce((pre: any, current: any) => {
		let flatArr = [...pre, current]
		if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)]
		return flatArr
	}, [])
}
