<template>
	<div class="right">
		<Select class="item"></Select>
		<Info class="item"></Info>
		<ScreenFull class="item"></ScreenFull>
		<ChangeLanguage class="item"></ChangeLanguage>
		<Setting class="item"></Setting>
		<Avatar class="item"></Avatar>
	</div>
</template>

<script lang="ts" setup>
import Avatar from "./components/Avatar.vue"
import Info from "./components/Info.vue"
import Setting from "./components/Setting.vue"
import ScreenFull from "./components/Screenfull.vue"
import Select from "./components/Select.vue"
</script>

<style lang="scss" scoped>
.right {
	display: flex;
	align-items: center;

	.item {
		padding: 0 12px;
		cursor: pointer;

		&:last-child {
			padding-left: 0 !important;
		}
	}
}
</style>
