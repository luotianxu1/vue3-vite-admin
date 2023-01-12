<template>
	<Item>
		<template #icon>
			<span class="icon"></span>
		</template>
		<template #title>发电功率/风速</template>
		<template #defaultValue>
			<div class="unit">
				<div class="yellow"></div>
				功率/kw
				<div class="blue"></div>
				风速/m/s
			</div>
		</template>
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
		max: 20,
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
			data: [8, 6, 5, 7, 6.5, 7, 5, 7],
			name: "功率/kw",
			type: "line",
			symbol: "circle",
			symbolSize: 4,
			itemStyle: {
				color: "#FFFFFF",
				borderColor: "rgba(255,255,255,0.4)",
				borderWidth: 5
			},
			lineStyle: {
				width: 2,
				color: "#3355B5"
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
							color: "#19407B"
						},
						{
							offset: 1,
							color: "#0C1B30"
						}
					],
					global: false
				}
			}
		},
		{
			data: [5, 8.5, 7, 4.5, 5, 8.5, 7, 5],
			name: "风速/m/s",
			type: "line",
			symbol: "circle",
			symbolSize: 5,
			itemStyle: {
				color: "#F8DD44"
			},
			lineStyle: {
				width: 2,
				color: "#E7C805"
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
onMounted(() => {
	init(option)

	timer = setInterval(() => {
		for (let i = 0; i < 8; i++) {
			if (!option.series) {
				return
			}
			option.series[0].data[i] = Math.random() * 6 + 3
			option.series[1].data[i] = Math.random() * 6 + 3
		}
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
	background: url("@/assets/img/open/intelligentFan/icon_fdjgl.png") no-repeat center;
	background-size: 100% 100%;
	margin-right: 5px;
}

.echarts {
	width: 100%;
	height: 95px;
}

.unit {
	display: flex;
	height: 100%;
	align-items: center;

	.yellow {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #f8dd44;
	}

	.blue {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #3355b5;
	}
}
</style>
