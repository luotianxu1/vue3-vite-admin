<template>
	<div class="left">
		<MyIcon
			:icon="globalStore.themeConfig.isCollapse ? 'icon-mulushousuo' : 'icon-muluzhankai'"
			:font="20"
			@click="changAside"
			:hover="true"
			:point="true"
		></MyIcon>
		<BreadCrumb class="item" v-if="globalStore.themeConfig.breadcrumb"></BreadCrumb>
	</div>
</template>

<script lang="ts" setup>
import { GlobalStore } from "@/store/modules/global"
import BreadCrumb from "./components/BreadCrumb.vue"

const globalStore = GlobalStore()
const changAside = () => {
	globalStore.themeConfig.isCollapse = !globalStore.themeConfig.isCollapse
}
</script>

<style lang="scss" scoped>
.left {
	display: flex;
	align-items: center;

	.item {
		margin-left: 10px;
	}
}
</style>
