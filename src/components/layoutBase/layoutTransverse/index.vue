<!-- 横向布局 -->
<template>
	<el-container class="layout">
		<el-header>
			<div class="logo flx-center">
				<img :src="url" alt="logo" />
				<span>管理系统模板</span>
			</div>
			<el-menu
				mode="horizontal"
				:collapse="globalStore.themeConfig.isCollapse"
				:default-active="globalStore.routerActive"
				:router="false"
				:collapse-transition="false"
				:unique-opened="true"
			>
				<template v-for="subItem in menuList" :key="subItem.path">
					<el-sub-menu v-if="subItem.children?.length" :index="subItem.path" :key="subItem.path + 'el-sub-menu'">
						<template #title>
							<i class="iconfont" :class="subItem.meta.icon"></i>
							<span>{{ subItem.meta.title }}</span>
						</template>
						<TreeMenu :tree-data="subItem.children"></TreeMenu>
					</el-sub-menu>
					<el-menu-item v-else :index="subItem.path" :key="subItem.path + 'el-menu-item'" @click="handleClickMenu(subItem)">
						<i class="iconfont" :class="subItem.meta.icon"></i>
						<template #title>
							<span>{{ subItem.meta.title }}</span>
						</template>
					</el-menu-item>
				</template>
			</el-menu>
			<HeaderRight></HeaderRight>
		</el-header>
		<Main></Main>
	</el-container>
</template>

<script setup lang="ts">
import Main from "../components/main/Main.vue"
import HeaderRight from "../components/header/HeaderRight.vue"
import { IMenuOptions } from "@/api/system/userApi"
import { UserStore } from "@/store/modules/user"
import { GlobalStore } from "@/store/modules/global"

const router = useRouter()
const globalStore = GlobalStore()
const userStore = UserStore()
const menuList = computed(() => userStore.showMenuListGet)

// 图标
const url = ref("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")

const handleClickMenu = (subItem: IMenuOptions) => {
	if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank")
	router.push(subItem.path)
}
</script>

<style lang="scss" scoped>
.el-container {
	width: 100%;
	height: 100%;
	.el-header {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 55px;
		padding: 0 15px 0 0;
		border-bottom: 1px solid var(--el-border-color);
		.logo {
			width: 210px;
			margin-right: 30px;
			span {
				font-size: 21.5px;
				font-weight: bold;
				white-space: nowrap;
			}
			img {
				width: 28px;
				object-fit: contain;
				margin-right: 6px;
			}
		}
	}
}

.el-menu {
	flex: 1;
	overflow: hidden;
	border-bottom: 1px solid var(--el-border-color);
	height: 55px;
	.is-active {
		border-bottom-color: var(--el-color-primary) !important;
		&:hover {
			color: #ffffff !important;
		}
	}
}
</style>
