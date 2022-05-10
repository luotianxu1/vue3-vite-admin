<template>
    <div
        :style="{
            color: props.styles.color,
            fontSize: `${props.styles.fontSize}px`
        }"
    >
        {{ props.data }}
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        data: {
            type: String,
            default: '文字'
        },
        styles: {
            type: Object,
            default: () => {
                return {}
            }
        }
    })
</script>

<style scoped lang="scss"></style>
