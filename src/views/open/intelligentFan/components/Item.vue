<template>
	<div class="item">
		<div class="header">
			<div class="img">
				<slot name="icon"></slot>
				<slot name="title"></slot>
			</div>
			<div class="num">
				<span><slot name="num"></slot> </span><slot name="unit"></slot>
				<slot name="defaultValue"></slot>
			</div>
		</div>
		<div class="echarts">
			<slot name="echarts"></slot>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.item {
	width: 317px;
	background-image: url("@/assets/img/open/intelligentFan/bg_zuoce_1.png");
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
.echarts {
	width: 100%;
	// height: 95px;
}
</style>
