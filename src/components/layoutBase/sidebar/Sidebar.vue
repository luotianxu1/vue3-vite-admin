<template>
	<div class="top">
		<el-avatar :size="40" :src="url"></el-avatar>
		<div v-show="!globalStore.SYSTEM_COLLAPSE" class="title">管理系统模板</div>
	</div>
	<el-scrollbar class="scrollbar">
		<el-menu
			:collapse="globalStore.SYSTEM_COLLAPSE"
			class="el-menu-vertical-demo"
			:default-active="globalStore.SYSTEM_ACTIVE_ROUTER"
			:router="false"
			:collapse-transition="false"
			:unique-opened="true"
		>
			<TreeMenu :tree-data="menuList"></TreeMenu>
		</el-menu>
	</el-scrollbar>
</template>

<script lang="ts" setup>
import { GlobalStore } from "@/store/modules/global"
import { UserStore } from "@/store/modules/user"
import TreeMenu from "@/components/layoutBase/sidebar/components/TreeMenu.vue"

const router = useRouter()

// 图标
const url = ref("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")

const globalStore = GlobalStore()
// 监听路由
watch(
	() => router.currentRoute.value.path,
	newValue => {
		globalStore.SYSTEM_ACTIVE_ROUTER = newValue
	},
	{ immediate: true }
)

const userStore = UserStore()
const menuList = computed(() => userStore.showMenuListGet)
</script>

<style scoped lang="scss">
.top {
	display: flex;
	align-items: center;
	position: relative;
	width: 100%;
	height: 50px;
	padding: 0 10px;

	.title {
		font-weight: 600;
		margin-left: 10px;
		letter-spacing: 3px;
		position: absolute;
		left: 50px;
	}
}

.scrollbar {
	height: 100%;
	border-right: 1px solid #e4e4e4;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
}

.el-menu {
	border-right: 0;
}
</style>
