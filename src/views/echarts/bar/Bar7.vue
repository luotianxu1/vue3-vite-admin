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

        let name = ['CT', 'TableTop']

        let option: echarts.EChartsOption = {
            backgroundColor: '#02030c',
            tooltip: {
                trigger: 'item',
                textStyle: {
                    fontSize: 24
                }
            },
            legend: {
                left: '47%',
                top: '5%',
                show: true,
                data: name,
                itemWidth: 20,
                itemHeight: 15,
                itemGap: 30,
                textStyle: {
                    fontSize: 14,
                    color: '#fff',
                    fontFamily: 'Microsoft YaHei'
                }
            },
            grid: [
                {
                    left: '20px',
                    right: '57%',
                    top: 60,
                    bottom: '30'
                },
                {
                    left: '57%',
                    right: '20px',
                    top: 60,
                    bottom: '30'
                }
            ],
            xAxis: [
                {
                    type: 'value',
                    gridIndex: 0,
                    inverse: true,
                    axisLine: {
                        show: false
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
                    data: []
                },
                {
                    type: 'value',
                    gridIndex: 1,
                    inverse: false,
                    axisLine: {
                        show: false
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
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    offset: -20,
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 14,
                        color: 'rgba(65,250,240,0.7)'
                    },
                    data: ['850002', '850003', '850004', '850005', '850006', '850007'],
                    position: 'right'
                },
                {
                    type: 'category',
                    offset: -20,
                    gridIndex: 1,
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 14,
                        color: 'rgba(265,242,53,0.7)'
                    },
                    data: ['TT6401', 'TT6402', 'TT6403', 'TT6404', 'TT6405', 'TT6406']
                }
            ],
            series: [
                {
                    name: name[0],
                    type: 'bar',
                    data: [123, 208, 350, 456, 506, 566],
                    barWidth: 15,
                    color: '#00f3df',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    itemStyle: {
                        borderRadius: [10, 10, 10, 10],
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            {
                                offset: 0,
                                color: 'rgba(65,250,240,1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(43,163,205,0)'
                            }
                        ])
                    },
                    label: {
                        position: 'left',
                        show: true,
                        fontSize: 14,
                        color: '#fff'
                    }
                },
                {
                    name: name[1],
                    type: 'bar',
                    data: [323, 408, 450, 456, 556, 633],
                    barWidth: 15,
                    color: '#01b3e0',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    itemStyle: {
                        borderRadius: [10, 10, 10, 10],
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                            {
                                offset: 0,
                                color: 'rgba(265,242,53,1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(265,242,53,0)'
                            }
                        ])
                    },
                    label: {
                        position: 'right',
                        show: true,
                        fontSize: 14,
                        color: '#fff'
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
