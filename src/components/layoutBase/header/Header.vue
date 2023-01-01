<template>
	<div class="header">
		<div class="left">
			<MyIcon
				:icon="globalStore.SYSTEM_COLLAPSE ? 'icon-mulushousuo' : 'icon-muluzhankai'"
				:font="20"
				@click="changAside"
			></MyIcon>
			<BreadCrumb class="item"></BreadCrumb>
		</div>
		<div class="right">
			<Select class="item"></Select>
			<Info class="item"></Info>
			<ScreenFull class="item"></ScreenFull>
			<ChangeLanguage class="item"></ChangeLanguage>
			<Setting class="item"></Setting>
			<Avatar class="item"></Avatar>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { GlobalStore } from "@/store/modules/global"
import Avatar from "./components/Avatar.vue"
import Info from "./components/Info.vue"
import Setting from "./components/Setting.vue"
import ScreenFull from "./components/Screenfull.vue"
import BreadCrumb from "./components/BreadCrumb.vue"
import Select from "./components/Select.vue"

const globalStore = GlobalStore()
const changAside = () => {
	globalStore.SYSTEM_COLLAPSE = !globalStore.SYSTEM_COLLAPSE
}
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 50px;
	width: 100%;
	padding: 0 10px;
	border-bottom: 1px solid #e4e4e4;
	flex-shrink: 0;

	.left {
		display: flex;
		align-items: center;

		.item {
			margin-left: 10px;
		}
	}

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
}
</style>
