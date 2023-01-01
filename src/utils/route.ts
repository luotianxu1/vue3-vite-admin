import path from "path-browserify"
/**
 * 所有的子集路由
 */
export const getChildrenRoutes = routes => {
	const result: any = []
	routes.forEach(route => {
		if (route.children && route.children.length > 0) {
			result.push(...route.children)
		}
	})
	return result
}

/**
 * 处理脱离层级的路由
 */
export const filterRoutes = routes => {
	// 所有的子集路由
	const childrenRoutes = getChildrenRoutes(routes)

	// 根据子集路由进行查重
	return routes.filter(route => {
		return !childrenRoutes.find(childrenRoute => {
			return childrenRoute.path === route.path
		})
	})
}

const isNull = data => {
	if (!data || JSON.stringify(data) === "{}" || JSON.stringify(data) === "[]") {
		return true
	}
}

/**
 * 根据routes数据返回对应的menu数据
 */
export const generateMenus = (routes, basePath = "") => {
	const result: any = []
	routes.forEach(item => {
		if (isNull(item.children) && isNull(item.meta)) {
			return
		}
		if (isNull(item.meta) && !isNull(item.children)) {
			result.push(...generateMenus(item.children))
			return
		}
		const routePath = path.resolve(basePath, item.path)

		let route = result.find(item => item.path === routePath)
		if (!route) {
			route = {
				...item,
				path: routePath,
				children: []
			}
			if (route.meta.title) {
				result.push(route)
			}
		}
		if (!isNull(item.children)) {
			route.children.push(...generateMenus(item.children, route.path))
		}
	})
	return result
}
