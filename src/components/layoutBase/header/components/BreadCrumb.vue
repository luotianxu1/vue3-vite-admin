<template>
	<el-breadcrumb separator="/">
		<el-breadcrumb-item key="/home" :to="{ path: GLOB_APP_HOME }">首页</el-breadcrumb-item>
		<el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
			<el-link :underline="false" :disabled="index === breadcrumbList.length - 1" @click="goto(item.path)">
				{{ item.name }}
			</el-link>
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>
<script setup lang="ts">
import { GLOB_APP_HOME } from "@/config/config"

const route = useRoute()
const userRouter = useRouter()
const breadcrumbList = ref()

const initBreadcrumbList = () => {
	breadcrumbList.value = route.matched
}
watch(
	route,
	() => {
		initBreadcrumbList()
	},
	{ deep: true, immediate: true }
)

const goto = (val: string): void => {
	userRouter.push(val)
}
</script>
<style lang="scss" scoped></style>
