import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import systemRouter from '@/router/modules/system'
import demoRouter from '@/router/modules/demo'

export const asyncRouterList: Array<RouteRecordRaw> = [...systemRouter, ...demoRouter]

const baseRouter: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/view/login/Login.vue')
    }
]

const routes: RouteRecordRaw[] = [...baseRouter, ...asyncRouterList]

const router = createRouter({
    routes: routes,
    history: createWebHashHistory()
})

export default router
