<template>
    <div class="container">
        <div class="btn">
            <el-button @click="begin">开始</el-button>
        </div>
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'

    const map = shallowRef<AMap.Map>()
    const Map = shallowRef()
    const finished = ref(false)
    let polyline
    let marker
    let loca
    let path = [
        [102.620455, 30.973672],
        [102.620983, 30.973509],
        [102.621572, 30.973171],
        [102.62226, 30.972732],
        [102.623303, 30.972028],
        [102.62407, 30.971587],
        [102.624621, 30.971056],
        [102.624861, 30.970932],
        [102.625467, 30.97074],
        [102.625925, 30.970587],
        [102.626097, 30.970503],
        [102.626244, 30.970378],
        [102.626672, 30.969989],
        [102.627108, 30.969662],
        [102.628539, 30.968951],
        [102.629371, 30.968594],
        [102.630044, 30.968308],
        [102.630641, 30.968114],
        [102.631158, 30.968034],
        [102.631538, 30.967968],
        [102.631821, 30.967853],
        [102.632196, 30.967649],
        [102.632853, 30.96738],
        [102.633672, 30.967171],
        [102.633813, 30.967099],
        [102.633938, 30.966991],
        [102.634014, 30.966863],
        [102.634064, 30.966727],
        [102.634142, 30.966406],
        [102.63411, 30.966188],
        [102.633993, 30.965986],
        [102.633701, 30.965595]
    ]

    onMounted(() => {
        initMap()
    })

    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
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
                    terrain: true,
                    viewMode: '3D',
                    zoom: 13.5,
                    center: [102.620455, 30.973672],
                    pitch: 45,
                    rotation: -90,
                    showLabel: true,
                    showBuildingBlock: false,
                    dragEnable: false,
                    zoomEnable: false
                })
                if (!map.value) {
                    return
                }
                loca = new Loca.Container({
                    map: map.value
                })
                marker = new AMap.Marker({
                    position: [102.834562, 30.994623],
                    content: '<div class="amap-ani"></div>',
                    anchor: 'bottom-center',
                    map: map.value
                })
                polyline = new AMap.Polyline({
                    path: [
                        [102.620456, 30.973672],
                        [102.620456, 30.973672]
                    ],
                    isOutline: false,
                    strokeColor: '#00E98F',
                    strokeOpacity: 1,
                    strokeWeight: 16,
                    strokeStyle: 'solid',
                    lineJoin: 'round',
                    lineCap: 'round',
                    zIndex: 500,
                    map: map.value
                })
                run()
                loca.animate.start()
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const run = () => {
        if (!finished.value && map.value) {
            let center = map.value.getCenter().toArray()
            let lastPath = polyline.getPath()
            lastPath.push(center)
            if (lastPath.length === 1) {
                lastPath.push(center)
            }
            polyline.setPath(lastPath)
            marker.setPosition(center)
        }
        requestAnimationFrame(run)
    }

    const begin = () => {
        finished.value = false
        polyline.setPath([
            [102.620456, 30.973672],
            [102.620456, 30.973672]
        ])
        loca.viewControl.addTrackAnimate(
            {
                path: path, // 镜头轨迹，二维数组，支持海拔
                duration: 12000, // 时长
                timing: [
                    [0, 0.3],
                    [1, 0.7]
                ], // 速率控制器
                rotationSpeed: 10 // 每秒旋转多少度
            },
            function () {
                finished.value = true
                console.log('完成')
            }
        )
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
            width: 100px;
            padding: 10px;
            display: flex;
            flex-direction: column;

            .el-button {
                margin: 0 0 5px 0;
            }
        }
    }

    ::v-deep(.amap-ani) {
        width: 44px;
        height: 52px;
        background: url('https://a.amap.com/Loca/static/loca-v2/demos/images/track_marker.png');
        background-size: 44px 52px;
    }
</style>
