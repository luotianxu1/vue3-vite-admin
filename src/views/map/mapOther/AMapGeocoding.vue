<template>
    <div class="container">
        <div class="btn">
            <el-input v-model="input1" placeholder="请输入">
                <template #prepend>地址</template>
            </el-input>
            <el-input v-model="input2" placeholder="" disabled>
                <template #prepend>经纬度</template>
            </el-input>
            <el-button @click="geoCode">转换</el-button>
            <el-input v-model="input3" placeholder="请输入">
                <template #prepend>经纬度</template>
            </el-input>
            <el-input v-model="input4" disabled>
                <template #prepend>地址</template>
            </el-input>
            <el-button @click="getAddress">转换</el-button>
        </div>
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader'
    import { ElMessage } from 'element-plus'

    const map = shallowRef<AMap.Map>()
    const Map = shallowRef()

    onMounted(() => {
        initMap()
    })

    let geocoder
    let marker
    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0',
            plugins: ['AMap.Geocoder']
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    resizeEnable: true,
                    center: [116.397428, 39.90923], //地图中心点
                    zoom: 13 //地图显示的缩放级别
                })

                geocoder = new AMap.Geocoder()
                marker = new AMap.Marker()
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const input1 = ref('北京市朝阳区阜荣街10号')
    const input2 = ref('')
    const geoCode = () => {
        geocoder.getLocation(input1.value, (status, result) => {
            if (status === 'complete' && result.geocodes.length) {
                let lnglat = result.geocodes[0].location
                input2.value = lnglat
                marker.setPosition(lnglat)
                if (!map.value) {
                    return
                }
                map.value.add(marker)
                map.value.setFitView(marker)
            } else {
                ElMessage('根据地址查询位置失败')
            }
        })
    }

    const input3 = ref('116.473115,39.993207')
    const input4 = ref('')
    const getAddress = () => {
        geocoder.getAddress(input3.value.split(','), (status, result) => {
            if (status === 'complete' && result.regeocode) {
                input4.value = result.regeocode.formattedAddress
            } else {
                ElMessage('根据经纬度查询地址失败')
            }
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
