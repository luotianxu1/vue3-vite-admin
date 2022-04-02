import LayoutBase from '@/components/layoutBase/index.vue'
import { RouteRecordRaw } from 'vue-router'

const mapRouter: RouteRecordRaw[] = [
    {
        path: '/map',
        component: LayoutBase,
        name: '地图',
        meta: { title: '地图' },
        redirect: '/map/aMap',
        children: [
            {
                path: 'aMap',
                name: '高德地图',
                component: () => import('@/views/map/AMapTest.vue')
            },
            {
                path: 'aMapLiveLayer',
                name: '高德地图1',
                component: () => import('@/views/map/AMapLiveLayer.vue')
            }
        ]
    }
]

export default mapRouter
