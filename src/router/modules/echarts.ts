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
            }
        ]
    }
]

export default functionRouter
