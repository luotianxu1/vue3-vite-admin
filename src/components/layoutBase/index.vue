<template>
	<component :is="LayoutComponents[themeConfig.layout]" />
</template>

<script lang="ts" setup>
import { GlobalStore } from "@/store/modules/global"
import LayoutVertical from "./layoutVertical/index.vue"

const LayoutComponents: { [key: string]: any } = {
	vertical: LayoutVertical
}

const globalStore = GlobalStore()
const themeConfig = computed(() => globalStore.themeConfig)
</script>

<style lang="scss" scoped>
.el-container {
	display: flex;
	width: 100%;
	min-width: 970px;
	height: 100%;
	.el-aside {
		width: auto;
		overflow: inherit;
		display: flex;
		flex-direction: column;
	}
	.el-header,
	.el-footer {
		height: auto;
		padding: 0;
	}
	.el-main {
		padding: 0;
		box-sizing: border-box;
		background: #f0f2f5;
		overflow: hidden;
	}
}
</style>
