<template>
	<router-view v-slot="{ Component }">
		<transition appear name="fade-transform" mode="out-in">
			<keep-alive v-if="isRefresh">
				<component :is="Component" v-if="$route.meta.isKeepAlive" :key="$route.name" />
			</keep-alive>
		</transition>

		<transition appear name="fade-transform" mode="out-in">
			<component :is="Component" v-if="!$route.meta.isKeepAlive && isRefresh" :key="$route.name" />
		</transition>
	</router-view>
</template>

<script lang="ts" setup>
import eventHub from "@/utils/eventHub"

const isRefresh = ref(true)
const refreshCurrentPage = () => {
	isRefresh.value = false
	setTimeout(() => {
		isRefresh.value = true
	}, 0)
}
eventHub.on("refresh", () => {
	refreshCurrentPage()
})
</script>

<style scoped lang="scss">
.fade-transform-leave-active,
.fade-transform-enter-active {
	transition: all 0.2s;
}
.fade-transform-enter-from {
	opacity: 0;
	transition: all 0.2s;
	transform: translateX(-30px);
}
.fade-transform-leave-to {
	opacity: 0;
	transition: all 0.2s;
	transform: translateX(30px);
}
</style>
