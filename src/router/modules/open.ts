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
                path: 'rankedManage',
                name: '排名管理',
                component: () => import('@/views/open/ranking/Manage.vue')
            },
            {
                path: 'smartCity',
                name: '智慧城市',
                component: () => import('@/views/open/smartCity/SmartCity.vue')
            }
        ]
    }
]

export default openRouter
