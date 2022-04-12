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
            version: '2.0'
        })
            .then((AMap) => {
                let disCountry = new AMap.DistrictLayer.Country({
                    zIndex: 10,
                    SOC: 'CHN',
                    depth: 1,
                    styles: {
                        'nation-stroke': '#ff0000',
                        'coastline-stroke': '#0088ff',
                        'province-stroke': 'grey'
                    }
                })

                map.value = new AMap.Map('container', {
                    viewMode: '3D',
                    zoom: 5,
                    zooms: [4, 10],
                    center: [106.122082, 33.719192],
                    layers: [disCountry]
                })
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
