import request from '@/api/request'
import { ResponseData } from '@/api/interface/type'

// 用户登录
export interface LoginParams {
    password: string
    username: string
}

// 用户注册
export interface RegisterParams extends LoginParams {
    passwordAgain: string
}

// 用户信息
export interface LoginData {
    id: number
    name: string
    sex: number
    phone: number
    email: string
    city: string
    status: number
    type: number
    img: string
    addTime: string
    editTime: string
}

// 获取用户菜单
export interface PageListParams {
    userId: string
    name: string
    type: '0' | '1' | '2' | '3'
    time: string
}

// 用户列表
export interface UserList {
    list: []
}

// 删除用户
export interface UserDel {
    id: number
}

// 用户登录
export const loginApi = (data: LoginParams): Promise<ResponseData<LoginData>> =>
    request.post('/api/login', data)

// 用户注册
export const registerApi = (
    data: RegisterParams
): Promise<ResponseData<null>> => request.post('/api/register', data)

// 获取用户菜单
export const getUserPageList = (
    data: PageListParams
): Promise<ResponseData<UserList>> => request.post('/api/pageListV2', data)

// 获取用户列表
export const getUserListApi = (
    data: PageListParams
): Promise<ResponseData<UserList>> => request.post('/api/userList', data)

// 删除用户
export const deleteUserApi = (data: UserDel): Promise<ResponseData<null>> =>
    request.post('/api/deleteUser', data)
