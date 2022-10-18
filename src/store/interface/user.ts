import { IUserData } from '@/api/system/userApi'

export interface UserState {
    // 用户信息
    USER_INFO: IUserData
    USER_ID: string
}
