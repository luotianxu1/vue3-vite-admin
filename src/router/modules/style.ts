import LayoutBase from '@/components/layoutBase/index.vue'
import { RouteRecordRaw } from 'vue-router'

const demoRouter: RouteRecordRaw[] = [
    {
        path: '/style',
        component: LayoutBase,
        name: '样式',
        meta: { title: 'style' },
        redirect: '/style/lottery',
        children: [
            {
                path: 'navigation',
                name: '导航栏1',
                component: () => import('@/views/style/navigation/Navigation.vue')
            },
            {
                path: 'navigation2',
                name: '导航栏2',
                component: () => import('@/views/style/navigation/Navigation2.vue')
            },
            {
                path: 'navigation3',
                name: '导航栏3',
                component: () => import('@/views/style/navigation/Navigation3.vue')
            },
            {
                path: 'card1',
                name: '卡片1',
                component: () => import('@/views/style/card/Card1.vue')
            },
            {
                path: 'card2',
                name: '卡片2',
                component: () => import('@/views/style/card/Card2.vue')
            },
            {
                path: 'card3',
                name: '卡片3',
                component: () => import('@/views/style/card/Card3.vue')
            },
            {
                path: 'card4',
                name: '卡片4',
                component: () => import('@/views/style/card/Card4.vue')
            },
            {
                path: 'card5',
                name: '卡片5',
                component: () => import('@/views/style/card/Card5.vue')
            },
            {
                path: 'card6',
                name: '卡片6',
                component: () => import('@/views/style/card/Card6.vue')
            },
            {
                path: 'button1',
                name: '按钮1',
                component: () => import('@/views/style/button/Button1.vue')
            },
            {
                path: 'button2',
                name: '按钮2',
                component: () => import('@/views/style/button/Button2.vue')
            },
            {
                path: 'loading1',
                name: 'Loading1',
                component: () => import('@/views/style/loading/Loading1.vue')
            },
            {
                path: 'gradient',
                name: '渐变背景',
                component: () => import('@/views/style/gradient/Gradient.vue')
            },
            {
                path: 'input',
                name: '动态输入框',
                component: () => import('@/views/style/input/input.vue')
            }
        ]
    }
]

export default demoRouter
