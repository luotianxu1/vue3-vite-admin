import LayoutBase from '@/components/layoutBase/index.vue'
import { RouteRecordRaw } from 'vue-router'

const functionRouter: RouteRecordRaw[] = [
    {
        path: '/echarts',
        component: LayoutBase,
        name: 'Echarts',
        meta: { title: 'echarts' },
        redirect: '/echarts/pie1',
        children: [
            {
                path: 'pie1',
                name: '饼图1',
                component: () => import('@/views/echarts/pie/Pie1.vue')
            },
            {
                path: 'pie2',
                name: '饼图2',
                component: () => import('@/views/echarts/pie/Pie2.vue')
            },
            {
                path: 'pie3',
                name: '饼图3',
                component: () => import('@/views/echarts/pie/Pie3.vue')
            },
            {
                path: 'gauge1',
                name: '仪表盘1',
                component: () => import('@/views/echarts/gauge/Gauge1.vue')
            },
            {
                path: 'gauge2',
                name: '仪表盘2',
                component: () => import('@/views/echarts/gauge/Guage2.vue')
            },
            {
                path: 'guage3',
                name: '仪表盘3',
                component: () => import('@/views/echarts/gauge/Guage3.vue')
            },
            {
                path: 'bar1',
                name: '柱形图1',
                component: () => import('@/views/echarts/bar/Bar1.vue')
            },
            {
                path: 'bar2',
                name: '柱形图2',
                component: () => import('@/views/echarts/bar/Bar2.vue')
            },
            {
                path: 'bar3',
                name: '柱形图3',
                component: () => import('@/views/echarts/bar/Bar3.vue')
            },
            {
                path: 'bar4',
                name: '柱形图4',
                component: () => import('@/views/echarts/bar/Bar4.vue')
            },
            {
                path: 'bar5',
                name: '柱形图5',
                component: () => import('@/views/echarts/bar/Bar5.vue')
            },
            {
                path: 'bar6',
                name: '柱形图6',
                component: () => import('@/views/echarts/bar/Bar6.vue')
            },
            {
                path: 'line1',
                name: '折线图1',
                component: () => import('@/views/echarts/line/Line1.vue')
            },
            {
                path: 'line2',
                name: '折线图2',
                component: () => import('@/views/echarts/line/Line2.vue')
            },
            {
                path: 'tree1',
                name: '树图1',
                component: () => import('@/views/echarts/tree/Tree1.vue')
            }
        ]
    }
]

export default functionRouter
