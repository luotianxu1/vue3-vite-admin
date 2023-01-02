<template>
	<el-dropdown trigger="click">
		<el-button size="small" type="primary">
			<span>更多</span>
			<MyIcon icon="icon-xiangxia" color="#fff" :font="14" style="margin-left: 5px"></MyIcon>
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="closeCurrentTab">关闭当前</el-dropdown-item>
				<el-dropdown-item @click="closeOtherTab">关闭其他</el-dropdown-item>
				<el-dropdown-item @click="closeAllTab">关闭所有</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { GlobalStore } from "@/store/modules/global"
import { GLOB_APP_HOME } from "@/config/config"
const globalStore = GlobalStore()

// 关闭当前
const closeCurrentTab = () => {
	if (globalStore.SYSTEM_ACTIVE_ROUTER === GLOB_APP_HOME) {
		return
	}
	globalStore.removeTabs(globalStore.SYSTEM_ACTIVE_ROUTER)
}

// 关闭其他
const closeOtherTab = () => {
	globalStore.closeMultipleTab(globalStore.SYSTEM_ACTIVE_ROUTER)
}

// 关闭所有
const closeAllTab = () => {
	globalStore.closeMultipleTab()
	globalStore.goHome()
}
</script>

<style scoped lang="scss">
.tabs-box {
	:deep(.tabs-menu) {
		position: relative;
		width: 100%;
		.el-dropdown {
			position: absolute;
			top: 8px;
			right: 13px;
		}
		.tabs-icon {
			top: 2px;
		}
		.el-tabs__nav-wrap {
			position: absolute;
			width: calc(100% - 120px);
		}
		.el-tabs--card > .el-tabs__header {
			box-sizing: border-box;
			height: 40px;
			padding: 0 10px;
			margin: 0;
		}
		.el-tabs--card > .el-tabs__header .el-tabs__nav {
			border: none;
		}
		.el-tabs--card > .el-tabs__header .el-tabs__item {
			color: #cccccc;
			border: none;
		}
		.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
			color: hsl(219, 69%, 56%);
			border-bottom: 2px solid hsl(219, 69%, 56%);
		}
		.el-tabs__item .is-icon-close svg {
			margin-top: 0.5px;
		}
	}
}
</style>
