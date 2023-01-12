<template>
	<div class="header-search" :class="{ show: isShow }">
		<el-tooltip content="搜索" placement="bottom" effect="light">
			<i class="iconfont icon-search" @click="showSearch"></i>
		</el-tooltip>
		<el-select
			class="header-search-select"
			ref="headerSearchRef"
			v-model="search"
			filterable
			remote
			placeholder="搜索"
			@change="onSelectChange"
		>
			<el-option v-for="item in menuList" :key="item.path" :label="item.meta.title" :value="item.path">
				{{ item.meta.title }}
			</el-option>
		</el-select>
	</div>
</template>

<script lang="ts" setup>
import { UserStore } from "@/store/modules/user"
import router from "@/router/index"

const headerSearchRef = ref()
const isShow = ref(false)
const showSearch = () => {
	isShow.value = !isShow.value
	isShow.value && headerSearchRef.value.focus()
}

const search = ref("")
const userStore = UserStore()
const menuList = computed(() => userStore.flatMenuListGet.filter(item => !item.meta.isHide && item.component))

const onSelectChange = path => {
	router.push(path)
	isShow.value = false
	search.value = ""
	headerSearchRef.value.blur()
}
</script>
<style lang="scss" scoped>
.header-search {
	font-size: 0 !important;

	i {
		cursor: pointer;
		vertical-align: middle;
		font-size: 20px;
		&:hover {
			color: var(--el-color-primary);
		}
	}

	.header-search-select {
		font-size: 18px;
		transition: width 0.2s;
		width: 0;
		overflow: hidden;
		background: transparent;
		border-radius: 0;
		display: inline-block;
		vertical-align: middle;
	}

	::v-deep(.el-select .el-input .el-input__wrapper),
	::v-deep(.el-select .el-input.is-focus .el-input__wrapper) {
		border-radius: 0;
		border: 0;
		padding-left: 0;
		padding-right: 0;
		box-shadow: none !important;
		border-bottom: 1px solid #d9d9d9;
		vertical-align: middle;
	}
}

.show {
	.header-search-select {
		width: 210px;
		margin-left: 10px;
	}
}
</style>
