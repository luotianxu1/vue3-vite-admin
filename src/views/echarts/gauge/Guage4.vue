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

        let alias = '成长值'
        let value = 11600
        let currentVipLevel = 4
        let maxVipLevel = 7
        let lineWidth = 12
        let primaryColor = '#EAB864'
        let grayColor = '#AAAAAA'
        let centerArr = ['50%', '85%']

        let option: echarts.EChartsOption = {
            backgroundColor: '#fff',
            series: [
                {
                    name: '圆点刻度',
                    type: 'gauge',
                    radius: '100%',
                    center: centerArr,
                    z: 3,
                    splitNumber: maxVipLevel,
                    startAngle: 180,
                    endAngle: 0,
                    min: 0,
                    max: maxVipLevel,
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        distance: -28,
                        formatter: function (val) {
                            var level = val + 1
                            if (level <= currentVipLevel) {
                                return '{primary|}'
                            }
                            return '{noraml|}'
                        },
                        rich: {
                            primary: {
                                width: 34,
                                height: 34,
                                borderRadius: 20,
                                backgroundColor: primaryColor
                            },
                            noraml: {
                                width: 34,
                                height: 34,
                                borderRadius: 20,
                                backgroundColor: grayColor
                            }
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            opacity: 0
                        }
                    },
                    detail: {
                        show: false
                    },
                    pointer: {
                        show: false
                    }
                },
                {
                    name: '线条外圈', //刻度背景
                    type: 'gauge',
                    z: 2,
                    radius: '100%',
                    splitNumber: maxVipLevel,
                    startAngle: 180,
                    endAngle: 0,
                    min: 0,
                    max: maxVipLevel,
                    center: centerArr,
                    progress: {
                        show: true,
                        width: lineWidth,
                        itemStyle: {
                            color: primaryColor
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data: [
                        {
                            value: currentVipLevel - 1
                        }
                    ],
                    axisLine: {
                        lineStyle: {
                            width: lineWidth,
                            color: [[1, grayColor]]
                        }
                    },
                    axisLabel: {
                        distance: -100,
                        show: true,
                        formatter: function (val) {
                            var level = val + 1
                            //图表中间会员等级数据展示
                            if (level === currentVipLevel) {
                                return '{current|V' + level + '\n}'
                            } else if (currentVipLevel < level) {
                                return '{gray|V' + level + '\n}'
                            }
                            return '{noraml|V' + level + '\n}'
                        },
                        rich: {
                            current: {
                                fontSize: 25,
                                color: '#fff',
                                backgroundColor: primaryColor,
                                padding: [5, 15],
                                borderRadius: 20
                            },
                            noraml: {
                                fontSize: 25,
                                color: primaryColor
                            },
                            gray: {
                                fontSize: 25,
                                color: grayColor
                            }
                        }
                    },
                    pointer: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                {
                    name: '刻度尺', //刻度背景
                    type: 'gauge',
                    z: 1,
                    radius: '100%',
                    splitNumber: 0,
                    startAngle: -90,
                    center: centerArr,
                    axisLine: {
                        show: false
                    },
                    data: [
                        {
                            value: value
                        }
                    ],
                    axisLabel: {
                        show: false
                    },
                    pointer: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: function (val) {
                            //图表中间文字数据展示
                            return '{bold|' + val + '\n}{gray|' + alias + '}'
                        },
                        rich: {
                            gray: {
                                fontSize: 44,
                                color: '#333'
                            },
                            bold: {
                                fontSize: 100,
                                lineHeight: 140,
                                color: '#000'
                            }
                        },
                        offsetCenter: ['0', '-30%']
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
