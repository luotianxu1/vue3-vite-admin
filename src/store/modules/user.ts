import { defineStore } from "pinia"
import { UserState } from "../interface/user"
// import piniaPersistConfig from "@/config/piniaPersist"
import { loginApi, getUserInfoApi, getUserPageList } from "@/api/system/userApi"
import md5 from "md5"
import { GLOB_APP_HOME, TOKEN } from "@/config/config"
import { setToken, getToken, removeAllToken } from "@/utils/token"
import router from "@/router/index"
import { setTimeStamp } from "@/utils/auth"
import { ElNotification } from "element-plus"
import { getTimeState } from "@/utils/time"
import { initdynamicRouter } from "@/router/modules/dynamicRouter"
import { getFlatArr, getShowMenuList, getAllBreadcrumbList } from "@/utils/route"

export const UserStore = defineStore({
	id: "UserState",
	state: (): UserState => ({
		// 用户信息
		userInfo: {},
		// token
		token: getToken(TOKEN) || "",
		// 用户菜单
		userMenuList: [],
		// 按钮权限
		userButtonList: []
	}),
	getters: {
		// 扁平化之后的一维数组路由，主要用来添加动态路由
		flatMenuListGet: state => getFlatArr(state.userMenuList),
		// 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
		showMenuListGet: state => getShowMenuList(state.userMenuList),
		// 所有面包屑导航列表
		breadcrumbListGet: state => getAllBreadcrumbList(state.userMenuList)
	},
	actions: {
		/**
		 * 用户登录
		 * @param userInfo
		 * @returns
		 */
		async login(userInfo) {
			const { username, password } = userInfo
			const { data } = await loginApi({ username, password: md5(password) })
			if (data?.isLogin) {
				ElNotification({
					title: getTimeState(),
					type: "success",
					duration: 3000
				})
				setToken(TOKEN, data.token)
				await initdynamicRouter()
				router.push(GLOB_APP_HOME)
				// 保存登录时间
				setTimeStamp()
			} else {
				ElMessage.warning(data?.message)
			}
		},
		/**
		 * 获取用户信息
		 */
		async getUserInfo() {
			const res = await getUserInfoApi({
				token: this.token
			})
			res.data && (this.userInfo = res.data)
		},
		/**
		 * 退出登录
		 */
		logout() {
			this.userInfo = {}
			this.token = ""
			removeAllToken()
			router.push("/login")
		},
		/**
		 * 获取用户菜单
		 */
		async getUserMenuList() {
			const { data } = await getUserPageList({
				userId: this.token as string
			})
			if (data) {
				this.userMenuList = data.list
			}
		}
	}
	// persist: piniaPersistConfig("UserState")
})
