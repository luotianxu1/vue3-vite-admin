import { createRouter, createWebHashHistory } from "vue-router"
import NProgress from "@/config/nprogress"
import { getToken } from "@/utils/token"
import { GLOB_APP_LOGIN, GLOB_APP_TITLE, TOKEN } from "@/config/config"
import { RROUTER_WHITLE } from "@/config/config"
import { staticRouter } from "./modules/staticRouter"
import { initdynamicRouter } from "./modules/dynamicRouter"
import { UserStore } from "@/store/modules/user"
NProgress.configure({ showSpinner: false })

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

	if (to.path === GLOB_APP_LOGIN) {
		return next()
	}
	// 判断是否在白名单
	if (RROUTER_WHITLE.indexOf(to.path) > -1) {
		return next()
	}

	if (!getToken(TOKEN)) return next({ path: GLOB_APP_LOGIN, replace: true })

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
