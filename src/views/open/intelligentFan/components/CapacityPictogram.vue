<template>
	<Item>
		<template #icon>
			<span class="icon"></span>
		</template>
		<template #title>单机容量</template>
		<template #num>{{ electric || "-" }}</template>
		<template #unit>千瓦</template>
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
		max: 13,
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
				0, 1, 4, 1, 0.1, 1, 6, 1, 0.1, 1, 8, 1, 0.1, 1, 5, 1, 0.1, 1, 6, 1, 0.1, 1, 7, 1, 0.1, 1, 4, 1, 0.1, 1, 6, 1, 0.1, 1, 8,
				1, 0.1, 1, 5, 1, 0.1, 1, 6, 1, 0.1, 1, 7, 1, 0
			],
			name: "单机容量",
			type: "line",
			showSymbol: false,
			smooth: true,
			lineStyle: {
				color: "transparent"
			},
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
							color: "#55DBE1"
						},
						{
							offset: 0.9,
							color: "#0F446E"
						}
					],
					global: false
				},
				opacity: 1
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
		for (let i = 0; i < 12; i++) {
			num = Math.random() * 8 + 2
			newArr.push(num)
		}
		if (!option.series) {
			return
		}
		option.series[0].data = [
			0,
			1,
			newArr[0],
			1,
			0.1,
			1,
			newArr[1],
			1,
			0.1,
			1,
			newArr[2],
			1,
			0.1,
			1,
			newArr[3],
			1,
			0.1,
			1,
			newArr[4],
			1,
			0.1,
			1,
			newArr[5],
			1,
			0.1,
			1,
			newArr[6],
			1,
			0.1,
			1,
			newArr[7],
			1,
			0.1,
			1,
			newArr[8],
			1,
			0.1,
			1,
			newArr[9],
			1,
			0.1,
			1,
			newArr[10],
			1,
			0.1,
			1,
			newArr[11],
			1,
			0
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
	background: url("@/assets/img/open/intelligentFan/icon_djrl.png") no-repeat center;
	background-size: 100% 100%;
	margin-right: 5px;
}

.echarts {
	width: 100%;
	height: 95px;
}
</style>
