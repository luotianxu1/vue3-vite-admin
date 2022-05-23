import LayoutBase from '@/components/layoutBase/index.vue'
import { RouteRecordRaw } from 'vue-router'

const mapRouter: RouteRecordRaw[] = [
    {
        path: '/map',
        component: LayoutBase,
        name: '地图',
        meta: { title: '地图' },
        redirect: '/map/aMapStatus',
        children: [
            {
                path: 'aMapStatus',
                name: '地图状态',
                component: () => import('@/views/map/AMapStatus.vue')
            },
            {
                path: 'aMapAdministrative',
                name: '简易行政区',
                component: () => import('@/views/map/mapType/AMapAdministrative.vue')
            },
            {
                path: 'aMapArea',
                name: '世界地图',
                component: () => import('@/views/map/mapType/AMapArea.vue')
            },
            {
                path: 'aMapAreaMask',
                name: '区域掩模',
                component: () => import('@/views/map/mapType/AMapAreaMask.vue')
            },
            {
                path: 'aMapEvent',
                name: '地图事件',
                component: () => import('@/views/map/mapEvent/AMapEvent.vue')
            },
            {
                path: 'aMapCoverEvent',
                name: '覆盖物事件',
                component: () => import('@/views/map/mapEvent/AMapCoverEvent.vue')
            },
            {
                path: 'aMapOtherEvent',
                name: '其他事件',
                component: () => import('@/views/map/mapEvent/AMapOtherEvent.vue')
            }
        ]
    }
]

export default mapRouter
