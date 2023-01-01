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
	let data = [
		{
			month: "临时用电",
			value: 30
		},

		{
			month: "登高作业",
			value: 15
		},

		{
			month: "抽堵盲板",
			value: 12
		},

		{
			month: "破土作业",
			value: 18
		},

		{
			month: "破土作业",
			value: 13
		}
	]
	let xData: string[] = []
	let yData: number[] = []
	let min = 50
	data.map(function (a) {
		xData.push(a.month)
		if (a.value === 0) {
			yData.push(a.value + min)
		} else {
			yData.push(a.value)
		}
	})

	let option: echarts.EChartsOption = {
		backgroundColor: "#111c4e",
		tooltip: {
			trigger: "axis",
			formatter: function (prams) {
				return "活动分析：" + prams[0].data
			}
		},
		grid: {
			left: "8%",
			top: "7%",
			right: "5%",
			bottom: "12%"
		},
		xAxis: [
			{
				data: xData,
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					show: true,
					color: "rgb(170,170,170)",
					fontSize: 14
				}
			}
		],
		yAxis: [
			{
				type: "value",
				nameTextStyle: {
					color: "rgb(170,170,170)"
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,0.2)", //网格线的颜色
						type: "dashed"
					}
				},
				axisLine: {
					show: false
				}
			}
		],
		series: [
			{
				type: "pictorialBar",
				itemStyle: {
					color: "#6DF95A"
				},
				symbolRepeat: "fixed",
				symbolMargin: 4,
				symbol: "rect",
				symbolClip: true,
				symbolSize: [30, 8],
				symbolPosition: "start",
				symbolOffset: [0, -1],
				data: yData
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
