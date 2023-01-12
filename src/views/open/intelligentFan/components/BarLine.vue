<template>
	<Item>
		<template #icon>
			<span class="icon"></span>
		</template>
		<template #title>风机数量</template>
		<template #num>{{ electric || "-" }}</template>
		<template #unit>台</template>
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
			data: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
			name: "风机数量",
			type: "bar",
			barWidth: 2,
			itemStyle: {
				color: "#0D1D32"
			}
		},
		{
			type: "line",
			data: [9, 10, 11, 12, 13, 13.5, 12, 11, 10, 9, 11, 11.5],
			showAllSymbol: true,
			smooth: 0.3,
			symbolSize: 5,
			symbol: "circle",
			lineStyle: {
				color: "#02DFD6",
				width: 1.5
			},
			itemStyle: {
				color: "#6ACAC1",
				borderColor: "#00101E",
				borderWidth: 2
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
							color: "#068082"
						},
						{
							offset: 0.6,
							color: "transparent"
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
		for (let i = 0; i < 12; i++) {
			num = Math.random() * 9 + 6
			newArr.push(num)
		}
		if (!option.series) {
			return
		}
		option.series[1].data = newArr
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
	background: url("@/assets/img/open/intelligentFan/icon_fjsl.png") no-repeat center;
	background-size: 100% 100%;
	margin-right: 5px;
}

.echarts {
	width: 100%;
	height: 95px;
}
</style>
