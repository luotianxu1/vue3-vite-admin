import LayoutBase from '@/components/layoutBase/index.vue'
import { RouteRecordRaw } from 'vue-router'

const demoRouter: RouteRecordRaw[] = [
    {
        path: '/demo',
        component: LayoutBase,
        name: 'demo',
        meta: { title: 'demo' },
        redirect: '/demo/lottery1',
        children: [
            {
                path: 'lottery1',
                name: '抽奖1',
                component: () => import('@/views/demo/lottery/Lottery1.vue')
            },
            {
                path: 'calendar',
                name: '日历',
                component: () => import('@/views/demo/calendar/Calendar.vue')
            },
            {
                path: 'content',
                name: '目录',
                component: () => import('@/views/demo/content/Content.vue')
            },
            {
                path: 'card1',
                name: '卡片1',
                component: () => import('@/views/demo/card/Card1.vue')
            },
            {
                path: 'card2',
                name: '卡片2',
                component: () => import('@/views/demo/card/Card2.vue')
            },
            {
                path: 'card3',
                name: '卡片3',
                component: () => import('@/views/demo/card/Card3.vue')
            },
            {
                path: 'button1',
                name: '按钮1',
                component: () => import('@/views/demo/button/Button1.vue')
            },
            {
                path: 'button2',
                name: '按钮2',
                component: () => import('@/views/demo/button/Button2.vue')
            },
            {
                path: 'loading1',
                name: 'Loading1',
                component: () => import('@/views/demo/loading/Loading1.vue')
            },
            {
                path: 'number',
                name: 'Number',
                component: () => import('@/views/demo/number/Number.vue')
            }
        ]
    }
]

export default demoRouter
