<template>
	<div class="main-scene">
		<div ref="gameRef" class="main-game" v-show="isLoaded"></div>
		<div class="loading" v-show="!isLoaded">Loading({{ progress }}%)</div>
		<div class="msg" :class="{ fadeOut: fadeOut }" v-show="isShow">
			<h1>
				<span v-for="(item, index) in words" :key="item + index">{{ item }}</span>
			</h1>
		</div>
	</div>
</template>

<script lang="ts" setup>
import eventHub from "@/utils/eventHub"
import Game from "../game"
import { playBGM } from "../game/audio"

const isLoaded = ref(false)
const progress = ref(0)
const fadeOut = ref(false)
const isShow = ref(false)
const words: any = ref([])
const gameRef = ref(null)
const strList = [
	"阖家欢乐 兔年大吉",
	"恭喜发财 万事如意",
	"五福临门 财源滚滚",
	"福星高照 万事如意",
	"财源广进 康泰安顺",
	"一帆风顺 新春大吉",
	"阖家团圆 万事顺心",
	"福星高照 兔年吉祥",
	"竹报佳音 梅香鹊韵",
	"人在春台 一门瑞气",
	"春风梳柳 喜鹊登梅"
]

onMounted(() => {
	playBGM()
	new Game(gameRef.value)

	eventHub.on("open", () => {
		words.value = strList[~~(strList.length * Math.random())].split("")
		isShow.value = true
		fadeOut.value = false
	})
	eventHub.on("close", () => {
		fadeOut.value = true
		setTimeout(() => {
			isShow.value = false
		}, 1500)
	})
	eventHub.on("progress", n => {
		progress.value = n as number

		if ((n as number) >= 100) {
			loaded()
		}
	})
})

function loaded() {
	isLoaded.value = true
}
</script>

<style lang="scss" scoped>
@use "sass:math";
$color: rgb(255, 201, 101);
$border-width: 2px;
$border-color: #000;
$num: 9;
$deg: 12deg;
$delay: 350ms;

.msg {
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	height: 100%;
	z-index: 8;
	background-color: transparent;

	&.fadeOut {
		animation: fadeOut 1s 0.5s ease-in-out;
	}

	h1 {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		color: $color;
		letter-spacing: #{$border-width * 1.5};
		-webkit-text-stroke-color: $border-color;
		-webkit-text-stroke-width: $border-width;
		font-size: 12px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -235px);

		& > span {
			position: absolute;
			font-size: 4.2em;
			font-weight: bolder;
			transform-origin: 50% #{$num * 0.85em};

			@for $i from 0 through $num {
				&:nth-child(#{$i + 1}) {
					transform: rotate(#{$deg * $i - (floor(math.div($num, 2)) + 0.1) * $deg});
					z-index: #{$num - $i};
					animation: show 0.4s backwards;
					animation-delay: #{$i * $delay + 1500};
				}
			}

			@keyframes show {
				0% {
					font-size: 6em;
					filter: blur(0.1em);
					opacity: 0;
				}

				80% {
					font-size: 3.6em;
					filter: blur(0.001em);
					opacity: 1;
				}

				100% {
					font-size: 4.2em;
					filter: blur(0);
					opacity: 1;
				}
			}
		}
	}
}

.main-scene {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background-color: black;
	position: relative;
}

.main-game {
	width: 100%;
	height: 100%;
	animation: fadeIn 2s ease-in-out;
}

.loading {
	position: absolute;
	left: 0;
	right: 0;
	z-index: 99;
	top: 0;
	bottom: 0;
	background: black;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	color: white;
	font-size: 24px;
	box-sizing: border-box;
	padding: 30px 15px;

	&:after {
		content: "";
		width: 4em;
		display: inline-block;
		animation: loading-word 3s steps(3, start) infinite;
	}

	@keyframes loading-word {
		0% {
			content: " ";
		}

		33% {
			content: ".";
		}

		66% {
			content: "..";
		}

		100% {
			content: "...";
		}
	}
}

@media (max-width: 414px) {
	.msg > h1 {
		transform: translate(-50%, -205px) scale(0.63);
	}
	.loading {
		font-size: 14px;
	}
}
</style>
