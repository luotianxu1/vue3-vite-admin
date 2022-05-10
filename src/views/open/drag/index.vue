<template>
    <div class="main" @click="closeContentMenu">
        <el-tabs v-model="sidebarType" class="sidebar">
            <el-tab-pane label="图层列表" name="layer">
                <MyDraggable v-model="list" @change="change">
                    <div v-for="item in list" :key="item.id">
                        {{ item.label }}
                    </div>
                </MyDraggable>
            </el-tab-pane>
            <el-tab-pane label="组件列表" name="widget">
                <WidgetListBox
                    :list="widgetList"
                    @onWidgetMouseDown="onWidgetMouseDown"
                ></WidgetListBox>
            </el-tab-pane>
        </el-tabs>
        <div class="center">
            <el-button type="primary" @click="withDraw">撤回</el-button>
            <el-button type="primary" @click="withDrawR">反撤回</el-button>
            <!--操作面板-->
            <div
                class="panel"
                @dragover="(e) => e.preventDefault()"
                @drop="onDrop"
            >
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
                    @drag-end="dragEndHandle"
                    @resize-end="resizeEndHandle"
                    @contextmenu.prevent="onButtonClick($event, item)"
                    @click="onFocus(item)"
                >
                    <component
                        :is="componentsList[item.component]"
                        :data="item.data"
                    ></component>
                </Vue3DraggableResizable>
            </div>
        </div>

		    <StyleListBox :current="chooseItem" :form="chooseForm"></StyleListBox>

        <div
            v-if="show"
            class="menu"
            :style="{ left: options.w + 'px', top: options.h + 'px' }"
        >
            <ul>
                <li @click.prevent.stop="onLayerTop">置顶</li>
                <li @click.prevent.stop="onLayerBottom">置底</li>
                <li @click.prevent.stop="onLayerUp">上移图层</li>
                <li @click.prevent.stop="onLayerDown">下移图层</li>
                <li @click.prevent.stop="onLayerRemove">删除图层</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import WidgetListBox from './components/widgetList/index.vue'
    import StyleListBox from './components/styleList/index.vue'
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
            z: list.value.length === 0 ? 0 : (Math.max(...list.value.map((item) => item.z)) || 0) + 1,
            label: currentWidget.value.label,
            component: currentWidget.value.components,
            data: currentWidget.value.default.data,
            focused: true,
		        type: currentWidget.value.type,
		        style: currentWidget.value.styles
        }
        list.value.push(newItem)
        onFocus(newItem)
        sortList()
        record()
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
    // 当前选中的小组件
    const chooseItem = computed(() => {
		    return list.value.find(
				    (item) => item.id === chooseId.value
		    )
    })
    const chooseForm = computed(() => {
				if (!chooseItem.value) {
						return []
				}
		    return CONFIG.WIDGET_LIST.find(item => chooseItem.value?.type === item.type)?.styleForm
    })
    // 当前项获取焦点，其他项取消焦点
    const onFocus = (currentItem) => {
        chooseId.value = currentItem.id
    }
    // 关闭右键弹窗
    const closeContentMenu = () => {
        show.value = false
    }

    // 图层置顶
    const onLayerTop = () => {
        closeContentMenu()
        const currentItem = list.value.find(
            (item) => item.id === chooseId.value
        )
        const maxZ = findTopLayer(currentItem)
        if (!currentItem || !maxZ) {
            return
        }
        currentItem.z = maxZ + 1
        sortList()
        record()
    }
    // 图层置底
    const onLayerBottom = () => {
        closeContentMenu()
        const currentItem = list.value.find(
            (item) => item.id === chooseId.value
        )
        const minZ = findBottomLayer(currentItem)
        if (!currentItem || minZ === false) {
            return
        }
        if (minZ - 1 < 0) {
            list.value = list.value.map((item) => {
                item.z -= minZ - 1
                return item
            })
            currentItem.z = 0
        } else {
            currentItem.z = minZ - 1
        }
        sortList()
        record()
    }
    // 上移图层
    const onLayerUp = () => {
        closeContentMenu()
        const currentItem = list.value.find(
            (item) => item.id === chooseId.value
        )
        if (!currentItem || !findTopLayer(currentItem)) {
            return
        }
        const upstairs = list.value.find((item) => item.z === currentItem.z + 1)
        upstairs && upstairs.z--
        currentItem.z++
        sortList()
        record()
    }
    // 下移图层
    const onLayerDown = () => {
        closeContentMenu()
        const currentItem = list.value.find(
            (item) => item.id === chooseId.value
        )
        if (!currentItem || findBottomLayer(currentItem) === false) {
            return
        }
        const downstairs = list.value.find((item) => item.z === currentItem.z - 1)
        downstairs && downstairs.z++
        currentItem.z--
        sortList()
        record()
    }
    // 删除图层
    const onLayerRemove = () => {
        closeContentMenu()
        list.value = list.value.filter((item) => item.id !== chooseId.value)
        sortList()
        record()
    }
    // 判断最底层
    const findBottomLayer = (currentItem) => {
        const minZ = Math.min(...list.value.map((item) => item.z)) || 0
        if (currentItem.z === minZ) {
            ElMessage.warning('已经是最底层了')
            return false
        }
        return minZ
    }
    // 判断最顶层
    const findTopLayer = (currentItem) => {
        const maxZ = Math.max(...list.value.map((item) => item.z)) || 0
        if (currentItem.z === maxZ) {
            ElMessage.warning('已经是最顶层了')
            return
        }
        return maxZ
    }
    // 更新图层顺序
    const sortList = () => {
        list.value.sort((a, b) => b.z - a.z)
    }

    // 图层列表
    const sidebarType = ref('widget')
    // 拖动
    const change = () => {
        const len = list.value.length
        list.value.forEach((item, i) => {
            item.z = len - i
        })
    }

    const recordList: any[] = []
    const recordListR: any[] = []
    // 记录历时数据
    const record = () => {
        if (list.value) {
            recordList.push(JSON.parse(JSON.stringify(list.value)))
        }
    }
    // 撤回
    const withDraw = () => {
		    if (recordList.length === 0) {
						return ElMessage.warning('撤回到底了！')
		    }
		    const idx = recordList.length - 2
		    if (idx === -1) {
						list.value = []
		    } else {
				    list.value = recordList[idx]
		    }
		    const tmp = recordList.pop()
		    recordListR.push(tmp)
    }
		// 反撤回
		const withDrawR = () => {
				list.value = recordListR.pop()
				record()
		}
    const dragEndHandle = () => {
        record()
    }
    const resizeEndHandle = () => {
        record()
    }
</script>

<style scoped lang="scss">
    .main {
        display: flex;
        height: 100vh;
        width: 100vw;

        .center {
            width: 100%;
        }

        .sidebar {
            width: 200px;
            background-color: #e9e9e9;
        }

        .panel {
            width: 100%;
            height: 100%;
            background-color: #f6f6f6;
            position: relative;
        }
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
