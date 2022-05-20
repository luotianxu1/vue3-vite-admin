<template>
		<div class="page">
				<div class="text">
						渐变背景动画
				</div>
		</div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
.page {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(125deg, #2c3e50, #27ae60, #2980b9, #e74c3c, #8e44ac);
		background-size: 500%;
		animation: bgAnimation 15s linear infinite;

		.text {
				color: #fff;
				font-size: 30px;
				letter-spacing: 15px;
		}
}

@keyframes bgAnimation {
		0% {
				background-position: 0 50%;
		}
		50% {
				background-position: 100% 50%;
		}
		100% {
				background-position: 0 50%;
		}
}
</style>
