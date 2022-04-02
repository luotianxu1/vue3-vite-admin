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
                map.value = new AMap.Map('container', {
                    viewMode: '3D',
                    zoom: 5,
                    zooms: [2, 22],
                    center: [105.602725, 37.076636]
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
