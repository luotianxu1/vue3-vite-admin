<template>
    <div class="container">
        <div class="btn">
            <el-radio v-model="radio1" label="dark" size="large">
                幻影黑
            </el-radio>
            <el-radio v-model="radio1" label="light" size="large">
                月光银
            </el-radio>
            <el-radio v-model="radio1" label="whitesmoke" size="large">
                远山黛
            </el-radio>
            <el-radio v-model="radio1" label="fresh" size="large">
                草色青
            </el-radio>
            <el-radio v-model="radio1" label="grey" size="large">
                雅士灰
            </el-radio>
            <el-radio v-model="radio1" label="graffiti" size="large">
                涂鸦
            </el-radio>
            <el-radio v-model="radio1" label="macaron" size="large">
                马卡龙
            </el-radio>
            <el-radio v-model="radio1" label="blue" size="large">
                靛青蓝
            </el-radio>
            <el-radio v-model="radio1" label="darkblue" size="large">
                极夜蓝
            </el-radio>
            <el-radio v-model="radio1" label="wine" size="large">酱籽</el-radio>
        </div>
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'

    const map = shallowRef()

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
                    zoom: 5,
                    zooms: [2, 22],
                    center: [105.602725, 37.076636],
                    resizeEnable: true, //是否监控地图容器尺寸变化
                    mapStyle: 'amap://styles/whitesmoke'
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const radio1 = ref('whitesmoke')
    watch(radio1, (val) => {
        console.log(val)
        let styleName = 'amap://styles/' + val
        map.value.setMapStyle(styleName)
    })
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
