<template>
	<div class="systemSetting">
		<el-tooltip content="系统设置" placement="bottom" effect="light">
			<MyIcon icon="icon-setting" :font="20" :hover="true" :width="500" @click="open"></MyIcon>
		</el-tooltip>
		<el-drawer v-model="drawer" title="系统设置" direction="rtl">
			<span>Hi, there!</span>
		</el-drawer>
	</div>
</template>

<script lang="ts" setup>
const drawer = ref(false)
const open = () => {
	drawer.value = true
}
</script>

<style scoped lang="scss">
.systemSetting {
	cursor: pointer;
}

::v-deep(.el-drawer__title) {
	font-size: 16px;
}

::v-deep(.el-drawer__header) {
	margin-bottom: 0;
}
</style>
