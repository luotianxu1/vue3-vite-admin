export interface IRouterList {
	title: string
	path: string
	icon: string
	close: boolean
}

export interface ThemeConfigProps {
	primary: string
	layout: "vertical" | "transverse" | "classic" | "columns"
	isDark: boolean
	isGrey: boolean
	isCollapse: boolean
	breadcrumb: boolean
	breadcrumbIcon: boolean
	tabs: boolean
	tabsIcon: boolean
	footer: boolean
}

export interface GlobalState {
	language: string
	routerActive: string
	routerList: IRouterList[]
	pageSize: number
	systemTime: number
	themeConfig: ThemeConfigProps
}
