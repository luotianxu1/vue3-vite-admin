<template>
	<div class="info">
		<el-popover placement="bottom" :width="400" trigger="click">
			123
			<template #reference>
				<el-badge :value="12">
					<el-tooltip content="消息" placement="bottom" effect="light">
						<i class="iconfont icon-xiaoxi"></i>
					</el-tooltip>
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

i {
	font-size: 20px;
	&:hover {
		color: var(--el-color-primary);
	}
}
</style>
