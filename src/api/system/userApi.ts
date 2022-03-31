import requests from '@/api/request'

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

interface ResponseData<T> {
    status: number,
    message: string,
    data?: T | null
}

interface RegisterParams extends LoginParams{
    passwordAgain: string
}

interface PageListParams {
    id: number
}

interface PageList {
    list: []
}

interface UserList {
    list: [],
    total: number
}

// 用户登录
export const loginApi = (data: LoginParams): Promise<ResponseData<LoginData>> => requests.post('/api/login', data)

// 用户注册
export const registerApi = (data: RegisterParams): Promise<ResponseData<null>> => requests.post('/api/register', data)

// 获取用户菜单
export const getUserPageList = (data: PageListParams): Promise<ResponseData<UserList>> => requests.post('/api/pageList', data)

// 获取用户列表
export const getUserListApi = (data: PageListParams) :Promise<ResponseData<UserList>> => requests.post('/api/userList', data)

// 删除用户
export const deleteUserApi = (data: PageListParams) :Promise<ResponseData<null>> => requests.post('/api/deleteUser', data)
