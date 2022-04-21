<template>
    <div class="container">
        <div class="btn">
            <el-button @click="initMap">创建地图</el-button>
            <el-button @click="destoryMap">销毁地图</el-button>
        </div>
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'

    const map = shallowRef()

    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0'
        })
            .then((AMap) => {
                map.value = new AMap.Map('map', {
                    viewMode: '3D',
                    zoom: 5,
                    center: [105.602725, 37.076636]
                })

                map.value.on('complete', () => {
                    console.log('加载完成')
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const destoryMap = () => {
        map.value.destroy()
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
            padding: 10px;
            display: flex;
            flex-direction: column;

            .el-button {
                margin: 0 0 5px 0;
            }
        }
    }
</style>
