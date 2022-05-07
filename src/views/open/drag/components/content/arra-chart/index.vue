<template>
    <div ref="chart" class="chart"></div>
</template>

<script lang="ts" setup>
    import * as echarts from 'echarts'

    type EChartsOption = echarts.EChartsOption

    const props = defineProps({
        data: {
            type: Array,
            default: () => [
                {
                    name: '1',
                    value: 100
                },
                {
                    name: '2',
                    value: 200
                },
                {
                    name: '3',
                    value: 300
                }
            ]
        }
    })

    const chart = ref()

    onMounted(() => {
        initChart()
    })

    const initChart = () => {
        let myChart = echarts.init(chart.value)
        let option: EChartsOption = {
            series: [
                {
                    labelLine: {
                        show: false
                    },
                    data: props.data as [],
                    type: 'pie'
                }
            ]
        }

        option && myChart.setOption(option)
    }
</script>

<style scoped lang="scss">
    .chart {
        width: 100%;
        height: 100%;
    }
</style>
