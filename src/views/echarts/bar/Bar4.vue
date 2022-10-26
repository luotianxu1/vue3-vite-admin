<template>
    <div ref="myCharts" class="echarts"></div>
</template>

<script setup lang="ts">
    import * as echarts from 'echarts'
    const myCharts = ref<HTMLDivElement>()

    onMounted(() => {
        init()
    })

    const init = () => {
        if (!myCharts.value) {
            return
        }
        let chart = echarts.init(myCharts.value)
        let symbols = [
            'path://M18.2629891,11.7131596 L6.8091608,11.7131596 C1.6685112,11.7131596 0,13.032145 0,18.6237673 L0,34.9928467 C0,38.1719847 4.28388932,38.1719847 4.28388932,34.9928467 L4.65591984,20.0216948 L5.74941883,20.0216948 L5.74941883,61.000787 C5.74941883,65.2508314 11.5891201,65.1268798 11.5891201,61.000787 L11.9611506,37.2137775 L13.1110872,37.2137775 L13.4831177,61.000787 C13.4831177,65.1268798 19.3114787,65.2508314 19.3114787,61.000787 L19.3114787,20.0216948 L20.4162301,20.0216948 L20.7882606,34.9928467 C20.7882606,38.1719847 25.0721499,38.1719847 25.0721499,34.9928467 L25.0721499,18.6237673 C25.0721499,13.032145 23.4038145,11.7131596 18.2629891,11.7131596 M12.5361629,1.11022302e-13 C15.4784742,1.11022302e-13 17.8684539,2.38997966 17.8684539,5.33237894 C17.8684539,8.27469031 15.4784742,10.66467 12.5361629,10.66467 C9.59376358,10.66467 7.20378392,8.27469031 7.20378392,5.33237894 C7.20378392,2.38997966 9.59376358,1.11022302e-13 12.5361629,1.11022302e-13',
            'path://M28.9624207,31.5315864 L24.4142575,16.4793596 C23.5227152,13.8063773 20.8817445,11.7111088 17.0107398,11.7111088 L12.112691,11.7111088 C8.24168636,11.7111088 5.60080331,13.8064652 4.70917331,16.4793596 L0.149791395,31.5315864 C-0.786976655,34.7595013 2.9373074,35.9147532 3.9192135,32.890727 L8.72689855,19.1296485 L9.2799493,19.1296485 C9.2799493,19.1296485 2.95992025,43.7750224 2.70031069,44.6924335 C2.56498417,45.1567684 2.74553639,45.4852068 3.24205501,45.4852068 L8.704461,45.4852068 L8.704461,61.6700801 C8.704461,64.9659872 13.625035,64.9659872 13.625035,61.6700801 L13.625035,45.360657 L15.5097899,45.360657 L15.4984835,61.6700801 C15.4984835,64.9659872 20.4191451,64.9659872 20.4191451,61.6700801 L20.4191451,45.4852068 L25.8814635,45.4852068 C26.3667633,45.4852068 26.5586219,45.1567684 26.4345142,44.6924335 C26.1636859,43.7750224 19.8436568,19.1296485 19.8436568,19.1296485 L20.3966199,19.1296485 L25.2043926,32.890727 C26.1862111,35.9147532 29.9105828,34.7595013 28.9625083,31.5315864 L28.9624207,31.5315864 Z M14.5617154,0 C17.4960397,0 19.8773132,2.3898427 19.8773132,5.33453001 C19.8773132,8.27930527 17.4960397,10.66906 14.5617154,10.66906 C11.6274788,10.66906 9.24611767,8.27930527 9.24611767,5.33453001 C9.24611767,2.3898427 11.6274788,0 14.5617154,0 L14.5617154,0 Z'
        ]
        let bodyMax = 100 //指定图形界限的值
        let labelSetting = {
            show: true,
            offset: [150, 0],
            formatter: function (param) {
                return ((param.value / bodyMax) * 100).toFixed(0) + '%'
            },
            textStyle: {
                color: '#091B3D',
                fontWeight: 900,
                fontSize: 24
            }
        }

        let option: echarts.EChartsOption = {
            backgroundColor: '#fff',
            tooltip: {
                show: false
            },
            color: ['#69cce6', '#ff8282'],
            grid: {
                left: '20%',
                right: '20%',
                top: '30%',
                bottom: '45%',
                containLabel: true
            },
            xAxis: {
                position: 'bottom',
                data: ['男性', '女性'],
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    padding: [-80, 0, 0, 300],
                    margin: 0,
                    color: 'rgba(9,27,61,0.4)',
                    fontSize: 14,
                    fontWeight: 500
                }
            },
            yAxis: {
                max: bodyMax,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            },
            series: [
                {
                    name: '男性',
                    type: 'pictorialBar',
                    symbolClip: true,
                    symbolBoundingData: bodyMax,
                    label: labelSetting,
                    barWidth: 100,
                    data: [
                        {
                            value: 80,
                            symbol: symbols[0],
                            itemStyle: {
                                color: 'rgba(105,204,230)'
                            }
                        },
                        {}
                    ]
                },
                {
                    name: '女性',
                    type: 'pictorialBar',
                    symbolClip: true,
                    symbolBoundingData: bodyMax,
                    label: labelSetting,
                    barWidth: 100,
                    data: [
                        {},
                        {
                            value: 65,
                            symbol: symbols[1],
                            itemStyle: {
                                color: 'rgba(255,130,130)'
                            }
                        }
                    ]
                },
                {
                    name: 'full',
                    type: 'pictorialBar',
                    symbolBoundingData: bodyMax,
                    animationDuration: 0,
                    itemStyle: {
                        color: '#ccc'
                    },
                    barWidth: 100,
                    data: [
                        {
                            itemStyle: {
                                color: 'rgba(105,204,230,0.40)'
                            },
                            value: 100,
                            symbol: symbols[0]
                        },
                        {
                            itemStyle: {
                                color: 'rgba(255,130,130,0.40)'
                            },
                            value: 100,
                            symbol: symbols[1]
                        }
                    ]
                }
            ]
        }

        chart.setOption(option)
    }
</script>

<style scoped lang="scss">
    .echarts {
        width: 100%;
        height: 100%;
    }
</style>
