import { IMenuOptions, IUserData } from "@/api/system/userApi"

export interface UserState {
	// 用户信息
	USER_INFO: IUserData
	// token
	TOEKN: string
	// 用户菜单
	USER_MENULIST: Array<IMenuOptions>
	// 按钮权限
	USER_BUTTNLIST: Array<any>
}
