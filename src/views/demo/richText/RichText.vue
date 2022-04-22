<template>
    <TextEditor
        ref="textModel"
        v-model="text"
        :disable="false"
        auto-focus
        text
    ></TextEditor>
    {{ text }}
</template>

<script setup lang="ts">
    const text = ref('')
</script>

<style scoped lang="scss"></style>
