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
                component: () => import('@/views/three/gettingStarted/Base.vue')
            },
            {
                path: 'shadow',
                name: '阴影',
                meta: { title: '阴影'},
                component: () => import('@/views/three/gettingStarted/Shadow.vue')
            },
            {
                path: 'sport',
                name: '运动',
                meta: { title: '运动'},
                component: () => import('@/views/three/gettingStarted/Sport.vue')
            },
            {
                path: 'scene',
                name: '场景',
                meta: { title: '场景'},
                component: () => import('@/views/three/basicComponents/Scene.vue')
            },
            {
                path: 'ambientLight',
                name: '基本光源',
                meta: { title: '基本光源'},
                component: () => import('@/views/three/light/AmbientLight.vue')
            },
            {
                path: 'spotLight',
                name: '聚光灯光源',
                meta: { title: '聚光灯光源'},
                component: () => import('@/views/three/light/SpotLight.vue')
            }
        ]
    }
]

export default systemRouter
