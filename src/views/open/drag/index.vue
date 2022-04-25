<template>
    <div class="main">
        <WidgetListBox
            :list="widgetList"
            @onWidgetMouseDown="onWidgetMouseDown"
        ></WidgetListBox>
        <!--操作面板-->
        <div class="panel" @dragover="(e) => e.preventDefault()" @drop="onDrop">
            <div
                v-for="item in list"
                :key="item.id"
                class="box"
                :style="`transform: translate(${item.x}px,${item.y}px)`"
            >
                我是{{ item.label }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import WidgetListBox from './components/WidgetList.vue'
    import { WidgetList, List } from '@/views/open/drag/types'
    import * as CONFIG from './constants/config'

    // box列表
    const list = ref<Array<List>>([])
    // 新增box
    let currentId = 0
    const onDrop = (e: MouseEvent) => {
        if (!currentWidget.value) {
            return
        }
        list.value.push({
            id: currentId++,
            x: e.offsetX - widgetX.value,
            y: e.offsetY - widgetY.value,
            label: currentWidget.value.label
        })
    }

    // 组件列表
    const widgetList = ref<Array<WidgetList>>(CONFIG.WIDGET_LIST)
    // 小组件鼠标落下
    const widgetX = ref(0)
    const widgetY = ref(0)
    const currentWidget = ref<WidgetList>()
    const onWidgetMouseDown = (e: MouseEvent, widget: WidgetList) => {
        widgetX.value = e.offsetX
        widgetY.value = e.offsetY
        currentWidget.value = widget
    }
</script>

<style scoped lang="scss">
    .main {
        display: flex;
        height: 100vh;
        width: 100vw;
    }

    .panel {
        flex: 1;
        background-color: #f6f6f6;
        position: relative;
    }

    .box {
        width: 300px;
        height: 200px;
        outline: 1px solid blue;
        position: absolute;
    }
</style>
