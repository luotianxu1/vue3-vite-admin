<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header">
				<span class="card-title">我的应用</span>
			</div>
		</template>
		<div class="card-content">
			<div v-for="item in list" :key="item.name" class="conent-item" @click="goRouter(item.url)">
				<div class="item-box">
					<my-icon :icon="item.icon" color="#fff" :font="30"></my-icon>
				</div>
				<div class="item-name">{{ item.name }}</div>
			</div>
		</div>
	</el-card>
</template>
<script lang="ts" setup>
const list = [
	{
		name: "文字识别",
		url: "/work/characterRecognition",
		icon: "icon-wenzishibei"
	}
]

const router = useRouter()
const goRouter = (url: string) => {
	router.push(url)
}
</script>
<style scoped lang="scss">
.card-title {
	position: relative;
	&::before {
		content: "";
		width: 5px;
		height: 22px;
		background-color: #0080f9;
		position: absolute;
		left: -10px;
		top: 0;
	}
}

.card-content {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-wrap: wrap;

	.conent-item {
		width: 25%;
		display: flex;
		align-items: center;
		padding-right: 10px;
		cursor: pointer;

		.item-box {
			width: 60px;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #0080f9;
			border-radius: 10px;
			margin-right: 3px;
		}

		.item-name {
			font-weight: 800;
			font-size: 20px;
		}
	}
}
</style>
