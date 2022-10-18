<template>
    <div id="container"></div>
</template>
<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { ElMessage } from 'element-plus'

    const nationStroke = 'rgba(20, 20, 120, 0.6)'
    const nationFill = 'rgba(20, 120, 230, 0.3)'

    let map = shallowRef()

    onMounted(() => {
        initMap()
    })

    const initMap = () => {
        AMapLoader.load({
            key: 'cb7590d4af790e30ab7f2e51d9778391',
            version: '2.0'
        })
            .then((AMap) => {
                // 绘制世界地图国家轮廓
                const disWorld = new AMap.DistrictLayer.World({
                    zIndex: 10,
                    styles: {
                        // 颜色格式: #RRGGBB、rgba()、rgb()、[r, g, b, a]
                        // 国境线
                        'nation-stroke': nationStroke,
                        // 海岸线
                        //'coastline-stroke': '',
                        // 填充
                        'fill': function (props) {
                            if (props.SOC === 'CHN') {
                                updateInfo(props)
                                return nationFill
                            }
                            return 'white'
                        }
                    }
                })

                map.value = new AMap.Map('container', {
                    zooms: [3, 18],
                    center: [110, 30],
                    showIndoorMap: false,
                    zoom: 3,
                    isHotspot: false,
                    defaultCursor: 'pointer',
                    touchZoomCenter: 1,
                    pitch: 0,
                    layers: [disWorld],
                    viewMode: '3D'
                })

                map.value.on('click', function (ev) {
                    let px = ev.pixel
                    // 拾取所在位置的行政区
                    let props = disWorld.getDistrictByContainerPos(px)
                    if (props) {
                        let SOC = props.SOC
                        if (SOC) {
                            // 重置行政区样式
                            disWorld.setStyles({
                                // 国境线
                                'nation-stroke': nationStroke,
                                // 海岸线
                                //'coastline-stroke': '',
                                'fill': function (data) {
                                    return data.SOC === SOC ? nationFill : 'white'
                                }
                            })
                            updateInfo(props)
                        }
                    }
                })
            })
            .catch((e) => {
                console.log(e)
            })

        const updateInfo = (val) => {
            console.log(val)
            ElMessage.success(val.NAME_CHN)
        }
    }
</script>
<style lang="scss" scoped>
    #container {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
    }
</style>
