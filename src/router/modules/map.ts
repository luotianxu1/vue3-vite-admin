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
                component: () => import('@/views/map/AMapAdministrative.vue')
            },
            {
                path: 'aMapArea',
                name: '世界地图',
                component: () => import('@/views/map/AMapArea.vue')
            },
            {
                path: 'aMapAreaMask',
                name: '区域掩模',
                component: () => import('@/views/map/AMapAreaMask.vue')
            }
        ]
    }
]

export default mapRouter
