<template>
	<div v-loading="props.loading" element-loading-text="加载中..." class="layout">
		<div class="top">
			<slot name="top"></slot>
		</div>
		<div class="query">
			<div class="item">
				<slot name="fl"></slot>
			</div>
			<div class="item">
				<slot name="fr"></slot>
			</div>
		</div>
		<slot name="table"></slot>
		<div class="footer">
			<div class="item">
				<slot name="btn"></slot>
			</div>
			<div class="item">
				<slot name="page"></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	loading: {
		required: false,
		type: Boolean,
		default: () => {
			return false
		}
	}
})
</script>

<style scoped lang="scss">
.layout {
	height: calc(100% - 20px);
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border-radius: 4px;
	box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
	margin: 10px 13px;
	padding: 20px;

	&::-webkit-scrollbar {
		background-color: white;
	}

	.query {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 5px;
	}

	.table {
		position: relative;
		flex-grow: 1;
		overflow: auto;
		height: 100%;
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.item {
		display: flex;
		align-items: center;
	}
}
</style>
