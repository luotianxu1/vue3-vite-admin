<template>
	<Item>
		<template #icon>
			<span class="icon"></span>
		</template>
		<template #title>装机容量</template>
		<template #num>{{ electric || "-" }}</template>
		<template #unit>万千瓦</template>
		<template #echarts>
			<div ref="myCharts" class="echarts"></div>
		</template>
	</Item>
</template>

<script lang="ts" setup>
import * as echarts from "echarts"
import Item from "./Item.vue"

const myCharts = ref<HTMLDivElement>()

let color1 = {
	type: "linear",
	x: 0,
	y: 0,
	x2: 1,
	y2: 1,
	colorStops: [
		{
			offset: 0,
			color: "#1861BF"
		},
		{
			offset: 0.8,
			color: "#000000"
		}
	]
}
let color2 = {
	type: "linear",
	x: 0,
	y: 0,
	x2: 1,
	y2: 1,
	colorStops: [
		{
			offset: 0,
			color: "#285AAD"
		},
		{
			offset: 0.7,
			color: "#000000"
		}
	]
}
let color3 = {
	type: "linear",
	x: 0,
	y: 0,
	x2: 1,
	y2: 1,
	colorStops: [
		{
			offset: 0,
			color: "#2F77AC"
		},
		{
			offset: 0.6,
			color: "#000000"
		}
	]
}

let option: echarts.EChartsOption = {
	grid: {
		left: "2%",
		right: "2%",
		top: "5%",
		bottom: "10%"
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
			name: "装机容量",
			type: "bar",
			data: [
				50, 50, 54, 50, 56, 60, 63, 69, 76, 79, 76, 79, 80, 78, 76, 74, 62, 66, 73, 78, 75, 71, 68, 75, 70, 72, 78, 72, 75, 76,
				80, 77, 73, 79, 67, 74, 66, 61, 57, 59, 63, 66, 69, 60, 50, 57, 62, 59, 57, 53, 57, 51, 54, 58, 55, 56, 60, 61, 57, 62,
				69, 71, 69, 74, 64, 70, 75, 61, 65, 67, 71, 69, 66, 63, 52, 55, 63, 68, 66, 61, 63, 71, 75, 67, 58, 70, 64, 68, 66, 60,
				66, 60, 63, 58, 63, 69, 63, 60, 67, 54
			],
			itemStyle: {
				color: function (params) {
					let colorList: any = []
					colorList.push(color1, color2, color3)
					switch (params.dataIndex % 3) {
						case 0:
							return colorList[0]
						case 1:
							return colorList[1]
						case 2:
							return colorList[2]
					}
					return colorList[params.dataIndex]
				}
			},
			label: {
				show: true,
				formatter: "{circle|}",
				color: "#3DB9F4",
				position: "top",
				distance: -4,
				backgroundColor: "#3DB9F4",
				padding: 1,
				borderRadius: 10,
				rich: {
					circle: {
						width: 0.8,
						height: 0.8,
						borderRadius: 0.8,
						lineHeight: 0.8,
						backgroundColor: "#3DB9F4"
					}
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
		for (let i = 0; i < 100; i++) {
			if (!option.series) {
				return
			}
			option.series[0].data[i] = Math.random() * 30 + 50
		}

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
	background: url("@/assets/img/open/intelligentFan/icon_zjrl.png") no-repeat center;
	background-size: 100% 100%;
	margin-right: 5px;
}

.echarts {
	width: 100%;
	height: 95px;
}
</style>
