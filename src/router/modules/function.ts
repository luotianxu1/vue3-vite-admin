import LayoutBase from '@/components/layoutBase/index.vue'
import { RouteRecordRaw } from 'vue-router'

const functionRouter: RouteRecordRaw[] = [
    {
        path: '/function',
        component: LayoutBase,
        name: '功能',
        meta: { title: '功能' },
        redirect: '/function/lottery',
        children: [
            {
                path: 'lottery',
                name: '抽奖',
                component: () => import('@/views/function/lottery/Lottery.vue')
            },
            {
                path: 'number',
                name: '数字',
                component: () => import('@/views/function/number/Number.vue')
            },
            {
                path: 'driver',
                name: '引导页',
                component: () => import('@/views/function/driver/Driver.vue')
            },
            {
                path: 'richText',
                name: '富文本编辑器',
                component: () =>
                    import('@/views/function/richText/RichText.vue')
            },
            {
                path: 'drag',
                name: '拖拽组件',
                component: () => import('@/views/function/drag/Draggable.vue')
            },
            {
                path: 'embedded',
                name: '内嵌页面',
                component: () => import('@/views/function/embedded/index.vue')
            },
            {
                path: 'copyDirect',
                name: '复制指令',
                component: () => import('@/views/function/copyDirect/index.vue')
            },
            {
                path: 'waterMark',
                name: '水印指令',
                component: () =>
                    import('@/views/function/waterMarkDirect/index.vue')
            },
            {
                path: 'dragDirect',
                name: '拖拽指令',
                component: () => import('@/views/function/dragDirect/index.vue')
            },
            {
                path: 'longPress',
                name: '长按指令',
                component: () =>
                    import('@/views/function/longPressDirect/index.vue')
            },
            {
                path: 'throttle',
                name: '节流指令',
                component: () => import('@/views/function/throttle/index.vue')
            },
            {
                path: 'debounce',
                name: '防抖指令',
                component: () => import('@/views/function/debounce/index.vue')
            }
        ]
    }
]

export default functionRouter
