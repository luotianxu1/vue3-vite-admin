<template>
    <div
        v-waterMarker="{
            text: '水印指令',
            textColor: 'rgba(180, 180, 180, 0.6)'
        }"
        class="content-box"
    ></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
    .content-box {
        width: 100%;
        height: 100%;
    }
</style>
