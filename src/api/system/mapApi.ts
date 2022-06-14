import request from '@/api/request'
import { ResponseData } from '@/api/type'

// 全国城市信息
export const getCitys = (): Promise<ResponseData<any>> => request.post('/api/city')
// 疫情数据
export const getEpidemic = (): Promise<ResponseData<any>> => request.post('/api/epidemic')
// 海量点标记
export const getMassPointMarkers = (): Promise<ResponseData<any>> => request.post('/api/position')
// 海量点
export const getMassMarkers = (): Promise<ResponseData<any>> => request.post('/api/mass')
// 北京区域信息
export const getBeijingInfo = (): Promise<ResponseData<any>> => request.post('/api/beijing')
// 北京房地产
export const getBeijingHouse = (): Promise<ResponseData<any>> => request.post('/api/beijingHouse')
// 上海位置
export const getShanghai = (): Promise<ResponseData<any>> => request.post('/api/shanghai')
// 北京交通事故
export const trafficAccident = (): Promise<ResponseData<any>> => request.post('/api/trafficaccident')
