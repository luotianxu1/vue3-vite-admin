<template>
    <div class="container">
        <div class="btn">
            <el-button @click="addMarker">添加Marker</el-button>
            <el-button @click="deleteMarker">删除Marker</el-button>
            <el-button @click="addSatellite">添加卫星图层</el-button>
            <el-button @click="deleteSatellite">删除卫星图层</el-button>
            <el-button @click="getLayer">获取图层</el-button>
            <el-button @click="setLayer">设置图层</el-button>
        </div>
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'

    const map = shallowRef()
    const Amap = shallowRef()
    let satelliteLayer

    onMounted(() => {
        initMap()
    })

    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0'
        })
            .then((AMap) => {
                Amap.value = AMap
                map.value = new AMap.Map('map', {
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

    let marker
    const addMarker = () => {
        marker = new Amap.value.Marker({
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: [116.405467, 39.907761],
            anchor: 'bottom-center'
        })
        map.value.add(marker)
        map.value.setFitView()
    }

    const deleteMarker = () => {
        map.value.remove(marker)
    }

    const addSatellite = () => {
        satelliteLayer = new Amap.value.TileLayer.Satellite()
        map.value.add(satelliteLayer)
    }

    const deleteSatellite = () => {
        map.value.remove(satelliteLayer)
    }

    const getLayer = () => {
        console.log(map.value.getLayers())
    }

    const setLayer = () => {
        const layers = [
            // 卫星
            new Amap.value.TileLayer.Satellite(),
            // 路网
            new Amap.value.TileLayer.RoadNet()
        ]
        map.value.setLayers(layers)
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
