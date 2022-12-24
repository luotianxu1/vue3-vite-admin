import './editorBlock.scss'

export default defineComponent({
    props: {
        block: {
            type: Object,
            default: () => {}
        }
    },
    emits: ['update: block'],
    setup(props, ctx) {
        const blockData = computed({
            get: () => props.block,
            set: (val) => {
                ctx.emit('update: block', val)
            }
        })
        const blockStyles = computed(() => ({
            top: `${props.block.top}px`,
            left: `${props.block.left}px`,
            zIndex: props.block.zIndex
        }))
        const config: any = inject('config')
        const blockRef = ref()
        onMounted(() => {
            let { offsetWidth, offsetHeight } = blockRef.value
            if (blockData.value.alginCenter) {
                // 说明是拖拽松手的时候才渲染，其它的默认渲染到页面上内容不需要居中
                blockData.value.top = blockData.value.top - offsetHeight / 2
                blockData.value.left = blockData.value.left - offsetWidth / 2
                blockData.value.alginCenter = false // 让渲染后的结果才能去居中
            }
            blockData.value.width = offsetWidth
            blockData.value.height = offsetHeight
        })
        return () => {
            // 通过block的key属性直接获取对应的组件
            const component = config.componentMap[blockData.value.key]
            // 获取render函数
            const RenderComponent = component.render()
            return (
                <div class="editor-block" style={blockStyles.value} ref={blockRef}>
                    {RenderComponent}
                </div>
            )
        }
    }
})
