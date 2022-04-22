<template>
    <TextEditor v-model="text" :disable="false"></TextEditor>
    {{ text }}
</template>

<script setup lang="ts">
    const text = ref('<p>欢迎使用</p>')
</script>

<style scoped lang="scss"></style>
