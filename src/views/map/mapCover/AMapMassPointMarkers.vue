<template>
    <div class="container">
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { getMassPointMarkers } from '@/api/system/mapApi'

    onMounted(async () => {
        await initMap()
        await getInfo()
        await generate()
    })

    let Positions = []
    const getInfo = async () => {
        const res = await getMassPointMarkers()
        Positions = res.data
    }

    const map = shallowRef<AMap.Map>()
    const Map = shallowRef()
    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0'
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    zoom: 9,
                    viewMode:'3D',
                    center: [116.12, 40.11],
                    showLabel: false,
                    showIndoorMap: false
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const generate = () => {
        // 创建 AMap.LabelsLayer 图层
        const layer = new Map.value.LabelsLayer({
            zooms: [3, 20],
            zIndex: 1000,
            collision: false
        })

        // 将图层添加到地图
        if (!map.value) {
            return
        }
        map.value.add(layer)

        const markers: any = []
        const positions = Positions.slice(0, 3e4)

        const icon = {
            type: 'image',
            image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            size: [6, 9],
            anchor: 'bottom-center'
        }

        for (let i = 0; i < positions.length; i++) {
            const curPosition = positions[i]
            const curData = {
                position: curPosition,
                icon
            }

            const labelMarker = new Map.value.LabelMarker(curData)

            markers.push(labelMarker)

            // 普通点
            const normalMarker = new Map.value.Marker({
                anchor: 'bottom-center',
                offset: [0, -15]
            })

            // 给marker绑定事件
            labelMarker.on('mouseover', function (e) {
                const position = e.data.data && e.data.data.position

                if (position) {
                    normalMarker.setContent(
                        '<div class="amap-info-window">' +
                        position +
                        '<div class="amap-info-sharp"></div>' +
                        '</div>'
                    )
                    normalMarker.setPosition(position)
                    if (map.value) {
                        map.value.add(normalMarker)
                    }
                }
            })
            labelMarker.on('mouseout', function () {
                if (map.value) {
                    map.value.remove(normalMarker)
                }
            })
        }

        // 一次性将海量点添加到图层
        layer.add(markers)
    }
</script>

<style scoped lang="scss">
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
