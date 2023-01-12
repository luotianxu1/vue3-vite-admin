<template>
	<div class="page">
		<Fengji class="fengji" ref="fengji"></Fengji>
		<div class="header">风机</div>
		<div class="main">
			<Left></Left>
			<Right></Right>
		</div>
		<div class="footer footer-bg">
			<div class="item" @click="startFan">
				<div class="fan-dz" :class="{ fandznew: bfanShow }"></div>
				<span class="fan-name">风机开启</span>
			</div>
			<div class="item" @click="changeView1">
				<div class="szfj-dz" :class="{ szfjdznew: bszfjShow }"></div>
				<span class="fan-name">数字风机</span>
			</div>
			<div class="item" @click="changeView2">
				<div class="ctsj-dz" :class="{ ctsjdznew: bctsjShow }"></div>
				<span class="fan-name">舱体视角</span>
			</div>
			<div class="item" @click="changeView3">
				<div class="bz-dz" :class="{ bzdznew: bbzShow }"></div>
				<span class="fan-name">爆炸分解</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Fengji from "./components/Fengji.vue"
import Left from "./Left.vue"
import Right from "./Right.vue"

const fengji = ref()

/**
 * 切换风机播放
 */
let bfanShow = ref(true)
const startFan = () => {
	bfanShow.value = !bfanShow.value
	fengji.value.startFan(bfanShow.value)
}

/**
 * 切换数字风机
 */
let bszfjShow = ref(false)
const changeView1 = () => {
	bszfjShow.value = !bszfjShow.value
	fengji.value.changeView1(bszfjShow.value)
}

/**
 * 舱体视角
 */
let bctsjShow = ref(false)
const changeView2 = () => {
	if (!bszfjShow.value) {
		return
	}
	bctsjShow.value = !bctsjShow.value
	fengji.value.changeView2(bctsjShow.value)
}

/**
 * 切换爆炸分解
 */
let bbzShow = ref(false)
const changeView3 = () => {
	if (!bctsjShow.value) {
		return
	}
	bbzShow.value = !bbzShow.value
	fengji.value.changeView3(bbzShow.value)
}
</script>

<style lang="scss" scoped>
.page {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	position: relative;
	background: url("@/assets/img/open/intelligentFan/bg.png") center center no-repeat;

	.fengji {
		position: absolute;
	}

	.header {
		height: 100px;
		width: 100%;
		background-image: url("@/assets/img/open/smartCity/title.png");
		background-repeat: no-repeat;
		background-position: center;
		text-align: center;
		z-index: 99;
		color: rgb(226, 226, 255);
		font-size: 30px;
		text-align: center;
	}

	.main {
		flex: 1;
		position: relative;
		z-index: 99;
		pointer-events: none;
	}

	.footer-bg {
		background: url("@/assets/img/open/intelligentFan/bg_xia_bg.png") no-repeat center center;
	}

	.footer {
		width: 100%;
		height: 61px;
		position: absolute;
		bottom: 0;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
		.item {
			width: 140px;
			height: 120px;
			display: flex;
			flex-direction: column;
			align-items: center;
			cursor: pointer;
			.fan-name {
				color: #a3a2d9;
				font-size: 14px;
			}
			.fan-dz {
				width: 78px;
				height: 68px;
				background: url("@/assets/img/open/intelligentFan/btn_nor_fjkq.png") no-repeat center center;
			}
			.fandznew {
				background: url("@/assets/img/open/intelligentFan/btn_hot_fjkq.png") no-repeat center center;
			}
			.szfj-dz {
				width: 78px;
				height: 68px;
				background: url("@/assets/img/open/intelligentFan/btn_nor_szfj.png") no-repeat center center;
			}
			.szfjdznew {
				background: url("@/assets/img/open/intelligentFan/btn_hot_szfj.png") no-repeat center center;
			}
			.ctsj-dz {
				width: 78px;
				height: 68px;
				background: url("@/assets/img/open/intelligentFan/btn_nor_ctsj.png") no-repeat center center;
			}
			.ctsjdznew {
				background: url("@/assets/img/open/intelligentFan/btn_hot_ctsj.png") no-repeat center center;
			}
			.bz-dz {
				width: 78px;
				height: 69px;
				background: url("@/assets/img/open/intelligentFan/btn_nor_bz.png") no-repeat center center;
			}
			.bzdznew {
				background: url("@/assets/img/open/intelligentFan/btn_hot_bz.png") no-repeat center center;
			}
		}
	}
}
</style>
