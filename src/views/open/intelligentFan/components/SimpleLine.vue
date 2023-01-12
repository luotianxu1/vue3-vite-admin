<template>
	<Item>
		<template #icon>
			<span class="icon"></span>
		</template>
		<template #title>上网电量</template>
		<template #num>{{ electric || "-" }}</template>
		<template #unit>亿千瓦时</template>
		<template #echarts>
			<div ref="myCharts" class="echarts"></div>
		</template>
	</Item>
</template>

<script lang="ts" setup>
import * as echarts from "echarts"
import Item from "./Item.vue"

const myCharts = ref<HTMLDivElement>()

let option: echarts.EChartsOption = {
	grid: {
		left: 0,
		right: 0,
		top: "5%",
		bottom: 0
	},
	xAxis: {
		type: "category",
		axisLine: {
			show: false
		},
		axisLabel: {
			show: false
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		type: "value",
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLabel: {
			show: false
		},
		splitLine: {
			show: false
		}
	},
	series: [
		{
			data: [
				15,
				19,
				{
					symbol: "circle",
					value: 70,
					itemStyle: {
						color: "#FFFFFF"
					}
				},
				35,
				18,
				45,
				{
					symbol: "circle",
					value: 20,
					itemStyle: {
						color: "#FFFFFF"
					}
				},
				65,
				25,
				{
					symbol: "circle",
					value: 20,
					itemStyle: {
						color: "#FFFFFF"
					}
				},
				{
					symbol: "circle",
					value: 80,
					itemStyle: {
						color: "#FFFFFF"
					}
				},
				50,
				85
			],
			name: "上网电量",
			type: "line",
			symbol: "none",
			smooth: true,
			areaStyle: {
				color: {
					type: "linear",
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{
							offset: 0,
							color: "#FFFFFF"
						},
						{
							offset: 0.7,
							color: "transparent"
						}
					],
					global: false
				}
			},
			lineStyle: {
				width: 2,
				color: {
					type: "linear",
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{
							offset: 0,
							color: "#4D7CAA"
						},
						{
							offset: 0.2,
							color: "#49B5BF"
						},
						{
							offset: 0.5,
							color: "#53C0A1"
						},
						{
							offset: 0.6,
							color: "#6FCCB1"
						},
						{
							offset: 0.9,
							color: "#C7CC3A"
						}
					],
					global: false
				}
			}
		}
	]
}

let chart
const init = option => {
	if (!myCharts.value) {
		return
	}
	chart = echarts.init(myCharts.value)
	chart.setOption(option)
}

let timer
let electric = ref((Math.random() * 100) >> 0)
onMounted(() => {
	init(option)

	timer = setInterval(() => {
		let newArr: any = []
		let num = 0
		for (let i = 0; i < 13; i++) {
			num = Math.floor(Math.random() * 70 + 10)
			newArr.push(num)
		}
		if (!option.series) {
			return
		}
		option.series[0].data = [
			newArr[0],
			newArr[1],
			{
				symbol: "circle",
				value: newArr[2],
				itemStyle: {
					color: "#FFFFFF"
				}
			},
			newArr[3],
			newArr[4],
			newArr[5],
			{
				symbol: "circle",
				value: newArr[6],
				itemStyle: {
					color: "#FFFFFF"
				}
			},
			newArr[7],
			newArr[8],
			{
				symbol: "circle",
				value: newArr[9],
				itemStyle: {
					color: "#FFFFFF"
				}
			},
			{
				symbol: "circle",
				value: newArr[10],
				itemStyle: {
					color: "#FFFFFF"
				}
			},
			newArr[11],
			newArr[12]
		]

		electric.value = (Math.random() * 100) >> 0
		chart.setOption(option)
	}, 3000)
})

onUnmounted(() => {
	clearInterval(timer)
	timer = null
})
</script>

<style lang="scss" scoped>
.icon {
	width: 20px;
	height: 20px;
	display: inline-block;
	background: url("@/assets/img/open/intelligentFan/icon_swdl.png") no-repeat center;
	background-size: 100% 100%;
	margin-right: 5px;
}

.echarts {
	width: 100%;
	height: 95px;
}
</style>
