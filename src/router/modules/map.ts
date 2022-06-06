import LayoutBase from '@/components/layoutBase/index.vue'
import { RouteRecordRaw } from 'vue-router'

const mapRouter: RouteRecordRaw[] = [
    {
        path: '/map',
        component: LayoutBase,
        name: '地图',
        meta: { title: '地图' },
        redirect: '/map/aMapStatus',
        children: [
            {
                path: 'aMapStatus',
                name: '地图状态',
                component: () => import('@/views/map/AMapStatus.vue')
            },
            {
                path: 'aMapAdministrative',
                name: '简易行政区',
                component: () => import('@/views/map/mapType/AMapAdministrative.vue')
            },
            {
                path: 'aMapArea',
                name: '世界地图',
                component: () => import('@/views/map/mapType/AMapArea.vue')
            },
            {
                path: 'aMapAreaMask',
                name: '区域掩模',
                component: () => import('@/views/map/mapType/AMapAreaMask.vue')
            },
            {
                path: 'aMapEvent',
                name: '地图事件',
                component: () => import('@/views/map/mapEvent/AMapEvent.vue')
            },
            {
                path: 'aMapCoverEvent',
                name: '覆盖物事件',
                component: () => import('@/views/map/mapEvent/AMapCoverEvent.vue')
            },
            {
                path: 'aMapMarker',
                name: '标记点',
                component: () => import('@/views/map/mapCover/AMapMarker.vue')
            },
            {
                path: 'aMapTrackPlayback',
                name: '轨迹回放',
                component: () => import('@/views/map/mapCover/AMapTrackPlayback.vue')
            },
            {
                path: 'aMapAvoidLayers',
                name: '避让图层',
                component: () => import('@/views/map/mapCover/AMapAvoidLayers.vue')
            },
            {
                path: 'aMapTextMarker',
                name: '文字标注',
                component: () => import('@/views/map/mapCover/AMapTextMarker.vue')
            },
            {
                path: 'aMapMassPointMarkers',
                name: '海量点',
                component: () => import('@/views/map/mapCover/AMapMassPointMarkers.vue')
            },
            {
                path: 'aMapMassMarkers',
                name: '海量点2',
                component: () => import('@/views/map/mapCover/AMapMassMarkers.vue')
            },
            {
                path: 'aMapPointAggregation',
                name: '点聚合',
                component: () => import('@/views/map/mapCover/AMapPointAggregation.vue')
            },
            {
                path: 'aMapPointAggregation2',
                name: '按索引点聚合',
                component: () => import('@/views/map/mapCover/AMapPointAggregation2.vue')
            },
            {
                path: 'aMapVectorGraphics',
                name: '矢量图形',
                component: () => import('@/views/map/mapCover/AMapVectorGraphics.vue')
            },
            {
                path: 'aMapMenu',
                name: '右键菜单',
                component: () => import('@/views/map/mapCover/AMapMenu.vue')
            },
            {
                path: 'aMapInfoWindow',
                name: '信息窗体',
                component: () => import('@/views/map/mapCover/AMapInfoWindow.vue')
            },
            {
                path: 'aMapInputHint',
                name: '输入提示',
                component: () => import('@/views/map/mapSearch/AMapInputHint.vue')
            },
            {
                path: 'aMapPlanning',
                name: '驾车路线规划',
                component: () => import('@/views/map/mapPlanning/AMapPlanning.vue')
            },
            {
                path: 'aMapDragPlanning',
                name: '拖拽路线规划',
                component: () => import('@/views/map/mapPlanning/AMapDragPlanning.vue')
            },
            {
                path: 'aMapGeocoding',
                name: '地理编码',
                component: () => import('@/views/map/mapOther/AMapGeocoding.vue')
            },
            {
                path: 'aMapLocation',
                name: '定位',
                component: () => import('@/views/map/mapOther/AMapLocation.vue')
            }
        ]
    }
]

export default mapRouter
