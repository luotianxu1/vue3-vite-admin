<template>
	<i
		class="icon"
		:class="iconStr"
		:style="{
			fontSize: fontSize,
			color: props.color,
			fontWeight: props.width,
			padding: paddingNum
		}"
	></i>
</template>

<script lang="ts" setup>
interface Props {
	icon: string
	font?: number
	color?: string
	width?: number
	padding?: number
	hover?: boolean
}
const props = withDefaults(defineProps<Props>(), {
	font: 18,
	color: "#252323",
	width: 400,
	padding: 0,
	hover: false
})
const iconStr = computed(() => {
	let str = ""
	str += props.hover ? "hover " : ""
	str += "iconfont " + props.icon
	return str
})
const fontSize = computed(() => props.font + "px")
const paddingNum = computed(() => "0" + " " + props.padding + "px")
</script>

<style scoped lang="scss">
.icon {
	text-align: center;
}

.hover {
	&:hover {
		color: rgb(96, 158, 255) !important;
	}
}
</style>
