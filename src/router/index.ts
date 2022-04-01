import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import systemRouter from '@/router/modules/system'
import demoRouter from '@/router/modules/demo'
import NProgress from 'nprogress'
import 'nprogress/css/nprogress.css'
NProgress.configure({ showSpinner: false })

export const asyncRouterList: Array<RouteRecordRaw> = [...systemRouter, ...demoRouter]

export type AppRouteRecordRaw = RouteRecordRaw & {
    hidden: boolean
}

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

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
