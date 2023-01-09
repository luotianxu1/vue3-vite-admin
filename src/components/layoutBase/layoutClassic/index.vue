<template>
	<el-container>
		<el-header>
			<div class="header-lf">
				<div class="logo flx-center">
					<img :src="url" alt="logo" />
					<span>管理系统模板</span>
				</div>
				<HeaderLeft></HeaderLeft>
			</div>
			<HeaderRight></HeaderRight>
		</el-header>
		<el-container class="classic-content">
			<el-aside>
				<div class="menu" :style="{ width: isCollapse ? '65px' : '210px' }">
					<el-scrollbar>
						<el-menu
							:collapse="globalStore.themeConfig.isCollapse"
							:default-active="globalStore.routerActive"
							:router="false"
							:collapse-transition="false"
							:unique-opened="true"
						>
							<TreeMenu :tree-data="menuList"></TreeMenu>
						</el-menu>
					</el-scrollbar>
				</div>
			</el-aside>
			<el-container class="classic-main">
				<Tabs v-if="globalStore.themeConfig.tabs"></Tabs>
				<Main></Main>
				<el-footer v-if="globalStore.themeConfig.footer">
					<Footer></Footer>
				</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script lang="ts" setup>
import HeaderLeft from "../components/header/HeaderLeft.vue"
import HeaderRight from "../components/header/HeaderRight.vue"
import Main from "../components/main/Main.vue"
import Tabs from "../components/tabs/index.vue"
import Footer from "../components/footer/index.vue"
import { GlobalStore } from "@/store/modules/global"
import { UserStore } from "@/store/modules/user"

// 图标
const url = ref("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")

const globalStore = GlobalStore()
const isCollapse = computed(() => globalStore.themeConfig.isCollapse)

const userStore = UserStore()
const menuList = computed(() => userStore.showMenuListGet)
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
		.header-lf {
			display: flex;
			align-items: center;
			.logo {
				width: 210px;
				margin-right: 16px;
				span {
					font-size: 24px;
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
	.el-aside {
		width: auto;
		overflow: inherit;
		border-right: 1px solid var(--el-border-color);
		transition: all 0.3s ease;
		.menu {
			display: flex;
			flex-direction: column;
			height: 100%;
			transition: all 0.3s ease;
			.el-menu {
				overflow-x: hidden;
				border-right: none;
			}
		}
	}
}

.classic-content {
	height: calc(100% - 55px); // 减去头部高度
	.classic-main {
		display: flex;
		flex-direction: column;
	}
}

.el-footer {
	height: auto;
	padding: 0;
}
</style>
