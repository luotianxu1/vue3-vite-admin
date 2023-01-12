<template>
	<template v-for="item in props.treeData" :key="item._id">
		<el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
			<template #title>
				<i class="iconfont" :class="item.meta.icon"></i>
				<span>{{ item.meta.title }}</span>
			</template>
			<TreeMenu :tree-data="item.children"></TreeMenu>
		</el-sub-menu>
		<el-menu-item v-else :index="item.path" @click="handleClickMenu(item)">
			<i class="iconfont" :class="item.meta.icon"></i>
			<template #title>
				<span>{{ item.meta.title }}</span>
			</template>
		</el-menu-item>
	</template>
</template>

<script lang="ts" setup>
import { IMenuOptions } from "@/api/system/userApi"
import router from "@/router"

interface Props {
	treeData: Array<IMenuOptions>
}

const props = withDefaults(defineProps<Props>(), {
	treeData: () => []
})

const handleClickMenu = item => {
	// if (item.meta.isLink) return window.open(item.meta.isLink, "_blank")
	router.push(item.path)
}
</script>

<style scoped lang="scss">
i {
	font-size: 18px;
	padding: 0 5px;
}
</style>
