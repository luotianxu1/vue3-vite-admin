import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import systemRouter from '@/router/modules/system'
import demoRouter from '@/router/modules/style'
import mapRouter from '@/router/modules/map'
import openRouter from '@/router/modules/open'
import threeRouter from '@/router/modules/three'
import functionRouter from '@/router/modules/function'
import errorRouter from '@/router/modules/error'
import cesiumRouter from '@/router/modules/cesium'
import gameRouter from '@/router/modules/game'
import workRouter from '@/router/modules/work'
import echartsRouter from '@/router/modules/echarts'
import NProgress from 'nprogress'
import 'nprogress/css/nprogress.css'
NProgress.configure({ showSpinner: false })

export const asyncRouterList: Array<RouteRecordRaw> = [
    ...systemRouter,
    ...demoRouter,
    ...mapRouter,
    ...openRouter,
    ...threeRouter,
    ...functionRouter,
    ...errorRouter,
    ...cesiumRouter,
    ...gameRouter,
    ...workRouter,
    ...echartsRouter
]

export type AppRouteRecordRaw = RouteRecordRaw & {
    hidden?: boolean
}

const baseRouter: AppRouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/system/login/Login.vue')
    },
    {
        // 找不到路由重定向到404页面
        path: '/:pathMatch(.*)',
        redirect: { name: '404' }
    }
]

const routes: RouteRecordRaw[] = [...baseRouter, ...asyncRouterList]

const router = createRouter({
    routes: routes,
    history: createWebHashHistory(),
    scrollBehavior() {
        // 始终滚动到顶部
        return { top: 0 }
    }
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
