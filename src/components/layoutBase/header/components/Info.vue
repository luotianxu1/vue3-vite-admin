<template>
	<div class="info">
		<el-popover placement="bottom" :width="400" trigger="click">
			123
			<template #reference>
				<el-badge :value="12">
					<MyIcon icon="icon-xiaoxi" :font="20" :hover="true" :width="500"></MyIcon>
				</el-badge>
			</template>
		</el-popover>
	</div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.info {
	cursor: pointer;
}
</style>
