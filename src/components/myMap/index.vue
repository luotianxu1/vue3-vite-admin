<template>
    <div class="baseMap">
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    type Tplugin = 'ToolBar' | 'Scale' | 'HawkEye' | 'Geolocation'

    interface Props {
        options?: AMap.MapOptions,
        plugin?: [Tplugin?,Tplugin?,Tplugin?,Tplugin?]
    }
    const props = withDefaults(defineProps<Props>(), {
        options: () => {
            return {}
        },
        plugin:() => {
            return ['ToolBar']
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

                    console.log(props.plugin)

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

    watch(
        () => props.plugin,
        (val) => {
            console.log(val)
        }
    )

    defineExpose({
        initMap
    })
</script>

<style scoped lang="scss">
    .baseMap {
        width: 100%;
        height: 100%;
        position: relative;

        .map {
            width: 100%;
            height: 100%;
        }
    }
</style>
