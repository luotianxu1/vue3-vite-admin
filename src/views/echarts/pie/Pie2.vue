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

	let trafficWay = [
		{
			name: "正常",
			value: 14294
		},
		{
			name: "报警",
			value: 314
		},
		{
			name: "离线",
			value: 5137
		},
		{
			name: "故障",
			value: 245
		}
	]
	let data: any = []
	let color = ["#00ffff", "#409B5C", "#006ced", "#ffe000", "#ffa800", "#ff5b00", "#ff3000"]
	for (let i = 0; i < trafficWay.length; i++) {
		data.push({
			value: trafficWay[i].value,
			name: trafficWay[i].name,
			itemStyle: {
				normal: {
					borderWidth: 5,
					shadowBlur: 20,
					borderColor: color[i],
					shadowColor: color[i]
				}
			}
		})
	}
	let scaleData = [20, 20, 20, 20]
	let datas: any = []
	for (let i = 0; i < scaleData.length; i++) {
		datas.push(
			{
				value: scaleData[i],
				itemStyle: {
					normal: {
						borderWidth: 5,
						shadowBlur: 30,
						borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
							{
								offset: 0,
								color: "#F3C004"
							},
							{
								offset: 1,
								color: "#F3C004"
							}
						]),
						shadowColor: "rgba(142, 152, 241, 0.6)"
					}
				}
			},
			{
				value: 4,
				itemStyle: {
					label: {
						show: false
					},
					labelLine: {
						show: false
					},
					color: "rgba(0, 0, 0, 0)",
					borderColor: "rgba(0, 0, 0, 0)",
					borderWidth: 0
				}
			}
		)
	}

	let option: echarts.EChartsOption = {
		backgroundColor: "#0A2E5D",
		color: color,
		title: {
			text: "设备状态",
			top: "48%",
			textAlign: "center",
			left: "50%",
			textStyle: {
				color: "#fff",
				fontSize: 22,
				fontWeight: 400
			}
		},
		legend: {
			icon: "circle",
			orient: "horizontal",
			data: ["正常", "报警", "离线", "故障"],
			right: 320,
			bottom: 120,
			align: "right",
			textStyle: {
				color: "#fff"
			},
			itemGap: 20
		},
		series: [
			{
				name: "",
				type: "pie",
				radius: ["45%", "46%"],
				data: data
			},
			{
				name: "",
				type: "pie",
				radius: ["35%", "36%"],
				data: datas
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
