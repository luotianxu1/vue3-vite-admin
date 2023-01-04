import { IMenuOptions } from "@/api/system/userApi"

/**
 * 扁平化数组
 */
export function getFlatArr(menuList: IMenuOptions[]) {
	let newMenuList: IMenuOptions[] = JSON.parse(JSON.stringify(menuList))
	return newMenuList.reduce((pre: IMenuOptions[], current: IMenuOptions) => {
		let flatArr = [...pre, current]
		if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)]
		return flatArr
	}, [])
}

/**
 * 使用递归，过滤出需要渲染在左侧菜单的列表（剔除 isHide == true 的菜单）
 * @param menuList
 * @returns
 */
export function getShowMenuList(menuList: IMenuOptions[]) {
	let newMenuList: IMenuOptions[] = JSON.parse(JSON.stringify(menuList))
	return newMenuList.filter(item => {
		item.children?.length && (item.children = getShowMenuList(item.children))
		return !item.meta?.isHide
	})
}

/**
 *
 * @param menuList 递归找出所有面包屑导航
 * @param result
 * @param parent
 * @returns
 */
export const getAllBreadcrumbList = (menuList: IMenuOptions[], result: { [key: string]: any } = {}, parent = []) => {
	for (const item of menuList) {
		result[item.path] = [...parent, item]
		if (item.children) getAllBreadcrumbList(item.children, result, result[item.path])
	}
	return result
}
