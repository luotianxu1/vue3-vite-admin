<template>
    <div ref="myCharts" class="echarts"></div>
</template>

<script setup lang="ts">
    import * as echarts from 'echarts'
    import 'echarts-gl'
    const myCharts = ref<HTMLDivElement>()

    onMounted(() => {
        init()
    })

    let map
    const init = async () => {
        if (!myCharts.value) {
            return
        }
        await getData()
        let chart = echarts.init(myCharts.value)

        let data = [
            ['116.424697', '39.927967', 1334], // '东城'
            ['116.358141', '39.913919', 9334], // '西城'
            ['116.765487', '40.136573', 834], // '朝阳'
            ['116.290679', '39.857184', 2334], // '丰台'
            ['116.17672', '39.949198', 6734], // '石景山'
            ['116.177807', '40.062966', 1234], // '海淀'
            ['115.905234', '40.010063', 2634], // '门头沟'
            ['115.941902', '39.708825', 1334], // '房山'
            ['116.747351', '39.814339', 1178], // '通州'
            ['116.737316', '40.137897', 634], // '顺义'
            ['116.226118', '40.225311', 534], // '昌平'
            ['116.402095', '39.655493', 2334], // '大兴'
            ['116.621138', '40.432762', 1334], // '怀柔'
            ['117.117604', '40.192158', 4534], // '平谷'
            ['117.065719', '40.500122', 724], // '密云'
            ['116.016705', '40.507607', 334] // '延庆'
        ]
        let areaData: any = []
        data.map((item) => {
            // 扩大热力图效果
            areaData.push(...new Array(3).fill(item))
        })
        let mapMax = Math.max(...data.map((item) => Number(item[2])))
        let mapMin = Math.min(...data.map((item) => Number(item[2])))

        echarts.registerMap('beijing', map)

        let option: echarts.EChartsOption = {
            backgroundColor: '#ccc',
            tooltip: {
                show: false,
                trigger: 'item',
                axisPointer: {
                    type: 'shadow'
                }
            },
            visualMap: {
                bottom: 20,
                left: 10,
                show: true,
                color: ['#ff4601', '#fffc00', '#87cffa'],
                min: mapMin,
                max: mapMax,
                calculable: true,
                textStyle: {
                    color: '#fff',
                    fontSize: 12
                }
            },
            geo: {
                map: 'beijing',
                label: {
                    show: true,
                    color: '#fff'
                },
                emphasis: {
                    itemStyle: {
                        areaColor: '#409EFF',
                        borderWidth: 0
                    },
                    label: {
                        color: '#fff'
                    }
                },
                itemStyle: {
                    areaColor: '#76b1ff',
                    borderColor: '#eee',
                    shadowColor: '#76b1ff',
                    shadowBlur: 10,
                    borderWidth: 1
                }
            },
            series: [
                {
                    type: 'heatmap',
                    coordinateSystem: 'geo',
                    blurSize: 40,
                    data: areaData
                }
            ]
        }
        chart.setOption(option)
    }

    const getData = async () => {
        const res = await fetch('./json/beijing.json')
        map = await res.json()
    }
</script>

<style scoped lang="scss">
    .echarts {
        width: 100%;
        height: 100%;
    }
</style>
