<template>
    <div class="container">
        <div id="map" class="map"></div>
        <div class="switch">
            是否显示实时路况
            <el-switch v-model="isOpen" class="mb-2" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'

    const map = shallowRef()
    const trafficLayer = shallowRef()

    onMounted(() => {
        initMap()
    })

    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0'
        })
            .then((AMap) => {
                const satellite = new AMap.TileLayer.Satellite()
                const roadNet = new AMap.TileLayer.RoadNet()
                map.value = new AMap.Map('map', {
                    viewMode: '3D',
                    zoom: 5,
                    zooms: [2, 22],
                    center: [105.602725, 37.076636],
                    layers: [satellite, roadNet]
                })

                //实时路况图层
                trafficLayer.value = new AMap.TileLayer.Traffic({
                    zooms: [7, 22]
                })

                trafficLayer.value.setMap(map.value)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const isOpen = ref(false)

    watch(
        isOpen,
        (val) => {
            if (!val && trafficLayer.value) {
                trafficLayer.value.hide()
            } else if (val && trafficLayer.value) {
                trafficLayer.value.show()
            }
        },
        { immediate: true }
    )
</script>

<style lang="scss" scoped>
    .container {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        position: relative;

        .map {
            height: 100%;
            width: 100%;
        }

        .switch {
            position: absolute;
            top: 20px;
            left: 20px;
            width: 200px;
            height: 30px;
            display: flex;
            align-content: center;
            justify-content: center;
            background-color: #fff;
        }
    }
</style>
