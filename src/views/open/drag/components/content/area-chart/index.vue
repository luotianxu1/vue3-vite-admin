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
		        xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: props.data?.map((item) => item.name)
		        },
		        yAxis: {
				        type: 'value'
		        },
		        series: [
				        {
						        data: props.data?.map((item) => item.value),
						        type: 'line',
						        areaStyle: {}
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
