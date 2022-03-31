import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import systemRouter from '@/router/modules/system'

export const asyncRouterList: Array<RouteRecordRaw> = [...systemRouter]

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

console.log(routes)

const router = createRouter({
    routes: routes,
    history: createWebHashHistory()
})

export default router
