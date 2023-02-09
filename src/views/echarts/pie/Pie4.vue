<template>
	<div ref="myCharts" class="echarts"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
const myCharts = ref<HTMLDivElement>()
let changePieInterval
onMounted(() => {
	init()
})

const init = () => {
	if (!myCharts.value) {
		return
	}
	let chart = echarts.init(myCharts.value)
	let option: echarts.EChartsOption = {
		backgroundColor: "#111",
		title: {
			text: "14481",
			subtext: "总得分",
			top: "center",
			left: "center",
			textStyle: {
				fontSize: 30,
				fontWeight: "normal",
				color: "#0ed1f4"
			},
			subtextStyle: {
				fontSize: 20,
				fontWeight: "normal",
				color: "#fff"
			}
		},
		tooltip: {
			trigger: "item",
			formatter: "{b} : {c} ({d}%)"
		},
		series: [
			{
				type: "pie",
				radius: ["45%", "62%"],
				center: ["50%", "50%"],
				color: ["#E9EBEE", "#AEC1E0", "#84B4FE", "#4B6EC2", "#1C44B2", "#0F246F"],

				data: [
					{
						value: 5,
						name: ">10000"
					},
					{
						value: 25,
						name: "8001-10000"
					},
					{
						value: 33,
						name: "6001-8000"
					},
					{
						value: 41,
						name: "4001-6000"
					},
					{
						value: 45,
						name: "2001-4000"
					},
					{
						value: 50,
						name: "0-2999"
					}
				],
				labelLine: {
					show: true,
					length: 90,
					length2: 50,
					lineStyle: {
						color: "#0071da",
						width: 2
					}
				},
				label: {
					formatter: "{b|{b}}\n{d|{d}次}",
					rich: {
						b: {
							fontSize: 14,
							color: "#969696",
							align: "left",
							padding: [0, 0, 0, 0]
						},
						d: {
							fontSize: 20,
							color: "#3a699f",
							align: "left",
							padding: [10, 0, 0, 0]
						}
					}
				}
			},
			{
				type: "gauge",
				radius: "75%",
				startAngle: 90,
				endAngle: -269.9999,
				splitLine: {
					show: false
				},
				axisLine: {
					show: true,
					lineStyle: {
						width: 10,
						opacity: 1,
						color: [
							[0, "#3c7590"], // 0~10% 红轴
							[1, "#3c7590"]
						]
					}
				},
				// 仪表盘刻度标签
				axisLabel: {
					show: false
				},
				axisTick: {
					show: true,
					distance: 10,
					lineStyle: {
						color: "#3c7590",
						width: 15
					},
					length: 10
				}
			},
			{
				name: "",
				type: "pie",
				radius: ["25%", "40%"],
				silent: true,
				clockwise: true,
				startAngle: 90,
				z: 0,
				zlevel: 0,
				label: {
					position: "center"
				},
				data: [
					{
						value: 40,
						name: "",
						itemStyle: {
							color: "#fff"
						}
					},
					{
						value: 60,
						name: "",
						label: {
							show: false
						},
						itemStyle: {
							color: "#3c5eb3"
						}
					}
				]
			},
			{
				name: "",
				type: "gauge",
				radius: "50%",
				center: ["50%", "50%"],
				startAngle: 90,
				endAngle: -269.9999,
				splitNumber: 50,
				axisTick: {
					show: false
				},
				splitLine: {
					length: 90,
					lineStyle: {
						width: 4,
						color: "#111111"
					}
				},
				axisLabel: {
					show: false
				},
				pointer: {
					show: false
				},
				axisLine: {
					lineStyle: {
						opacity: 0
					}
				},
				detail: {
					show: false
				},
				data: []
			}
		]
	}

	chart.setOption(option)

	let currentIndex = -1 // 当前高亮图形在饼图数据中的下标
	changePieInterval = setInterval(selectPie, 1000) // 设置自动切换高亮图形的定时器

	chart.on("mouseover", () => {
		clearInterval(changePieInterval)
		if (!option.series) {
			return
		}
		chart.dispatchAction({
			type: "downplay",
			seriesIndex: 0,
			dataIndex: currentIndex
		})
	})
	chart.on("mouseout", () => {
		changePieInterval = setInterval(selectPie, 2000)
	})

	// 高亮效果切换到下一个图形
	function selectPie() {
		if (option.series) {
			let dataLen = option.series[0].data.length
			currentIndex = (currentIndex + 1) % dataLen
			for (let idx in option.series[0].data) {
				chart.dispatchAction({
					type: "downplay",
					seriesIndex: 0,
					dataIndex: idx
				})
			}
			// 高亮当前图形
			chart.dispatchAction({
				type: "highlight",
				seriesIndex: 0,
				dataIndex: currentIndex
			})
			chart.dispatchAction({
				type: "showTip",
				seriesIndex: 0,
				dataIndex: currentIndex
			})
		}
	}
}

onUnmounted(() => {
	clearInterval(changePieInterval)
})
</script>

<style scoped lang="scss">
.echarts {
	width: 100%;
	height: 100%;
}
</style>
