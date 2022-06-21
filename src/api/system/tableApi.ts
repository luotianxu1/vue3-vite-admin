import request from '@/api/request'
import { ResponseData } from '@/api/interface/type'

interface PageListParams {
    id: number
}

interface UserList {
    list: [],
    total: number
}

export const getUserPageList = (data: PageListParams): Promise<ResponseData<UserList>> => request.post('/api/userList', data)
