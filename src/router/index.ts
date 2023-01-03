import { createRouter, createWebHashHistory } from "vue-router"
import NProgress from "@/config/nprogress"
import { getToken } from "@/utils/token"
import { GLOB_APP_LOGIN, GLOB_APP_TITLE, TOKEN } from "@/config/config"
import { RROUTER_WHITLE } from "@/config/config"
import { staticRouter } from "./modules/staticRouter"
import { initdynamicRouter } from "./modules/dynamicRouter"
import { UserStore } from "@/store/modules/user"
NProgress.configure({ showSpinner: false })

/**
 * @description 动态路由参数配置简介 📚
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param icon ==> 菜单图标
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */

const router = createRouter({
	routes: staticRouter,
	history: createWebHashHistory(),
	scrollBehavior: () => {
		// 始终滚动到顶部
		return { top: 0, left: 0 }
	}
})

/**
 * 路由拦截
 */
router.beforeEach(async (to, from, next) => {
	// NProgess开始
	NProgress.start()
	// 动态设置标题
	document.title = to.meta.title ? `${to.meta.title} - ${GLOB_APP_TITLE}` : GLOB_APP_TITLE

	// 判断是访问登陆页，有 Token 就在当前页面，没有 Token 放行到登陆页
	if (to.path === GLOB_APP_LOGIN) {
		if (getToken(TOKEN)) {
			return next(from.fullPath)
		}
		return next()
	}
	// 判断是否在白名单
	if (RROUTER_WHITLE.indexOf(to.path) > -1) {
		return next()
	}

	// 判断是否有 Token，没有重定向到 login
	if (!getToken(TOKEN)) return next({ path: GLOB_APP_LOGIN, replace: true })

	// 如果没有菜单列表，就重新请求菜单列表并添加动态路由
	const userStore = UserStore()
	if (!userStore.USER_MENULIST.length) {
		await initdynamicRouter()
		return next({ ...to, replace: true })
	}
	next()
})

router.afterEach(() => {
	NProgress.done()
})

router.onError(error => {
	NProgress.done()
	console.warn("路由错误", error.message)
})

export default router
