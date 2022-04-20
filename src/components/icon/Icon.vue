<template>
    <i
        class="icon"
        :class="iconStr"
        :style="{
            fontSize: fontSize,
            color: props.color,
            fontWeight: width,
            padding: paddingNum
        }"
    ></i>
</template>

<script lang="ts" setup>
    import { computed } from 'vue'
    interface Props {
        icon: string
        font?: number
        color?: string
        width?: number
		    padding?: number
    }
    const props = withDefaults(defineProps<Props>(), {
        font: 18,
        color: '#252323',
        width: 400,
		    padding: 0
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
