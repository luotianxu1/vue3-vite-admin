<template>
	<router-view v-slot="{ Component }">
		<keep-alive>
			<transition appear name="fade-transform" mode="out-in">
				<component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name" />
			</transition>
		</keep-alive>
		<transition appear name="fade-transform" mode="out-in">
			<component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.name" />
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
