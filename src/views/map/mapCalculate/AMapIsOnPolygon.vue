<template>
    <div className="container">
        <div id="map" className="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'

    const map = shallowRef<AMap.Map>()
    const Map = shallowRef()
    let marker
    let polygon
    let path = [
        [116.169465, 39.93267],
        [116.16026, 39.924492],
        [116.186138, 39.879817],
        [116.150625, 39.710019],
        [116.183198, 39.70992],
        [116.22695, 39.777616],
        [116.421078, 39.810771],
        [116.442621, 39.799892],
        [116.463478, 39.790066],
        [116.588276, 39.809551],
        [116.536091, 39.808859],
        [116.573856, 39.839643],
        [116.70638, 39.91674],
        [116.657285, 39.934545],
        [116.600293, 39.93777],
        [116.540039, 39.937968],
        [116.514805, 39.982375],
        [116.499935, 40.01371],
        [116.54652, 40.030443],
        [116.687668, 40.129961],
        [116.539697, 40.080659],
        [116.50339, 40.058474],
        [116.4688, 40.052578]
    ]
    onMounted(() => {
        initMap()
    })

    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
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
                polygon = new AMap.Polygon({
                    map: map.value,
                    fillOpacity: 0.4,
                    path: path
                })
                marker = new AMap.Marker({
                    map: map.value,
                    draggable: true,
                    position: [116.566298, 40.014179]
                })
                compute()
                marker.on('dragging', compute)
                map.value.setFitView([polygon, marker])
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const compute = () => {
        let point = marker.getPosition()
        let isPointInRing = Map.value.GeometryUtil.isPointInRing(point, path)
        marker.setLabel({
            direction: '',
            content: isPointInRing ? '内部' : '外部',
            offset: new Map.value.Pixel(20, 0)
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
