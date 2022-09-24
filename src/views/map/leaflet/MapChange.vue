<template>
    <div style="width: 100%; height: 100%">
        <div class="btn">
            <el-button type="primary" @click="changeBaseMapLayer('GaoNormal')">
                高德地图
            </el-button>
            <el-button type="primary" @click="changeBaseMapLayer('GaoDeImage')">
                高德卫星
            </el-button>
            <el-button type="primary" @click="changeBaseMapLayer('TianNormal')">
                天地图
            </el-button>
            <el-button type="primary" @click="changeBaseMapLayer('TianImage')">
                天地图卫星
            </el-button>
            <el-button type="primary" @click="changeBaseMapLayer('OSM')">
                OSM
            </el-button>
            <el-button type="primary" @click="changeBaseMapLayer('Tencent')">
                腾讯地图
            </el-button>
            <el-button type="primary" @click="changeBaseMapLayer('Baidu')">
                百度地图
            </el-button>
        </div>
        <div id="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import L from '@/utils/leaflet'
    import 'leaflet/dist/leaflet.css'

    let map
    let baseLayer
    const initMap = () => {
        map = L.map('map', {
            center: [39.90553, 116.391305],
            zoom: 12
        })

        baseLayer = L.tileLayer
            .chinaProvider('Tencent.Normal.Map', { maxZoom: 18, minZoom: 5 })
            .addTo(map)

        //设置参照物
        L.marker([39.90553, 116.391305]).addTo(map)
    }

    // 切换地图
    const changeBaseMapLayer = (type) => {
        /**
         * 高德地图
         */
        const GaoNormal = L.tileLayer.chinaProvider('GaoDe.Normal.Map')
        const Gaodimgem = L.tileLayer.chinaProvider('GaoDe.Satellite.Map')
        const Gaodimga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion')
        const GaoDeImage = L.layerGroup([Gaodimgem, Gaodimga])
        /**
         * 天地图内容
         */
        const normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map')
        const normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion')
        const imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map')
        const imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion')
        const terrain = L.tileLayer.chinaProvider('TianDiTu.Terrain.Map')
        const terraina = L.tileLayer.chinaProvider('TianDiTu.Terrain.Annotion')
        const TianNormal = L.layerGroup([normalm, normala])
        const TianImage = L.layerGroup([imgm, imga])
        const TianTerrain = L.layerGroup([terrain, terraina])
        /**
         * 智图地图内容
         */
        const GeoNormal = L.tileLayer.chinaProvider('Geoq.Normal.Map')
        const GeoNormal1 = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue')
        /**
         * OSM
         */
        const OSM = L.tileLayer.chinaProvider('OSM.Normal.Map')
        /**
         * 腾讯地图
         */
        const Tencent = L.tileLayer.chinaProvider('Tencent.Normal.Map')
        const Baidu = L.tileLayer.chinaProvider('Baidu.Normal.Map')

        const mapLayer = {
            GaoNormal,
            GaoDeImage,
            TianNormal,
            TianImage,
            TianTerrain,
            OSM,
            GeoNormal,
            GeoNormal1,
            Tencent,
            Baidu
        }
        map.removeLayer(baseLayer)
        baseLayer = mapLayer[type].addTo(map)
    }

    onMounted(() => {
        initMap()
    })
</script>

<style scoped lang="scss">
    .btn {
        height: 8%;
    }
    #map {
        width: 100%;
        height: 92%;
    }
</style>
