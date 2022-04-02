<template>
    <div id="container"></div>
</template>
<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { onMounted, shallowRef } from 'vue'

    let map = shallowRef()

    onMounted(() => {
        initMap()
    })

    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0',
            plugins: []
        })
            .then((AMap) => {
                map.value = new AMap.Map('container', {
                    viewMode: '3D',
                    zoom: 5,
                    zooms: [2, 22],
                    center: [105.602725, 37.076636]
                })

                let positionArr = [
                    [113.357224, 34.977186],
                    [114.555528, 37.727903],
                    [112.106257, 36.962733],
                    [109.830097, 31.859027],
                    [116.449181, 39.98614]
                ]
                for (let item of positionArr) {
                    let marker = new AMap.Marker({
                        position: [item[0], item[1]]
                    })
                    map.value.add(marker)
                }

                const trafficLayer = new AMap.TileLayer.Traffic({
                    zIndex: 10,
                    zooms: [7, 22]
                })
                map.value.add(trafficLayer)
            })
            .catch((e) => {
                console.log(e)
            })
    }
</script>
<style lang="scss" scoped>
    #container {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
    }
</style>
