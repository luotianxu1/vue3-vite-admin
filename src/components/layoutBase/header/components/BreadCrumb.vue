<template>
	<el-breadcrumb separator="/">
		<transition-group name="breadcrumb" mode="out-in">
			<el-breadcrumb-item :key="GLOB_APP_HOME" :to="{ path: GLOB_APP_HOME }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
				<el-link :underline="false" :disabled="index === breadcrumbList.length - 1" @click="goto(item.path)">
					{{ item.meta.title }}
				</el-link>
			</el-breadcrumb-item>
		</transition-group>
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
