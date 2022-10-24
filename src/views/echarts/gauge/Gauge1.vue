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
            series: [
                {
                    name: '外部刻度',
                    type: 'gauge',
                    radius: '100%',
                    axisLine: {
                        roundCap: true,
                        lineStyle: {
                            opacity: 0,
                            color: [
                                [0.19, '#088AD5'],
                                [1, '#d9d9d9']
                            ]
                        }
                    },
                    axisTick: {
                        show: true,
                        splitNumber: 7,
                        lineStyle: {
                            color: 'auto',
                            width: 2
                        },
                        length: 10
                    },
                    splitLine: {
                        show: true,
                        length: 20,
                        distance: 9,
                        lineStyle: {
                            color: 'auto',
                            width: 3
                        }
                    }
                },
                {
                    name: '内部（环形）进度条',
                    type: 'gauge',
                    radius: '70%',
                    z: 4,
                    axisLine: {
                        lineStyle: {
                            color: [[0.19, '#088AD5']],
                            width: 18
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    pointer: {
                        show: false
                    },
                    title: {
                        show: true,
                        offsetCenter: ['0%', '20%'],
                        fontSize: 35,
                        color: '#fff',
                        height: 26
                    },
                    detail: {
                        show: true,
                        color: '#fff',
                        fontSize: 36,
                        offsetCenter: ['0%', '-10%']
                    },
                    data: [
                        {
                            name: 'SCORE',
                            value: 19
                        }
                    ]
                },
                {
                    name: '内部（环形）进度条背景',
                    type: 'gauge',
                    radius: '74%',
                    z: 3,
                    axisLine: {
                        lineStyle: {
                            color: [[1, 'rgba(8, 138, 213, 0.08)']],
                            width: 36
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    detail: {
                        show: false
                    }
                },
                {
                    type: 'pie',
                    radius: ['0', '46%'],
                    itemStyle: {
                        color: '#088AD5'
                    },
                    labelLine: {
                        show: false
                    },
                    hoverAnimation: false,
                    data: [1]
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
