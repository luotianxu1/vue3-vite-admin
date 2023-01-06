<template>
	<el-container>
		<el-aside>
			<Sidebar></Sidebar>
		</el-aside>
		<el-container>
			<el-header>
				<Header></Header>
				<Tabs v-if="globalStore.themeConfig.tabs"></Tabs>
			</el-header>
			<el-main>
				<Connect></Connect>
			</el-main>
			<el-footer v-if="globalStore.themeConfig.footer">
				<Footer></Footer>
			</el-footer>
		</el-container>
	</el-container>
</template>

<script lang="ts" setup>
import Header from "./components/header/Header.vue"
import Sidebar from "./components/sidebar/Sidebar.vue"
import Connect from "./components/content/Content.vue"
import Tabs from "./components/tabs/index.vue"
import Footer from "./components/footer/index.vue"
import { GlobalStore } from "@/store/modules/global"

const globalStore = GlobalStore()
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
