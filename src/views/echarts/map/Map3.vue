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

        let res: any = []
        let lineData = [
            {
                val: 6,
                blat: 45.8,
                blon: 126.53,
                elat: 39.9,
                elon: 116.4,
                bcitysim: '哈尔滨市',
                ecitysim: '北京市'
            },
            {
                val: 5,
                blat: 23.02,
                blon: 113.12,
                elat: 31.23,
                elon: 121.47,
                bcitysim: '佛山市',
                ecitysim: '上海市'
            },
            {
                val: 5,
                blat: 34.75,
                blon: 113.62,
                elat: 28.68,
                elon: 115.85,
                bcitysim: '郑州市',
                ecitysim: '南昌市'
            },
            {
                val: 3,
                blat: 29.08,
                blon: 119.65,
                elat: 23.55,
                elon: 116.37,
                bcitysim: '金华市',
                ecitysim: '揭阳市'
            },
            {
                val: 3,
                blat: 24.88,
                blon: 118.67,
                elat: 31.23,
                elon: 121.47,
                bcitysim: '泉州市',
                ecitysim: '上海市'
            },
            {
                val: 3,
                blat: 34.75,
                blon: 113.62,
                elat: 39.9,
                elon: 116.4,
                bcitysim: '郑州市',
                ecitysim: '北京市'
            },
            {
                val: 2,
                blat: 23.02,
                blon: 113.12,
                elat: 39.9,
                elon: 116.4,
                bcitysim: '佛山市',
                ecitysim: '北京市'
            },
            {
                val: 2,
                blat: 41.8,
                blon: 123.43,
                elat: 30.28,
                elon: 120.15,
                bcitysim: '沈阳市',
                ecitysim: '杭州市'
            },
            {
                val: 2,
                blat: 30.28,
                blon: 120.15,
                elat: 22.82,
                elon: 108.37,
                bcitysim: '杭州市',
                ecitysim: '南宁市'
            },
            {
                val: 2,
                blat: 24.88,
                blon: 118.67,
                elat: 34.75,
                elon: 113.62,
                bcitysim: '泉州市',
                ecitysim: '郑州市'
            },
            {
                val: 2,
                blat: 28.23,
                blon: 112.93,
                elat: 30.67,
                elon: 104.07,
                bcitysim: '长沙市',
                ecitysim: '成都市'
            },
            {
                val: 2,
                blat: 31.57,
                blon: 120.3,
                elat: 39.12,
                elon: 117.2,
                bcitysim: '无锡市',
                ecitysim: '天津市'
            },
            {
                val: 2,
                blat: 41.8,
                blon: 123.43,
                elat: 38.05,
                elon: 114.52,
                bcitysim: '沈阳市',
                ecitysim: '石家庄市'
            },
            {
                val: 2,
                blat: 30.6,
                blon: 114.3,
                elat: 36.67,
                elon: 116.98,
                bcitysim: '武汉市',
                ecitysim: '济南市'
            },
            {
                val: 2,
                blat: 28.23,
                blon: 112.93,
                elat: 30.28,
                elon: 120.15,
                bcitysim: '长沙市',
                ecitysim: '杭州市'
            },
            {
                val: 2,
                blat: 24.48,
                blon: 118.08,
                elat: 30.28,
                elon: 120.15,
                bcitysim: '厦门市',
                ecitysim: '杭州市'
            },
            {
                val: 1,
                blat: 32.07,
                blon: 118.78,
                elat: 23.02,
                elon: 113.12,
                bcitysim: '南京市',
                ecitysim: '佛山市'
            },
            {
                val: 1,
                blat: 30.6,
                blon: 114.3,
                elat: 32.07,
                elon: 118.78,
                bcitysim: '武汉市',
                ecitysim: '南京市'
            },
            {
                val: 1,
                blat: 26.08,
                blon: 119.3,
                elat: 30,
                elon: 120.57,
                bcitysim: '福州市',
                ecitysim: '绍兴市'
            }
        ]
        for (let i = 0; i < lineData.length; i++) {
            res.push({
                fromName: lineData[i].bcitysim,
                toName: lineData[i].ecitysim,
                coords: [
                    [lineData[i].blon, lineData[i].blat],
                    [lineData[i].elon, lineData[i].elat]
                ],
                count: lineData[i].val
            })
        }
        let planePath =
            'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'

        echarts.registerMap('china', map)

        let option: echarts.EChartsOption = {
            backgroundColor: '#010347',
            title: {
                text: '模拟航班假数据',
                textStyle: {
                    color: '#ffffff'
                }
            },
            legend: {
                show: true,
                selected: {},
                orient: 'vertical',
                textStyle: {
                    color: 'white'
                },
                data: []
            },
            tooltip: {
                trigger: 'item',
                show: true
            },
            geo: {
                map: 'china',
                label: {
                    show: false
                },
                top: '20%',
                roam: false,
                itemStyle: {
                    areaColor: '#00196d',
                    borderColor: '#1773c3',
                    shadowColor: '#1773c3',
                    shadowBlur: 20
                }
            },
            series: [
                {
                    name: '',
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        constantSpeed: 20,
                        symbol: planePath,
                        symbolSize: 10,
                        trailLength: 0
                    },
                    tooltip: {
                        formatter: function (param) {
                            return (
                                param.data.fromName +
                                '>' +
                                param.data.toName +
                                '<br>趟次：' +
                                param.data.count
                            )
                        }
                    },
                    lineStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: '#58B3CC'
                                },
                                {
                                    offset: 1,
                                    color: '#F58158'
                                }
                            ],
                            false
                        ),
                        width: 2,
                        opacity: 0.5,
                        curveness: 0.1
                    },
                    data: res
                },
                {
                    type: 'map',
                    map: 'china',
                    top: '20%',
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        areaColor: '#00196d',
                        borderColor: '#0a53e9'
                    },
                    emphasis: {
                        label: {
                            show: false
                        },
                        itemStyle: {
                            areaColor: '#00196d',
                            borderColor: '#0a53e9'
                        }
                    }
                }
            ]
        }
        chart.setOption(option)
    }

    const getData = async () => {
        const res = await fetch('./json/china.json')
        map = await res.json()
    }
</script>

<style scoped lang="scss">
    .echarts {
        width: 100%;
        height: 100%;
    }
</style>
