<template>
	<template v-for="item in props.treeData" :key="item._id">
		<el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
			<template #title>
				<MyIcon :padding="5" :icon="item.meta.icon"></MyIcon>
				<span>{{ item.meta.title }}</span>
			</template>
			<TreeMenu :tree-data="item.children"></TreeMenu>
		</el-sub-menu>
		<el-menu-item v-else :index="item.path" @click="handleClickMenu(item)">
			<MyIcon :padding="5" :icon="item.meta.icon"></MyIcon>
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

<style scoped lang="scss"></style>
