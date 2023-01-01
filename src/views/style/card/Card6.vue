<template>
	<div class="page">
		<div class="card">
			<div class="photo">
				<img src="../../../assets/img/style/card/card6.jpeg" alt="" />
			</div>
			<h1>艾斯</h1>
			<h2>”火拳“艾斯</h2>
			<p>波特卡斯·D·艾斯，日本漫画《航海王》及其衍生作品中的角色。萨博与路飞的结义兄弟。</p>
			<a href="#">了解更多</a>
		</div>
		<div class="card">
			<div class="photo">
				<img src="../../../assets/img/style/card/card6.jpeg" alt="" />
			</div>
			<h1>艾斯</h1>
			<h2>”火拳“艾斯</h2>
			<p>波特卡斯·D·艾斯，日本漫画《航海王》及其衍生作品中的角色。萨博与路飞的结义兄弟。</p>
			<a href="#">了解更多</a>
		</div>
		<div class="card">
			<div class="photo">
				<img src="../../../assets/img/style/card/card6.jpeg" alt="" />
			</div>
			<h1>艾斯</h1>
			<h2>”火拳“艾斯</h2>
			<p>波特卡斯·D·艾斯，日本漫画《航海王》及其衍生作品中的角色。萨博与路飞的结义兄弟。</p>
			<a href="#">了解更多</a>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.page {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	background: linear-gradient(200deg, #517fa4, #243949);

	.card {
		position: relative;
		width: 300px;
		height: 450px;
		margin: 20px;
		background-color: #758a99;
		border-radius: 20px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #fff;
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
		flex-shrink: 0;

		&:hover {
			.photo {
				top: 30px;
				width: 120px;
				height: 120px;
				border-radius: 50%;
				box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
			}

			h1 {
				top: 170px;
			}
		}

		.photo {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			border-radius: 0;
			overflow: hidden;
			transition: 0.5s;

			&:before {
				content: "";
				position: absolute;
				width: 100%;
				height: 100%;
				background: linear-gradient(to bottom, transparent 50%, #222);
			}

			img {
				width: 100%;
				height: 100%;
				// 保持原有尺寸比例裁切长边
				object-fit: cover;
			}
		}

		h1 {
			position: absolute;
			top: 370px;
			transition: 0.5s;
		}

		h2 {
			margin-top: 220px;
			width: 80%;
			border-bottom: 1px solid rgba(255, 255, 255, 0.5);
			font-size: 20px;
			text-align: center;
			margin-bottom: 20px;
			padding-bottom: 20px;
		}

		p {
			width: 90%;
			text-indent: 32px;
			font-size: 16px;
			margin-bottom: 15px;
			line-height: 30px;
		}

		a {
			font-size: 14px;
			color: rgba(255, 255, 255, 0.8);
			border: 1px solid rgba(255, 255, 255, 0.5);
			padding: 8px 32px;
			border-radius: 8px;

			&:hover {
				color: #fff;
				background-color: rgba(255, 255, 255, 0.2);
			}
		}
	}
}
</style>
