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
	let data1 = [
		{
			name: "谷类",
			value: 175.17
		},
		{
			name: "豆类",
			value: 148.35
		},
		{
			name: "油料作物",
			value: 95.36
		},
		{
			name: "中草药材",
			value: 56
		},
		{
			name: "蔬菜及食用菌",
			value: 45
		},
		{
			name: "瓜果类",
			value: 34
		},
		{
			name: "其他作物",
			value: 95.36
		}
	]
	let xAxisData: any = []
	let seriesData1: any = []
	let ciolData: any = []
	let sum = 0
	let bottomData: any = []
	let topData: any = []
	let ciolColor1 = [
		"rgba(8, 177, 255, 1)",
		"rgba(0, 255, 136,   1)",
		"rgba(8, 177, 255, 1)",
		"rgba(251, 171, 88,   1)",
		"rgba(8, 177, 255, 1)",
		"rgba(251, 171, 88,   1)",
		"rgba(8, 177, 255, 1)",
		"rgba(251, 171, 88,   1)"
	]
	let ciolColor0 = [
		"rgba(107, 255, 243,  1)",
		"rgba(97,253,196,  1)",
		"rgba(107, 255, 243,  1)",
		"rgba(253, 221, 97,  1)",
		"rgba(107, 255, 243,  1)",
		"rgba(253, 221, 97,  1)",
		"rgba(107, 255, 243,  1)",
		"rgba(253, 221, 97,  1)"
	]
	let bottomColor0 = [
		"rgba(8, 177, 255, 0.8)",
		"rgba(0, 255, 136, 0.8)",
		"rgba(8, 177, 255, 0.8)",
		"rgba(251, 171, 88, 0.8)",
		"rgba(8, 177, 255, 0.8)",
		"rgba(251, 171, 88, 0.8)",
		"rgba(8, 177, 255, 0.8)",
		"rgba(251, 171, 88, 0.8)"
	]
	let bottomColor1 = [
		"rgba(107, 255, 243, 0.8)",
		"rgba(100,253,212,0.8)",
		"rgba(107, 255, 243, 0.8)",
		"rgba(253, 227, 100,0.8)",
		"rgba(107, 255, 243, 0.8)",
		"rgba(253, 227, 100,0.8)",
		"rgba(107, 255, 243, 0.8)",
		"rgba(253, 227, 100,0.8)"
	]
	let header0 = [
		"rgba(8, 177, 255, 1)",
		"rgba(0, 255, 136, 1)",
		"rgba(8, 177, 255, 1)",
		"rgba(251, 171, 88, 1)",
		"rgba(8, 177, 255, 1)",
		"rgba(251, 171, 88, 1)",
		"rgba(8, 177, 255, 1)",
		"rgba(251, 171, 88, 1)"
	]
	let header1 = [
		"rgba(107, 255, 243, 1)",
		"rgba(100,253,212,1)",
		"rgba(107, 255, 243, 1)",
		"rgba(253, 227, 100,1)",
		"rgba(107, 255, 243, 1)",
		"rgba(253, 227, 100,1)",
		"rgba(107, 255, 243, 1)",
		"rgba(253, 227, 100,1)"
	]
	let bottom = [
		"rgba(31, 194, 252, 0.4)",
		"rgba(0, 255, 136, 0.4)",
		"rgba(31, 194, 252, 0.4)",
		"rgba(253, 179, 88, 0.4)",
		"rgba(31, 194, 252, 0.4)",
		"rgba(253, 179, 88, 0.4)",
		"rgba(31, 194, 252, 0.4)",
		"rgba(253, 179, 88, 0.4)",
		"rgba(31, 194, 252, 0.4)",
		"rgba(253, 179, 88, 0.4)"
	]
	data1.forEach(item => {
		xAxisData.push(item.name)
		seriesData1.push({ name: "", value: item.value })
		ciolData.push({ name: "", value: "0" })
		sum += item.value
	})
	data1.forEach(item => {
		bottomData.push({ name: "", value: sum - item.value })
		topData.push({ name: "", value: sum })
	})

	let option: echarts.EChartsOption = {
		backgroundColor: "#000",
		grid: {
			top: "10%",
			left: "10%",
			right: "9%",
			bottom: "20%"
		},
		xAxis: {
			offset: 20,
			data: xAxisData,
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			axisLabel: {
				color: "#fff",
				fontSize: 16
			}
		},
		yAxis: {
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			axisLabel: {
				show: false
			}
		},
		series: [
			//'最低下的圆片',
			{
				name: "最低下的圆片",
				type: "effectScatter",
				symbolSize: [62, 12],
				symbolOffset: [0, 0],
				z: 22,
				itemStyle: {
					color: function (params) {
						return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 1,
								color: ciolColor0[params.dataIndex]
							},
							{
								offset: 0,
								color: ciolColor1[params.dataIndex]
							}
						])
					}
				},
				data: ciolData
			},
			//下半截柱状图
			{
				name: "下半截柱状图",
				stack: "a",
				type: "bar",
				barWidth: 66,
				z: 2,
				barGap: "-100%",
				itemStyle: {
					color: function (params) {
						return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 1,
								color: bottomColor1[params.dataIndex]
							},
							{
								offset: 0,
								color: bottomColor0[params.dataIndex]
							}
						])
					}
				},
				data: seriesData1
			},
			//头部1
			{
				name: "头部1",
				stack: "a",
				type: "pictorialBar",
				symbolSize: [66, 12],
				symbolOffset: [0, -6],
				z: 22,
				itemStyle: {
					color: function (params) {
						return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 1,
								color: header1[params.dataIndex]
							},
							{
								offset: 0,
								color: header0[params.dataIndex]
							}
						])
					} as unknown as string
				},
				symbolPosition: "end",
				label: {
					formatter: "{c} 万",
					color: "#fff",
					offset: [0, -5],
					show: true,
					position: "top",
					fontSize: 18,
					fontWeight: 400
				},
				data: seriesData1
			},
			//头部2
			{
				name: "头部2",
				stack: "a",
				type: "pictorialBar",
				symbolSize: [66, 12],
				symbolOffset: [0, -6],
				symbolPosition: "end",
				z: 22,
				itemStyle: {
					color: function (params) {
						return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 1,
								color: header1[params.dataIndex]
							},
							{
								offset: 0,
								color: header0[params.dataIndex]
							}
						])
					} as unknown as string
				},
				data: topData
			},
			//底色
			{
				name: "底色",
				stack: "a",
				type: "bar",
				barWidth: 66,
				z: 2,
				barGap: "-100%",
				itemStyle: {
					color: function (params) {
						return bottom[params.dataIndex]
					}
				},
				data: bottomData
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
