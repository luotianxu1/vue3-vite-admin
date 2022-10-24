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
        let option = {
            backgroundColor: 'rgba(0,0,0,0.5)',
            series: [
                {
                    type: 'gauge',
                    detail: {
                        formatter: '500天',
                        color: '#F7B500'
                    },
                    title: {
                        show: true,
                        offsetCenter: [0, '80%'], //相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                        color: '#fff',
                        fontSize: 24
                    },
                    axisLabel: {
                        // 刻度标签。
                        show: true, // 是否显示标签,默认 true。
                        color: '#fff'
                    },
                    axisTick: {
                        // 刻度(线)样式。
                        show: true, // 是否显示刻度(线),默认 true。
                        splitNumber: 1
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            width: 30,
                            shadowBlur: 0,
                            color: [
                                [
                                    500 / 1100,
                                    {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: '#62F68A' // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: '#5183FF' // 100% 处的颜色
                                            }
                                        ]
                                    }
                                ],
                                [1, '#E6EBF8']
                            ]
                        }
                    },
                    data: [
                        {
                            value: (500 / 1100) * 100,
                            name: '总工期1100天'
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
