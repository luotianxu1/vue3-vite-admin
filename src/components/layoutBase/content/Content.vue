<template>
	<router-view v-slot="{ Component }">
		<transition appear name="fade-transform" mode="out-in" v-if="$route.meta.isKeepAlive">
			<keep-alive>
				<component :is="Component" :key="$route.path" />
			</keep-alive>
		</transition>
		<transition appear name="fade-transform" mode="out-in" v-else>
			<component :is="Component" :key="$route.path" />
		</transition>
	</router-view>
</template>

<script lang="ts" setup></script>

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
