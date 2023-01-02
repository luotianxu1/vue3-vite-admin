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

	let pointData = 100
	const o = [
		// 彩色刻度线
		{
			width: 30,
			tickLength: 60,
			distance: -50,
			tickWidth: 4
		},
		// 蓝色渐变线
		{
			width: 25,
			distance: -30,
			tickWidth: 2,
			tickLength: 35
		},
		// 辅助线
		{
			width: 2
		},
		// 辅助线
		{
			title_font_size: 60,
			unit_font_size: 30,
			width: 2,
			distance: 20,
			pointerLength: 80,
			axisTickWidth: 8,
			axisTickLength: 2
		}
	]

	let option: echarts.EChartsOption = {
		backgroundColor: "#000",
		series: [
			// 彩色刻度线
			{
				type: "gauge",
				radius: "75%",
				splitLine: {
					show: false
				},
				// 仪表盘的线，颜色值为一个数组
				axisLine: {
					show: true,
					lineStyle: {
						width: o[0].width,
						opacity: 1,
						color: [
							[
								pointData / 100,
								{
									x: 0,
									y: 0,
									x1: 0,
									y1: 0,
									colorStops: [
										{
											offset: 0,
											color: "rgba(5, 254, 17, 0.9)"
										},
										{
											offset: 0.65,
											color: "rgba(255, 252, 0, 1)"
										},
										{
											offset: 1,

											color: "rgba(255, 0, 0, 0.8)"
										}
									]
								} as unknown as string
							],
							[1, "rgba(57, 70, 30, 1)"]
						]
					}
				},
				// 仪表盘刻度标签
				axisLabel: {
					show: false
				},
				axisTick: {
					show: true,
					distance: o[0].distance,
					lineStyle: {
						color: "#000",
						width: o[0].tickWidth
					},
					length: o[0].tickLength
				} //刻度样式
			},
			// 蓝色渐变色辅助圈
			{
				type: "gauge",
				radius: "100%",
				z: 1,
				startAngle: 225,
				endAngle: -45,
				splitNumber: 10,
				splitLine: {
					show: false
				},
				// 仪表盘的线，颜色值为一个数组
				axisLine: {
					show: true,
					lineStyle: {
						width: o[1].width,
						opacity: 0.9,
						shadowColor: "#3213D2",
						shadowOffsetY: 2,
						shadowOffsetX: 1,
						color: [
							[
								0.15,
								new echarts.graphic.LinearGradient(0, 0, 1, 0, [
									{
										offset: 0.1,
										color: "rgba(1, 54, 55, 1)"
									},
									{
										offset: 0.3,
										color: "rgba(50,19,210,0.4)"
									},
									{
										offset: 1,
										color: "rgba(1, 54, 55, 1)"
									}
								]) as unknown as string
							],
							[
								0.8,
								new echarts.graphic.LinearGradient(0, 0, 1, 0, [
									{
										offset: 0,
										color: "rgba(1, 54, 55, 0.9)"
									},
									{
										offset: 0.15,
										color: "#00DEFF"
									},

									{
										offset: 0.7,
										color: "#00DEFF"
									},

									{
										offset: 1,
										color: "rgba(1, 54, 55, 1)"
									}
								]) as unknown as string
							],
							[
								1,
								new echarts.graphic.LinearGradient(0, 0, 1, 0, [
									{
										offset: 0,
										color: "rgba(1, 54, 55, 1)"
									},
									{
										offset: 0.5,
										color: "rgba(50,19,210,0.4)"
									},
									{
										offset: 1,
										color: "rgba(1, 54, 55, 1)"
									}
								]) as unknown as string
							]
						]
					}
				},
				// 仪表盘刻度标签
				axisLabel: {
					show: false
				},
				axisTick: {
					show: true,
					distance: o[1].distance,
					lineStyle: {
						color: "#000",
						width: o[1].tickWidth
					},
					length: o[1].tickLength
				}
			},
			// 辅助线
			{
				type: "gauge",
				name: "外层辅助",
				radius: "80%",
				startAngle: 225,
				endAngle: -45,
				splitNumber: 100,
				pointer: {
					show: false
				},
				detail: {
					show: false
				},
				data: [
					{
						value: 1
					}
				],
				title: {
					show: false
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: [[1, "#00FFFF"]],
						width: o[2].width,
						opacity: 1
					}
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					show: false
				}
			},
			// 辅助线
			{
				type: "gauge",
				name: "外层辅助",
				z: 5,
				radius: "55%",
				startAngle: 225,
				endAngle: -45,
				splitNumber: 5,
				pointer: {
					show: true,
					length: o[3].pointerLength,
					itemStyle: {
						color: "#00DEFF"
					}
				},
				data: [
					{
						value: 50
					}
				],
				title: {
					show: false
				},
				detail: {
					show: true,
					offsetCenter: [0, "105%"],
					formatter: () => [`{a|${pointData}}`, `{b|℃}`].join(""),
					rich: {
						a: {
							fontSize: o[3].title_font_size,
							fontFamily: "Microsoft YaHei",
							fontWeight: "bold",
							color: "#fff"
						},
						b: {
							fontSize: o[3].unit_font_size,
							padding: [-15, 0, 0, 0],
							fontFamily: "Microsoft YaHei",
							color: "#FFFFFF"
						}
					}
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: [[1, "#00FFFF"]],
						width: o[3].width,
						opacity: 1
					}
				},
				axisTick: {
					show: true,
					distance: o[3].distance,
					lineStyle: {
						color: "#fff",
						width: o[3].axisTickWidth,
						type: "dotted",
						cap: "round"
					},
					length: o[3].axisTickLength,
					splitNumber: 2
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					show: false
				}
			},
			{
				//内圆
				type: "pie",
				radius: "20%",
				center: ["50%", "50%"],
				z: 1,
				itemStyle: {
					color: new echarts.graphic.RadialGradient(
						0.5,
						0.5,
						0.8,
						[
							{
								offset: 0,
								color: "#4978EC"
							},
							{
								offset: 0.5,
								color: "#1E2B57"
							},
							{
								offset: 1,
								color: "#141F3D"
							}
						],
						false
					)
				},
				label: {
					show: false
				},
				tooltip: {
					show: false
				},
				data: [1],
				animationType: "scale"
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
