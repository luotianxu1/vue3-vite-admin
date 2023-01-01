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

	let sumNumber = [2000, 1058, 1200 * 2, 1900 * 2, 1000 * 2, 3005, 1900, 1000, 3005 * 2, 2000, 1058 * 2, 1200]
	const CubeLeft = echarts.graphic.extendShape({
		shape: {
			x: 0,
			y: 0
		},
		buildPath: function (ctx: any, shape) {
			const xAxisPoint = shape.xAxisPoint
			const c0 = [shape.x, shape.y]
			const c1 = [shape.x - 9, shape.y - 9]
			const c2 = [xAxisPoint[0] - 9, xAxisPoint[1] - 9]
			const c3 = [xAxisPoint[0], xAxisPoint[1]]
			ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
		}
	})
	const CubeRight = echarts.graphic.extendShape({
		shape: {
			x: 0,
			y: 0
		},
		buildPath: function (ctx: any, shape) {
			const xAxisPoint = shape.xAxisPoint
			const c1 = [shape.x, shape.y]
			const c2 = [xAxisPoint[0], xAxisPoint[1]]
			const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9]
			const c4 = [shape.x + 18, shape.y - 9]
			ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
		}
	})
	const CubeTop = echarts.graphic.extendShape({
		shape: {
			x: 0,
			y: 0
		},
		buildPath: function (ctx: any, shape) {
			const c1 = [shape.x, shape.y]
			const c2 = [shape.x + 18, shape.y - 9]
			const c3 = [shape.x + 9, shape.y - 18]
			const c4 = [shape.x - 9, shape.y - 9]
			ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
		}
	})
	echarts.graphic.registerShape("CubeLeft", CubeLeft)
	echarts.graphic.registerShape("CubeRight", CubeRight)
	echarts.graphic.registerShape("CubeTop", CubeTop)
	const MAX = [6000, 6000, 6000, 6000, 6000, 5000, 4000, 3000, 2000, 4000, 3000, 2000]
	const VALUE = [2012, 1230, 3790, 2349, 1654, 1230, 3790, 2349, 1654, 3790, 2349, 1654]

	let option: echarts.EChartsOption = {
		backgroundColor: "#010d3a",
		title: {
			text: "",
			top: 32,
			left: 18,
			textStyle: {
				color: "#00F6FF",
				fontSize: 24
			}
		},
		grid: {
			left: 20,
			right: 40,
			bottom: "19%",
			top: 107,
			containLabel: true
		},
		xAxis: {
			type: "category",
			data: [
				"德州",
				"德城区",
				"陵城区",
				"禹城市",
				"乐陵市",
				"临邑县",
				"平原县",
				"夏津县",
				"武城县",
				"庆云县",
				"宁津县",
				"齐河县"
			],
			axisLine: {
				show: true,
				lineStyle: {
					color: "white"
				}
			},
			offset: 20,
			axisTick: {
				show: false,
				length: 9,
				alignWithLabel: true,
				lineStyle: {
					color: "#7DFFFD"
				}
			},
			axisLabel: {
				fontSize: 20
			}
		},
		yAxis: {
			type: "value",
			axisLine: {
				show: true,
				lineStyle: {
					color: "white"
				}
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				fontSize: 16
			},
			boundaryGap: ["20%", "20%"]
		},
		series: [
			{
				type: "custom",
				renderItem: function (params, api) {
					const location = api.coord([api.value(0), api.value(1)])
					return {
						type: "group",
						children: [
							{
								type: "CubeLeft",
								shape: {
									api,
									xValue: api.value(0),
									yValue: api.value(1),
									x: location[0],
									y: location[1],
									xAxisPoint: api.coord([api.value(0), 0])
								},
								style: {
									fill: "rgba(7,29,97,.6)"
								}
							},
							{
								type: "CubeRight",
								shape: {
									api,
									xValue: api.value(0),
									yValue: api.value(1),
									x: location[0],
									y: location[1],
									xAxisPoint: api.coord([api.value(0), 0])
								},
								style: {
									fill: "rgba(10,35,108,.7)"
								}
							},
							{
								type: "CubeTop",
								shape: {
									api,
									xValue: api.value(0),
									yValue: api.value(1),
									x: location[0],
									y: location[1],
									xAxisPoint: api.coord([api.value(0), 0])
								},
								style: {
									fill: "rgba(11,42,106,.8)"
								}
							}
						]
					}
				} as any,
				data: MAX
			},
			{
				type: "custom",
				renderItem: (params, api) => {
					const location = api.coord([api.value(0), api.value(1)])
					return {
						type: "group",
						children: [
							{
								type: "CubeLeft",
								shape: {
									api,
									xValue: api.value(0),
									yValue: api.value(1),
									x: location[0],
									y: location[1],
									xAxisPoint: api.coord([api.value(0), 0])
								},
								style: {
									fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
										{
											offset: 0,
											color: "#3B80E2"
										},
										{
											offset: 1,
											color: "#49BEE5"
										}
									])
								}
							},
							{
								type: "CubeRight",
								shape: {
									api,
									xValue: api.value(0),
									yValue: api.value(1),
									x: location[0],
									y: location[1],
									xAxisPoint: api.coord([api.value(0), 0])
								},
								style: {
									fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
										{
											offset: 0,
											color: "#3B80E2"
										},
										{
											offset: 1,
											color: "#49BEE5"
										}
									])
								}
							},
							{
								type: "CubeTop",
								shape: {
									api,
									xValue: api.value(0),
									yValue: api.value(1),
									x: location[0],
									y: location[1],
									xAxisPoint: api.coord([api.value(0), 0])
								},
								style: {
									fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
										{
											offset: 0,
											color: "#3B80E2"
										},
										{
											offset: 1,
											color: "#49BEE5"
										}
									])
								}
							}
						]
					} as any
				},
				data: VALUE
			},
			{
				type: "bar",
				label: {
					show: true,
					position: "top",
					fontSize: 16,
					color: "#fff",
					offset: [4, -25]
				},
				itemStyle: {
					color: "transparent"
				},
				data: MAX
			},
			{
				name: "总人数",
				type: "line",
				showAllSymbol: true,
				symbol: "circle",
				symbolSize: 10,
				itemStyle: {
					color: "#fff",
					shadowColor: "#5ce0e2",
					shadowBlur: 20,
					borderColor: "#5ce0e2",
					borderWidth: 5
				},
				lineStyle: {
					width: 4,
					color: "#5ce0e2",
					shadowColor: "#5ce0e2",
					shadowBlur: 20
				},
				data: sumNumber,
				areaStyle: {
					//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
					color: new echarts.graphic.LinearGradient(
						0,
						0,
						0,
						1,
						[
							{
								offset: 0,
								color: "rgba(25,163,223,.3)"
							},
							{
								offset: 1,
								color: "rgba(25,163,223, 0)"
							}
						],
						false
					),
					shadowColor: "rgba(25,163,223, 0.5)",
					shadowBlur: 20
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
