import LayoutBase from '@/components/layoutBase/index.vue'
import { RouteRecordRaw } from 'vue-router'

const systemRouter: RouteRecordRaw[] = [
    {
        path: '/three',
        component: LayoutBase,
        name: 'threejs',
        meta: { title: 'three' },
        redirect: '/three/base',
        children: [
            {
                path: 'base',
                name: '第一个三维场景',
                meta: { title: '第一个三维场景'},
                component: () => import('@/views/three/base/base.vue')
            },
            {
                path: 'shadow',
                name: '阴影',
                meta: { title: '阴影'},
                component: () => import('@/views/three/base/shadow.vue')
            },
            {
                path: 'sport',
                name: '运动',
                meta: { title: '运动'},
                component: () => import('@/views/three/base/sport.vue')
            }
        ]
    }
]

export default systemRouter
