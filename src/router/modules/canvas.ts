import LayoutOpen from '@/components/layoutOpen/index.vue'
import { RouteRecordRaw } from 'vue-router'

const canvasRouter: RouteRecordRaw[] = [
    {
        path: '/canvas',
        component: LayoutOpen,
        name: 'canvas',
        meta: { title: 'canvas' },
        redirect: '/system/canvas',
        children: [
            {
                path: 'canvas1',
                name: 'canvas1',
                meta: { title: 'canvas1', keepAlive: true },
                component: () => import('@/views/canvas/Canvas.vue')
            }
        ]
    }
]

export default canvasRouter
