import request from '@/api/request'
import { IResponseData } from '@/api/interface/type'

// 全国城市信息
export const getCitys = (): Promise<IResponseData<any>> => request.post('/api/city')
// 疫情数据
export const getEpidemic = (): Promise<IResponseData<any>> => request.post('/api/epidemic')
// 海量点标记
export const getMassPointMarkers = (): Promise<IResponseData<any>> => request.post('/api/position')
// 海量点
export const getMassMarkers = (): Promise<IResponseData<any>> => request.post('/api/mass')
// 北京区域信息
export const getBeijingInfo = (): Promise<IResponseData<any>> => request.post('/api/beijing')
// 北京房地产
export const getBeijingHouse = (): Promise<IResponseData<any>> => request.post('/api/beijingHouse')
// 上海位置
export const getShanghai = (): Promise<IResponseData<any>> => request.post('/api/shanghai')
// 北京交通事故
export const trafficAccident = (): Promise<IResponseData<any>> =>
    request.post('/api/trafficaccident')
