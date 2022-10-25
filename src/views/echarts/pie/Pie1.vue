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
            title: [
                {
                    text: '已完成',
                    top: '55%',
                    left: '48%',
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontWeight: 100
                    }
                },
                {
                    text: '75%',
                    top: 'center',
                    left: 'center',
                    textStyle: {
                        fontSize: '60',
                        color: '#FFFFFF',
                        fontWeight: 600
                    }
                }
            ],
            backgroundColor: '#111',
            polar: {
                radius: ['42%', '52%'],
                center: ['50%', '50%']
            },
            angleAxis: {
                max: 100,
                show: false
            },
            radiusAxis: {
                type: 'category',
                show: true,
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            series: [
                {
                    name: '数据',
                    type: 'bar',
                    roundCap: true,
                    barWidth: 30,
                    showBackground: true,
                    data: [60],
                    coordinateSystem: 'polar',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            {
                                offset: 0,
                                color: '#16CEB9'
                            },
                            {
                                offset: 1,
                                color: '#6648FF'
                            }
                        ])
                    }
                },
                {
                    name: '外部',
                    type: 'pie',
                    radius: ['56%'],
                    center: ['50%', '50%'],
                    itemStyle: {
                        color: 'rgba(66, 66, 66, .1)',
                        borderWidth: 1,
                        borderColor: '#5269EE'
                    },
                    data: [100]
                },
                {
                    name: '内部',
                    type: 'pie',
                    radius: ['38%'],
                    center: ['50%', '50%'],
                    itemStyle: {
                        color: 'rgba(66, 66, 66, .1)',
                        borderWidth: 1,
                        borderColor: '#5269EE'
                    },
                    data: [100]
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
