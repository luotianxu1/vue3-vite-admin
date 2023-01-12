<template>
	<Item>
		<template #icon>
			<span class="icon"></span>
		</template>
		<template #title>装机容量</template>
		<template #echarts>
			<div ref="myCharts" class="echarts">
				<div v-for="(item, index) in ListAlarm" :key="index" class="fanList_box">
					<div :class="item.state == 0 ? 'yellow_box' : 'red_box'"></div>
					<span class="fanList_code">{{ item.code }}</span>
					<span class="fanList_time">{{ item.time }}</span>
					<span class="fanList_value">{{ item.value }}</span>
					<div class="fanList_icon"></div>
				</div>
			</div>
		</template>
	</Item>
</template>

<script lang="ts" setup>
import Item from "./Item.vue"

const ListAlarm = [
	{
		state: 1,
		code: "CNF0123",
		time: "13:48:46",
		value: "偏航系统出现偏移"
	},
	{
		state: 0,
		code: "CNF0124",
		time: "13:48:46",
		value: "主轴转速偏高"
	},
	{
		state: 1,
		code: "CNF0125",
		time: "13:48:46",
		value: "分冷装置散热不足"
	},
	{
		state: 1,
		code: "CNF0126",
		time: "13:48:46",
		value: "发电机电流过大"
	},
	{
		state: 1,
		code: "CNF0123",
		time: "13:48:46",
		value: "偏航系统出现偏移"
	},
	{
		state: 0,
		code: "CNF0124",
		time: "13:48:46",
		value: "主轴转速偏高"
	},
	{
		state: 1,
		code: "CNF0125",
		time: "13:48:46",
		value: "分冷装置散热不足"
	},
	{
		state: 1,
		code: "CNF0126",
		time: "13:48:46",
		value: "发电机电流过大"
	}
]
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
	overflow: auto;
}

.fanList_box {
	width: 303px;
	height: 56px;
	position: relative;
	margin-top: 12px;
	background: url("@/assets/img/open/intelligentFan/bg_gjxx_kuang.png") left center no-repeat;
	margin-left: 2px;
}
.yellow_box {
	width: 16px;
	height: 16px;
	background: url("@/assets/img/open/intelligentFan/gjxx_sanjiao_huang.png") left center no-repeat;
	position: absolute;
	left: 0;
	top: 0px;
}
.red_box {
	width: 16px;
	height: 16px;
	background: url("@/assets/img/open/intelligentFan/gjxx_sanjiao_hong.png") left center no-repeat;
	position: absolute;
	left: 0;
	top: 0px;
}
.fanList_code {
	color: #b2b2e4;
	font-size: 11px;
	position: absolute;
	top: 7px;
	left: 30px;
}
.fanList_time {
	color: #b2b2e4;
	font-size: 11px;
	position: absolute;
	top: 7px;
	right: 7px;
}
.fanList_value {
	color: #fefefe;
	font-size: 15px;
	position: absolute;
	top: 29px;
	left: 11px;
}
.fanList_icon {
	width: 14px;
	height: 17px;
	background: url("@/assets/img/open/intelligentFan/icon_wenjian.png") left center no-repeat;
	position: absolute;
	top: 32px;
	right: 6px;
}
.echarts::-webkit-scrollbar {
	width: 3px;
}

.echarts::-webkit-scrollbar-button {
	display: none;
}

.echarts::-webkit-scrollbar-thumb {
	background: #ffffff;
	border-radius: 5px;
}

.echarts::-webkit-scrollbar-track {
	background-color: transparent;
}
</style>
