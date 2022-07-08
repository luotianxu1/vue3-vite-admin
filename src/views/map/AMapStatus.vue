<template>
    <div class="container">
        <div class="btn">
            <el-button @click="initMap">创建地图</el-button>
            <el-button @click="delMap">销毁地图</el-button>
            <el-button @click="setMapZoom">随机设置地图层级</el-button>
            <el-button @click="getMapZoom">获取地图层级</el-button>
            <el-button @click="setMapCenter">随机设置地图中心点</el-button>
            <el-button @click="getMapCenter">获取地图中心点</el-button>
            <el-button @click="setMapZoomCenter">
                随机设置地图层级与中心点
            </el-button>
            <el-button @click="getMapBounds">获取地图显示范围</el-button>
            <el-button @click="setMapBounds">设置地图显示范围</el-button>
            <el-button @click="getMapCity">获取地图当前行政区</el-button>
            <el-switch
                v-model="isShowPoint"
                active-text="显示点击坐标"
                inactive-text="不显示点击坐标"
            />
            <el-button @click="movePixel">平移像素</el-button>
            <el-button @click="moveCenter">平移中心点</el-button>
            <el-button @click="autoAdjust">自动调整视野</el-button>
            <el-button @click="manualAdjust">自定义调整视野</el-button>
            <el-select
                v-model="mapStyle"
                placeholder="选择图层样式"
                size="large"
                @change="changeMapStyle"
            >
                <el-option
                    v-for="item in mapStylesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
            <el-switch
                v-model="isLimit"
                active-text="锁定"
                inactive-text="未锁定"
            />
            <el-input
                v-model="cityName"
                class="input-with-select"
                placeholder="设置地图当前行政区"
            >
                <template #append>
                    <el-button :icon="Search" @click="setCity"></el-button>
                </template>
            </el-input>
            <el-button @click="addMarker">添加Marker</el-button>
            <el-button @click="deleteMarker">删除Marker</el-button>
            <el-switch
                v-model="isShowCondition"
                active-text="显示路况"
                inactive-text="不显示路况"
            />
            <el-select
                v-model="mapType"
                placeholder="选择图层"
                size="large"
                @change="changeMapType"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
            <el-button @click="setTransparency">设置透明度</el-button>
        </div>
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { ElNotification } from 'element-plus'
    import { Search } from '@element-plus/icons-vue'

    const map = shallowRef()
    const Map = shallowRef()
    let marker1
    let marker2
    let polyline
    let satelliteLayer
    let roadNetLayer
    let trafficLayer

    onMounted(() => {
        initMap()
    })

    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0',
            plugins: ['AMap.Scale','AMap.HawkEye','AMap.ToolBar','AMap.ControlBar','AMap.MapType']
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    viewMode: '3D',//开启3D视图,默认为关闭
		                // rotation: 45, // 旋转角度
		                // rotateEnable: false, // 禁止旋转
		                // pitchEnable: false, // 禁止俯仰角度调整
		                // pitch: 65, // 俯仰角度
                    terrain: true,
                    zoom: 5,
                    center: [105.602725, 37.076636],
		                features: ['bg', 'road', 'building', 'point'], // 地图显示要素
		                showLabel: true //显示地图文字标记
                })
                const scale = new AMap.Scale()
                const toolBar = new AMap.ToolBar({
                    position: {
                        top: '110px',
                        right: '40px'
                    }
                })
                const controlBar = new AMap.ControlBar({
                    position: {
                        top: '10px',
                        right: '10px'
                    }
                })
                const overView = new AMap.HawkEye({
                    opened: false
                })
                const type= new AMap.MapType({
                    defaultType: 0,
                    position: 'LB',//定位到左下角
                    offset: [100, 160] //偏移量 x,y轴
                })
                map.value.addControl(type)
                map.value.addControl(scale)
                map.value.addControl(toolBar)
                map.value.addControl(controlBar)
                map.value.addControl(overView)
                const path = [
                    new AMap.LngLat('116.368904', '39.913423'),
                    new AMap.LngLat('116.382122', '39.901176'),
                    new AMap.LngLat('116.387271', '39.912501'),
                    new AMap.LngLat('116.398258', '39.904600')
                ]
                polyline = new AMap.Polyline({
                    path: path,
                    borderWeight: 2, // 线条宽度，默认为 1
                    strokeColor: 'red', // 线条颜色
                    lineJoin: 'round' // 折线拐点连接处样式
                })
                map.value.add(polyline)

                // 创建两个点标记
                marker1 = new AMap.Marker({
                    position: new AMap.LngLat(117.39, 39.9), // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
                    title: '北京'
                })
                marker2 = new AMap.Marker({
                    position: new AMap.LngLat(118.39, 39.9), // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
                    title: '北京'
                })
                map.value.add(marker1)
                map.value.add(marker2)
                //实时路况图层
                trafficLayer = new Map.value.TileLayer.Traffic({
                    zooms: [7, 22]
                })
                trafficLayer.setMap(map.value)
                trafficLayer.hide()

                // 构造官方卫星、路网图层
                satelliteLayer = new Map.value.TileLayer.Satellite()
                roadNetLayer = new Map.value.TileLayer.RoadNet()
                //批量添加图层
                map.value.add([satelliteLayer, roadNetLayer])
                satelliteLayer.hide()
                roadNetLayer.hide()
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const setMapZoom = () => {
        const zoom = Math.floor(Math.random() * 7) + 11 //zoom范围[11,18]
        map.value.setZoom(zoom) //设置地图层级
        ElMessage.success(`当前层级已设为${zoom}级`)
    }

    const getMapZoom = () => {
        const zoomNum = map.value.getZoom()
        ElMessage.success(`当前层级为${zoomNum}级`)
    }

    const setMapCenter = () => {
        let lng = 121.138398 + Math.floor(Math.random() * 589828) / 1e6 //经度范围[121.138398, 121.728226]
        let lat = 30.972688 + Math.floor(Math.random() * 514923) / 1e6 //纬度范围[30.972688, 31.487611]
        map.value.setCenter([lng, lat]) //设置地图中心点
        ElMessage.success(
            `当前中心点已设为 ${lng.toFixed(6)},${lat.toFixed(6)}`
        )
    }

    const getMapCenter = () => {
        const centerNum = map.value.getCenter()
        ElMessage.success(`当前地图中心点为${centerNum}`)
    }

    const setMapZoomCenter = () => {
        let zoom = Math.floor(Math.random() * 7) + 11
        let lng = 121.138398 + Math.floor(Math.random() * 589828) / 1e6
        let lat = 30.972688 + Math.floor(Math.random() * 514923) / 1e6
        map.value.setZoomAndCenter(zoom, [lng, lat]) //同时设置地图层级与中心点
        ElMessage.success(
            `当前层级已设为${zoom}级，中心点已设为 ${lng.toFixed(
                6
            )},${lat.toFixed(6)}`
        )
    }

    const getMapCity = () => {
        map.value.getCity(function (info) {
            ElNotification({
                message: info,
                type: 'success'
            })
        })
    }

    const cityName = ref()
    const setCity = () => {
        map.value.setCity(cityName.value)
    }

    const getMapBounds = () => {
        let bounds = map.value.getBounds()
        let northEast = bounds.northEast
        let southWes = bounds.southWest
        ElMessage.success(
            `NorthEast坐标${northEast}，SouthWest坐标 ${southWes}`
        )
    }

    const setMapBounds = () => {
        const mybounds = new Map.value.Bounds(
            [116.319665, 39.855919],
            [116.468324, 39.9756]
        )
        map.value.setBounds(mybounds)
    }

    const isLimit = ref(false)
    watch(isLimit, (val) => {
        if (val) {
            let limitBounds = map.value.getBounds()
            map.value.setLimitBounds(limitBounds)
        } else {
            map.value.clearLimitBounds()
        }
    })

    const movePixel = () => {
        map.value.panBy(50, 100)
    }

    const moveCenter = () => {
        map.value.panTo([116.405467, 39.907761])
    }

    const isShowPoint = ref(false)
    watch(isShowPoint, (val) => {
        if (val) {
            map.value.on('click', showPoint)
        } else {
            map.value.off('click', showPoint)
        }
    })
    const showPoint = (e) => {
        ElMessage.success(`${e.lnglat.getLng()}${e.lnglat.getLat()}`)
    }

    const autoAdjust = () => {
        map.value.setFitView()
    }

    const manualAdjust = () => {
        map.value.setFitView([polyline, marker1])
    }

    let marker
    const addMarker = () => {
        marker = new Map.value.Marker({
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: [116.405467, 39.907761],
            anchor: 'bottom-center'
        })
        map.value.add(marker)
        map.value.setFitView()
    }

    const deleteMarker = () => {
        map.value.remove(marker)
    }

    const isShowCondition = ref(false)
    watch(isShowCondition, (val) => {
        console.log(val)
        if (val) {
            trafficLayer.show()
        } else {
            trafficLayer.hide()
        }
    })

    const delMap = () => {
        map.value.destroy()
    }

    const options = [
        {
            value: '0',
            label: '普通图层'
        },
        {
            value: '1',
            label: '卫星图层'
        }
    ]
    const mapType = ref('0')
    const changeMapType = (val) => {
        if (val === '0') {
            satelliteLayer.hide()
            roadNetLayer.hide()
        } else {
            satelliteLayer.show()
            roadNetLayer.show()
        }
    }

    const mapStyle = ref('')
    const mapStylesOptions = [
        {
            value: 'dark',
            label: '幻影黑'
        },
        {
            value: 'light',
            label: '月光银'
        },
        {
            value: 'whitesmoke',
            label: '远山黛'
        },
        {
            value: 'fresh',
            label: '草色青'
        },
        {
            value: 'grey',
            label: '雅士灰'
        },
        {
            value: 'graffiti',
            label: '涂鸦'
        },
        {
            value: 'macaron',
            label: '马卡龙'
        },
        {
            value: 'blue',
            label: '靛青蓝'
        },
        {
            value: 'darkblue',
            label: '极夜蓝'
        },
        {
            value: 'wine',
            label: '酱籽'
        }
    ]
    const changeMapStyle = (val) => {
        let styleName = 'amap://styles/' + val
        map.value.setMapStyle(styleName)
    }

    const setTransparency = () => {
        satelliteLayer.setOpacity(0.5)
    }
</script>

<style lang="scss" scoped>
    .container {
        height: 100%;
        width: 100%;
        display: flex;

        .map {
            height: 100%;
            width: 100%;
        }

        .btn {
            width: 350px;
            padding: 10px;
            display: flex;
            flex-direction: column;

            .el-button {
                margin: 0 0 5px 0;
            }
        }
    }
</style>
