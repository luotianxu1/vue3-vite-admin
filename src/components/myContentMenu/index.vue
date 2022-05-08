<template>
    <div v-if='props.show' style='position: absolute'>
        12444
    </div>
</template>
<script lang="ts" setup>
    import { PropType } from 'vue'
    import {
        // ContextMenuGlobalData,
        ContextMenuPositionData,
        // MenuConstOptions,
        // MenuItem,
        MenuOptions
    } from './ContentMenuDefine'
    // import ContextSubMenuConstructor from './ContextSubMenu.vue'

    const emit = defineEmits(['update:show', 'close'])

    const props = defineProps({
        options: {
            type: Object as PropType<MenuOptions>,
            default: null
        },
        show: {
            type: Boolean,
            default: false
        }
    })

    const currentShowPos = reactive<ContextMenuPositionData>({
        x: 0,
        y: 0
    })
    onMounted(() => {
        updateCurrentShowPos()
        setTimeout(() => {
            document.addEventListener('click', close)
            document.addEventListener('contextmenu', close)
        }, 100)
    })

    onBeforeUnmount(() => {
        document.removeEventListener('click', close)
    })

    watch(
        () => props.show,
        (v) => {
            if (v) {
                updateCurrentShowPos()
            }
        }
    )

    // const render = () => {
    //     if (!props.show) {
    //         return []
    //     }
    //
    //     return h(ContextSubMenuConstructor, {
    //         items: props.options.items,
    //         parentItem: {
    //             maxWidth:
    //                 props.options.maxWidth || MenuConstOptions.defaultMaxWidth,
    //             minWidth:
    //                 props.options.minWidth || MenuConstOptions.defaultMinWidth
    //         } as MenuItem,
    //         options: props.options,
    //         zIndex: props.options.zIndex || MenuConstOptions.defaultStartZindex,
    //         globalData: {
    //             parentPosition: {
    //                 x: 0,
    //                 y: 0
    //             },
    //             screenSize: {
    //                 w: window.innerWidth,
    //                 h: window.innerHeight
    //             }
    //         } as ContextMenuGlobalData,
    //         position: currentShowPos as ContextMenuPositionData,
    //         onClose: onChildrenClose,
    //         onPreUpdatePos: onChildrenUpdatePos
    //     })
    // }
    const updateCurrentShowPos = () => {
        currentShowPos.x = props.options.x
        currentShowPos.y = props.options.y
    }
    const close = () => {
        emit('close')
        emit('update:show', false)
    }
    const onChildrenClose = (byUserClick: boolean) => {
        if (byUserClick) {
            emit('close')
            emit('update:show', false)
        }
    }
    const onChildrenUpdatePos = (newPos: ContextMenuPositionData) => {
        currentShowPos.x = newPos.x
        currentShowPos.y = newPos.y
    }
</script>
