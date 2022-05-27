<template>
    <div class="container">
        <div class="btn">
            <el-select
                v-model="styleType"
                class="m-2"
                placeholder="Select"
                @change="change"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
        </div>
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { getMassMarkers } from '@/api/system/mapApi'

    onMounted(async () => {
        await initMap()
        await getInfo()
        addCluster(2)
    })

    const map = shallowRef<AMap.Map>()
    const Map = shallowRef()
    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0',
            plugins: ['AMap.MarkerCluster']
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    center: [104.937478, 35.439575],
                    zoom: 5
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    let points
    let count
    const getInfo = async () => {
        const res = await getMassMarkers()
        console.log(res)
        points = res.data
        count = res.data.length
    }

    const renderClusterMarker = (context) => {
        let factor = Math.pow(context.count / count, 1 / 18)
        let div = document.createElement('div')
        let Hue = 180 - factor * 180
        let bgColor = 'hsla(' + Hue + ',100%,40%,0.7)'
        let fontColor = 'hsla(' + Hue + ',100%,90%,1)'
        let borderColor = 'hsla(' + Hue + ',100%,40%,1)'
        let shadowColor = 'hsla(' + Hue + ',100%,90%,1)'
        div.style.backgroundColor = bgColor
        let size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20)
        div.style.width = div.style.height = size + 'px'
        div.style.border = 'solid 1px ' + borderColor
        div.style.borderRadius = size / 2 + 'px'
        div.style.boxShadow = '0 0 5px ' + shadowColor
        div.innerHTML = context.count
        div.style.lineHeight = size + 'px'
        div.style.color = fontColor
        div.style.fontSize = '14px'
        div.style.textAlign = 'center'
        context.marker.setOffset(new Map.value.Pixel(-size / 2, -size / 2))
        context.marker.setContent(div)
    }

    const renderMarker = function (context) {
        let content =
            '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0 0 3px;"></div>'
        let offset = new Map.value.Pixel(-9, -9)
        context.marker.setContent(content)
        context.marker.setOffset(offset)
    }

    const renderClusterMarker2 = function (context) {
        let bgColor
        // 聚合中点个数
        let clusterCount = context.count
        let div = document.createElement('div')
        // 聚合点配色
        let defaultColor = [
            '204,235,197',
            '168,221,181',
            '123,204,196',
            '78,179,211',
            '43,140,190'
        ]
        if (clusterCount >= 0 && clusterCount < 10) {
            bgColor = defaultColor[0]
        } else if (clusterCount >= 10 && clusterCount < 100) {
            bgColor = defaultColor[1]
        } else if (clusterCount >= 100 && clusterCount < 1000) {
            bgColor = defaultColor[2]
        } else if (clusterCount >= 1000 && clusterCount < 10000) {
            bgColor = defaultColor[3]
        } else if (clusterCount >= 10000) {
            bgColor = defaultColor[4]
        }
        div.style.backgroundColor = 'rgba(' + bgColor + ',.5)'
        let size = Math.round(25 + Math.pow(clusterCount / count, 1 / 5) * 40)
        div.style.width = div.style.height = size + 'px'
        div.style.border = 'solid 1px rgba(' + bgColor + ',1)'
        div.style.borderRadius = size / 2 + 'px'
        div.innerHTML = context.count
        div.style.lineHeight = size + 'px'
        div.style.color = '#ffffff'
        div.style.fontSize = '12px'
        div.style.textAlign = 'center'
        context.marker.setOffset(new Map.value.Pixel(-size / 2, -size / 2))
        context.marker.setContent(div)
    }

    const renderMarker2 = function (context) {
        let content =
            '<div style="background-color: rgba(255,255,178,.9); height: 18px; width: 18px; border: 1px solid rgba(255,255,178,1); border-radius: 12px; box-shadow: rgba(0, 0, 0, 1) 0 0 3px;"></div>'
        let offset = new Map.value.Pixel(-9, -9)
        context.marker.setContent(content)
        context.marker.setOffset(offset)
    }

    let cluster
    const addCluster = (tag) => {
        const gridSize = 60
        if (cluster) {
            cluster.setMap(null)
        }
        if (tag === 2) {
            //完全自定义
            cluster = new Map.value.MarkerCluster(map.value, points, {
                gridSize: gridSize, // 设置网格像素大小
                renderClusterMarker: renderClusterMarker, // 自定义聚合点样式
                renderMarker: renderMarker // 自定义非聚合点样式
            })
        } else if (tag === 1) {
            //自定义图标
            let sts = [
                {
                    url: '//a.amap.com/jsapi_demos/static/images/blue.png',
                    size: new Map.value.Size(32, 32),
                    offset: new Map.value.Pixel(-16, -16)
                },
                {
                    url: '//a.amap.com/jsapi_demos/static/images/green.png',
                    size: new Map.value.Size(32, 32),
                    offset: new Map.value.Pixel(-16, -16)
                },
                {
                    url: '//a.amap.com/jsapi_demos/static/images/orange.png',
                    size: new Map.value.Size(36, 36),
                    offset: new Map.value.Pixel(-18, -18)
                },
                {
                    url: '//a.amap.com/jsapi_demos/static/images/red.png',
                    size: new Map.value.Size(48, 48),
                    offset: new Map.value.Pixel(-24, -24)
                },
                {
                    url: '//a.amap.com/jsapi_demos/static/images/darkRed.png',
                    size: new Map.value.Size(48, 48),
                    offset: new Map.value.Pixel(-24, -24)
                }
            ]
            cluster = new Map.value.MarkerCluster(map.value, points, {
                styles: sts,
                gridSize: gridSize
            })
        } else if (tag === 3) {
            //完全自定义
            cluster = new Map.value.MarkerCluster(map.value, points, {
                gridSize: gridSize, // 设置网格像素大小
                renderClusterMarker: renderClusterMarker2, // 自定义聚合点样式
                renderMarker: renderMarker2 // 自定义非聚合点样式
            })
        } else {
            //默认样式
            cluster = new Map.value.MarkerCluster(map.value, points, {
                gridSize: gridSize
            })
        }
    }

    const styleType = ref(2)
    const options = [
        {
            value: 0,
            label: '默认样式'
        },
        {
            value: 1,
            label: '自定义图标'
        },
        {
            value: 2,
            label: '完全自定义1'
        },
        {
            value: 3,
            label: '完全自定义2'
        }
    ]
    const change = () => {
        addCluster(styleType.value)
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
            width: 150px;
            padding: 10px;
            display: flex;
            flex-direction: column;

            .el-button {
                margin: 0 0 5px 0;
            }
        }
    }
</style>
