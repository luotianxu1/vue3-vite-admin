<template>
    <i
        class="icon"
        :class="iconStr"
        :style="{
            fontSize: fontSize,
            color: color,
            fontWeight: width,
            padding: paddingNum
        }"
    ></i>
</template>

<script lang="ts" setup>
    import { computed } from 'vue'
    const props = defineProps({
        icon: {
            required: true,
            type: String
        },
        font: {
            required: false,
            type: Number,
            default: 18
        },
        color: {
            required: false,
            type: String,
            default: '#252323'
        },
        width: {
            required: false,
            type: Number
        },
        padding: {
            required: false,
            type: Number,
            default: 0
        }
    })
    const iconStr = computed(() => 'iconfont ' + props.icon)
    const fontSize = computed(() => props.font + 'px')
    const paddingNum = computed(() => '0' + ' ' + props.padding + 'px')
</script>

<style scoped lang="scss">
    .icon {
        text-align: center;
    }
</style>
