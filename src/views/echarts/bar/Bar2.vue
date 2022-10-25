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

        let newchartName = ['01-01', '01-02', '01-03', '01-04', '01-05']
        let newchartValue1 = [91, 51, 29, 40, 50]
        let newchartValue2 = [83, 81, 20, 50, 40]
        let barWidth = 40
        let data = [
            {
                name: '',
                value: 100,
                symbolPosition: 'end'
            },
            {
                name: '',
                value: 100,
                symbolPosition: 'end'
            },
            {
                name: '',
                value: 100,
                symbolPosition: 'end'
            },
            {
                name: '',
                value: '100',
                symbolPosition: 'end'
            },
            {
                name: '',
                value: '100',
                symbolPosition: 'end'
            }
        ]
        let dataBottom = [
            {
                name: '',
                value: '100'
            },
            {
                name: '',
                value: '100'
            },
            {
                name: '',
                value: '100'
            },
            {
                name: '',
                value: '100'
            },
            {
                name: '',
                value: '100'
            }
        ]
        let color1 = {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: 'linear',
            global: false,
            colorStops: [
                {
                    //第一节下面
                    offset: 0,
                    color: '#1C98CD'
                },
                {
                    offset: 1,

                    color: 'rgba(61,187,255,.16)'
                }
            ]
        }
        let color2 = {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: 'linear',
            global: false,
            colorStops: [
                {
                    offset: 0,
                    color: '#E7AB47'
                },
                {
                    offset: 1,
                    color: 'rgba(255,164,41,.16)'
                }
            ]
        }

        let option: echarts.EChartsOption = {
            backgroundColor: '#fff',
            grid: {
                top: '25%',
                left: '10%',
                bottom: '10%',
                right: '10%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,.8)'
                        }
                    },
                    axisLabel: {
                        inside: false,
                        color: '#000',
                        fontWeight: 'normal',
                        fontSize: 12,
                        margin: 20 //刻度标签与轴线之间的距离。
                    },
                    data: newchartName
                },
                {
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitArea: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    data: newchartName
                }
            ],
            yAxis: [
                {
                    show: true,
                    type: 'value',
                    axisLabel: {
                        color: '#000'
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.8)'
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,.8)'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '已开工已完成,顶部圆',
                    type: 'pictorialBar',
                    symbolSize: [barWidth, 10],
                    symbolOffset: ['-55%', -5],
                    symbolPosition: 'end',
                    z: 15,
                    color: '#3eb6f5',
                    zlevel: 2,
                    data: newchartValue1
                },
                {
                    name: '已完成已合格,顶部圆',
                    type: 'pictorialBar',
                    symbolSize: [barWidth, 10],
                    symbolOffset: ['55%', -5],
                    symbolPosition: 'end',
                    z: 15,
                    color: '#ffc241',
                    zlevel: 2,
                    data: newchartValue2
                },
                {
                    name: '已开工已完成，数据',
                    type: 'bar',
                    barGap: '10%',
                    barWidth: barWidth,
                    itemStyle: {
                        color: color1 as unknown as string,
                        borderColor: color1 as unknown as string,
                        borderWidth: 1,
                        borderType: 'solid'
                    },
                    label: {
                        show: true,
                        formatter: '{c}' + '%',
                        position: 'top',
                        color: 'rgba(119,167,255,1)',
                        fontSize: 12
                    },
                    zlevel: 2,
                    data: newchartValue1
                },
                {
                    name: '已完成已合格，数据',
                    type: 'bar',
                    barGap: '10%',
                    barWidth: barWidth,
                    itemStyle: {
                        color: color2 as unknown as string,
                        borderColor: color2 as unknown as string,
                        borderWidth: 1,
                        borderType: 'solid'
                    },
                    label: {
                        show: true,
                        formatter: '{c}' + '%',
                        position: 'top',
                        color: 'rgba(255,228,59,1)',
                        fontSize: 12
                    },
                    zlevel: 2,
                    data: newchartValue2
                },
                {
                    name: '工程量',
                    type: 'bar',
                    xAxisIndex: 1,
                    barGap: '10%',
                    data: [100, 100, 100, 100, 100],
                    zlevel: 1,
                    barWidth: barWidth,
                    itemStyle: {
                        color: 'rgba(61,187,255,.16)'
                    }
                },
                {
                    name: '合格量',
                    type: 'bar',
                    xAxisIndex: 1,
                    barGap: '10%',
                    data: [100, 100, 100, 100, 100],
                    zlevel: 1,
                    barWidth: barWidth,
                    itemStyle: {
                        color: 'rgba(255,164,41,.16)'
                    }
                },
                {
                    name: '已开工已完成,底部圆',
                    type: 'pictorialBar',
                    symbolSize: [barWidth, 10],
                    symbolOffset: ['-55%', 5],
                    z: 12,
                    color: '#3eb6f5',
                    data: dataBottom
                },
                {
                    name: '已完成已合格,底部圆',
                    type: 'pictorialBar',
                    symbolSize: [barWidth, 10],
                    symbolOffset: ['55%', 5],
                    z: 12,
                    color: '#ffc241',
                    data: dataBottom
                },
                {
                    name: '已开工未完成,顶部圆',
                    type: 'effectScatter',
                    rippleEffect: {
                        period: 1,
                        scale: 5,
                        brushType: 'fill'
                    },
                    z: 20,
                    zlevel: 3,
                    symbolSize: [10, 4],
                    symbolOffset: [-22, 0],
                    itemStyle: {
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 5,
                        shadowOffsetY: 3,
                        shadowOffsetX: 0,
                        color: 'rgba(119,167,255,1)'
                    },
                    data: data
                },
                {
                    name: '已开工未完成，顶部圆',
                    type: 'effectScatter',
                    rippleEffect: {
                        period: 1,
                        scale: 5,
                        brushType: 'fill'
                    },
                    z: 20,
                    zlevel: 2,
                    symbolSize: [10, 4],
                    symbolOffset: ['22', 0],
                    itemStyle: {
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 5,
                        shadowOffsetY: 3,
                        shadowOffsetX: 0,
                        color: 'rgba(255,164,41,0.5)'
                    },
                    data: data
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
