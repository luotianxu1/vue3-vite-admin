import eventHub from '@/utils/eventHub'

export function useMenuDragger(containerRef, data) {
    let currentComponent

    const dragenter = (e) => {
        e.dataTransfer.dropEffect = 'move'
    }

    const dragover = (e) => {
        e.preventDefault()
    }

    const dragleave = (e) => {
        e.dataTransfer.dropEffect = null
    }

    const drop = (e) => {
        let blocks = data.value.blocks
        data.value = {
            ...data.value,
            blocks: [
                ...blocks,
                {
                    top: e.offsetY,
                    left: e.offsetX,
                    zIndex: 1,
                    key: currentComponent.key,
                    alignCenter: true, //希望松手的时候居中
                    props: {},
                    model: {}
                }
            ]
        }
        currentComponent = null
    }

    const dragStart = (e, component) => {
        // dragenter 进入元素中
        // dragover 在目标元素经过 必要阻止默认行为，否则不能触发drop
        // dragleave 离开元素的时候 需要增加一个禁用标识
        // drop 松手的时候根据拖拽的组件 添加一个组件
        containerRef.value && containerRef.value.addEventListener('dragenter', dragenter)
        containerRef.value && containerRef.value.addEventListener('dragover', dragover)
        containerRef.value && containerRef.value.addEventListener('dragleave', dragleave)
        containerRef.value && containerRef.value.addEventListener('drop', drop)
        currentComponent = component
        eventHub.emit('start')
    }

    const dragEnd = () => {
        containerRef.value && containerRef.value.removeEventListener('dragenter', dragenter)
        containerRef.value && containerRef.value.removeEventListener('dragover', dragover)
        containerRef.value && containerRef.value.removeEventListener('dragleave', dragleave)
        containerRef.value && containerRef.value.removeEventListener('drop', drop)
        eventHub.emit('end')
    }

    return {
        dragStart,
        dragEnd
    }
}
