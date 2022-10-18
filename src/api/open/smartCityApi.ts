import { IResponseData } from '@/api/interface/type'
import request from '@/api/request'

// 信息面板
export const getSmartCityInfo = (): Promise<IResponseData<any>> =>
    request.post('/api/smartCityInfo')
// 事件列表
export const getSmartCityEvent = (): Promise<IResponseData<any>> =>
    request.post('/api/smartCityEvent')
