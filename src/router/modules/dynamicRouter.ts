import { GLOB_APP_LOGIN } from "@/config/config"
import { UserStore } from "@/store/modules/user"
import { isType } from "@/utils/global"
import router from ".."
import { notFoundRouter } from "./staticRouter"

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/**/*.vue")

export const initdynamicRouter = async () => {
	const userStore = UserStore()

	try {
		await userStore.getUserMenuList()
		if (!userStore.USER_MENULIST.length) {
			ElNotification({
				title: "无权限访问",
				message: "当前账号无任何菜单权限，请联系系统管理员！",
				type: "warning",
				duration: 3000
			})
			router.replace(GLOB_APP_LOGIN)
			return Promise.reject("暂无权限！")
		}

		userStore.flatMenuListGet.forEach((item: any) => {
			item.children && delete item.children
			if (item.component && isType(item.component) === "string") {
				item.component = modules["../../views" + item.component + ".vue"]
			}

			if (item.meta.isFull) {
				router.addRoute(item)
			} else {
				router.addRoute("layout", item)
			}
		})

		// 4.最后添加 notFoundRouter
		router.addRoute(notFoundRouter)
	} catch (error) {
		router.replace(GLOB_APP_LOGIN)
		return Promise.reject(error)
	}
}
