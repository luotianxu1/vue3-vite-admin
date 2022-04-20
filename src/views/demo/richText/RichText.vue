<template>
    <MTextEditor v-model="text"></MTextEditor>
		{{text}}
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const text = ref('<p>欢迎使用</p>')
</script>

<style scoped lang="scss"></style>
