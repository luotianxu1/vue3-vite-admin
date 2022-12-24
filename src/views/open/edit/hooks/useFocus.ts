export function useFocus(data, previewRef, callback) {
    const selectIndex = ref(-1) // 标识没有任何一个被选中
    const lastSelectBlock = computed(() => data.value.blocks[selectIndex.value])

    const focusData = computed(() => {
        let focus: any = []
        let unfocused: any = []
        data.value.blocks.forEach((block) => (block.focus ? focus : unfocused).push(block))
        return { focus, unfocused }
    })

    const clearBlockFocus = () => {
        data.value.blocks.forEach((block) => {
            block.focus = false
        })
    }

    const blockMousedown = (e, block, index) => {
        if (previewRef.value) {
            return
        }
        e.preventDefault()
        e.stopPropagation()
        // block上我们规划一个属性focus获取焦点或将focus变为true
        if (e.shiftKey) {
            if (focusData.value.focus.length <= 1) {
                block.focus = true
            } else {
                block.focus = !block.focus
            }
        } else {
            if (!block.focus) {
                clearBlockFocus()
                block.focus = true //要清空其focus
            }
        }
        selectIndex.value = index
        callback(e)
    }

    // 点击容器让选中的失去焦点
    const containerMousedown = () => {
        if (previewRef.value) {
            return
        }
        clearBlockFocus()
        selectIndex.value = -1
    }

    return {
        blockMousedown,
        focusData,
        containerMousedown,
        lastSelectBlock,
        clearBlockFocus
    }
}
