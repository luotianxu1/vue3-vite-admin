<template>
	<div class="left">
		<SimpleLine></SimpleLine>
		<BarLine></BarLine>
		<CapacityPictogram></CapacityPictogram>
		<MoreBar></MoreBar>
		<Status></Status>
	</div>
</template>

<script lang="ts" setup>
import SimpleLine from "./components/SimpleLine.vue"
import BarLine from "./components/BarLine.vue"
import CapacityPictogram from "./components/CapacityPictogram.vue"
import MoreBar from "./components/MoreBar.vue"
import Status from "./components/Status.vue"
</script>

<style lang="scss" scoped>
.left {
	width: 335px;
	height: 100%;
	position: absolute;
	left: 0;
	padding-left: 18px;
}
</style>
