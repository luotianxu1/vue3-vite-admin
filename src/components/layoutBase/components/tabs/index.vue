<template>
	<div class="tabs-box">
		<div class="tabs-menu">
			<el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="removeTab">
				<el-tab-pane
					v-for="item in tabsMenuList"
					:key="item.path"
					:path="item.path"
					:label="item.title"
					:name="item.path"
					:closable="item.close"
				>
					<template #label>
						<span>
							<i class="iconfont" :class="item.icon" v-if="globalStore.themeConfig.tabsIcon"></i>
							{{ item.title }}
						</span>
					</template>
				</el-tab-pane>
			</el-tabs>
			<MoreButton></MoreButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
import MoreButton from "./components/MoreButton.vue"
import { GlobalStore } from "@/store/modules/global"
import { TabPaneName, TabsPaneContext } from "element-plus"

const globalStore = GlobalStore()
const tabsMenuList = computed(() => globalStore.routerList)

const tabsMenuValue = computed({
	get: () => {
		return globalStore.routerActive
	},
	set: val => {
		globalStore.setTabsMenuValue(val)
	}
})

const route = useRoute()
const router = useRouter()
// 监听路由
watch(
	() => route.path,
	() => {
		let params = {
			title: route.meta.title as string,
			path: route.path,
			icon: route.meta.icon as string,
			close: true
		}
		globalStore.addTabs(params)
	},
	{
		immediate: true
	}
)

const tabClick = (tabItem: TabsPaneContext) => {
	let path = tabItem.props.name as string
	router.push(path)
}

const removeTab = (activeTabPath: TabPaneName) => {
	globalStore.removeTabs(activeTabPath as string)
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

		.el-tabs__item {
			i {
				font-size: 16px;
				margin-right: 10px;
			}
		}
	}
}
</style>
