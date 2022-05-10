<template>
		<div class="sidebar">{{props.current.label}}</div>
</template>

<script setup lang="ts">
const props = defineProps({
		current: {
				type: Object,
				default: () => {
						return {}
				}
		},
		form: {
				type: Object,
				default: () => {
						return []
				}
		}
})
</script>

<style scoped lang="scss">
.sidebar {
		width: 200px;
		background-color: #e9e9e9;
}
</style>
