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
            version: '2.0'
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    resizeEnable: true,
                    zoom: 13 //地图显示的缩放级别
                })
                if (!map.value) {
                    return
                }
                let path = [
                    [116.169465, 39.93267],
                    [116.16026, 39.924492],
                    [116.150625, 39.710019],
                    [116.183198, 39.70992],
                    [116.22695, 39.777616],
                    [116.442621, 39.799892],
                    [116.463478, 39.790066],
                    [116.588276, 39.809551],
                    [116.536091, 39.808859],
                    [116.573856, 39.839643],
                    [116.70638, 39.91674],
                    [116.600293, 39.93777],
                    [116.514805, 39.982375],
                    [116.499935, 40.01371],
                    [116.54652, 40.030443],
                    [116.687668, 40.129961],
                    [116.539697, 40.080659],
                    [116.50339, 40.058474],
                    [116.4688, 40.052578]
                ]
                let polygon = new AMap.Polygon({
                    map: map.value,
                    fillOpacity: 0.4,
                    path: path
                })
                let area = Math.round(AMap.GeometryUtil.ringArea(path))
                let text = new AMap.Text({
                    position: new AMap.LngLat(116.4688, 40.052578),
                    text: '区域面积' + area + '平方米',
                    offset: new AMap.Pixel(-20, -20)
                })
                map.value.add(text)
                map.value.setFitView(polygon)
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
