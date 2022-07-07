<template>
    <div id="map" class="map"></div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { PropType } from 'vue'

    const props = defineProps({
        options: {
            type: Object as PropType<AMap.MapOptions>,
            default: () => {
                return {
                    zoom: 10
                }
            }
        }
    })

    const map = shallowRef()
    const initMap = () => {
        return new Promise((resolve, reject) => {
            AMapLoader.load({
                key: '859d831539bf9e53715e7908aefc19db',
                version: '2.0'
            })
                .then((AMap) => {
                    map.value = new AMap.Map('map', {
                        ...props.options
                    })

                    //地图绘制成功
                    map.value.on('complete', () => {
                        resolve(map.value)
                    })
                })
                .catch((e) => {
                    console.log(e)
                    reject(e)
                })
        })
    }

    defineExpose({
        initMap,
    })
</script>

<style scoped lang="scss">
    .map {
        width: 100%;
        height: 100%;
    }
</style>
