<template>
    <div class="container">
        <div class="btn">
            <el-button>创建地图</el-button>
        </div>
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { ElMessage } from 'element-plus'

    const map = shallowRef()
    const Map = shallowRef()

    onMounted(() => {
        initMap()
    })

    let count = 0
    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0'
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    viewMode: '3D', //开启3D视图,默认为关闭
                    terrain: true,
                    zoom: 5,
                    center: [105.602725, 37.076636],
                    features: ['bg', 'road', 'building', 'point'], // 地图显示要素
                    showLabel: true //显示地图文字标记
                })
                bind()
                map.value.on('count', _onCount) //绑定自定义事件
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const clickListener = (e) => {
        new Map.value.Marker({
            position: e.lnglat,
            map: map.value
        })
        map.value.emit('count', { count: (count += 1) }) //触发自定义事件
    }

    const remove = () => {
        map.value.off('click', clickListener)
    }

    const bind = () => {
        remove() //防止重复绑定
        map.value.on('click', clickListener)
    }

    const _onCount = () => {
        ElMessage.success(count + '个')
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
            width: 350px;
            padding: 10px;
            display: flex;
            flex-direction: column;

            .el-button {
                margin: 0 0 5px 0;
            }
        }
    }
</style>
