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
            AMapUI: {
                // 是否加载 AMapUI，缺省不加载
                version: '1.1', // AMapUI 缺省 1.1
                plugins: ['overlay/SimpleMarker'] // 需要加载的 AMapUI ui插件
            },
            Loca: {
                version: '2.0.0' // Loca 版本，缺省 1.3.2
            }
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    zoom: 11.2,
                    center: [116.352734,39.8447],
                    pitch: 50,
                    showLabel: true,
                    viewMode: '3D',
                    mapStyle: 'amap://styles/dark'
                })
                if (!map.value) {
                    return
                }
                let loca = new Loca.Container({
                    map: map.value
                })

                let geo = new Loca.GeoJSONSource({
                    url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/bj_bus.json',
                })
                let ll = new Loca.LineLayer({
                    loca
                })
                let colors = ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'].reverse()
                ll.setSource(geo, {
                    color: function (index, prop) {
                        let i = index % colors.length
                        return colors[i]
                    },
                    lineWidth: (index, prop) => {
                        let i = index % colors.length
                        return i * 0.1 + 2
                    },
                    altitude: function (index, feature) {
                        let i = index % colors.length
                        return 100 * i
                    },
                    dashArray: [10, 0, 10, 0]
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
