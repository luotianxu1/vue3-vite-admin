<template>
	<div class="left">
		<i
			class="iconfont icon-duoyuyan"
			:class="globalStore.themeConfig.isCollapse ? 'icon-mulushousuo' : 'icon-muluzhankai'"
			@click="changAside"
		></i>

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

i {
	font-size: 20px;
	cursor: pointer;
	&:hover {
		color: var(--el-color-primary);
	}
}
</style>
