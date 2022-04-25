import request from '@/api/request'
import { ResponseData } from '@/api/type'

interface LoginParams {
    password: string,
    username: string
}

interface LoginData {
    id: number,
    name: string,
    sex: number
    phone: number,
    email: string,
    city: string,
    status: number,
    type: number,
    img: string,
    addTime: string,
    editTime: string
}

interface RegisterParams extends LoginParams{
    passwordAgain: string
}

interface PageListParams {
    id: number
}

interface UserList {
    list: [],
    total: number
}

// 用户登录
export const loginApi = (data: LoginParams): Promise<ResponseData<LoginData>> => request.post('/api/login', data)

// 用户注册
export const registerApi = (data: RegisterParams): Promise<ResponseData<null>> => request.post('/api/register', data)

// 获取用户菜单
export const getUserPageList = (data: PageListParams): Promise<ResponseData<UserList>> => request.post('/api/pageListV2', data)

// 获取用户列表
export const getUserListApi = (data: PageListParams) :Promise<ResponseData<UserList>> => request.post('/api/userList', data)

// 删除用户
export const deleteUserApi = (data: PageListParams) :Promise<ResponseData<null>> => request.post('/api/deleteUser', data)
