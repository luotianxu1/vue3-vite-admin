<template>
	<div class="left">
		<Item></Item>
	</div>
</template>

<script lang="ts" setup>
import Item from "./components/Item.vue"
</script>

<style lang="scss" scoped>
.left {
	width: 335px;
	height: 100%;
	position: absolute;
	left: 0;
	background-color: red;
}
</style>
