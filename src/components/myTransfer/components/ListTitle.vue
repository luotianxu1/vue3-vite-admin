<template>
    <h1 class="list-title">{{ title }}</h1>
</template>

<script setup lang="ts">
    defineProps({
        title: {
            type: String,
            default: '列表'
        }
    })
</script>

<style scoped lang="scss">
    .list-title {
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: normal;
        font-size: 14px;
        margin: 0;
        color: #666;
        border-bottom: 1px solid #ddd;
        background-color: #efefef;
    }
</style>
