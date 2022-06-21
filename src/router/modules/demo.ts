import LayoutBase from '@/components/layoutBase/index.vue'
import { RouteRecordRaw } from 'vue-router'

const demoRouter: RouteRecordRaw[] = [
    {
        path: '/demo',
        component: LayoutBase,
        name: 'demo',
        meta: { title: 'demo' },
        redirect: '/demo/lottery',
        children: [
            {
                path: 'lottery',
                name: '抽奖',
                component: () => import('@/views/demo/lottery/Lottery.vue')
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
                path: 'card4',
                name: '卡片4',
                component: () => import('@/views/demo/card/Card4.vue')
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
            },
            {
                path: 'driver',
                name: '引导页',
                component: () => import('@/views/demo/driver/Driver.vue')
            },
            {
                path: 'richText',
                name: '富文本编辑器',
                component: () => import('@/views/demo/richText/RichText.vue')
            },
            {
                path: 'drag',
                name: '拖拽组件',
                component: () => import('@/views/demo/drag/Draggable.vue')
            },
            {
                path: 'gradient',
                name: '渐变背景',
                component: () => import('@/views/demo/gradient/Gradient.vue')
            },
            {
                path: 'embedded',
                name: '内嵌页面',
                component: () => import('@/views/demo/embedded/index.vue')
            }
        ]
    }
]

export default demoRouter
