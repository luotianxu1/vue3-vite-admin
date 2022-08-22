<template>
    <div class="container">
        <div class="btn">
            <el-button @click="addMarker">添加点标记</el-button>
            <el-button @click="updateIcon">更新点标记图标</el-button>
            <el-button @click="updateContent">更新点标记内容</el-button>
            <el-button @click="delMarker">删除点标记</el-button>
            <el-button @click="addText">添加文本标记</el-button>
            <el-button @click="addCustomizeIcon">添加自定义图标标记</el-button>
            <el-button @click="addCircle">添加圆点标记</el-button>
            <el-button @click="addCustomizeContent">
                添加自定义标记内容
            </el-button>
        </div>
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import '@amap/amap-jsapi-types'

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
                    center: [116.397428, 39.90923],
                    zoom: 13,
                    resizeEnable: true
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    let marker: AMap.Marker | null
    const addMarker = () => {
        marker = new Map.value.Marker({
            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            position: new Map.value.LngLat(116.406315, 39.908775),
            offset: new Map.value.Pixel(-13, -30),
            anchor: 'bottom' //设置锚点
        })
        if (marker && map.value) {
            map.value.add(marker)
        }
    }

    const updateIcon = () => {
        if (marker) {
            marker.setIcon(
                '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png'
            )
        }
    }

    const updateContent = () => {
        if (!marker) {
            return
        }

        // 自定义点标记内容
        const markerContent = document.createElement('div')

        // 点标记中的图标
        const markerImg = document.createElement('img')
        markerImg.className = 'markerlnglat'
        markerImg.src =
            '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png'
        markerImg.setAttribute('width', '25px')
        markerImg.setAttribute('height', '34px')
        markerContent.appendChild(markerImg)

        // 点标记中的文本
        const markerSpan = document.createElement('span')
        markerSpan.className = 'marker'
        markerSpan.innerHTML = 'Hi，我被更新啦！'
        markerContent.appendChild(markerSpan)

        marker.setContent(markerContent) //更新点标记内容
        marker.setPosition([116.391467, 39.927761]) //更新点标记位置
    }

    const delMarker = () => {
        if (marker && map.value) {
            map.value.remove(marker)
        }
    }

    const addText = () => {
        const text: AMap.Text = new Map.value.Text({
            text: '纯文本标记',
            anchor: 'center', // 设置文本标记锚点
            draggable: true,
            cursor: 'pointer',
            angle: 10,
            style: {
                'padding': '.75rem 1.25rem',
                'margin-bottom': '1rem',
                'border-radius': '.25rem',
                'background-color': 'white',
                'width': '15rem',
                'border-width': 0,
                'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
                'text-align': 'center',
                'font-size': '20px',
                'color': 'blue'
            },
            position: [116.396923, 39.918203]
        })
        text.setMap(map.value)
    }

    const addCustomizeIcon = () => {
        const startIcon: AMap.Icon = new Map.value.Icon({
            size: new Map.value.Size(25, 34),
            image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
            imageSize: new Map.value.Size(135, 40),
            imageOffset: new Map.value.Pixel(-9, -3)
        })

        const endIcon: AMap.Icon = new Map.value.Icon({
            size: new Map.value.Size(25, 34),
            image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
            imageSize: new Map.value.Size(135, 40),
            imageOffset: new Map.value.Pixel(-95, -3)
        })

        const startMarker: AMap.Marker = new Map.value.Marker({
            position: new Map.value.LngLat(116.35, 39.89),
            icon: startIcon,
            offset: new Map.value.Pixel(-13, -30)
        })

        // 将 icon 传入 marker
        const endMarker: AMap.Marker = new Map.value.Marker({
            position: new Map.value.LngLat(116.45, 39.93),
            icon: endIcon,
            offset: new Map.value.Pixel(-13, -30)
        })
        if (map.value) {
            map.value.add([startMarker, endMarker])
        }
    }

    const addCircle = () => {
        const circleMarker: AMap.CircleMarker = new Map.value.CircleMarker({
            center: new Map.value.LngLat(116.407394, 39.904211),
            radius: 10 + Math.random() * 10, //3D视图下，CircleMarker半径不要超过64px
            strokeColor: 'white',
            strokeWeight: 2,
            strokeOpacity: 0.5,
            fillColor: 'rgba(0,0,255,1)',
            fillOpacity: 0.5,
            zIndex: 10,
            bubble: true,
            cursor: 'pointer'
        })
        if (map.value) {
            circleMarker.setMap(map.value)
        }
    }

    let customMarker: AMap.Marker
    const addCustomizeContent = () => {
        const markerContent = `<div class="custom-content-marker">
               <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">
               <div class="close-btn">X</div>
            </div>`

        customMarker = new Map.value.Marker({
            position: new Map.value.LngLat(116.397428, 39.90923),
            content: markerContent,
            offset: new Map.value.Pixel(-13, -30),
            size: new Map.value.Size(25, 34),
            // 设置是否可以拖拽
            draggable: true,
            cursor: 'move'
        })
        customMarker.setLabel({
            direction: 'right',
            offset: new Map.value.Pixel(10, 0), //设置文本标注偏移量
            content: '<div class=\'info\'>我是 marker 的 label 标签</div>' //设置文本标注内容
        })
        if (map.value) {
            map.value.add(customMarker)
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
            width: 350px;
            padding: 10px;
            display: flex;
            flex-direction: column;

            .el-button {
                margin: 0 0 5px 0;
            }
        }
    }

    ::v-deep(.amap-icon img),
    ::v-deep(.amap-marker-content img){
        width: 25px;
        height: 34px;
    }

    ::v-deep(.custom-content-marker) {
        position: relative;
        width: 25px;
        height: 34px;
    }

    ::v-deep(.custom-content-marker img) {
        width: 100%;
        height: 100%;
    }

    ::v-deep(.custom-content-marker .close-btn) {
        position: absolute;
        top: -6px;
        right: -8px;
        width: 15px;
        height: 15px;
        font-size: 12px;
        background: #ccc;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        line-height: 15px;
        box-shadow: -1px 1px 1px rgba(10, 10, 10, 0.2);
    }

</style>
