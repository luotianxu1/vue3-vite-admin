import { RouteRecordRaw } from 'vue-router'
import LayoutOpen from '@/components/layoutOpen/index.vue'

const openRouter: RouteRecordRaw[] = [
    {
        path: '/open',
        component: LayoutOpen,
        name: '其他',
        meta: { title: '其他' },
        redirect: '/open/car',
        children: [
            {
                path: 'drag',
                name: '拖拽',
                component: () => import('@/views/open/drag/index.vue')
            },
            {
                path: 'rankedList',
                name: '排名列表',
                component: () => import('@/views/open/ranking/List.vue')
            },
            {
                path: 'homeViewing',
                name: '全景看房',
                meta: { title: 'homeViewing' },
                component: () =>
                    import('@/views/three/demo/houseViewing/HomeViewing.vue')
            },
            {
                path: 'rankedManage',
                name: '排名管理',
                component: () => import('@/views/open/ranking/Manage.vue')
            },
            {
                path: 'smartCity',
                name: '智慧城市',
                component: () => import('@/views/open/smartCity/SmartCity.vue')
            },
            {
                path: 'smartPark',
                name: '智慧园区',
                component: () => import('@/views/open/smartPark/SmartPark.vue')
            },
            {
                path: 'smartFactory',
                name: '智慧工厂',
                component: () =>
                    import('@/views/open/smartFactory/SmartFactory.vue')
            },
            {
                path: 'metaverse',
                name: '八叉树',
                component: () => import('@/views/open/metaverse/Metaverse.vue')
            },
            {
                path: 'smartCity2',
                name: '智慧城市2',
                component: () => import('@/views/open/smartCity2/HomeView.vue')
            },
            {
                path: 'hotel',
                name: '日夜交替',
                component: () => import('@/views/open/hotel/Hotel.vue')
            },
            {
                path: 'map',
                name: '3D地图',
                component: () => import('@/views/open/map/Map.vue')
            },
            {
                path: 'jump',
                name: '跳一跳',
                component: () => import('@/views/open/jump/Jump.vue')
            }
        ]
    }
]

export default openRouter
