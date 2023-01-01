<template>
	<div class="content-box">
		<div v-draggable class="drag-box flx-center text">我可以拖拽哦~</div>
	</div>
</template>

<script setup lang="ts" name="dragDirect"></script>

<style scoped lang="scss">
.content-box {
	position: relative;
	width: 500px;
	height: 500px;
	.drag-box {
		position: absolute;
		top: 110px;
		width: 300px;
		height: 300px;
		color: #b2bec3;
		background: #dfe6e9;
		border-radius: 50%;
	}
}
</style>
