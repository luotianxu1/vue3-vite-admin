<template>
    <div class='container'>
        <div class='btn'>
            <el-select v-model='data.province' filterable placeholder='请选择省' @change='change'>
                <el-option
                    v-for="item in options['province']"
                    :key='item.label'
                    :label='item.label'
                    :value='item.label'
                />
            </el-select>
            <el-select v-model='data.city' filterable placeholder='请选择市' @change='change'>
                <el-option
                    v-for="item in options['city']"
                    :key='item.label'
                    :label='item.label'
                    :value='item.label'
                />
            </el-select>
            <el-select v-model='data.district' filterable placeholder='请选择区' @change='change'>
                <el-option
                    v-for="item in options['district']"
                    :key='item.label'
                    :label='item.label'
                    :value='item.label'
                />
            </el-select>
            <el-select v-model='data.street' filterable placeholder='请选择街道' @change='setCenter'>
                <el-option
                    v-for="item in options['street']"
                    :key='item.label'
                    :label='item.label'
                    :value='item.label'
                />
            </el-select>
        </div>
        <div id='map' class='map'></div>
    </div>
</template>

<script lang='ts' setup>
    import AMapLoader from '@amap/amap-jsapi-loader'

    const map = shallowRef<AMap.Map>()
    const Map = shallowRef()

    onMounted(async () => {
        await initMap()
    })

    let districtSearch
    const initMap = () => {
        AMapLoader.load({
            key: '859d831539bf9e53715e7908aefc19db',
            version: '2.0',
            plugins: ['AMap.DistrictSearch']
        })
            .then((AMap) => {
                Map.value = AMap
                map.value = new AMap.Map('map', {
                    center: [116.30946, 39.937629],
                    zoom: 3
                })
                const opts = {
                    subdistrict: 1, //返回下一级行政区
                    showbiz: false, //最后一级返回街道信息
                    extensions: 'all'
                }
                districtSearch = new Map.value.DistrictSearch(opts)
                search('中国')
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const search = (val) => {
        for (let i = 0, l = polygons.length; i < l; i++) {
            polygons[i].setMap(null)
        }
        districtSearch.search(val, (status, result) => {
            if (status === 'complete') {
                getData(result.districtList[0])
            }
        })
    }

    const data = reactive({
        province: '',
        city: '',
        district: '',
        street: ''
    })
    interface OptionItem {
        label: string,
        value: string,
        lat: number,
        lng: number
    }
    interface Options {
        province: OptionItem[]
        city: OptionItem[]
        district: OptionItem[]
        street: OptionItem[]
    }
    const options = shallowReactive<Options>({
        province: [],
        city: [],
        district: [],
        street: []
    })

    let polygons: any = []
    const getData = (res) => {
        const bounds = res.boundaries
        if (bounds && map.value) {
            for (let i = 0, l = bounds.length; i < l; i++) {
                let polygon = new Map.value.Polygon({
                    map: map.value,
                    strokeWeight: 1,
                    strokeColor: '#0091ea',
                    fillColor: '#80d8ff',
                    fillOpacity: 0.2,
                    path: bounds[i]
                })
                polygons.push(polygon)
            }
            map.value.setFitView() //地图自适应
        }

        const subList = res.districtList
        let num = Object.keys(options).indexOf(subList[0].level)
        clear(num)
        if (subList) {
            let nextType = Object.keys(options)[num]
            options[nextType] = res.districtList.map((item) => {
                return {
                    label: item.name,
                    value: item.adcode,
                    lat: item.center.lat,
                    lng: item.center.lng
                }
            })
        }
    }

    const change = (val) => {
        search(val)
    }

    const setCenter = (val) => {
        let arr = options.street.filter(item => item.label === val)[0]
        if (arr && map.value) {
            map.value.setCenter([arr.lng,arr.lat])
        }
    }

    const clear = (num) => {
        Object.keys(options).forEach((item,index) => {
            if (index >= num) {
                options[item] = []
            }
        })
        Object.keys(data).forEach((item,index) => {
            if (index >= num) {
                data[item] = ''
            }
        })
    }
</script>

<style lang='scss' scoped>
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
