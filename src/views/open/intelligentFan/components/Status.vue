<template>
	<Item>
		<template #icon>
			<span class="icon"></span>
		</template>
		<template #title>装机容量</template>
		<template #echarts>
			<div ref="myCharts" class="echarts">
				<div v-for="(item, index) in ListValue" :key="index" :class="item.state == 0 ? 'blue_box' : 'red_box'">
					<span class="diarylist_code">{{ item.code }}</span>
					<span class="diarylist_num">{{ item.number }}</span>
					<div class="diarylist_icon"></div>
				</div>
			</div>
		</template>
	</Item>
</template>

<script lang="ts" setup>
import Item from "./Item.vue"

const ListValue = [
	{
		state: 0,
		code: "CNF0123",
		number: "01"
	},
	{
		state: 1,
		code: "CNF0124",
		number: "02"
	},
	{
		state: 0,
		code: "CNF0125",
		number: "03"
	},
	{
		state: 0,
		code: "CNF0126",
		number: "04"
	},
	{
		state: 0,
		code: "CNF0127",
		number: "05"
	},
	{
		state: 0,
		code: "CNF0128",
		number: "06"
	},
	{
		state: 0,
		code: "CNF0129",
		number: "07"
	},
	{
		state: 0,
		code: "CNF0130",
		number: "08"
	},
	{
		state: 0,
		code: "CNF0132",
		number: "09"
	},
	{
		state: 0,
		code: "CNF0133",
		number: "10"
	},
	{
		state: 0,
		code: "CNF0134",
		number: "11"
	},
	{
		state: 0,
		code: "CNF0135",
		number: "12"
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

.blue_box {
	width: 92px;
	float: left;
	height: 73px;
	margin-top: 10px;
	margin-left: 5px;
	margin-right: 5px;
	background: url("@/assets/img/open/intelligentFan/bg_fjzt_kuang_lan.png") left center no-repeat;
	position: relative;
}
.red_box {
	width: 92px;
	float: left;
	height: 73px;
	margin-top: 10px;
	margin-left: 5px;
	margin-right: 5px;
	background: url("@/assets/img/open/intelligentFan/bg_fjzt_kuang2.png") left center no-repeat;
	position: relative;
}
.diarylist_code {
	color: #b2b2e4;
	font-size: 11px;
	position: absolute;
	top: 7px;
	left: 30px;
}
.diarylist_num {
	color: #dbe2ff;
	font-size: 21px;
	position: absolute;
	top: 41px;
	left: 15px;
}
.diarylist_icon {
	width: 14px;
	height: 17px;
	background: url("@/assets/img/open/intelligentFan/icon_wenjian.png") left center no-repeat;
	position: absolute;
	top: 46px;
	left: 73px;
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
