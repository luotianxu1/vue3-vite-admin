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
            backgroundColor: '#013',
            series: [
                {
                    type: 'gauge',
                    radius: '82%',
                    startAngle: 90,
                    endAngle: -270,
                    axisLine: {
                        show: false
                    },
                    // 刻度
                    axisTick: {
                        show: true,
                        splitNumber: 10,
                        length: 16,
                        distance: -20,
                        lineStyle: {
                            width: 1,
                            color: 'rgba(17, 136, 255, .3)'
                        }
                    },
                    splitLine: {
                        // 分割线
                        show: false
                    },
                    axisLabel: {
                        // 刻度标签
                        show: false
                    },
                    pointer: {
                        // 仪表盘指针
                        show: false
                    },
                    detail: {
                        // 仪表盘详情
                        show: false
                    }
                },
                {
                    type: 'gauge',
                    radius: '75%',
                    startAngle: 90,
                    endAngle: -270,
                    pointer: {
                        show: false
                    },
                    progress: {
                        show: true,
                        overlap: false,
                        roundCap: true,
                        clip: true,
                        itemStyle: {
                            borderWidth: 4,
                            borderColor: '#031E6D'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 40,
                            color: [[1, 'rgba(17, 136, 255, .1)']]
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    data: [
                        {
                            value: 88.88,
                            name: '指标1',
                            title: {
                                offsetCenter: ['0%', '-52%']
                            },
                            detail: {
                                offsetCenter: ['0%', '-35%']
                            },
                            itemStyle: {
                                color: '#46f'
                            }
                        },

                        {
                            value: 45.33,
                            name: '指标2',
                            title: {
                                offsetCenter: ['0%', '-12%']
                            },
                            detail: {
                                offsetCenter: ['0%', '5%']
                            },
                            itemStyle: {
                                color: '#4db'
                            }
                        },
                        {
                            value: 45,
                            name: '指标3',
                            title: {
                                offsetCenter: ['0%', '28%']
                            },
                            detail: {
                                offsetCenter: ['0%', '45%']
                            },
                            itemStyle: {
                                color: '#9cf'
                            }
                        }
                    ],
                    title: {
                        fontSize: 25,
                        color: '#9cf'
                    },
                    detail: {
                        width: 50,
                        height: 14,
                        fontSize: 14,
                        color: 'auto',
                        borderColor: 'auto',
                        borderRadius: 20,
                        borderWidth: 1,
                        formatter: '{value}%'
                    }
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
