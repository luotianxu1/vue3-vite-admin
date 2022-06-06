<template>
    <div class="container">
        <div class="btn">
            <el-select
                v-model="input"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键字"
                :remote-method="remoteMethod"
                :loading="loading"
                @change="search"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
            <div id="panel"></div>
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

    let autoComplete
    let placeSearch
    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0',
            plugins: ['AMap.AutoComplete', 'AMap.PlaceSearch']
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    zoom: 15.8,
                    center: [116.469881, 39.993599],
                    showIndoorMap: false
                })

                const autoOptions = {
                    city: '全国'
                }
                autoComplete = new AMap.Autocomplete(autoOptions)
                placeSearch = new AMap.PlaceSearch({
                    pageSize: 5, // 单页显示结果条数
                    pageIndex: 1, // 页码
                    citylimit: true, //是否强制限制在设置的城市内搜索
                    panel: 'panel', // 结果列表将在此容器中进行展示。
                    autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                    map: map.value
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    interface ListItem {
        value: string
        label: string
        adcode: number
    }
    const input = ref('')
    const loading = ref(false)
    const options = ref<ListItem[]>([])
    const remoteMethod = (query: string) => {
        if (query) {
            loading.value = true
            setTimeout(() => {
                loading.value = false
                autoComplete.search(query, function (status, result) {
                    options.value = result.tips.map((item) => {
                        return {
                            value: `${item.name}`,
                            label: `${item.name}`,
                            adcode: `${item.adcode}`
                        }
                    })
                })
            }, 200)
        } else {
            options.value = []
        }
    }

    const search = (val) => {
        let data: ListItem = options.value.filter(
            (item) => item.value === val
        )[0]
        if (data) {
            placeSearch.setCity(data.adcode)
            placeSearch.search(data.value)
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
