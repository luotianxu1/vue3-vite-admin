<template>
    <select @change="selectChange(($event.target as any).value)">
        <option v-for="(title, index) of data" :key="index" :value="index">
            {{ title }}
        </option>
    </select>
</template>

<script setup lang="ts">
    defineProps({
        data: {
            type: Array,
            default: () => []
        }
    })

    const emit = defineEmits(['selectChange'])
    const selectChange = (value) => {
        emit('selectChange', value)
    }
</script>

<style scoped lang="scss"></style>
