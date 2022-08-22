<template>
    <div class="container">
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'

    const map = shallowRef<AMap.Map>()
    const Map = shallowRef()

    onMounted(() => {
        initMap()
    })

    const initMap = () => {
        AMapLoader.load({
            key: 'cb7590d4af790e30ab7f2e51d9778391',
            version: '2.0',
            plugins: ['AMap.DragRoute']
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    resizeEnable: true,
                    center: [116.397428, 39.90923], //地图中心点
                    zoom: 13 //地图显示的缩放级别
                })

                //绘制初始路径
                const path: any = []
                path.push([116.303843, 39.983412])
                path.push([116.321354, 39.896436])
                path.push([116.407012, 39.992093])
                if (!map.value) {
                    return
                }
                const route = new AMap.DragRoute(
                    map.value,
                    path,
                    AMap.DrivingPolicy.LEAST_FEE
                ) //构造拖拽导航类
                route.search() //查询导航路径并开启拖拽导航
                route.on('complete', (e) => {
                    console.log(e)
                })
            })
            .catch((e) => {
                console.log(e)
            })
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
            width: 320px;
            padding: 10px;
            display: flex;
            flex-direction: column;

            .el-button {
                margin: 0 0 5px 0;
            }
        }
    }
</style>
