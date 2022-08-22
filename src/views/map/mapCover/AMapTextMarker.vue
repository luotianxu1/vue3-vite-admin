<template>
    <div class='container'>
        <div id='map' class='map'></div>
    </div>
</template>

<script lang='ts' setup>
    import { getCitys, getEpidemic } from '@/api/system/mapApi'
    import AMapLoader from '@amap/amap-jsapi-loader'

    onMounted(async () => {
        await getCity()
        await getInfo()
        initMap()
    })

    let provinces
    const cityNames: any = []
    const specialCity = ['北京', '上海', '天津', '重庆']
    const colorLegend = {
        // 10: '#fde7a9',
        10: '#f9c02f',
        100: '#f5a54f',
        500: '#f18334',
        1000: '#cc5f42',
        5000: '#a94d36',
        100000: '#792a17'
    }

    let citiesData
    const getCity = async () => {
        const res = await getCitys()
        citiesData = res.data
    }

    const getInfo = async () => {
        const res = await getEpidemic()
        provinces = res.data.china.provinces
    }

    const textStyle = {
        fontSize: 12,
        fontWeight: 'normal',
        fillColor: '#fff',
        // fillColor: 'rgb(255, 215, 0)',
        // strokeColor: '#fff',
        // strokeWidth: 2,
        // fold: true,
        padding: '2, 5',
        backgroundColor: 'rgb(246,137,38)',
        borderColor: '#fff',
        borderWidth: 1
    }

    const map = shallowRef<AMap.Map>()
    const markers: any = []
    let layer
    const initMap = () => {
        AMapLoader.load({
            key: 'cb7590d4af790e30ab7f2e51d9778391',
            version: '2.0'
        })
            .then((AMap) => {
                map.value = new AMap.Map('map', {
                    zoom: 4.5,
                    center: [109.610747, 35.15261],
                    viewMode: '3D'
                })

                layer = new AMap.LabelsLayer({
                    zooms: [3, 20],
                    zIndex: 1000,
                    collision: false,
                    allowCollision: false
                })
                layer.add(markers)
                if (map.value) {
                    map.value.add(layer)
                }

                changeMarker()
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const changeMarker = () => {
        // 初始化 labelMarker
        for (let provice of provinces) {
            let cities = provice.cities || []

            if (specialCity.indexOf(provice.name) !== -1) {
                let totalNumber = 0
                for (const city of cities) {
                    totalNumber += city.confirmedNum
                }
                cities = [
                    {
                        name: provice.name,
                        confirmedNum: totalNumber
                    }
                ]
            }
            for (let city of cities) {
                cityNames.push(city.name)
                let curCityData = findInCities(city.name)
                let number = city.confirmedNum
                if (curCityData && number) {
                    let color = getColorByNumber(number)
                    textStyle.backgroundColor = color
                    let marker = new AMap.LabelMarker({
                        name: city.name,
                        position: [curCityData.x, curCityData.y],
                        zIndex: number,
                        text: {
                            content: city.name + ': ' + city.confirmedNum,
                            direction: 'center',
                            style: textStyle
                        }
                    })
                    markers.push(marker)
                }
            }
            layer.add(markers)
        }
    }

    const findInCities = (name) => {
        for (const city of citiesData) {
            if (name === city.name) {
                return city
            }
        }
    }

    const getColorByNumber = (number) => {
        let color

        for (let key in colorLegend) {
            if (number < parseInt(key,10)) {
                color = colorLegend[key]
                break
            }
        }
        return color
    }
</script>

<style scoped lang='scss'>
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
</style>
