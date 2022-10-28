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
                path: 'guage4',
                name: '仪表盘4',
                component: () => import('@/views/echarts/gauge/Guage4.vue')
            },
            {
                path: 'guage5',
                name: '仪表盘5',
                component: () => import('@/views/echarts/gauge/Guage5.vue')
            },
            {
                path: 'guage6',
                name: '仪表盘6',
                component: () => import('@/views/echarts/gauge/Guage6.vue')
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
                path: 'bar7',
                name: '柱形图7',
                component: () => import('@/views/echarts/bar/Bar7.vue')
            },
            {
                path: 'bar8',
                name: '柱形图8',
                component: () => import('@/views/echarts/bar/Bar8.vue')
            },
            {
                path: 'bar9',
                name: '柱形图9',
                component: () => import('@/views/echarts/bar/Bar9.vue')
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
                path: 'line3',
                name: '折线图3',
                component: () => import('@/views/echarts/line/Line3.vue')
            },
            {
                path: 'tree1',
                name: '树图1',
                component: () => import('@/views/echarts/tree/Tree1.vue')
            },
            {
                path: 'tree2',
                name: '树图2',
                component: () => import('@/views/echarts/tree/Tree2.vue')
            },
            {
                path: 'scatter1',
                name: '散点图1',
                component: () => import('@/views/echarts/scatter/Scatter1.vue')
            },
            {
                path: 'map1',
                name: '地图1',
                component: () => import('@/views/echarts/map/Map1.vue')
            },
            {
                path: 'map2',
                name: '地图2',
                component: () => import('@/views/echarts/map/Map2.vue')
            },
            {
                path: 'map3',
                name: '地图3',
                component: () => import('@/views/echarts/map/Map3.vue')
            },
            {
                path: 'map4',
                name: '地图4',
                component: () => import('@/views/echarts/map/Map4.vue')
            },
            {
                path: 'graph1',
                name: '关系图1',
                component: () => import('@/views/echarts/graph/Graph1.vue')
            }
        ]
    }
]

export default functionRouter
