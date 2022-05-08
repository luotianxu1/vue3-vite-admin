<template>
    <div class="main" @click="closeContentMenu">
        <WidgetListBox
            :list="widgetList"
            @onWidgetMouseDown="onWidgetMouseDown"
        ></WidgetListBox>
        <!--操作面板-->
        <div class="panel" @dragover="(e) => e.preventDefault()" @drop="onDrop">
            <Vue3DraggableResizable
                v-for="item in list"
                :key="item.id"
                v-model:active="item.focused"
                v-model:x="item.x"
                v-model:y="item.y"
                :init-w="item.w"
                :init-h="item.h"
                class="box"
                :draggable="true"
                :resizable="true"
                :style="{ zIndex: item.z }"
                @contextmenu.prevent="onButtonClick($event, item)"
                @click="onFocus(item)"
            >
                <component
                    :is="componentsList[item.component]"
                    :data="item.data"
                ></component>
            </Vue3DraggableResizable>
        </div>
        <div
            v-if="show"
            class="menu"
            :style="{ left: options.w + 'px', top: options.h + 'px' }"
        >
            <ul>
                <li @click.prevent.stop="onLayerTop">置顶</li>
                <li @click.prevent.stop="onLayerBottom">置底</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import WidgetListBox from './components/WidgetList.vue'
    import { WidgetList, List } from '@/views/open/drag/types'
    import * as CONFIG from './constants/config'
    import Vue3DraggableResizable from 'vue3-draggable-resizable'
    import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
    import AreaChart from './components/content/arra-chart/index.vue'
    import BarChart from './components/content/bar-chart/index.vue'
    import CustomText from './components/content/custom-text/index.vue'
    import { ElMessage } from 'element-plus'

    // 动态组件列表
    const componentsList = {
        AreaChart: AreaChart,
        BarChart: BarChart,
        CustomText: CustomText
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

    // box列表
    const list = ref<Array<List>>([])
    // 新增box
    let currentId = 0
    const onDrop = (e: MouseEvent) => {
        if (!currentWidget.value) {
            return
        }
        const newItem = {
            id: currentId++,
            x: e.offsetX - widgetX.value,
            y: e.offsetY - widgetY.value,
            w: currentWidget.value.default.w,
            h: currentWidget.value.default.h,
            z: list.value.length === 0 ? 0 : (Math.max(...list.value.map(item => item.z)) || 0) + 1,
            label: currentWidget.value.label,
            component: currentWidget.value.components,
            data: currentWidget.value.default.data,
            focused: true
        }
        list.value.push(newItem)
        onFocus(newItem)
    }

    // 右键菜单
    const show = ref(false)
    const options = reactive({
        w: 0,
        h: 0
    })
    // 组件点击右键
    const onButtonClick = (e: MouseEvent, item: List) => {
        options.w = e.clientX
        options.h = e.clientY
        show.value = true
        onFocus(item)
    }
    // 当前选中的id
    const chooseId = ref<number>()
    // 当前项获取焦点，其他项取消焦点
    const onFocus = (currentItem) => {
        chooseId.value = currentItem.id
    }
    // 关闭右键弹窗
    const closeContentMenu = () => {
        show.value = false
    }

    // 操作图层
    const onLayerTop = () => {

    }
    const onLayerBottom = () => {
        const currentItem = list.value.find(item => item.id === chooseId.value)
        if (!currentItem) {
            return
        }
        const minZ = Math.min(...list.value.map(item => item.z)) || 0
        if (currentItem.z === minZ) {
            ElMessage.warning('已经是最底层了')
            return
        }
        if (minZ - 1 < 0) {
            list.value = list.value.map(item => {
                item.z -= minZ - 1
                return item
            })
            currentItem.z = 0
        } else {
            currentItem.z = minZ - 1
        }
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
        outline: 1px solid blue;
        position: absolute;
    }

    .menu {
        position: absolute;
        z-index: 999999;
    }
</style>
