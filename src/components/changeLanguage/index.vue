<template>
	<div class="changeLanguage">
		<el-dropdown trigger="click" @command="handleCommand">
			<span class="el-dropdown-link">
				<el-tooltip content="语言" placement="bottom" effect="light">
					<i class="iconfont icon-duoyuyan"></i>
				</el-tooltip>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item v-for="item in options" :key="item.value" :command="item.value">
						{{ item.label }}
					</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script lang="ts" setup>
import { GlobalStore } from "@/store/modules/global"
import { useI18n } from "vue-i18n"
const { locale } = useI18n()

const options = shallowReadonly([
	{
		value: "zh",
		label: "汉语"
	},
	{
		value: "en",
		label: "English"
	}
])
const globalStore = GlobalStore()
const handleCommand = (command: string) => {
	globalStore.language = command
	locale.value = command
}
</script>

<style scoped lang="scss">
.changeLanguage {
	cursor: pointer;
}

i {
	font-size: 20px;
	&:hover {
		color: var(--el-color-primary);
	}
}
</style>
