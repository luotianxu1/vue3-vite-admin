<template>
	<div>
		<MyTransfer :data="data" right-title="已选择机型"></MyTransfer>
	</div>
</template>

<script setup lang="ts">
const data = [
	{
		title: "华为",
		data: [
			{
				id: 2,
				phone_name: "Mate 10 Pro",
				disabled: false
			}
		]
	},
	{
		title: "小米",
		data: [
			{
				id: 5,
				phone_name: "12 Pro",
				disabled: false
			},
			{
				id: 1,
				phone_name: "10 Pro",
				disabled: true
			}
		]
	}
]
</script>

<style scoped lang="scss"></style>
