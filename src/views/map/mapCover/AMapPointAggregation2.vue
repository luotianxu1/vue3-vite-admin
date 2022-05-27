<template>
    <div class="container">
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { getBeijingHouse, getBeijingInfo } from '@/api/system/mapApi'

    onMounted(async () => {
        await initMap()
        await getInfo()
        await getHouse()
        await initBeijing()
    })

    const map = shallowRef<AMap.Map>()
    const Map = shallowRef()
    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0',
            plugins: ['AMap.IndexCluster']
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

    let beijing
    const getInfo = async () => {
        const res = await getBeijingInfo()
        beijing = res.data
    }

    let points
    const getHouse = async () => {
        const res = await getBeijingHouse()
        points = res.data
    }

    const clusterIndexSet = {
        city: {
            minZoom: 2,
            maxZoom: 10
        },
        district: {
            minZoom: 10,
            maxZoom: 12
        },
        area: {
            minZoom: 12,
            maxZoom: 15
        },
        community: {
            minZoom: 15,
            maxZoom: 22
        }
    }

    const getStyle = (context) => {
        let clusterData = context.clusterData // 聚合中包含数据
        let index = context.index // 聚合的条件
        let count = context.count // 聚合中点的总数
        // let marker = context.marker // 聚合绘制点 Marker 对象
        let color = ['8,60,156', '66,130,198', '107,174,214', '78,200,211']
        let indexs = ['city', 'district', 'area', 'community']
        let i = indexs.indexOf(index['mainKey'])
        let text = clusterData[0][index['mainKey']]
        let size = Math.round(30 + Math.pow(count / points.length, 1 / 5) * 70)
        if (i <= 2) {
            let extra = '<span class="showCount">' + context.count + '套</span>'
            text = '<span class="showName">' + text + '</span>'
            text += extra
        } else {
            size = 12 * text.length + 20
        }
        let style = {
            bgColor: 'rgba(' + color[i] + ',.8)',
            borderColor: 'rgba(' + color[i] + ',1)',
            text: text,
            size: size,
            index: i,
            color: '#ffffff',
            textAlign: 'center',
            boxShadow: '0px 0px 5px rgba(0,0,0,0.8)'
        }
        return style
    }

    const getPosition = (context) => {
        let key = context.index.mainKey
        let dataItem = context.clusterData && context.clusterData[0]
        let districtName = dataItem[key]
        if (!beijing[districtName]) {
            return null
        }
        let center = beijing[districtName].center.split(',')
        let centerLnglat = new Map.value.LngLat(center[0], center[1])
        return centerLnglat
    }

    const _renderClusterMarker = (context) => {
        // let clusterData = context.clusterData // 聚合中包含数据
        // let index = context.index // 聚合的条件
        // let count = context.count // 聚合中点的总数
        // let marker = context.marker // 聚合点标记对象
        let styleObj = getStyle(context)
        // 自定义点标记样式
        let div = document.createElement('div')
        div.className = 'amap-cluster'
        div.style.backgroundColor = styleObj.bgColor
        div.style.width = styleObj.size + 'px'
        if (styleObj.index <= 2) {
            div.style.height = styleObj.size + 'px'
            // 自定义点击事件
            context.marker.on('click', function (e) {
                // console.log(e)
                if (!map.value) {
                    return
                }
                let curZoom = map.value.getZoom()
                if (curZoom < 20) {
                    curZoom += 1
                }
                map.value.setZoomAndCenter(curZoom, e.lnglat)
            })
        }
        div.style.border = 'solid 1px ' + styleObj.borderColor
        div.style.borderRadius = styleObj.size + 'px'
        div.innerHTML = styleObj.text
        div.style.color = styleObj.color
        div.style.textAlign = styleObj.textAlign
        div.style.boxShadow = styleObj.boxShadow
        context.marker.setContent(div)
        // 自定义聚合点标记显示位置
        let position = getPosition(context)
        if (position) {
            context.marker.setPosition(position)
        }
        context.marker.setAnchor('center')
    }

    const initBeijing = () => {
        new Map.value.IndexCluster(map.value, points, {
            renderClusterMarker: _renderClusterMarker,
            clusterIndexSet: clusterIndexSet
        })
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

    ::v-deep(.amap-cluster) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
    }
    ::v-deep(.showName) {
        font-size: 14px;
    }
    ::v-deep(.showCount,.showName) {
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 80%;
    }
</style>
