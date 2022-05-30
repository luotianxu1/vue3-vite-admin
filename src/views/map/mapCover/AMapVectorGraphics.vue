<template>
    <div class="container">
        <div class="btn">
            <el-button @click="addPolyline">添加折线</el-button>
            <el-button @click="addBezierCurve">添加弧线</el-button>
            <el-button @click="addPolygon">添加多边形</el-button>
            <el-button @click="addRectangle">添加矩形</el-button>
            <el-button @click="addCircle">添加圆</el-button>
            <el-button @click="addEllipse">添加椭圆</el-button>
            <el-button @click="drawPolyline">绘制线段</el-button>
            <el-button @click="drawPolygon">绘制多边形</el-button>
            <el-button @click="drawRectangle">绘制矩形</el-button>
            <el-button @click="drawCircle">绘制圆</el-button>
            <el-button @click="drawGeoJSON">GeoJSON</el-button>
            <el-button @click="overlay">批处理(折线)</el-button>
            <el-button @click="measureArea">面积测量</el-button>
            <el-button @click="measureRule">测距</el-button>
            <el-button @click="rectZoomIn">拉框放大</el-button>
            <el-button @click="measureOut">拉框缩小</el-button>
        </div>
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { getShanghai } from '@/api/system/mapApi'
    import { ElMessage } from 'element-plus'
    import axios from 'axios'

    const map = shallowRef()
    const Map = shallowRef()
    let mouseTool
    let overlayGroup

    onMounted(() => {
        initMap()
    })

    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0',
            plugins: [
                'AMap.BezierCurveEditor',
                'AMap.MouseTool',
                'AMap.GeoJSON'
            ]
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    center: [116.395577, 39.892257],
                    zoom: 14
                })
                mouseTool = new AMap.MouseTool(map.value)
                mouseTool.on('draw', function (event) {
                    ElMessage.success('覆盖物对象绘制完成')
                    // console.log(event.obj)
                    // console.log(event.obj.getPath())
                    mouseTool.close()
                    // console.log(map.value.getAllOverlays('polygon'))
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const addPolyline = () => {
        const path = [
            [116.362209, 39.887487],
            [116.422897, 39.878002],
            [116.372105, 39.90651],
            [116.428945, 39.89663]
        ]

        const path2 = [
            [
                [116.32873535156249, 40.01499435375046],
                [116.52099609375, 40.019201307686785],
                [116.49902343749999, 40.12849105685408]
            ],
            [
                [116.66931152343749, 40.0360265298117],
                [116.72973632812499, 40.14948820651523],
                [116.81213378906249, 40.01499435375046]
            ]
        ]

        const polyline = new Map.value.Polyline({
            path: path,
            isOutline: true,
            outlineColor: '#ffeeff',
            borderWeight: 3,
            strokeColor: '#3366FF',
            strokeOpacity: 1,
            strokeWeight: 6,
            // 折线样式还支持 'dashed'
            strokeStyle: 'solid',
            // strokeStyle是dashed时有效
            strokeDasharray: [10, 5],
            lineJoin: 'round',
            lineCap: 'round',
            zIndex: 50
        })

        const polyline2 = new Map.value.Polyline({
            path: path2,
            isOutline: true,
            outlineColor: '#ffeeff',
            borderWeight: 3,
            strokeColor: '#3366FF',
            strokeOpacity: 1,
            strokeWeight: 6,
            // 折线样式还支持 'dashed'
            strokeStyle: 'dashed',
            // strokeStyle是dashed时有效
            strokeDasharray: [15, 5],
            lineJoin: 'round',
            lineCap: 'round',
            zIndex: 50
        })

        overlayGroup = new Map.value.OverlayGroup([polyline, polyline2])
        map.value.add(overlayGroup)
        map.value.setFitView([polyline, polyline2])
    }

    const addBezierCurve = () => {
        const path3 = [
            //每个弧线段有两种描述方式
            [116.37, 39.91], //起点
            //第一段弧线
            [116.380298, 39.907771, 116.38, 39.9], //控制点，途经点
            //第二段弧线
            [116.385298, 39.907771, 116.4, 39.9], //控制点，途经点//弧线段有两种描述方式1
            //第三段弧线
            [
                //弧线段有两种描述方式2
                [116.392872, 39.887391], //控制点
                [116.40772, 39.909252], //控制点
                [116.41, 39.89] //途经点
            ],
            //第四段弧线
            [
                116.423857, 39.889498, 116.422312, 39.899639, 116.425273,
                39.902273
            ]
            //控制点，控制点，途经点，每段最多两个控制点
        ]

        const bezierCurve = new Map.value.BezierCurve({
            path: path3,
            isOutline: true,
            outlineColor: '#ffeeff',
            borderWeight: 3,
            strokeColor: '#3366FF',
            strokeOpacity: 1,
            strokeWeight: 6,
            // 线样式还支持 'dashed'
            strokeStyle: 'solid',
            // strokeStyle是dashed时有效
            strokeDasharray: [10, 10],
            lineJoin: 'round',
            lineCap: 'round',
            zIndex: 50
        })

        map.value.add([bezierCurve])
        map.value.setFitView([bezierCurve])
    }

    const addPolygon = async () => {
        const res = await getShanghai()
        let polygon = new Map.value.Polygon({
            path: res.data,
            fillColor: '#ccebc5',
            strokeOpacity: 1,
            fillOpacity: 0.5,
            strokeColor: '#2b8cbe',
            strokeWeight: 1,
            strokeStyle: 'dashed',
            strokeDasharray: [5, 5]
        })
        polygon.on('mouseover', () => {
            polygon.setOptions({
                fillOpacity: 0.7,
                fillColor: '#7bccc4'
            })
        })
        polygon.on('mouseout', () => {
            polygon.setOptions({
                fillOpacity: 0.5,
                fillColor: '#ccebc5'
            })
        })
        map.value.add(polygon)
        map.value.setFitView([polygon])
    }

    const addRectangle = () => {
        const southWest = new Map.value.LngLat(116.356449, 39.859008)
        const northEast = new Map.value.LngLat(116.417901, 39.893797)
        const bounds = new Map.value.Bounds(southWest, northEast)
        const rectangle = new Map.value.Rectangle({
            bounds: bounds,
            strokeColor: 'red',
            strokeWeight: 6,
            strokeOpacity: 0.5,
            strokeDasharray: [30, 10],
            // strokeStyle还支持 solid
            strokeStyle: 'dashed',
            fillColor: 'blue',
            fillOpacity: 0.5,
            cursor: 'pointer',
            zIndex: 50
        })

        map.value.add(rectangle)
        // 缩放地图到合适的视野级别
        map.value.setFitView([rectangle])
    }

    const addCircle = () => {
        const circle = new Map.value.Circle({
            center: [116.433322, 39.900255],
            radius: 1000, //半径
            borderWeight: 3,
            strokeColor: '#FF33FF',
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            strokeStyle: 'dashed',
            strokeDasharray: [10, 10],
            // 线样式还支持 'dashed'
            fillColor: '#1791fc',
            zIndex: 50
        })

        map.value.add(circle)
        // 缩放地图到合适的视野级别
        map.value.setFitView([circle])
    }

    const addEllipse = () => {
        const ellipse = new Map.value.Ellipse({
            center: [116.433322, 39.900255],
            radius: [2000, 1000], //半径
            borderWeight: 3,
            strokeColor: '#FF33FF',
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            // 线样式还支持 'dashed'
            strokeStyle: 'dashed',
            strokeDasharray: [10, 10],
            fillColor: '#1791fc',
            zIndex: 50
        })
        map.value.add(ellipse)
        // 缩放地图到合适的视野级别
        map.value.setFitView([ellipse])
    }

    const drawPolyline = () => {
        mouseTool.polyline({
            strokeColor: '#3366FF',
            strokeOpacity: 1,
            strokeWeight: 6,
            // 线样式还支持 'dashed'
            strokeStyle: 'solid'
            // strokeStyle是dashed时有效
            // strokeDasharray: [10, 5],
        })
    }

    const drawPolygon = () => {
        mouseTool.polygon({
            strokeColor: '#FF33FF',
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillColor: '#1791fc',
            fillOpacity: 0.4,
            // 线样式还支持 'dashed'
            strokeStyle: 'solid'
            // strokeStyle是dashed时有效
            // strokeDasharray: [30,10],
        })
    }

    const drawRectangle = () => {
        mouseTool.rectangle({
            strokeColor: 'red',
            strokeOpacity: 0.5,
            strokeWeight: 6,
            fillColor: 'blue',
            fillOpacity: 0.5,
            // strokeStyle还支持 solid
            strokeStyle: 'solid'
            // strokeDasharray: [30,10],
        })
    }

    const drawCircle = () => {
        const res = mouseTool.circle({
            strokeColor: '#FF33FF',
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillColor: '#1791fc',
            fillOpacity: 0.4,
            strokeStyle: 'solid'
            // 线样式还支持 'dashed'
            // strokeDasharray: [30,10],
        })
    }

    const overlay = () => {
        overlayGroup.setOptions({
            fillColor: randomColor(),
            strokeColor: randomColor(),
            outlineColor: randomColor()
        })
    }

    const randomColor = () => {
        return '#' + ((Math.random() * 0xffffff) << 0).toString(16)
    }

    const measureArea = () => {
        mouseTool.measureArea()
    }

    const measureRule = () => {
        mouseTool.rule()
    }

    const rectZoomIn = () => {
        mouseTool.rectZoomIn()
    }

    const measureOut = () => {
        mouseTool.rectZoomOut()
    }

    const drawGeoJSON = async () => {
        axios(
            'https://a.amap.com/jsapi_demos/static/geojson/chongqing.json'
        ).then((geoJSON) => {
            let data = geoJSON.data
            let geojson = new Map.value.GeoJSON({
                geoJSON: data,
                // 还可以自定义getMarker和getPolyline
                getPolygon: function (res, lnglats) {
                    // 计算面积
                    const area = Map.value.GeometryUtil.ringArea(lnglats[0])

                    return new Map.value.Polygon({
                        path: lnglats,
                        fillOpacity: 1 - Math.sqrt(area / 8000000000), // 面积越大透明度越高
                        strokeColor: 'white',
                        fillColor: 'red'
                    })
                }
            })
            map.value.add(geojson)
            map.value.setCenter([107.943579, 30.131735])
            map.value.setZoom(7)
        })
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
            width: 150px;
            padding: 10px;
            display: flex;
            flex-direction: column;

            .el-button {
                margin: 0 0 5px 0;
            }
        }
    }
</style>
