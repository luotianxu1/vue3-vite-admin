import LayoutBase from '@/components/layoutBase/index.vue'
import { RouteRecordRaw } from 'vue-router'

const canvasRouter: RouteRecordRaw[] = [
    {
        path: '/canvas',
        component: LayoutBase,
        name: 'canvas',
        meta: { title: 'canvas' },
        redirect: '/system/canvas',
        children: [
            {
                path: 'canvas1',
                name: 'canvas1',
                meta: { title: 'canvas1', keepAlive: true },
                component: () => import('@/views/canvas/Canvas1.vue')
            },
            {
                path: 'canvas2',
                name: '抽奖',
                meta: { title: 'canvas2', keepAlive: true },
                component: () => import('@/views/canvas/Canvas2.vue')
            },
            {
                path: 'canvas3',
                name: '画板',
                meta: { title: 'canvas2', keepAlive: true },
                component: () => import('@/views/canvas/Canvas3.vue')
            },
            {
                path: 'canvas4',
                name: '时钟',
                meta: { title: 'canvas2', keepAlive: true },
                component: () => import('@/views/canvas/Canvas4.vue')
            },
            {
                path: 'canvas5',
                name: '碰撞',
                meta: { title: 'canvas2', keepAlive: true },
                component: () => import('@/views/canvas/Canvas5.vue')
            }
        ]
    }
]

export default canvasRouter
