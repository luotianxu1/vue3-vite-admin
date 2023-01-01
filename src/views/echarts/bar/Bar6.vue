<template>
	<div ref="myCharts" class="echarts"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
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
		title: {
			text: "Awesome Chart"
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow"
			},
			formatter: function (params) {
				let tar = params[1]
				return tar.name + "<br/>" + tar.seriesName + " : " + tar.value
			}
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true
		},
		xAxis: {
			type: "category",
			splitLine: { show: false },
			axisLabel: {
				show: true,
				interval: 0
			},
			axisTick: {
				alignWithLabel: true
			},
			data: ["Total", "Rent", "Utilities", "Transportation", "Meals"]
		},
		yAxis: {
			type: "value",
			splitLine: {
				show: true,
				lineStyle: {
					type: "dashed"
				}
			}
		},
		series: [
			{
				name: "背景",
				type: "bar",
				label: {
					show: true,
					position: "top",
					color: "#333"
				},
				barGap: "-100%",
				itemStyle: {
					color: "transparent"
				},
				data: [300, 1200, 1400, 1700, 2900]
			},
			{
				name: "Placeholder",
				type: "bar",
				stack: "Total",
				itemStyle: {
					borderColor: "transparent",
					color: "transparent"
				},
				emphasis: {
					itemStyle: {
						borderColor: "transparent",
						color: "transparent"
					}
				},
				data: [0, 300, 1200, 1400, 1700]
			},
			{
				name: "Life Cost",
				type: "bar",
				stack: "Total",
				label: {
					show: true,
					position: "inside",
					color: "#fff"
				},
				itemStyle: {
					color: "#F35875"
				},
				data: [300, 900, 200, 300, 1200]
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
