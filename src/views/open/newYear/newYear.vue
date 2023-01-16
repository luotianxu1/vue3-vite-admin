<template>
	<PressScene v-if="!isScene" @changeScene="changeScene"></PressScene>
	<MainScene v-else></MainScene>
</template>

<script lang="ts" setup>
import MainScene from "./components/MainScene.vue"
import PressScene from "./components/PressScene.vue"

const isScene = ref(false)
const changeScene = val => {
	isScene.value = val
}
</script>

<style lang="scss" scoped></style>
