<template>
	<div class="not-container">
		<!--        <img src="@/assets/images/404.png" class="not-img" alt="404" />-->
		<div class="not-detail">
			<h2>404</h2>
			<h4>抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️</h4>
			<el-button type="primary" @click="globalStore.goHome()">返回首页</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { GlobalStore } from "@/store/modules/global"
const globalStore = GlobalStore()
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
