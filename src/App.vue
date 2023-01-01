<template>
	<el-config-provider :z-index="3000" :locale="localLanguage" :message="config" :size="size">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup lang="ts">
import { GlobalStore } from "@/store/modules/global"
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import en from "element-plus/lib/locale/lang/en"
import { useI18n } from "vue-i18n"

const { locale } = useI18n()
const globalStore = GlobalStore()
const localLanguage = computed((): any => {
	locale.value = globalStore.SYSTEM_LANGUAGE
	if (globalStore.SYSTEM_LANGUAGE && globalStore.SYSTEM_LANGUAGE === "zh") {
		return zhCn
	}
	if (globalStore.SYSTEM_LANGUAGE === "en") {
		return en
	}
	return ""
})

const config = reactive({
	max: 3
})

const size = ref<"large" | "default" | "small">("default")

let timer
onMounted(() => {
	timer = setInterval(() => {
		globalStore.SYETEM_TIME = new Date().valueOf()
	}, 1000)
})

onUnmounted(() => {
	if (timer) {
		clearInterval(timer)
	}
})
</script>

<style>
#cssrender {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	pointer-events: none;
}

.elementTag {
	position: relative;
	left: -30px;
	top: 15px;
}

.elementTag::before {
	content: "";
	display: block;
	position: absolute;
	width: 100px;
	height: 1px;
	background: rgb(127 177 0.75);
	bottom: 0;
	right: -100px;
	transform: rotate(30deg);
	transform-origin: 0 0;
}

.elementTag::after {
	content: "";
	display: block;
	position: absolute;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: rgb(127 177 0.75);
	bottom: -65px;
	right: -105px;
}

.elementContent {
	background-color: rgba(20, 143, 221, 0.68);
	box-shadow: 0 0 12px rgba(0, 128, 255, 0.75);
	border: 1px solid rgba(127, 177, 255, 0.75);
	padding: 20px;
	color: #efefef;
}

.elementContent h3 {
	font-size: 20px;
	font-weight: bold;
	margin: 0;
}
</style>
