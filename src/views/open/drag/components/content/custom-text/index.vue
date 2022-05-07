<template>
    <div>{{props.data}}</div>
</template>

<script lang='ts' setup>
    const props = defineProps({
        data: {
            type: String,
            default: '文字'
        }
    })
</script>

<style scoped lang='scss'>

</style>
