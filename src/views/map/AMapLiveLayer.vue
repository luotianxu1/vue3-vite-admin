<template>
    <div class="container">
        <div class="btn">
            实时路况:
            <el-switch v-model="isOpen" />
        </div>
        <div id="map" class="map"></div>
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
                map.value = new AMap.Map('map', {
                    viewMode: '3D',
		                terrain: true, // 开启地形图
                    zoom: 5,
                    zooms: [2, 22],
                    center: [105.602725, 37.076636]
                })

                //实时路况图层
                trafficLayer.value = new AMap.TileLayer.Traffic({
                    zooms: [7, 22]
                })

                trafficLayer.value.setMap(map.value)
                trafficLayer.value.hide()
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
        display: flex;

        .map {
            height: 100%;
            width: 100%;
        }

        .btn {
            width: 150px;
            padding: 10px;
            display: flex;

            .el-button {
                margin: 0 0 5px 0;
            }
        }
    }
</style>
