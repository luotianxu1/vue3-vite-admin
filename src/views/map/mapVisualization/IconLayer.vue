<template>
    <div class="container">
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { trafficAccident } from '@/api/system/mapApi'

    const map = shallowRef<AMap.Map>()
    const Map = shallowRef()
    const locaLayer = shallowRef()
    let data = ref()
    onMounted(async () => {
        await initMap()
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
            .then(async (AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    zoom: 13.54,
                    viewMode: '3D',
                    center: [116.398063, 39.988207], //北京
                    mapStyle: 'amap://styles/dark'
                })
                if (!map.value) {
                    return
                }
                locaLayer.value = Loca
                data.value = await getEventsCollection()
                await initLayer()
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const initLayer = () => {
        if (!map.value) {
            return
        }
        let loca = new locaLayer.value.Container({
            map: map.value
        })
        let geo = new locaLayer.value.GeoJSONSource({
            data: data.value
        })
        let layer = new locaLayer.value.IconLayer({
            zIndex: 10,
            opacity: 1,
            visible: false
        })
        let trafficIcons = {
            1: 'https://a.amap.com/Loca/static/loca-v2/demos/images/traffic-control.png',
            2: 'https://a.amap.com/Loca/static/loca-v2/demos/images/jam.png',
            3: 'https://a.amap.com/Loca/static/loca-v2/demos/images/construction.png',
            4: 'https://a.amap.com/Loca/static/loca-v2/demos/images/close.png',
            5: 'https://a.amap.com/Loca/static/loca-v2/demos/images/fog.png',
            0: 'https://a.amap.com/Loca/static/loca-v2/demos/images/accident.png'
        }
        layer.setSource(geo)
        layer.setStyle({
            unit: 'px',
            icon: (index, feature) => {
                let item = feature.properties.rawData
                return trafficIcons[
                item.type % Object.keys(trafficIcons).length
                    ]
            },
            iconSize: [40, 40],
            offset: [0, -40],
            rotation: 0
        })
        loca.add(layer)
        layer.show()
        map.value.on('complete', function () {
            setTimeout(function () {
                layer.addAnimate({
                    key: 'offset',
                    value: [0, 1],
                    easing: 'Linear',
                    transform: 500,
                    random: true,
                    delay: 9000
                })
                layer.addAnimate({
                    key: 'iconSize',
                    value: [0, 1],
                    easing: 'Linear',
                    transform: 500,
                    random: true,
                    delay: 9000
                })
            }, 800)
        })
        loca.animate.start()
    }

    const getEventsCollection = async () => {
        const res = await trafficAccident()

        let _events = res.data[0].events
        let list = _events.map((e) => {
            let ll = e.lngLat.split(',')
            let arr = [parseFloat(ll[0]), parseFloat(ll[1])]
            return {
                type: 'Feature',
                properties: {
                    rawData: e
                },
                geometry: {
                    type: 'Point',
                    coordinates: arr
                }
            }
        })

        return {
            type: 'FeatureCollection',
            features: list
        }
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
