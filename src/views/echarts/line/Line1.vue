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

        let option: echarts.EChartsOption = {
            backgroundColor: '#031d33',
            legend: {
                top: '20',
                textStyle: {
                    fontSize: 16,
                    color: 'rgba(101, 213, 255, 1)'
                },
                icon: 'path://M512 881.777778 512 881.777778C716.222629 881.777778 881.777778 716.222629 881.777778 512 881.777778 307.777371 716.222629 142.222222 512 142.222222 307.777373 142.222222 142.222222 307.777371 142.222222 512 142.222222 716.222629 307.777373 881.777778 512 881.777778L512 881.777778ZM512 1024 512 1024C229.230208 1024 0 794.769789 0 512 0 229.230211 229.230208 0 512 0 794.769789 0 1024 229.230211 1024 512 1024 794.769789 794.769789 1024 512 1024L512 1024Z',
                itemWidth: 8, // 设置宽度
                itemHeight: 8, // 设置高度、
                itemGap: 20 // 设置间距
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                backgroundColor: 'rgba(0, 49, 85, 1)',
                borderColor: 'rgba(0, 151, 251, 1)',
                borderWidth: 1,
                textStyle: {
                    color: '#BCE9FC',
                    fontSize: 16
                }
            },
            grid: {
                right: '5%',
                top: '10%',
                left: '5%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                name: '部门',
                nameTextStyle: {
                    color: '#65d5ff'
                },
                type: 'category',
                boundaryGap: true,
                data: ['HWS', 'SE', 'V&V', 'HQ', 'RPA', 'SC', 'RPA', 'PM', 'CCB', 'RSW'],
                axisLabel: {
                    color: '#65D5FF',
                    fontStyle: 'normal',
                    fontSize: 16
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(77, 128, 254, 0.2)'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(77, 128, 254, 0.2)'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    bottom: '20px',
                    borderColor: '#07417a',
                    backgroundColor: 'transparent',
                    dataBackground: {
                        lineStyle: {
                            color: 'transparent',
                            shadowOffsetY: 0
                        },
                        areaStyle: {
                            color: 'transparent',
                            shadowOffsetY: 0
                        }
                    },
                    height: 9,
                    textStyle: {
                        color: '#ccc'
                    },
                    start: 0,
                    end: 100
                }
            ],
            yAxis: [
                {
                    name: '个',
                    nameTextStyle: {
                        color: '#65d5ff'
                    },
                    type: 'value',
                    splitNumber: 3,
                    axisLabel: {
                        color: '#65D5FF',
                        fontStyle: 'normal',
                        fontSize: 16
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(77, 128, 254, 0.2)'
                        }
                    }
                },
                {
                    name: '百分比',
                    nameTextStyle: {
                        color: '#65d5ff'
                    },
                    min: 0,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#233653'
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#233653'
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: '#78bdf5',
                        formatter: function (value) {
                            return value * 100 + '%'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '变更',
                    type: 'pictorialBar',
                    barWidth: '50%',
                    label: {
                        show: false
                    },
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(255, 64, 0, 0.8)' // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(0, 34, 66, 0.2)' // 100% 处的颜色
                                }
                            ]
                        } //渐变颜色
                    },
                    symbol: 'path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z',
                    data: [23, 44, 22, 27, 12, 2, 3, 23, 12, 32]
                },
                {
                    name: '新增',
                    type: 'pictorialBar',
                    barWidth: '50%',
                    label: {
                        show: false
                    },
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(48, 236, 166,0.8)' // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(0, 34, 66, 0.2)' // 100% 处的颜色
                                }
                            ]
                        }
                    },
                    symbol: 'path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z',
                    data: [13, 24, 31, 12, 7, 3, 1, 23, 2, 42]
                },
                {
                    name: '废弃',
                    type: 'pictorialBar',
                    barWidth: '50%',
                    label: {
                        show: false
                    },
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(161, 159, 158, 0.8)' // 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(133, 133, 196, 0.2)' // 100% 处的颜色
                                }
                            ]
                        }
                    },
                    symbol: 'path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z',
                    data: [4, 3, 12, 4, 15, 2, 3, 12, 34, 23]
                },
                {
                    name: '变化占比',
                    type: 'line',
                    data: [0.3, 0.5, 0.3, 0.35, 0.15, 0.05, 0.05, 0.3, 0.35, 0.4, 0.5],
                    smooth: true,
                    symbol: 'none',
                    lineStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(255, 227, 168, 0.3)'
                            },
                            {
                                offset: 0.5,
                                color: 'rgba(255, 227, 168, 1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255, 227, 168, 0.3)'
                            }
                        ]),
                        shadowColor: 'rgba(255, 120, 0,1)',
                        shadowBlur: 10
                    },
                    yAxisIndex: 1
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
