<template>
    <div class='main'>
        <WidgetListBox
            :list='widgetList'
            @onWidgetMouseDown='onWidgetMouseDown'
        ></WidgetListBox>
        <!--操作面板-->
        <div class='panel' @dragover='(e) => e.preventDefault()' @drop='onDrop'>
            <Vue3DraggableResizable
                v-for='item in list'
                :key='item.id'
                class='box'
                :init-w='item.w'
                :init-h='item.h'
                :style='`transform: translate(${item.x}px,${item.y}px)`'
                :draggable='true'
                :resizable='true'
            >
                <component :is='componentsList[item.component]'></component>
            </Vue3DraggableResizable>
        </div>
    </div>
</template>

<script setup lang='ts'>
    import WidgetListBox from './components/WidgetList.vue'
    import { WidgetList, List } from '@/views/open/drag/types'
    import * as CONFIG from './constants/config'
    import Vue3DraggableResizable from 'vue3-draggable-resizable'
    import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
    import AreaChart from './components/content/arra-chart/index.vue'
    import BarChart from './components/content/bar-chart/index.vue'

    // 动态组件列表
    const componentsList = {
        'AreaChart': AreaChart,
        'BarChart': BarChart
    }

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
            w: findDefaultWithType(currentWidget.value.type).w,
            h: findDefaultWithType(currentWidget.value.type).h,
            label: currentWidget.value.label,
            component: currentWidget.value.components
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

    const findDefaultWithType = (type) => {
        return widgetList.value.find(item => item.type === type).default
    }
</script>

<style scoped lang='scss'>
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
        outline: 1px solid blue;
        position: absolute;
    }
</style>
