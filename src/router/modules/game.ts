import LayoutOpen from '@/components/layoutOpen/index.vue'
import { RouteRecordRaw } from 'vue-router'

const gameRouter: RouteRecordRaw[] = [
    {
        path: '/game',
        component: LayoutOpen,
        name: 'game',
        meta: { title: 'game' },
        redirect: '/game/sheep',
        children: [
            {
                path: 'sheep',
                name: 'sheep',
                meta: { title: 'sheep', keepAlive: true },
                component: () => import('@/views/game/sheep/Sheep.vue')
            },
            {
                path: 'jump',
                name: 'jump',
                meta: { title: 'jump', keepAlive: true },
                component: () => import('@/views/game/jump/Jump.vue')
            }
        ]
    }
]

export default gameRouter
