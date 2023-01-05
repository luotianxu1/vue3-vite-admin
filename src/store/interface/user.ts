import { IMenuOptions, IUserData } from "@/api/system/userApi"

export interface UserState {
	userInfo: IUserData
	token: string
	userMenuList: Array<IMenuOptions>
	userButtonList: Array<any>
}
