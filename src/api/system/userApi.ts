import request from "@/api/request"
import { IResponseData } from "@/api/interface/type"

// 用户登录
export interface ILoginParams {
	password: string
	username: string
}

export interface ILoginData {
	isLogin: boolean
	token: string
	message?: string
}

export interface IRegisterParams extends ILoginParams {
	passwordAgain: string
}

export interface IRegisterData {
	isRegister: boolean
}

// 用户登录
export const loginApi = (data: ILoginParams): Promise<IResponseData<ILoginData>> => request.post("/api/login", data)

// 用户注册
export const registerApi = (data: IRegisterParams): Promise<IResponseData<IRegisterData>> => request.post("/api/register", data)

export interface IUserData {
	id?: string
	name?: string
	sex?: number
	age?: number
	type?: number
	phone?: number
	email?: string
	city?: string
	status?: number
	img?: string
	addTime?: string
	editTime?: string
}

// 获取用户信息
export const getUserInfoApi = (data: { token: string }): Promise<IResponseData<IUserData>> =>
	request.post("/api/getUserInfo", data)

export interface IPageListParams {
	userId: string
}

export interface IMetaProps {
	icon: string
	title: string
	activeMenu?: string
	isLink?: string
	isHide: boolean
	isFull: boolean
	isAffix: boolean
	isKeepAlive: boolean
}

export interface IMenuOptions {
	path: string
	name: string
	component?: string | (() => Promise<any>)
	redirect?: string
	meta: IMetaProps
	children?: IMenuOptions[]
}

export interface IPageListData {
	list: IMenuOptions[]
	total: number
}

// 获取用户菜单
export const getUserPageList = (data: IPageListParams): Promise<IResponseData<IPageListData>> =>
	request.post("/api/pageListV2", data)

export interface IPageUserParams {
	userId: string
	name: string
	type: "0" | "1" | "2" | "3"
	time: string
}

export interface IUserListData {
	list: IUserData[]
}

export interface IUserDel {
	id: number
}

// 获取用户列表
export const getUserListApi = (data: IPageUserParams): Promise<IResponseData<IUserListData>> =>
	request.post("/api/userList", data)

// 删除用户
export const deleteUserApi = (data: IUserDel): Promise<IResponseData<null>> => request.post("/api/deleteUser", data)
