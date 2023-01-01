<template>
	<div ref="myCharts" class="echarts"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
import "echarts-gl"
const myCharts = ref<HTMLDivElement>()

onMounted(() => {
	init()
})

const init = () => {
	if (!myCharts.value) {
		return
	}
	let chart = echarts.init(myCharts.value)

	let l1 = 2
	let l2 = 5
	let l3 = 8
	let data1 = [
		[0, l1, 2],
		[1, l1, 1],
		[2, l1, 3],
		[3, l1, 4],
		[4, l1, 2],
		[5, l1, 4],
		[6, l1, 1],
		[7, l1, 3],
		[8, l1, 4],
		[9, l1, 1],
		[10, l1, 2]
	]
	let data2 = [
		[0, l2, 2],
		[1, l2, 3],
		[2, l2, 5],
		[3, l2, 3],
		[4, l2, 5],
		[5, l2, 3],
		[6, l2, 3],
		[7, l2, 5],
		[8, l2, 6],
		[9, l2, 2],
		[10, l2, 1]
	]
	let data3 = [
		[0, l3, 4],
		[1, l3, 6],
		[2, l3, 5],
		[3, l3, 7],
		[4, l3, 4],
		[5, l3, 8],
		[6, l3, 6],
		[7, l3, 8],
		[8, l3, 6],
		[9, l3, 5],
		[10, l3, 1]
	]

	let option = {
		grid3D: {
			show: true,
			boxWidth: 200,
			boxHeight: 100,
			boxDepth: 100,
			axisLine: {
				lineStyle: {
					color: "#ffffff"
				}
			},
			axisPointer: {
				show: false
			},
			splitLine: {
				show: false
			},
			environment: "#333333",
			viewControl: {
				distance: 300,
				alpha: 10,
				beta: 30,
				animation: true
			}
		},
		xAxis3D: {
			max: 10
		},
		yAxis3D: {
			max: 10
		},
		zAxis3D: {
			max: 10
		},
		series: [
			{
				//参照平面
				type: "bar3D",
				name: "ground",
				itemStyle: {
					opacity: 0.1
				},
				silent: true,
				barSize: [200, 100],
				data: [[5, 5, 0.1]]
			},
			{
				type: "line3D",
				name: "1",
				lineStyle: {
					width: 4
				},
				data: data1
			},
			{
				type: "line3D",
				name: "2",
				data: data2,
				lineStyle: {
					width: 4
				}
			},
			{
				type: "line3D",
				name: "3",
				lineStyle: {
					width: 4
				},
				data: data3
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
