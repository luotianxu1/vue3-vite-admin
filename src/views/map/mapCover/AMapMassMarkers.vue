<template>
    <div class="container">
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { getMassMarkers } from '@/api/system/mapApi'

    onMounted(async () => {
        await initMap()
        await getInfo()
        await generate()
    })

    let citys = []
    const getInfo = async () => {
        const res = await getMassMarkers()
        citys = res.data
    }

    const map = shallowRef<AMap.Map>()
    const Map = shallowRef()
    let style
    const initMap = () => {
        AMapLoader.load({
            key: 'cb7590d4af790e30ab7f2e51d9778391',
            version: '2.0'
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    zoom: 4,
                    center: [102.342785, 35.312316],
                    showIndoorMap: false,
                    viewMode: '3D'
                })
                style = [
                    {
                        url: 'https://webapi.amap.com/images/mass/mass0.png',
                        anchor: new AMap.Pixel(6, 6),
                        size: new AMap.Size(11, 11),
                        zIndex: 3
                    },
                    {
                        url: 'https://webapi.amap.com/images/mass/mass1.png',
                        anchor: new AMap.Pixel(4, 4),
                        size: new AMap.Size(7, 7),
                        zIndex: 2
                    },
                    {
                        url: 'https://webapi.amap.com/images/mass/mass2.png',
                        anchor: new AMap.Pixel(3, 3),
                        size: new AMap.Size(5, 5),
                        zIndex: 1
                    }
                ]
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const generate = () => {
        const mass = new Map.value.MassMarks(citys, {
            opacity: 0.8,
            zIndex: 111,
            cursor: 'pointer',
            style: style
        })
        const marker = new Map.value.Marker({content: ' ', map: map.value})
        mass.on('mouseover', function (e) {
            marker.setPosition(e.data.lnglat)
            marker.setLabel({content: e.data.name})
        })

        mass.setMap(map.value)
    }
</script>

<style scoped lang="scss">
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
