<template>
	<component :is="LayoutComponents[themeConfig.layout]" />
</template>

<script lang="ts" setup>
import { GlobalStore } from "@/store/modules/global"
import LayoutVertical from "./layoutVertical/index.vue"
import LayoutClassic from "./layoutClassic/index.vue"
import LayoutColumns from "./layoutColumns/index.vue"
import LayoutTransverse from "./layoutTransverse/index.vue"

const LayoutComponents: { [key: string]: any } = {
	vertical: LayoutVertical,
	classic: LayoutClassic,
	columns: LayoutColumns,
	transverse: LayoutTransverse
}

const globalStore = GlobalStore()
const themeConfig = computed(() => globalStore.themeConfig)
</script>

<style lang="scss" scoped></style>
