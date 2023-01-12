<template>
	<div class="item">
		<div class="header">
			<div class="img">
				<span class="icon"></span>
				设备信息
			</div>
			<div class="num"></div>
		</div>
		<div class="echarts"></div>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.item {
	width: 317px;
	background-image: url("@/assets/img/open/intelligentFan/bg_sbxx.png");
	background-repeat: no-repeat;
	margin-bottom: 15px;
	pointer-events: auto;
}

.header {
	height: 40px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #c9cdea;
	padding: 0 10px;

	.img {
		display: flex;
		align-items: center;
	}

	.num {
		span {
			font-family: "DS-Digital-Bold";
			font-size: 30px;
			color: #fff;
		}
	}
}
.icon {
	width: 20px;
	height: 20px;
	display: inline-block;
	background: url("@/assets/img/open/intelligentFan/icon_sbxx.png") no-repeat center;
	background-size: 100% 100%;
	margin-right: 5px;
}

.echarts {
	width: 100%;
	height: 309px;
	background-image: url("@/assets/img/open/intelligentFan/fanpic.gif");
	background-size: 100% 100%;
}
</style>
