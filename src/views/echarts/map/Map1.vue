<template>
	<div ref="myCharts" class="echarts"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
import "echarts-gl"
const myCharts = ref<HTMLDivElement>()

onMounted(() => {
	init()
})

let map
const init = async () => {
	if (!myCharts.value) {
		return
	}
	await getData()
	let chart = echarts.init(myCharts.value)

	echarts.registerMap("beijing", map)

	let option = {
		title: {
			text: "北京市3D地图"
		},
		series: [
			{
				type: "map3D",
				name: "浙江",
				selectedMode: "single", //地图高亮单选
				regionHeight: 5, //地图高度
				map: "beijing",
				viewControl: {
					distance: 110, //地图视角 控制初始大小
					rotateSensitivity: [1, 1]
				},
				label: {
					show: true, //是否显示市
					color: "white", //文字颜色
					fontSize: 20 //文字大小
				},
				itemStyle: {
					color: "#2B5890", //地图颜色
					borderWidth: 3, //分界线wdith
					borderColor: "#5578A5" //分界线颜色
				},
				emphasis: {
					label: {
						show: true, //是否显示高亮
						color: "#fff" //高亮文字颜色
					},
					itemStyle: {
						color: "#0489d6" //地图高亮颜色
					}
				},
				data: []
			}
		]
	}
	chart.setOption(option)
}

const getData = async () => {
	const res = await fetch("./json/beijing.json")
	map = await res.json()
}
</script>

<style scoped lang="scss">
.echarts {
	width: 100%;
	height: 100%;
}
</style>
