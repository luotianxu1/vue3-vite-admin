<template>
    <div id="container"></div>
</template>
<script setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { onMounted, shallowRef } from 'vue'
    window.forceWebGL = true
    window._AMapSecurityConfig = {
        securityJsCode: '6b3c02797424ff02b092b3b28ef179e6'
    }

    let map = shallowRef(null)

    const ininMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0',
            plugins: ['AMap.ToolBar', 'AMap.Driving'],
            AMapUI: {
                version: '1.1',
                plugins: []
            },
            Loca: {
                version: '2.0.0'
            }
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

    onMounted(() => {
        ininMap()
    })
</script>
<style lang="scss" scoped>
    #container {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
    }
</style>
