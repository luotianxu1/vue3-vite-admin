<template>
	<div class="cabin-popup" ref="Alarm_pop" :style="{ display: bPopus1, left: leftValue + 'px', top: topValue + 'px' }">
		<div class="cabin-popup-dian"></div>
		<div class="cabin-popup-line"></div>
		<div class="cabin-popup-image"></div>
		<div class="cabin-popup-logo"></div>
		<div class="air-cooling">
			<span class="cabin-popup-name1">{{ PopupArrValue.title }}</span>
			<span class="cabin-popup-name2">{{ PopupArrValue.name1 }}</span>
			<span class="cabin-popup-name3">{{ PopupArrValue.name2 }}</span>
			<span class="cabin-popup-name4">{{ PopupArrValue.name3 }}</span>
			<span class="cabin-popup-name5">{{ PopupArrValue.name4 }}</span>
			<span class="cabin-popup-name6">{{ PopupArrValue.number1 }}</span>
			<span class="cabin-popup-name7">{{ PopupArrValue.number2 }}</span>
			<span class="cabin-popup-name8">{{ PopupArrValue.number3 }}</span>
			<span class="cabin-popup-name9">{{ PopupArrValue.number4 }}</span>
			<span class="cabin-popup-name10">{{ PopupArrValue.Symbol1 }}</span>
			<span class="cabin-popup-name11">{{ PopupArrValue.Symbol2 }}</span>
			<span class="cabin-popup-name12">{{ PopupArrValue.Symbol3 }}</span>
			<span class="cabin-popup-name13">{{ PopupArrValue.Symbol4 }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
const bPopus1 = ref("none")
const leftValue = ref(0)
const topValue = ref(0)
const PopupArrValue = reactive({
	title: "风冷装置",
	name1: "风冷功率",
	name2: "风冷温度",
	name3: "功率",
	name4: "温度",
	number1: "8",
	number2: "300",
	number3: "200",
	number4: "24",
	Symbol1: "°C",
	Symbol2: "KWh",
	Symbol3: "KW",
	Symbol4: "°C"
})

const show = (type, x, y) => {
	if (!type) {
		return
	}
	switch (type) {
		case "houzhuji1":
			PopupArrValue.title = "风冷装置"
			PopupArrValue.name1 = "风冷功率"
			PopupArrValue.name2 = "风冷温度"
			PopupArrValue.name3 = "功率"
			PopupArrValue.name4 = "温度"
			PopupArrValue.number1 = "8"
			PopupArrValue.number2 = "300"
			PopupArrValue.number3 = "200"
			PopupArrValue.number4 = "24"
			PopupArrValue.Symbol1 = "°C"
			PopupArrValue.Symbol2 = "KWh"
			PopupArrValue.Symbol3 = "KW"
			PopupArrValue.Symbol4 = "°C"
			break
		case "zhuzhou":
			PopupArrValue.title = "主轴"
			PopupArrValue.name1 = "电压"
			PopupArrValue.name2 = "电流"
			PopupArrValue.name3 = "功率"
			PopupArrValue.name4 = "频率"
			PopupArrValue.number1 = "220"
			PopupArrValue.number2 = "30"
			PopupArrValue.number3 = "10"
			PopupArrValue.number4 = "200"
			PopupArrValue.Symbol1 = "伏特"
			PopupArrValue.Symbol2 = "安培"
			PopupArrValue.Symbol3 = "千瓦"
			PopupArrValue.Symbol4 = "赫兹"
			break
		case "fadongji":
			PopupArrValue.title = "油冷装置"
			PopupArrValue.name1 = "功率"
			PopupArrValue.name2 = "容量"
			PopupArrValue.name3 = "油耗"
			PopupArrValue.name4 = "工作时间"
			PopupArrValue.number1 = "15"
			PopupArrValue.number2 = "500"
			PopupArrValue.number3 = "100"
			PopupArrValue.number4 = "72"
			PopupArrValue.Symbol1 = "KW"
			PopupArrValue.Symbol2 = "L"
			PopupArrValue.Symbol3 = "G/KW.H"
			PopupArrValue.Symbol4 = "H"
			break
		case "dizuo_1":
			PopupArrValue.title = "偏航装置"
			PopupArrValue.name1 = "速度"
			PopupArrValue.name2 = "制动力矩"
			PopupArrValue.name3 = "功率"
			PopupArrValue.name4 = "频率"
			PopupArrValue.number1 = "20"
			PopupArrValue.number2 = "25"
			PopupArrValue.number3 = "6"
			PopupArrValue.number4 = "150"
			PopupArrValue.Symbol1 = "R"
			PopupArrValue.Symbol2 = "Nm"
			PopupArrValue.Symbol3 = "Kw"
			PopupArrValue.Symbol4 = "Hrz"
			break
		case "dizuo_2":
			PopupArrValue.title = "底座"
			PopupArrValue.name1 = "耐热温度"
			PopupArrValue.name2 = "损耗程度"
			PopupArrValue.name3 = "湿度"
			PopupArrValue.number1 = "160"
			PopupArrValue.number2 = "10"
			PopupArrValue.number3 = "40"
			PopupArrValue.Symbol1 = "°C"
			PopupArrValue.Symbol2 = "%"
			PopupArrValue.Symbol3 = "%"
			break
		case "dizuo_3":
			PopupArrValue.title = "齿轮系统"
			PopupArrValue.name1 = "油槽温度"
			PopupArrValue.name2 = "入口轴温度"
			PopupArrValue.name3 = "输入轴温度"
			PopupArrValue.name4 = "输出轴温度"
			PopupArrValue.number1 = "60"
			PopupArrValue.number2 = "50"
			PopupArrValue.number3 = "70"
			PopupArrValue.number4 = "65"
			PopupArrValue.Symbol1 = "°C"
			PopupArrValue.Symbol2 = "°C"
			PopupArrValue.Symbol3 = "°C"
			PopupArrValue.Symbol4 = "°C"
			break
	}
	leftValue.value = x
	topValue.value = y - 235
	bPopus1.value = "block"
}
const close = () => {
	bPopus1.value = "none"
}
defineExpose({
	show,
	close
})
</script>

<style lang="scss" scoped>
.cabin-popup {
	width: 520px;
	height: 231px;
	position: absolute;
	top: 0px;
	pointer-events: none;
}

.cabin-popup-dian {
	width: 23px;
	height: 23px;
	background-image: url("@/assets/img/open/intelligentFan/yuandian.png");
	background-repeat: no-repeat;
	position: absolute;
	left: 3px;
	top: 207px;
}

.cabin-popup-line {
	width: 112px;
	height: 90px;
	background-image: url("@/assets/img/open/intelligentFan/tankuang_lianxian.png");
	background-repeat: no-repeat;
	position: absolute;
	left: 17px;
	top: 124px;
}

.cabin-popup-image {
	width: 383px;
	height: 191px;
	background-image: url("@/assets/img/open/intelligentFan/bg_tankuang.png");
	background-repeat: no-repeat;
	position: absolute;
	left: 122px;
	top: 32px;
	z-index: 10;
}

.cabin-popup-logo {
	width: 110px;
	height: 110px;
	background-image: url("@/assets/img/open/intelligentFan/fengji_sbxx.png");
	background-repeat: no-repeat;
	background-size: 106px 97px;
	position: absolute;
	left: 157px;
	top: 74px;
	z-index: 11;
}

.cabin-popup-name1 {
	color: #a3a2d9;
	font-size: 16px;
	position: absolute;
	top: 50px;
	left: 280px;
	z-index: 11;
}

.cabin-popup-name2 {
	color: #fff;
	font-size: 14px;
	position: absolute;
	top: 90px;
	left: 280px;
	z-index: 11;
}

.cabin-popup-name3 {
	color: #fff;
	font-size: 14px;
	position: absolute;
	top: 119px;
	left: 280px;
	z-index: 11;
}

.cabin-popup-name4 {
	color: #fff;
	font-size: 14px;
	position: absolute;
	top: 149px;
	left: 280px;
	z-index: 11;
}

.cabin-popup-name5 {
	color: #fff;
	font-size: 14px;
	position: absolute;
	top: 179px;
	left: 280px;
	z-index: 11;
}

.cabin-popup-name6 {
	color: #f4d310;
	font-size: 16px;
	position: absolute;
	top: 90px;
	left: 376px;
	z-index: 11;
}

.cabin-popup-name7 {
	color: #f4d310;
	font-size: 14px;
	position: absolute;
	top: 119px;
	left: 376px;
	z-index: 11;
}

.cabin-popup-name8 {
	color: #f4d310;
	font-size: 14px;
	position: absolute;
	top: 149px;
	left: 376px;
	z-index: 11;
}

.cabin-popup-name9 {
	color: #f4d310;
	font-size: 14px;
	position: absolute;
	top: 179px;
	left: 376px;
	z-index: 11;
}

.cabin-popup-name10 {
	color: #6f71a2;
	font-size: 14px;
	position: absolute;
	top: 90px;
	left: 442px;
	z-index: 11;
}

.cabin-popup-name11 {
	color: #6f71a2;
	font-size: 14px;
	position: absolute;
	top: 119px;
	left: 442px;
	z-index: 11;
}

.cabin-popup-name12 {
	color: #6f71a2;
	font-size: 14px;
	position: absolute;
	top: 149px;
	left: 442px;
	z-index: 11;
}

.cabin-popup-name13 {
	color: #6f71a2;
	font-size: 14px;
	position: absolute;
	top: 179px;
	left: 442px;
	z-index: 11;
}
</style>
