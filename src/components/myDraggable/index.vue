<template>
    <div ref="draggableContainer">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
    import Sortable from 'sortablejs'
    import { ElMessage } from 'element-plus'
    import { PropType } from 'vue'

    const props = defineProps({
        modelValue: {
            type: Array as PropType<any>,
            default: () => []
        },
        options: {
            type: Object as PropType<Sortable.Options>,
            default: () => {}
        }
    })

    const emit = defineEmits(['update:model-value', 'change'])

    onMounted(() => {
        initDraggable()
    })

    const draggableContainer = ref<HTMLDivElement | null>(null)

    const initDraggable = () => {
        if (!draggableContainer.value) {
            return ElMessage.error('容器不能为空！')
        }
        Sortable.create(draggableContainer.value, {
            animation: 300,
            onUpdate(e) {
                // 删除拖拽的元素
                const list = props.modelValue.slice(0)
                const item = list.splice(e.oldIndex, 1)[0]
                // 然后把删除的元素放到新的索引位置
                list.splice(e.newIndex, 0, item)
                emit('update:model-value', list)
                emit('change', list)
            }
        })
    }
</script>

<style scoped lang="scss"></style>
