import request from '@/api/request'
import { ResponseData } from '@/api/type'

// 全国城市信息
export const getCitys = (): Promise<ResponseData<any>> => request.post('/api/city')

// 疫情数据
export const getEpidemic= (): Promise<ResponseData<any>> => request.post('/api/epidemic')

// 海量点标记
export const getMassPointMarkers= (): Promise<ResponseData<any>> => request.post('/api/position')
