<template>
	<div class="systemSetting">
		<el-tooltip content="系统设置" placement="bottom" effect="light">
			<MyIcon icon="icon-setting" :font="20" :hover="true" :width="500" @click="open"></MyIcon>
		</el-tooltip>
		<el-drawer v-model="drawer" title="系统设置" direction="rtl" size="300">
			<el-divider content-position="center">
				<MyIcon icon="icon-buju" :padding="5"></MyIcon>
				布局切换
			</el-divider>
			<el-divider content-position="center">
				<MyIcon icon="icon-jingzi" :padding="5"></MyIcon>
				主题切换
			</el-divider>
			<div class="item">
				<span>主题颜色</span>
				<el-color-picker v-model="color1" />
			</div>
			<div class="item">
				<span>黑暗模式</span>
				<el-switch v-model="value1" />
			</div>
			<el-divider content-position="center">
				<MyIcon icon="icon-xitong" :padding="5"></MyIcon>
				界面设置
			</el-divider>
			<div class="item">
				<span>折叠菜单</span>
				<el-switch v-model="themeConfig.isCollapse" />
			</div>
			<div class="item">
				<span>面包屑</span>
				<el-switch v-model="themeConfig.breadcrumb" />
			</div>
			<div class="item">
				<span>面包屑图标</span>
				<el-switch v-model="themeConfig.breadcrumbIcon" />
			</div>
			<div class="item">
				<span>标签栏</span>
				<el-switch v-model="themeConfig.tabs" />
			</div>
			<div class="item">
				<span>标签栏图标</span>
				<el-switch v-model="themeConfig.tabsIcon" />
			</div>
			<div class="item">
				<span>页脚</span>
				<el-switch v-model="themeConfig.footer" />
			</div>
		</el-drawer>
	</div>
</template>

<script lang="ts" setup>
import { GlobalStore } from "@/store/modules/global"

const drawer = ref(false)
const open = () => {
	drawer.value = true
}
const color1 = ref("#409EFF")
const value1 = ref(true)

const globalStore = GlobalStore()
const themeConfig = computed(() => globalStore.themeConfig)
</script>

<style scoped lang="scss">
::v-deep(.el-drawer__header) {
	margin-bottom: 0;
}

::v-deep(.el-divider__text) {
	display: flex;
	align-items: center;
	justify-content: center;
}

.item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 14px 0;
}
</style>
