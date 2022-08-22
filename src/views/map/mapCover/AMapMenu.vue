<template>
    <div class="container">
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'

    const map = shallowRef()
    const Map = shallowRef()
    let contextMenuPositon
    onMounted(() => {
        initMap()
    })

    const initMap = () => {
        AMapLoader.load({
            key: 'cb7590d4af790e30ab7f2e51d9778391',
            version: '2.0',
            plugins: ['AMap.MouseTool']
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    center: [116.397, 39.918],
                    zoom: 14
                })

                const contextMenu = new AMap.ContextMenu()
                //右键放大
                contextMenu.addItem(
                    '放大一级',
                    function () {
                        map.value.zoomIn()
                    },
                    0
                )

                //右键缩小
                contextMenu.addItem(
                    '缩小一级',
                    function () {
                        map.value.zoomOut()
                    },
                    1
                )

                //右键显示全国范围
                contextMenu.addItem(
                    '缩放至全国范围',
                    function () {
                        map.value.setZoomAndCenter(4, [108.946609, 34.262324])
                    },
                    2
                )

                //右键添加Marker标记
                contextMenu.addItem(
                    '添加标记',
                    function () {
                        new AMap.Marker({
                            map: map.value,
                            position: contextMenuPositon //基点位置
                        })
                    },
                    3
                )

                map.value.on('rightclick', function (e) {
                    contextMenu.open(map.value, e.lnglat)
                    contextMenuPositon = e.lnglat
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
