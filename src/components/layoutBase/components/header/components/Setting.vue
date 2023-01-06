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
				<el-color-picker v-model="themeConfig.primary" :predefine="colorList" @change="changeColor(themeConfig.primary)" />
			</div>
			<div class="item">
				<span>黑暗模式</span>
				<el-switch v-model="themeConfig.isDark" @change="switchDark" />
			</div>
			<div class="item">
				<span>黑白模式</span>
				<el-switch v-model="themeConfig.isGrey" @change="changeGrey(themeConfig.isGrey)" />
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
import { DEFAULT_PRIMARY } from "@/config/config"
import { useTheme } from "@/hooks/useTheme"
import { GlobalStore } from "@/store/modules/global"

const drawer = ref(false)
const open = () => {
	drawer.value = true
}

const globalStore = GlobalStore()
const themeConfig = computed(() => globalStore.themeConfig)

// 预定义主题颜色
const colorList = [
	DEFAULT_PRIMARY,
	"#DAA96E",
	"#0C819F",
	"#409EFF",
	"#27ae60",
	"#ff5c93",
	"#e74c3c",
	"#fd726d",
	"#f39c12",
	"#9b59b6"
]

const { changePrimary, changeGrey, switchDark } = useTheme()

const changeColor = color => {
	changePrimary(color)
	ElMessage({ type: "success", message: color ? `主题颜色已设置为 ${color}` : `主题颜色已重置为 ${DEFAULT_PRIMARY}` })
}
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
