import mockjs from 'mockjs'
import { IResponseData } from '@/api/interface/type'
import {
    ILoginParams,
    ILoginData,
    IRegisterParams,
    IRegisterData,
    IUserListData
} from '@/api/system/userApi'

const userInfo = mockjs.mock({
    id: '@id',
    name: '@cname',
    age: '@integer( 18, 60)',
    sex: '@integer( 0, 1)',
    phone: '@phone',
    email: '@email',
    city: '@county(true)',
    status: '@integer( 0, 1)',
    type: '@integer( 0, 1)',
    img: '@image',
    addTime: '@datetime',
    editTime: '@datetime'
})

export default [
    {
        url: '/testApi/api/login',
        method: 'post',
        response: ({ body }) => {
            let res = body as ILoginParams
            if (res.username === 'admin' && res.password === '1') {
                return <IResponseData<ILoginData>>{
                    status: 200,
                    message: '登陆成功！',
                    data: {
                        isLogin: true,
                        userId: '123465789'
                    }
                }
            }
            return <IResponseData<ILoginData>>{
                status: 200,
                message: '用户名或密码错误！',
                data: {
                    isLogin: false
                }
            }
        }
    },
    {
        url: '/testApi/api/register',
        method: 'post',
        response: ({ body }) => {
            let res = body as IRegisterParams
            if (res.password === res.passwordAgain) {
                return <IResponseData<IRegisterData>>{
                    status: 200,
                    message: '注册成功！',
                    data: {
                        isRegister: true
                    }
                }
            }
            return <IResponseData<IRegisterData>>{
                status: 200,
                message: '注册失败!',
                data: {
                    isRegister: false
                }
            }
        }
    },
    {
        url: '/testApi/api/getUserInfo',
        method: 'post',
        response: () => {
            return {
                status: 200,
                message: '查询用户信息成功！',
                data: {
                    ...userInfo
                }
            }
        }
    },
    {
        url: '/testApi/api/pageListV2',
        method: 'post',
        response: () => {
            return {
                status: 200,
                message: '获取菜单成功!',
                data: {
                    list: [
                        {
                            id: 1,
                            name: '高德地图',
                            icon: 'ditu',
                            url: '/aMap',
                            children: [
                                {
                                    id: 2,
                                    name: '地图状态',
                                    icon: 'locus',
                                    url: '/map/aMapStatus'
                                },
                                {
                                    id: 2,
                                    name: '地图切换',
                                    icon: 'locus',
                                    url: '/map/mapChange'
                                },
                                {
                                    id: 3,
                                    name: '类型',
                                    icon: 'locus',
                                    url: '/map/aMapAdministrative',
                                    children: [
                                        {
                                            id: 4,
                                            name: '简易行政区',
                                            icon: 'locus',
                                            url: '/map/aMapAdministrative'
                                        },
                                        {
                                            id: 5,
                                            name: '世界地图',
                                            icon: 'locus',
                                            url: '/map/aMapArea'
                                        },
                                        {
                                            id: 7,
                                            name: '区域掩模',
                                            icon: 'locus',
                                            url: '/map/aMapAreaMask'
                                        }
                                    ]
                                },
                                {
                                    id: 8,
                                    name: '事件',
                                    icon: 'locus',
                                    url: '/map/aMapEvent',
                                    children: [
                                        {
                                            id: 9,
                                            name: '地图事件',
                                            icon: 'locus',
                                            url: '/map/aMapEvent'
                                        },
                                        {
                                            id: 10,
                                            name: '覆盖物事件',
                                            icon: 'locus',
                                            url: '/map/aMapCoverEvent'
                                        }
                                    ]
                                },
                                {
                                    id: 11,
                                    name: '覆盖物',
                                    icon: 'locus',
                                    url: '/map/aMapMarker',
                                    children: [
                                        {
                                            id: 12,
                                            name: '点标记',
                                            icon: 'locus',
                                            url: '/map/aMapMarker'
                                        },
                                        {
                                            id: 13,
                                            name: '轨迹回放',
                                            icon: 'locus',
                                            url: '/map/aMapTrackPlayback'
                                        },
                                        {
                                            id: 14,
                                            name: '避让标注图层',
                                            icon: 'locus',
                                            url: '/map/aMapAvoidLayers'
                                        },
                                        {
                                            id: 15,
                                            name: '文字标注',
                                            icon: 'locus',
                                            url: '/map/aMapTextMarker'
                                        },
                                        {
                                            id: 16,
                                            name: '海量点',
                                            icon: 'locus',
                                            url: '/map/aMapMassPointMarkers'
                                        },
                                        {
                                            id: 17,
                                            name: '海量点2',
                                            icon: 'locus',
                                            url: '/map/aMapMassMarkers'
                                        },
                                        {
                                            id: 18,
                                            name: '聚合',
                                            icon: 'locus',
                                            url: '/map/aMapPointAggregation'
                                        },
                                        {
                                            id: 19,
                                            name: '按索引聚合',
                                            icon: 'locus',
                                            url: '/map/aMapPointAggregation2'
                                        },
                                        {
                                            id: 20,
                                            name: '矢量图形',
                                            icon: 'locus',
                                            url: '/map/aMapVectorGraphics'
                                        },
                                        {
                                            id: 21,
                                            name: '右键菜单',
                                            icon: 'locus',
                                            url: '/map/aMapMenu'
                                        },
                                        {
                                            id: 22,
                                            name: '信息窗体',
                                            icon: 'locus',
                                            url: '/map/aMapInfoWindow'
                                        }
                                    ]
                                },
                                {
                                    id: 23,
                                    name: '搜索服务',
                                    icon: 'locus',
                                    url: '/map/aMapInputHint',
                                    children: [
                                        {
                                            id: 24,
                                            name: '输入提示',
                                            icon: 'locus',
                                            url: '/map/aMapInputHint'
                                        }
                                    ]
                                },
                                {
                                    id: 25,
                                    name: '路线规划',
                                    icon: 'locus',
                                    url: '/map/aMapPlanning',
                                    children: [
                                        {
                                            id: 26,
                                            name: '驾车路线规划',
                                            icon: 'locus',
                                            url: '/map/aMapPlanning'
                                        },
                                        {
                                            id: 27,
                                            name: '拖拽路线规划',
                                            icon: 'locus',
                                            url: '/map/aMapDragPlanning'
                                        }
                                    ]
                                },
                                {
                                    id: 28,
                                    name: '其他',
                                    icon: 'locus',
                                    url: '/map/aMapGeocoding',
                                    children: [
                                        {
                                            id: 29,
                                            name: '地理编码',
                                            icon: 'locus',
                                            url: '/map/aMapGeocoding'
                                        },
                                        {
                                            id: 30,
                                            name: '行政区查询',
                                            icon: 'locus',
                                            url: '/map/aMapAdministrativeArea'
                                        },
                                        {
                                            id: 31,
                                            name: '定位',
                                            icon: 'locus',
                                            url: '/map/aMapLocation'
                                        },
                                        {
                                            id: 32,
                                            name: '天气',
                                            icon: 'locus',
                                            url: '/map/aMapWeather'
                                        }
                                    ]
                                },
                                {
                                    id: 33,
                                    name: '计算',
                                    icon: 'locus',
                                    url: '/map/aMapPointCalculate',
                                    children: [
                                        {
                                            id: 34,
                                            name: '两点间距离',
                                            icon: 'locus',
                                            url: '/map/aMapPointCalculate'
                                        },
                                        {
                                            id: 35,
                                            name: '点到直线的距离',
                                            icon: 'locus',
                                            url: '/map/aMapLineCalculate'
                                        },
                                        {
                                            id: 36,
                                            name: '折线长度',
                                            icon: 'locus',
                                            url: '/map/aMapPathLength'
                                        },
                                        {
                                            id: 37,
                                            name: '面积',
                                            icon: 'locus',
                                            url: '/map/aMapAreaNum'
                                        },
                                        {
                                            id: 38,
                                            name: '点是否在线上',
                                            icon: 'locus',
                                            url: '/map/aMapIsOnLine'
                                        },
                                        {
                                            id: 39,
                                            name: '点是否在多边形内',
                                            icon: 'locus',
                                            url: '/map/aMapIsOnPolygon'
                                        },
                                        {
                                            id: 40,
                                            name: '几何关系',
                                            icon: 'locus',
                                            url: '/map/aMapGeometricRelationship'
                                        }
                                    ]
                                },
                                {
                                    id: 41,
                                    name: '可视化',
                                    icon: 'locus',
                                    url: '/map/cellularHeatmap',
                                    children: [
                                        {
                                            id: 42,
                                            name: '蜂窝热力图',
                                            icon: 'locus',
                                            url: '/map/cellularHeatmap'
                                        },
                                        {
                                            id: 43,
                                            name: '网格热力图',
                                            icon: 'locus',
                                            url: '/map/gridHeatmap'
                                        },
                                        {
                                            id: 44,
                                            name: '热力图',
                                            icon: 'locus',
                                            url: '/map/heatmap'
                                        },
                                        {
                                            id: 45,
                                            name: '脉冲线',
                                            icon: 'locus',
                                            url: '/map/pulseLine'
                                        },
                                        {
                                            id: 46,
                                            name: '飞线',
                                            icon: 'locus',
                                            url: '/map/flyingLine'
                                        },
                                        {
                                            id: 47,
                                            name: '连接线',
                                            icon: 'locus',
                                            url: '/map/connectingLine'
                                        },
                                        {
                                            id: 48,
                                            name: '线图层',
                                            icon: 'locus',
                                            url: '/map/lineLayer'
                                        },
                                        {
                                            id: 49,
                                            name: '图标图层',
                                            icon: 'locus',
                                            url: '/map/iconLayer'
                                        },
                                        {
                                            id: 50,
                                            name: '贴地点',
                                            icon: 'locus',
                                            url: '/map/postLocation'
                                        },
                                        {
                                            id: 51,
                                            name: '棱柱图层',
                                            icon: 'locus',
                                            url: '/map/prismLayer'
                                        },
                                        {
                                            id: 52,
                                            name: '圆点图层',
                                            icon: 'locus',
                                            url: '/map/dotLayer'
                                        },
                                        {
                                            id: 53,
                                            name: '标牌点',
                                            icon: 'locus',
                                            url: '/map/signagePoint'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 100,
                            name: '系统管理',
                            icon: 'icon-setting',
                            url: '/system',
                            children: [
                                {
                                    id: 101,
                                    name: '用户管理',
                                    icon: 'yonghu',
                                    url: '/system/user'
                                },
                                {
                                    id: 102,
                                    name: '菜单管理',
                                    icon: 'icon-caidan',
                                    url: '/system/menu'
                                }
                            ]
                        },
                        {
                            id: 200,
                            name: '样式',
                            icon: 'dangedemoban',
                            url: '/style',
                            children: [
                                {
                                    id: 28,
                                    name: '导航栏',
                                    icon: 'locus',
                                    url: '/style/navigation',
                                    children: [
                                        {
                                            id: 201,
                                            name: '导航栏1',
                                            icon: 'icon-mulu',
                                            url: '/style/navigation'
                                        },
                                        {
                                            id: 201,
                                            name: '导航栏2',
                                            icon: 'icon-mulu',
                                            url: '/style/navigation2'
                                        },
                                        {
                                            id: 201,
                                            name: '导航栏3',
                                            icon: 'icon-mulu',
                                            url: '/style/navigation3'
                                        }
                                    ]
                                },
                                {
                                    id: 28,
                                    name: '卡片',
                                    icon: 'locus',
                                    url: '/style/card1',
                                    children: [
                                        {
                                            id: 202,
                                            name: '卡片1',
                                            icon: 'icon-kapian',
                                            url: '/style/card1'
                                        },
                                        {
                                            id: 203,
                                            name: '卡片2',
                                            icon: 'icon-kapian',
                                            url: '/style/card2'
                                        },
                                        {
                                            id: 204,
                                            name: '卡片3',
                                            icon: 'icon-kapian',
                                            url: '/style/card3'
                                        },
                                        {
                                            id: 205,
                                            name: '卡片4',
                                            icon: 'icon-kapian',
                                            url: '/style/card4'
                                        },
                                        {
                                            id: 206,
                                            name: '卡片5',
                                            icon: 'icon-kapian',
                                            url: '/style/card5'
                                        },
                                        {
                                            id: 207,
                                            name: '卡片6',
                                            icon: 'icon-kapian',
                                            url: '/style/card6'
                                        }
                                    ]
                                },
                                {
                                    id: 28,
                                    name: '按钮',
                                    icon: 'locus',
                                    url: '/style/button1',
                                    children: [
                                        {
                                            id: 208,
                                            name: '按钮1',
                                            icon: 'icon-anniu',
                                            url: '/style/button1'
                                        },
                                        {
                                            id: 209,
                                            name: '按钮2',
                                            icon: 'icon-anniu',
                                            url: '/style/button2'
                                        }
                                    ]
                                },
                                {
                                    id: 28,
                                    name: '加载图标',
                                    icon: 'locus',
                                    url: '/style/loading1',
                                    children: [
                                        {
                                            id: 210,
                                            name: '加载图标1',
                                            icon: 'icon-loading',
                                            url: '/style/loading1'
                                        },
                                        {
                                            id: 210,
                                            name: '加载图标2',
                                            icon: 'icon-loading',
                                            url: '/style/loading2'
                                        }
                                    ]
                                },
                                {
                                    id: 211,
                                    name: '背景渐变',
                                    icon: 'icon-beijingtupian',
                                    url: '/style/gradient'
                                },
                                {
                                    id: 212,
                                    name: '动态输入框',
                                    icon: 'icon-beijingtupian',
                                    url: '/style/input'
                                }
                            ]
                        },
                        {
                            id: 300,
                            name: 'threejs',
                            icon: 'icon-threejs',
                            url: '/open/car',
                            children: [
                                {
                                    id: 301,
                                    name: '基础',
                                    icon: 'icon-threejs',
                                    url: '/three/base',
                                    children: [
                                        {
                                            id: 301,
                                            name: '第一个场景',
                                            icon: 'icon-threejs',
                                            url: '/three/base'
                                        },
                                        {
                                            id: 303,
                                            name: '阴影',
                                            icon: 'icon-threejs',
                                            url: '/three/shadow'
                                        },
                                        {
                                            id: 304,
                                            name: '运动',
                                            icon: 'icon-threejs',
                                            url: '/three/sport'
                                        }
                                    ]
                                },
                                {
                                    id: 305,
                                    name: '基本组件',
                                    icon: 'icon-threejs',
                                    url: '/three/scene',
                                    children: [
                                        {
                                            id: 306,
                                            name: '场景',
                                            icon: 'icon-threejs',
                                            url: '/three/scene'
                                        }
                                    ]
                                },
                                {
                                    id: 307,
                                    name: '光源',
                                    icon: 'icon-threejs',
                                    url: '/three/ambientLight',
                                    children: [
                                        {
                                            id: 308,
                                            name: '环境光',
                                            icon: 'icon-threejs',
                                            url: '/three/ambientLight'
                                        },
                                        {
                                            id: 309,
                                            name: '聚光灯光源',
                                            icon: 'icon-threejs',
                                            url: '/three/spotLight'
                                        },
                                        {
                                            id: 310,
                                            name: '点光源',
                                            icon: 'icon-threejs',
                                            url: '/three/pointLight'
                                        },
                                        {
                                            id: 311,
                                            name: '平行光',
                                            icon: 'icon-threejs',
                                            url: '/three/directionLight'
                                        },
                                        {
                                            id: 312,
                                            name: '半球光',
                                            icon: 'icon-threejs',
                                            url: '/three/hemisphereLight'
                                        },
                                        {
                                            id: 313,
                                            name: '光晕',
                                            icon: 'icon-threejs',
                                            url: '/three/lensFlare'
                                        }
                                    ]
                                },
                                {
                                    id: 314,
                                    name: '材质',
                                    icon: 'icon-threejs',
                                    url: '/three/meshBasicMaterial',
                                    children: [
                                        {
                                            id: 315,
                                            name: '网格基础材质',
                                            icon: 'icon-threejs',
                                            url: '/three/meshBasicMaterial'
                                        },
                                        {
                                            id: 316,
                                            name: '网格深度材质',
                                            icon: 'icon-threejs',
                                            url: '/three/meshDepthMaterial'
                                        },
                                        {
                                            id: 317,
                                            name: '联合材质',
                                            icon: 'icon-threejs',
                                            url: '/three/multiMaterialObject'
                                        },
                                        {
                                            id: 318,
                                            name: '网格法向材质',
                                            icon: 'icon-threejs',
                                            url: '/three/meshNormalMaterial'
                                        },
                                        {
                                            id: 319,
                                            name: '使用不同材质',
                                            icon: 'icon-threejs',
                                            url: '/three/meshFaceMaterial'
                                        },
                                        {
                                            id: 320,
                                            name: '网格Lambert材质',
                                            icon: 'icon-threejs',
                                            url: '/three/meshLambertMaterial'
                                        },
                                        {
                                            id: 321,
                                            name: '网格Phong材质',
                                            icon: 'icon-threejs',
                                            url: '/three/meshPhongMaterial'
                                        },
                                        {
                                            id: 322,
                                            name: '网格标准材质',
                                            icon: 'icon-threejs',
                                            url: '/three/meshStandardMaterial'
                                        },
                                        {
                                            id: 323,
                                            name: '网格物理材质',
                                            icon: 'icon-threejs',
                                            url: '/three/meshPhysicalMaterial'
                                        },
                                        {
                                            id: 323,
                                            name: '网格物理材质2',
                                            icon: 'icon-threejs',
                                            url: '/three/meshPhysicalMaterial2'
                                        },
                                        {
                                            id: 324,
                                            name: '直线基础材质',
                                            icon: 'icon-threejs',
                                            url: '/three/lineBasicMaterial'
                                        },
                                        {
                                            id: 325,
                                            name: '虚线材质',
                                            icon: 'icon-threejs',
                                            url: '/three/lineDashedMaterial'
                                        }
                                    ]
                                },
                                {
                                    id: 326,
                                    name: '几何体',
                                    icon: 'icon-threejs',
                                    url: '/three/planeGeometry',
                                    children: [
                                        {
                                            id: 327,
                                            name: 'bufferGeometry',
                                            icon: 'icon-threejs',
                                            url: '/three/bufferGeometry'
                                        },
                                        {
                                            id: 327,
                                            name: '三角形',
                                            icon: 'icon-threejs',
                                            url: '/three/triangle'
                                        },
                                        {
                                            id: 327,
                                            name: '平面',
                                            icon: 'icon-threejs',
                                            url: '/three/planeGeometry'
                                        },
                                        {
                                            id: 328,
                                            name: '圆形',
                                            icon: 'icon-threejs',
                                            url: '/three/circleGeometry'
                                        },
                                        {
                                            id: 329,
                                            name: '环形',
                                            icon: 'icon-threejs',
                                            url: '/three/ringGeometry'
                                        },
                                        {
                                            id: 330,
                                            name: '任意图形',
                                            icon: 'icon-threejs',
                                            url: '/three/shapeGeometry'
                                        },
                                        {
                                            id: 331,
                                            name: '长方体',
                                            icon: 'icon-threejs',
                                            url: '/three/boxGeometry'
                                        },
                                        {
                                            id: 332,
                                            name: '球体',
                                            icon: 'icon-threejs',
                                            url: '/three/sphereGeometry'
                                        },
                                        {
                                            id: 333,
                                            name: '圆柱体',
                                            icon: 'icon-threejs',
                                            url: '/three/cylinderGeometry'
                                        },
                                        {
                                            id: 334,
                                            name: '圆锥体',
                                            icon: 'icon-threejs',
                                            url: '/three/coneGeometry'
                                        },
                                        {
                                            id: 335,
                                            name: '圆环',
                                            icon: 'icon-threejs',
                                            url: '/three/torusGeometry'
                                        },
                                        {
                                            id: 336,
                                            name: '环状扭结',
                                            icon: 'icon-threejs',
                                            url: '/three/torusKnotGeometry'
                                        },
                                        {
                                            id: 337,
                                            name: '多面体',
                                            icon: 'icon-threejs',
                                            url: '/three/polyhedron'
                                        },
                                        {
                                            id: 338,
                                            name: '凸包几何体',
                                            icon: 'icon-threejs',
                                            url: '/three/convexGeometry'
                                        },
                                        {
                                            id: 339,
                                            name: '车削缓冲几何体',
                                            icon: 'icon-threejs',
                                            url: '/three/latheGeometry'
                                        },
                                        {
                                            id: 340,
                                            name: '挤压缓冲几何体',
                                            icon: 'icon-threejs',
                                            url: '/three/extrudeGeometry'
                                        },
                                        {
                                            id: 341,
                                            name: '管道缓冲几何体',
                                            icon: 'icon-threejs',
                                            url: '/three/tubeGeometry'
                                        },
                                        {
                                            id: 342,
                                            name: '对象组合',
                                            icon: 'icon-threejs',
                                            url: '/three/group'
                                        },
                                        {
                                            id: 342,
                                            name: '合并网络',
                                            icon: 'icon-threejs',
                                            url: '/three/merge'
                                        },
                                        {
                                            id: 342,
                                            name: 'JSON',
                                            icon: 'icon-threejs',
                                            url: '/three/json'
                                        },
                                        {
                                            id: 342,
                                            name: '检测',
                                            icon: 'icon-threejs',
                                            url: '/three/detect'
                                        }
                                    ]
                                },
                                {
                                    id: 343,
                                    name: '粒子和精灵',
                                    icon: 'icon-threejs',
                                    url: '/three/spriteMaterial',
                                    children: [
                                        {
                                            id: 344,
                                            name: '点精灵材质1',
                                            icon: 'icon-threejs',
                                            url: '/three/spriteMaterial1'
                                        },
                                        {
                                            id: 344,
                                            name: '点精灵材质2',
                                            icon: 'icon-threejs',
                                            url: '/three/spriteMaterial2'
                                        },
                                        {
                                            id: 345,
                                            name: '点材质1',
                                            icon: 'icon-threejs',
                                            url: '/three/pointsMaterial1'
                                        },
                                        {
                                            id: 345,
                                            name: '点材质2',
                                            icon: 'icon-threejs',
                                            url: '/three/pointsMaterial2'
                                        },
                                        {
                                            id: 345,
                                            name: '点材质3',
                                            icon: 'icon-threejs',
                                            url: '/three/pointsMaterial3'
                                        },
                                        {
                                            id: 345,
                                            name: '点材质4',
                                            icon: 'icon-threejs',
                                            url: '/three/pointsMaterial4'
                                        },
                                        {
                                            id: 345,
                                            name: '点材质5',
                                            icon: 'icon-threejs',
                                            url: '/three/pointsMaterial5'
                                        },
                                        {
                                            id: 345,
                                            name: '点材质6',
                                            icon: 'icon-threejs',
                                            url: '/three/pointsMaterial6'
                                        }
                                    ]
                                },
                                {
                                    id: 343,
                                    name: '贴图',
                                    icon: 'icon-threejs',
                                    url: '/three/bump',
                                    children: [
                                        {
                                            id: 344,
                                            name: '凹凸贴图',
                                            icon: 'icon-threejs',
                                            url: '/three/bump'
                                        },
                                        {
                                            id: 344,
                                            name: '法向贴图',
                                            icon: 'icon-threejs',
                                            url: '/three/normal'
                                        },
                                        {
                                            id: 344,
                                            name: '移位贴图',
                                            icon: 'icon-threejs',
                                            url: '/three/displacement'
                                        },
                                        {
                                            id: 344,
                                            name: '光泽度贴图',
                                            icon: 'icon-threejs',
                                            url: '/three/setalness'
                                        },
                                        {
                                            id: 344,
                                            name: '透明度贴图',
                                            icon: 'icon-threejs',
                                            url: '/three/alpha'
                                        },
                                        {
                                            id: 344,
                                            name: '自发光贴图',
                                            icon: 'icon-threejs',
                                            url: '/three/emissive'
                                        },
                                        {
                                            id: 344,
                                            name: '高光贴图',
                                            icon: 'icon-threejs',
                                            url: '/three/specular'
                                        },
                                        {
                                            id: 344,
                                            name: '环境贴图',
                                            icon: 'icon-threejs',
                                            url: '/three/env'
                                        },
                                        {
                                            id: 344,
                                            name: '贴图',
                                            icon: 'icon-threejs',
                                            url: '/three/door'
                                        },
                                        {
                                            id: 344,
                                            name: '纹理显示',
                                            icon: 'icon-threejs',
                                            url: '/three/texture'
                                        },
                                        {
                                            id: 344,
                                            name: 'canvas',
                                            icon: 'icon-threejs',
                                            url: '/three/canvas'
                                        },
                                        {
                                            id: 344,
                                            name: 'video',
                                            icon: 'icon-threejs',
                                            url: '/three/video'
                                        }
                                    ]
                                },
                                {
                                    id: 343,
                                    name: '物理',
                                    icon: 'icon-threejs',
                                    url: '/three/physics1',
                                    children: [
                                        {
                                            id: 344,
                                            name: '小球下落',
                                            icon: 'icon-threejs',
                                            url: '/three/physics1'
                                        },
                                        {
                                            id: 344,
                                            name: '碰撞',
                                            icon: 'icon-threejs',
                                            url: '/three/physics2'
                                        },
                                        {
                                            id: 344,
                                            name: '八叉树',
                                            icon: 'icon-threejs',
                                            url: '/open/metaverse'
                                        }
                                    ]
                                },
                                {
                                    id: 343,
                                    name: '着色器',
                                    icon: 'icon-threejs',
                                    url: '/three/webGL',
                                    children: [
                                        {
                                            id: 344,
                                            name: 'WebGL',
                                            icon: 'icon-threejs',
                                            url: '/three/webGL'
                                        },
                                        {
                                            id: 344,
                                            name: 'shader',
                                            icon: 'icon-threejs',
                                            url: '/three/shader'
                                        },
                                        {
                                            id: 344,
                                            name: '原始着色器材质',
                                            icon: 'icon-threejs',
                                            url: '/three/rowShaderMaterial'
                                        },
                                        {
                                            id: 344,
                                            name: '着色器',
                                            icon: 'icon-threejs',
                                            url: '/three/deep'
                                        },
                                        {
                                            id: 344,
                                            name: '孔明灯',
                                            icon: 'icon-threejs',
                                            url: '/three/flyLight'
                                        },
                                        {
                                            id: 344,
                                            name: '水',
                                            icon: 'icon-threejs',
                                            url: '/three/water'
                                        },
                                        {
                                            id: 344,
                                            name: '水2',
                                            icon: 'icon-threejs',
                                            url: '/three/water2'
                                        },
                                        {
                                            id: 344,
                                            name: '点',
                                            icon: 'icon-threejs',
                                            url: '/three/point'
                                        },
                                        {
                                            id: 344,
                                            name: '修改Shader',
                                            icon: 'icon-threejs',
                                            url: '/three/customShader'
                                        },
                                        {
                                            id: 344,
                                            name: '效果合成',
                                            icon: 'icon-threejs',
                                            url: '/three/effect'
                                        }
                                    ]
                                },
                                {
                                    id: 343,
                                    name: 'CSS',
                                    icon: 'icon-threejs',
                                    url: '/three/moon',
                                    children: [
                                        {
                                            id: 344,
                                            name: 'Moon',
                                            icon: 'icon-threejs',
                                            url: '/three/moon'
                                        }
                                    ]
                                },
                                {
                                    id: 343,
                                    name: 'demo',
                                    icon: 'icon-threejs',
                                    url: '/three/car',
                                    children: [
                                        {
                                            id: 344,
                                            name: '汽车',
                                            icon: 'icon-threejs',
                                            url: '/three/car'
                                        },
                                        {
                                            id: 344,
                                            name: '烟花',
                                            icon: 'icon-threejs',
                                            url: '/three/fireWork'
                                        },
                                        {
                                            id: 344,
                                            name: '导弹轨迹',
                                            icon: 'icon-threejs',
                                            url: '/three/missile'
                                        },
                                        {
                                            id: 344,
                                            name: '地球',
                                            icon: 'icon-threejs',
                                            url: '/three/earch'
                                        },
                                        {
                                            id: 344,
                                            name: '机器人',
                                            icon: 'icon-threejs',
                                            url: '/three/robot'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 400,
                            name: '功能',
                            icon: 'dangedemoban',
                            url: '/function',
                            children: [
                                {
                                    id: 401,
                                    name: '抽奖',
                                    icon: 'choujiang',
                                    url: '/function/lottery'
                                },
                                {
                                    id: 402,
                                    name: '日历',
                                    icon: 'rili',
                                    url: '/function/calendar'
                                },
                                {
                                    id: 403,
                                    name: '数字',
                                    icon: 'icon-number',
                                    url: '/function/number'
                                },
                                {
                                    id: 404,
                                    name: '引导页',
                                    icon: 'icon-xinshouyindao',
                                    url: '/function/driver'
                                },
                                {
                                    id: 405,
                                    name: '富文本编辑器',
                                    icon: 'icon-fuwenbenbianjiqi',
                                    url: '/function/richText'
                                },
                                {
                                    id: 406,
                                    name: '拖拽组件',
                                    icon: 'rili',
                                    url: '/function/drag'
                                },
                                {
                                    id: 407,
                                    name: '内嵌页面',
                                    icon: 'icon-beijingtupian',
                                    url: '/function/embedded'
                                },
                                {
                                    id: 407,
                                    name: '复制指令',
                                    icon: 'icon-beijingtupian',
                                    url: '/function/copyDirect'
                                },
                                {
                                    id: 407,
                                    name: '水印指令',
                                    icon: 'icon-beijingtupian',
                                    url: '/function/waterMark'
                                },
                                {
                                    id: 407,
                                    name: '拖拽指令',
                                    icon: 'icon-beijingtupian',
                                    url: '/function/dragDirect'
                                },
                                {
                                    id: 407,
                                    name: '长按指令',
                                    icon: 'icon-beijingtupian',
                                    url: '/function/longPress'
                                },
                                {
                                    id: 407,
                                    name: '节流指令',
                                    icon: 'icon-beijingtupian',
                                    url: '/function/throttle'
                                },
                                {
                                    id: 407,
                                    name: '防抖指令',
                                    icon: 'icon-beijingtupian',
                                    url: '/function/debounce'
                                },
                                {
                                    id: 407,
                                    name: '图片预览',
                                    icon: 'icon-beijingtupian',
                                    url: '/function/imageView'
                                }
                            ]
                        },
                        {
                            id: 400,
                            name: '智慧城市',
                            icon: 'icon-threejs',
                            url: '/open',
                            children: [
                                {
                                    id: 401,
                                    name: '智慧城市',
                                    icon: 'icon-threejs',
                                    url: '/open/smartCity'
                                },
                                {
                                    id: 401,
                                    name: '智慧城市2',
                                    icon: 'icon-threejs',
                                    url: '/open/smartCity2'
                                },
                                {
                                    id: 402,
                                    name: '智慧园区',
                                    icon: 'icon-threejs',
                                    url: '/open/smartPark'
                                },
                                {
                                    id: 402,
                                    name: '日夜交替',
                                    icon: 'icon-threejs',
                                    url: '/open/hotel'
                                },
                                {
                                    id: 344,
                                    name: '智慧工厂',
                                    icon: 'icon-threejs',
                                    url: '/open/smartFactory'
                                },
                                {
                                    id: 344,
                                    name: '全景看房',
                                    icon: 'icon-threejs',
                                    url: '/open/homeViewing'
                                }
                            ]
                        },
                        {
                            id: 344,
                            name: '游戏',
                            icon: 'icon-threejs',
                            url: '/game/sheep',
                            children: [
                                {
                                    id: 401,
                                    name: '菜了个菜',
                                    icon: 'choujiang',
                                    url: '/game/sheep'
                                },
                                {
                                    id: 401,
                                    name: '跳一跳',
                                    icon: 'choujiang',
                                    url: '/game/jump'
                                },
                                {
                                    id: 401,
                                    name: '扫雷',
                                    icon: 'choujiang',
                                    url: '/game/minesweeper'
                                }
                            ]
                        },
                        {
                            id: 344,
                            name: 'Cesium',
                            icon: 'icon-threejs',
                            url: '/cesium/cesium',
                            children: [
                                {
                                    id: 401,
                                    name: 'cesium',
                                    icon: 'choujiang',
                                    url: '/cesium/cesium'
                                }
                            ]
                        },
                        {
                            id: 344,
                            name: '3D地图',
                            icon: 'icon-threejs',
                            url: '/open/map'
                        },
                        {
                            id: 344,
                            name: '3D官网',
                            icon: 'icon-threejs',
                            url: '/open/website'
                        },
                        {
                            id: 501,
                            name: '拖拽页面',
                            icon: 'icon-yidong',
                            url: '/open/drag'
                        },
                        {
                            id: 501,
                            name: '工作台',
                            icon: 'icon-yidong',
                            url: '/work/index'
                        },
                        {
                            id: 501,
                            name: '青联',
                            icon: 'icon-yidong',
                            url: '/three/test'
                        },
                        {
                            id: 400,
                            name: '唱歌排名',
                            icon: 'dangedemoban',
                            url: '/open',
                            children: [
                                {
                                    id: 401,
                                    name: '分数管理',
                                    icon: 'choujiang',
                                    url: '/open/rankedList'
                                },
                                {
                                    id: 402,
                                    name: '分数排名',
                                    icon: 'rili',
                                    url: '/open/rankedManage'
                                }
                            ]
                        }
                    ],
                    total: 100
                }
            }
        }
    },
    {
        url: '/testApi/api/userList',
        method: 'post',
        response: () => {
            return <IResponseData<IUserListData>>{
                status: 200,
                message: '查询用户列表成功！',
                data: mockjs.mock({
                    'list|100': [userInfo]
                })
            }
        }
    }
]
