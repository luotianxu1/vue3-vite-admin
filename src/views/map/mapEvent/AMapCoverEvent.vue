<template>
    <div class="container">
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { ElMessage } from 'element-plus'

    const map = shallowRef()
    const Map = shallowRef()
    let marker
    let polygon

    onMounted(() => {
        initMap()
    })

    const initMap = () => {
        AMapLoader.load({
            key: 'cb7590d4af790e30ab7f2e51d9778391',
            version: '2.0'
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    terrain: true,
                    zoom: 14,
                    center: [116.405467, 39.907761],
                    showLabel: true //显示地图文字标记
                })

                const polygonArr = [
                    [116.403322, 39.920255],
                    [116.410703, 39.897555],
                    [116.402292, 39.892353],
                    [116.389846, 39.891365]
                ]
                polygon = new AMap.Polygon({
                    map: map.value,
                    draggable: true,
                    path: polygonArr, //设置多边形边界路径
                    strokeColor: '#FF33FF', //线颜色
                    strokeOpacity: 0.2, //线透明度
                    strokeWeight: 3, //线宽
                    fillColor: '#1791fc', //填充色
                    fillOpacity: 0.35 //填充透明度
                })

                // 创建两个点标记
                marker = new AMap.Marker({
                    map: map.value,
                    position: [116.405467, 39.907761],
                    draggable: true
                })

                map.value.setFitView()

                clickOn()
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const clickOn = () => {
        marker.on('click', showInfoM)
        polygon.on('click', showInfoP)
        polygon.on('dblclick', showInfoPD)
        marker.on('mouseover', showInfoOver)
        polygon.on('mouseover', showInfoOver)
        marker.on('mouseout', showInfoOut)
        polygon.on('mouseout', showInfoOut)
        polygon.on('dragging', dragging)
        polygon.on('dragstart', dragstart)
        polygon.on('dragend', dragend)
    }

    const showInfoM = (e) => {
        ElMessage.success(
            '您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置点击了marker！'
        )
    }

    const showInfoP = (e) => {
        ElMessage.success(
            '您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置点击了polygon！'
        )
    }

    const showInfoOver = () => {
        ElMessage.success('鼠标移入覆盖物！')
    }

    const showInfoOut = () => {
        ElMessage.success('鼠标移出覆盖物！')
    }

    const showInfoPD = (e) => {
        ElMessage.success(
            '您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置双击了polygon！'
        )
    }

    const dragging = () => {
        console.log('拖拽中')
    }

    const dragstart = () => {
        ElMessage.success('开始拖拽')
    }

    const dragend = () => {
        ElMessage.success('结束拖拽')
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
