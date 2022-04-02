import LayoutBase from '@/components/layoutBase/index.vue'
import { RouteRecordRaw } from 'vue-router'

const mapRouter: RouteRecordRaw[] = [
    {
        path: '/map',
        component: LayoutBase,
        name: '地图',
        meta: { title: '地图' },
        redirect: '/map/aMapDefaultLayer',
        children: [
            {
                path: 'aMapLife',
                name: '生命周期',
                component: () => import('@/views/map/AMapLife.vue')
            },
            {
                path: 'aMapStatus',
                name: '地图状态',
                component: () => import('@/views/map/AMapStatus.vue')
            },
            {
                path: 'aMapDefaultLayer',
                name: '标准地图',
                component: () => import('@/views/map/AMapDefaultLayer.vue')
            },
            {
                path: 'aMapLiveLayer',
                name: '实时路况',
                component: () => import('@/views/map/AMapLiveLayer.vue')
            },
            {
                path: 'aMapSatelliteLayer',
                name: '卫星图',
                component: () => import('@/views/map/AMapSatelliteLayer.vue')
            }
        ]
    }
]

export default mapRouter
