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

	let data = [
		{
			name: "XX医科XX第二医院",
			children: [
				{
					name: "1~10名",
					collapsed: false,
					children: [
						{
							name: "呼吸内科",
							collapsed: false,
							children: [
								{ name: "麻醉", value: 3938 },
								{ name: "护理", value: 3812 },
								{ name: "放射", value: 6714 },
								{ name: "材料", value: 743 },
								{ name: "病例", value: 743 },
								{ name: "检查", value: 743 },
								{ name: "手术", value: 743 },
								{ name: "治疗", value: 743 },
								{ name: "血费", value: 743 },
								{ name: "草药", value: 743 },
								{ name: "中成", value: 743 },
								{ name: "化验", value: 743 },
								{ name: "诊察", value: 743 },
								{ name: "西药", value: 743 },
								{ name: "其他", value: 743 }
							]
						},
						{
							name: "内分泌科",
							collapsed: true,
							children: [
								{ name: "麻醉", value: 3938 },
								{ name: "护理", value: 3812 },
								{ name: "放射", value: 6714 },
								{ name: "材料", value: 743 },
								{ name: "病例", value: 743 },
								{ name: "检查", value: 743 },
								{ name: "手术", value: 743 },
								{ name: "治疗", value: 743 },
								{ name: "血费", value: 743 },
								{ name: "草药", value: 743 },
								{ name: "中成", value: 743 },
								{ name: "化验", value: 743 },
								{ name: "诊察", value: 743 },
								{ name: "西药", value: 743 },
								{ name: "其他", value: 743 }
							]
						},
						{
							name: "心内科",
							collapsed: true,
							children: [
								{ name: "麻醉", value: 3938 },
								{ name: "护理", value: 3812 },
								{ name: "放射", value: 6714 },
								{ name: "材料", value: 743 },
								{ name: "病例", value: 743 },
								{ name: "检查", value: 743 },
								{ name: "手术", value: 743 },
								{ name: "治疗", value: 743 },
								{ name: "血费", value: 743 },
								{ name: "草药", value: 743 },
								{ name: "中成", value: 743 },
								{ name: "化验", value: 743 },
								{ name: "诊察", value: 743 },
								{ name: "西药", value: 743 },
								{ name: "其他", value: 743 }
							]
						},
						{
							name: "骨科",
							collapsed: true,
							children: [
								{ name: "麻醉", value: 3938 },
								{ name: "护理", value: 3812 },
								{ name: "放射", value: 6714 },
								{ name: "材料", value: 743 },
								{ name: "病例", value: 743 },
								{ name: "检查", value: 743 },
								{ name: "手术", value: 743 },
								{ name: "治疗", value: 743 },
								{ name: "血费", value: 743 },
								{ name: "草药", value: 743 },
								{ name: "中成", value: 743 },
								{ name: "化验", value: 743 },
								{ name: "诊察", value: 743 },
								{ name: "西药", value: 743 },
								{ name: "其他", value: 743 }
							]
						},
						{
							name: "普外科",
							collapsed: true,
							children: [
								{ name: "麻醉", value: 3938 },
								{ name: "护理", value: 3812 },
								{ name: "放射", value: 6714 },
								{ name: "材料", value: 743 },
								{ name: "病例", value: 743 },
								{ name: "检查", value: 743 },
								{ name: "手术", value: 743 },
								{ name: "治疗", value: 743 },
								{ name: "血费", value: 743 },
								{ name: "草药", value: 743 },
								{ name: "中成", value: 743 },
								{ name: "化验", value: 743 },
								{ name: "诊察", value: 743 },
								{ name: "西药", value: 743 },
								{ name: "其他", value: 743 }
							]
						},
						{
							name: "神经外科",
							collapsed: true,
							children: [
								{ name: "麻醉", value: 3938 },
								{ name: "护理", value: 3812 },
								{ name: "放射", value: 6714 },
								{ name: "材料", value: 743 },
								{ name: "病例", value: 743 },
								{ name: "检查", value: 743 },
								{ name: "手术", value: 743 },
								{ name: "治疗", value: 743 },
								{ name: "血费", value: 743 },
								{ name: "草药", value: 743 },
								{ name: "中成", value: 743 },
								{ name: "化验", value: 743 },
								{ name: "诊察", value: 743 },
								{ name: "西药", value: 743 },
								{ name: "其他", value: 743 }
							]
						},
						{
							name: "中医科",
							collapsed: true,
							children: [
								{ name: "麻醉", value: 3938 },
								{ name: "护理", value: 3812 },
								{ name: "放射", value: 6714 },
								{ name: "材料", value: 743 },
								{ name: "病例", value: 743 },
								{ name: "检查", value: 743 },
								{ name: "手术", value: 743 },
								{ name: "治疗", value: 743 },
								{ name: "血费", value: 743 },
								{ name: "草药", value: 743 },
								{ name: "中成", value: 743 },
								{ name: "化验", value: 743 },
								{ name: "诊察", value: 743 },
								{ name: "西药", value: 743 },
								{ name: "其他", value: 743 }
							]
						},
						{
							name: "手术室",
							collapsed: true,
							children: [
								{ name: "麻醉", value: 3938 },
								{ name: "护理", value: 3812 },
								{ name: "放射", value: 6714 },
								{ name: "材料", value: 743 },
								{ name: "病例", value: 743 },
								{ name: "检查", value: 743 },
								{ name: "手术", value: 743 },
								{ name: "治疗", value: 743 },
								{ name: "血费", value: 743 },
								{ name: "草药", value: 743 },
								{ name: "中成", value: 743 },
								{ name: "化验", value: 743 },
								{ name: "诊察", value: 743 },
								{ name: "西药", value: 743 },
								{ name: "其他", value: 743 }
							]
						},
						{
							name: "妇产科",
							collapsed: true,
							children: [
								{ name: "麻醉", value: 3938 },
								{ name: "护理", value: 3812 },
								{ name: "放射", value: 6714 },
								{ name: "材料", value: 743 },
								{ name: "病例", value: 743 },
								{ name: "检查", value: 743 },
								{ name: "手术", value: 743 },
								{ name: "治疗", value: 743 },
								{ name: "血费", value: 743 },
								{ name: "草药", value: 743 },
								{ name: "中成", value: 743 },
								{ name: "化验", value: 743 },
								{ name: "诊察", value: 743 },
								{ name: "西药", value: 743 },
								{ name: "其他", value: 743 }
							]
						},
						{
							name: "肿瘤科",
							collapsed: true,
							children: [
								{ name: "麻醉", value: 3938 },
								{ name: "护理", value: 3812 },
								{ name: "放射", value: 6714 },
								{ name: "材料", value: 743 },
								{ name: "病例", value: 743 },
								{ name: "检查", value: 743 },
								{ name: "手术", value: 743 },
								{ name: "治疗", value: 743 },
								{ name: "血费", value: 743 },
								{ name: "草药", value: 743 },
								{ name: "中成", value: 743 },
								{ name: "化验", value: 743 },
								{ name: "诊察", value: 743 },
								{ name: "西药", value: 743 },
								{ name: "其他", value: 743 }
							]
						}
					]
				},
				{
					name: "11~20名",
					collapsed: true,
					children: [
						{ name: "Easing", value: 17010 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 }
					]
				},
				{
					name: "21~30名",
					collapsed: true,
					children: [
						{ name: "DataField", value: 1759 },
						{ name: "DataSchema", value: 2165 },
						{ name: "DataSet", value: 586 },
						{ name: "DataSource", value: 3331 },
						{ name: "DataTable", value: 772 },
						{ name: "DataUtil", value: 3322 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 }
					]
				},
				{
					name: "31~40名",
					collapsed: true,
					children: [
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 },
						{ name: "DirtySprite", value: 8833 }
					]
				}
			]
		}
	]

	let option: echarts.EChartsOption = {
		tooltip: {
			trigger: "item",
			triggerOn: "mousemove"
		},
		series: [
			{
				type: "tree",
				data: data,
				top: "1%",
				left: "14%",
				bottom: "1%",
				right: "20%",
				symbolSize: 14,
				label: {
					position: "left",
					verticalAlign: "middle",
					align: "right",
					fontSize: 14
				},
				leaves: {
					label: {
						position: "right",
						verticalAlign: "middle",
						align: "left"
					}
				},
				emphasis: {
					focus: "descendant"
				},
				expandAndCollapse: true,
				animationDuration: 550,
				animationDurationUpdate: 750
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
