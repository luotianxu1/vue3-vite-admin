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
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow"
			}
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true
		},
		xAxis: {
			type: "value"
		},
		yAxis: {
			type: "category",
			data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
		},
		series: [
			{
				name: "Direct",
				type: "bar",
				stack: "total", //数据堆叠
				label: {
					show: true
				},
				emphasis: {
					focus: "series"
				},
				data: [320, 302, 301, 334, 390, 330, 320]
			},
			{
				name: "Mail Ad",
				type: "bar",
				stack: "total",
				label: {
					show: true,
					color: "black" //文本标签的颜色
				},
				itemStyle: {
					color: "yellow"
				},
				emphasis: {
					focus: "series"
				},
				data: [120, 132, 101, 134, 90, 230, 210]
			},
			{
				name: "Affiliate Ad",
				type: "bar",
				stack: "total",
				label: {
					show: true
				},
				itemStyle: {
					color: "orange"
				},
				emphasis: {
					focus: "series"
				},
				data: [220, 182, 191, 234, 290, 330, 310]
			},
			{
				name: "Video Ad",
				type: "bar",
				stack: "total",
				label: {
					show: true
				},
				itemStyle: {
					color: "violet"
				},
				emphasis: {
					focus: "series"
				},
				data: [150, 212, 201, 154, 190, 330, 410]
			},
			{
				name: "Search Engine",
				type: "bar",
				stack: "total",
				label: {
					show: true
				},
				itemStyle: {
					color: "pink"
				},
				emphasis: {
					focus: "series"
				},
				data: [820, 832, 901, 934, 1290, 1330, 1320]
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
