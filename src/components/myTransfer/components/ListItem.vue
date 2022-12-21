<template>
    <div
        v-for="item of data"
        :key="item.id"
        :class="['list-item', item.disabled ? 'disabled' : '']"
        :draggable="!item.disabled"
        @dragstart="dragItem(item)"
    >
        <input
            :id="'__checkbox__' + item.id"
            type="checkbox"
            :disabled="item.disabled"
            @click="checkboxClick(($event.target as any).checked, leftOrRight, item)"
        />
        <label :for="'__checkbox__' + item.id">{{ item.phone_name }}</label>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        data: {
            type: Array,
            default: () => []
        },
        leftOrRight: {
            type: String,
            default: ''
        }
    })

    const emit = defineEmits(['checkboxClick', 'dragItem'])
    const checkboxClick = (checked, leftOrRight, item) => {
        emit('checkboxClick', checked, leftOrRight, item)
    }
    const dragItem = (item) => {
        emit('dragItem', item)
    }
</script>

<style scoped lang="scss">
    .list-item {
        display: flex;
        align-items: center;
        height: 30px;
        font-size: 12px;
        color: #666;

        &.disabled {
            opacity: 0.6;
        }
    }
</style>
