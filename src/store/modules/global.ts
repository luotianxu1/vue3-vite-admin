import { defineStore } from "pinia"
import piniaPersistConfig from "@/config/piniaPersist"
import { GlobalState, IRouterList } from "../interface/global"
import { GLOB_APP_HOME, TABS_BLACK_LIST } from "@/config/config"
import router from "@/router/index"
import dayjs from "dayjs"

export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "GlobalState",
	state: (): GlobalState => ({
		SYSTEM_LANGUAGE: "zh",
		SYSTEM_COLLAPSE: false,
		SYSTEM_ACTIVE_ROUTER: GLOB_APP_HOME,
		SYSTEM_ROUTER_LIST: [{ title: "首页", path: GLOB_APP_HOME, close: false }],
		SYSTEM_PAGE_SIZE: 30,
		SYETEM_TIME: 0
	}),
	getters: {
		systemTime(state) {
			return dayjs(state.SYETEM_TIME).format("YYYY-MM-DD HH:mm:ss")
		}
	},
	actions: {
		// 添加tab
		addTabs(tabItem: IRouterList) {
			if (TABS_BLACK_LIST.includes(tabItem.path)) {
				return
			}

			const tabInfo: IRouterList = {
				title: tabItem.title,
				path: tabItem.path,
				close: tabItem.close
			}
			if (this.SYSTEM_ROUTER_LIST.every(item => item.path !== tabItem.path)) {
				this.SYSTEM_ROUTER_LIST.push(tabInfo)
			}
			this.setTabsMenuValue(tabItem.path)
		},
		// 删除tab
		removeTabs(tabPath: string) {
			let SYSTEM_ACTIVE_ROUTER = this.SYSTEM_ACTIVE_ROUTER
			const SYSTEM_ROUTER_LIST = this.SYSTEM_ROUTER_LIST
			if (SYSTEM_ACTIVE_ROUTER === tabPath) {
				SYSTEM_ROUTER_LIST.forEach((item, index) => {
					if (item.path !== tabPath) {
						return
					}
					const nextTab = SYSTEM_ROUTER_LIST[index + 1] || SYSTEM_ROUTER_LIST[index - 1]
					if (!nextTab) {
						return
					}
					SYSTEM_ACTIVE_ROUTER = nextTab.path
					router.push(nextTab.path)
				})
			}
			this.SYSTEM_ACTIVE_ROUTER = SYSTEM_ACTIVE_ROUTER
			this.SYSTEM_ROUTER_LIST = SYSTEM_ROUTER_LIST.filter(item => item.path !== tabPath)
		},
		// 设置当前路由
		setTabsMenuValue(SYSTEM_ACTIVE_ROUTER: string) {
			this.SYSTEM_ACTIVE_ROUTER = SYSTEM_ACTIVE_ROUTER
		},
		// 关闭其他
		closeMultipleTab(tabsMenuValue?: string) {
			this.SYSTEM_ROUTER_LIST = this.SYSTEM_ROUTER_LIST.filter(item => {
				return item.path === tabsMenuValue || item.path === GLOB_APP_HOME
			})
		},
		// 关闭所有
		goHome() {
			router.push(GLOB_APP_HOME)
			this.SYSTEM_ACTIVE_ROUTER = GLOB_APP_HOME
		}
	},
	persist: piniaPersistConfig("GlobalState")
})