<template>
	<div class="systemSetting">
		<el-tooltip content="系统设置" placement="bottom" effect="light">
			<MyIcon icon="icon-setting" :font="20" :hover="true" :width="500" @click="open"></MyIcon>
		</el-tooltip>
		<!-- 布局切换 -->
		<el-drawer v-model="drawer" title="系统设置" direction="rtl" size="300">
			<el-divider content-position="center">
				<MyIcon icon="icon-buju" :padding="5"></MyIcon>
				布局切换
			</el-divider>
			<div class="layout-box">
				<el-tooltip effect="dark" content="纵向" placement="top" :show-after="200">
					<div
						:class="['layout-item layout-vertical', themeConfig.layout == 'vertical' ? 'is-active' : '']"
						@click="changeLayout('vertical')"
					>
						<div class="layout-dark"></div>
						<div class="layout-container">
							<div class="layout-light"></div>
							<div class="layout-content"></div>
						</div>
						<el-icon v-if="themeConfig.layout == 'vertical'"><IEpCircleCheckFilled></IEpCircleCheckFilled></el-icon>
					</div>
				</el-tooltip>
				<el-tooltip effect="dark" content="经典" placement="top" :show-after="200">
					<div
						:class="['layout-item layout-classic', themeConfig.layout == 'classic' ? 'is-active' : '']"
						@click="changeLayout('classic')"
					>
						<div class="layout-dark"></div>
						<div class="layout-container">
							<div class="layout-light"></div>
							<div class="layout-content"></div>
						</div>
						<el-icon v-if="themeConfig.layout == 'classic'"><IEpCircleCheckFilled></IEpCircleCheckFilled></el-icon>
					</div>
				</el-tooltip>
				<el-tooltip effect="dark" content="横向" placement="top" :show-after="200">
					<div
						:class="['layout-item layout-transverse', themeConfig.layout == 'transverse' ? 'is-active' : '']"
						@click="changeLayout('transverse')"
					>
						<div class="layout-dark"></div>
						<div class="layout-content"></div>
						<el-icon v-if="themeConfig.layout == 'transverse'"><IEpCircleCheckFilled></IEpCircleCheckFilled></el-icon>
					</div>
				</el-tooltip>
				<el-tooltip effect="dark" content="分栏" placement="top" :show-after="200">
					<div
						:class="['layout-item layout-columns', themeConfig.layout == 'columns' ? 'is-active' : '']"
						@click="changeLayout('columns')"
					>
						<div class="layout-dark"></div>
						<div class="layout-light"></div>
						<div class="layout-content"></div>
						<el-icon v-if="themeConfig.layout == 'columns'"><IEpCircleCheckFilled></IEpCircleCheckFilled></el-icon>
					</div>
				</el-tooltip>
			</div>
			<!-- 主题切换 -->
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
			<!-- 界面设置 -->
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

// 切换布局方式
const changeLayout = val => {
	globalStore.setThemeConfig({ ...themeConfig.value, layout: val })
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
	padding: 0 10px;
}

.item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 14px 0;
}

.layout-box {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	padding: 10px 0 0;
	.layout-item {
		position: relative;
		box-sizing: border-box;
		width: 95px;
		height: 67px;
		padding: 6px;
		margin-bottom: 20px;
		cursor: pointer;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px var(--el-border-color-lighter);
		transition: all 0.2s;
		.layout-dark {
			background-color: var(--el-color-primary);
			border-radius: 3px;
		}
		.layout-light {
			background-color: var(--el-color-primary-light-5);
			border-radius: 3px;
		}
		.layout-content {
			background-color: var(--el-color-primary-light-8);
			border: 1px dashed var(--el-color-primary);
			border-radius: 3px;
		}
		.el-icon {
			position: absolute;
			right: 10px;
			bottom: 10px;
			color: var(--el-color-primary);
			transition: all 0.2s;
		}
		&:hover {
			box-shadow: 0 0 5px 1px var(--el-border-color-darker);
		}
	}
	.is-active {
		box-shadow: 0 0 0 2px var(--el-color-primary) !important;
	}
	.layout-vertical {
		display: flex;
		justify-content: space-between;
		.layout-dark {
			width: 20%;
		}
		.layout-container {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 72%;
			.layout-light {
				height: 20%;
			}
			.layout-content {
				height: 67%;
			}
		}
	}
	.layout-classic {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.layout-dark {
			height: 22%;
		}
		.layout-container {
			display: flex;
			justify-content: space-between;
			height: 70%;
			.layout-light {
				width: 20%;
			}
			.layout-content {
				width: 70%;
			}
		}
	}
	.layout-transverse {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.layout-dark {
			height: 20%;
		}
		.layout-content {
			height: 67%;
		}
	}
	.layout-columns {
		display: flex;
		justify-content: space-between;
		.layout-dark {
			width: 14%;
		}
		.layout-light {
			width: 17%;
		}
		.layout-content {
			width: 55%;
		}
	}
}
</style>
