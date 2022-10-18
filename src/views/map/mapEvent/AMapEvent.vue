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
                    viewMode: '3D', //开启3D视图,默认为关闭
                    terrain: true,
                    zoom: 5,
                    center: [105.602725, 37.076636],
                    features: ['bg', 'road', 'building', 'point'], // 地图显示要素
                    showLabel: true //显示地图文字标记
                })

                map.value.on('complete', () => {
                    ElMessage.success('地图加载完成')
                })
                map.value.on('movestart', () => {
                    ElMessage.success('地图移动开始')
                })
                map.value.on('mapmove', () => {
                    console.log('地图移动中')
                })
                map.value.on('moveend', () => {
                    ElMessage.success('地图移动结束')
                })
                map.value.on('zoomstart', () => {
                    ElMessage.success('地图缩放开始')
                })
                map.value.on('zoomchange', () => {
                    console.log('地图缩放中')
                })
                map.value.on('zoomend', () => {
                    ElMessage.success('地图缩放结束')
                })
                map.value.on('click', (e) => {
                    ElMessage.success(
                        '您在 [ ' +
                            e.lnglat.getLng() +
                            ',' +
                            e.lnglat.getLat() +
                            ' ] 的位置单击了地图！'
                    )
                })
                map.value.on('dblclick', (e) => {
                    ElMessage.success(
                        '您在 [ ' +
                            e.lnglat.getLng() +
                            ',' +
                            e.lnglat.getLat() +
                            ' ] 的位置双击了地图！'
                    )
                })
                map.value.on('mousemove', (e) => {
                    console.log(
                        '您在 [ ' +
                            e.lnglat.getLng() +
                            ',' +
                            e.lnglat.getLat() +
                            ' ] 的位置移动了鼠标！'
                    )
                })
                map.value.on('dragstart', () => {
                    ElMessage.success('地图拖拽开始')
                })
                map.value.on('dragging', () => {
                    console.log('地图拖拽中')
                })
                map.value.on('dragend', () => {
                    ElMessage.success('地图拖拽结束')
                })
            })
            .catch((e) => {
                console.log(e)
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
