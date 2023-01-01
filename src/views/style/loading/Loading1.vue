<template>
	<div class="page">
		<div class="loading">
			<span>Loading...</span>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.page {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #34495e;

	.loading {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		border-top: 10px solid #e74c3c;
		position: relative;
		animation: a1 2s linear infinite;

		&:before,
		&:after {
			content: "";
			width: 200px;
			height: 200px;
			position: absolute;
			left: 0;
			top: -10px;
			border-radius: 50%;
		}

		&:before {
			border-top: 10px solid #e67e22;
			transform: rotate(120deg);
		}

		&:after {
			border-top: 10px solid #3498db;
			transform: rotate(240deg);
		}

		span {
			position: absolute;
			width: 200px;
			height: 200px;
			color: #fff;
			text-align: center;
			line-height: 200px;
			animation: a2 2s linear infinite;
		}

		@keyframes a1 {
			to {
				transform: rotate(360deg);
			}
		}

		@keyframes a2 {
			to {
				transform: rotate(-360deg);
			}
		}
	}
}
</style>
