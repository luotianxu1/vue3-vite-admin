import { GLOB_APP_HOME } from "@/config/config"
import { RouteRecordRaw } from "vue-router"

export type AppRouteRecordRaw = RouteRecordRaw & {
	hidden?: boolean
}

export const staticRouter: AppRouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/login"
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/system/login/Login.vue")
	},
	{
		path: "/layout",
		name: "layout",
		component: () => import("@/components/layoutBase/index.vue"),
		redirect: GLOB_APP_HOME,
		children: []
	},
	{
		path: "/403",
		name: "403",
		component: () => import("@/views/error/403.vue")
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/views/error/404.vue")
	},
	{
		path: "/500",
		name: "500",
		component: () => import("@/views/error/500.vue")
	}
]

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
	path: "/:pathMatch(.*)*",
	name: "notFound",
	redirect: { name: "404" }
}
