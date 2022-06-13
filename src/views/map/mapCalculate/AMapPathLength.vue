<template>
    <div class="container">
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'

    const map = shallowRef<AMap.Map>()
    const Map = shallowRef()

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
                    zoom: 13
                })
                if (!map.value) {
                    return
                }
                let arr: any = []
                arr.push(new AMap.LngLat('116.368904', '39.913423'))
                arr.push(new AMap.LngLat('116.382122', '39.901176'))
                arr.push(new AMap.LngLat('116.387271', '39.912501'))
                arr.push(new AMap.LngLat('116.398258', '39.904600'))
                arr.push(new AMap.LngLat('116.427097', '39.912500'))
                let polyline = new AMap.Polyline({
                    path: arr,
                    strokeColor: 'red',
                    strokeOpacity: 1,
                    strokeWeight: 3,
                    strokeDasharray: [10, 5]
                })
                polyline.setMap(map.value)
                let distance = Math.round(AMap.GeometryUtil.distanceOfLine(arr))
                let text = new AMap.Text({
                    position: new AMap.LngLat(116.427097, 39.9125),
                    text: '折线长' + distance + '米',
                    offset: new AMap.Pixel(-20, -20)
                })
                map.value.add(text)
                map.value.setFitView(polyline)
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
