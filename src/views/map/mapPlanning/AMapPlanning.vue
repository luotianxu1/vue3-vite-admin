<template>
    <div class="container">
        <div class="btn">
            <div id="panel"></div>
        </div>
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { ElMessage } from 'element-plus'

    const map = shallowRef<AMap.Map>()
    const Map = shallowRef()

    onMounted(() => {
        initMap()
    })

    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0',
            plugins: ['AMap.Driving']
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    resizeEnable: true,
                    center: [116.397428, 39.90923], //地图中心点
                    zoom: 13 //地图显示的缩放级别
                })

                const driving = new AMap.Driving({
                    map: map.value,
                    panel: 'panel'
                })
                // 根据起终点经纬度规划驾车导航路线
                driving.search(
                    new AMap.LngLat(116.379028, 39.865042),
                    new AMap.LngLat(116.427281, 39.903719),
                    // 途径点
                    {
                        waypoints: [new AMap.LngLat(116.379028, 39.885042)]
                    },
                    function (status, result) {
                        // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                        if (status === 'complete') {
                            ElMessage.success('绘制驾车路线完成')
                        } else {
                            ElMessage.error('获取驾车数据失败：' + result)
                        }
                    }
                )
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
