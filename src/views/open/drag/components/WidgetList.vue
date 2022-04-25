<template>
    <!--组件列表-->
    <div class="widget-list">
        <div
            v-for="widget in props.list"
            :key="widget.type"
            class="widget"
            draggable="true"
            @mousedown="(e) => onWidgetMouseDown(e, widget)"
        >
            {{ widget.label }}
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { WidgetList } from '@/views/open/drag/types'

    interface Props {
        list: WidgetList[]
    }
    const props = defineProps<Props>()
    const emit = defineEmits(['onWidgetMouseDown'])

    const onWidgetMouseDown = (e: MouseEvent, widget: WidgetList) => {
        emit('onWidgetMouseDown', e, widget)
    }
</script>

<style scoped lang="scss">
    .widget {
        width: 100px;
        height: 100px;
        outline: 1px solid red;
        text-align: center;
        font-size: 24px;
        line-height: 100px;
    }
    .widget-list {
        width: 200px;
        background-color: #e9e9e9;
    }
</style>
