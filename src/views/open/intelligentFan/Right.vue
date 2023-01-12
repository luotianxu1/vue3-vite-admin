<template>
	<div class="right">
		<Equipment></Equipment>
		<SimpleDoubleLine></SimpleDoubleLine>
		<Information></Information>
	</div>
</template>

<script lang="ts" setup>
import SimpleDoubleLine from "./components/SimpleDoubleLine.vue"
import Information from "./components/Information.vue"
import Equipment from "./components/Equipment.vue"
</script>

<style lang="scss" scoped>
.right {
	width: 335px;
	height: 100%;
	position: absolute;
	right: 0;
	padding-right: 18px;
}
</style>
