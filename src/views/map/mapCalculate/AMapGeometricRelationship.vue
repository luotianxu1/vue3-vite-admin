<template>
    <div class="container">
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'

    const map = shallowRef<AMap.Map>()
    const Map = shallowRef()
    let path1 = [
        [116.376907, 39.910967],
        [116.384911, 39.919505],
        [116.40109, 39.919728],
        [116.411132, 39.911408],
        [116.412076, 39.899135],
        [116.402292, 39.892353],
        [116.3874, 39.892518],
        [116.376971, 39.899267]
    ]
    let path2 = [
        [116.390233, 39.906602],
        [116.395254, 39.908668],
        [116.400661, 39.906667],
        [116.400962, 39.898589],
        [116.395769, 39.894855],
        [116.390147, 39.898049]
    ]
    let polygon1
    let polygon2
    let textBox

    onMounted(() => {
        initMap()
    })

    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0'
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    resizeEnable: true,
                    zoom: 13 //地图显示的缩放级别
                })
                if (!map.value) {
                    return
                }
                polygon1 = new AMap.Polygon({
                    map: map.value,
                    fillColor: 'blue',
                    fillOpacity: 0.3,
                    path: path1
                })
                polygon2 = new AMap.Polygon({
                    map: map.value,
                    fillColor: 'red',
                    fillOpacity: 0.3,
                    path: path2,
                    draggable: true
                })
                textBox = new AMap.Text({
                    map: map.value,
                    position: new AMap.LngLat(116.40109, 39.919728),
                    offset: new AMap.Pixel(-20, -40),
                    style: {
                        'background-color': 'yellow',
                        'border': 'solid 1px #0088ff',
                        'padding': '10px 20px'
                    }
                })
                compute()
                polygon2.on('dragend',compute)
                map.value.setFitView([polygon1,polygon2,textBox])
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const compute = () => {
        let polygon1Path = polygon1.getPath()
        let polygon2Path = polygon2.getPath()
        // 小圈是否在大圈内
        let isRingInRing = Map.value.GeometryUtil.isRingInRing(
            polygon2Path,
            polygon1Path
        )
        // 两圈是否交叉
        let doesRingRingIntersect = Map.value.GeometryUtil.doesRingRingIntersect(
            polygon2Path,
            polygon1Path
        )
        let ringRingClip = Map.value.GeometryUtil.ringRingClip(
            polygon2Path,
            polygon1Path
        )
        let ringArea = Map.value.GeometryUtil.ringArea(ringRingClip)

        let text = '两圈关系：在大圈外'
        if (isRingInRing) {
            text = '两圈关系：在大圈内'
        } else if (doesRingRingIntersect) {
            text = '两圈关系：两圈相交, 交叉区域面积为' + ringArea + '平方米'
        }
        textBox.setText(text)
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
            width: 320px;
            padding: 10px;
            display: flex;
            flex-direction: column;

            .el-button {
                margin: 0 0 5px 0;
            }
        }
    }
</style>
