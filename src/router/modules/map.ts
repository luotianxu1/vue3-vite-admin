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
                path: 'aMapDefaultLayer',
                name: '高德地图标准地图',
                component: () => import('@/views/map/AMapDefaultLayer.vue')
            },
            {
                path: 'aMapLiveLayer',
                name: '高德地图实时路况',
                component: () => import('@/views/map/AMapLiveLayer.vue')
            },
            {
                path: 'aMapSatelliteLayer',
                name: '高德地图卫星图',
                component: () => import('@/views/map/AMapSatelliteLayer.vue')
            }
        ]
    }
]

export default mapRouter
