import './editorBlock.scss'
import BlockResize from '../blockResize/blockResize'
import { PropType } from 'vue'
import { TBlock, TConfig } from '../../types'

export default defineComponent({
    props: {
        block: {
            type: Object as PropType<TBlock>,
            default: () => {}
        },
        formData: {
            type: Object,
            default: () => {}
        }
    },
    emits: ['update: block', 'update: formData'],
    setup(props, ctx) {
        const blockData = computed({
            get: () => props.block,
            set: (val) => {
                ctx.emit('update: block', val)
            }
        })
        const blockStyles = computed(() => ({
            top: `${blockData.value.top}px`,
            left: `${blockData.value.left}px`,
            zIndex: blockData.value.zIndex
        }))
        const formData = computed({
            get: () => props.formData,
            set: (val) => {
                ctx.emit('update: formData', val)
            }
        })
        const config = inject('config') as TConfig
        const blockRef = ref()
        onMounted(() => {
            let { offsetWidth, offsetHeight } = blockRef.value
            if (blockData.value.alignCenter) {
                // 说明是拖拽松手的时候才渲染，其它的默认渲染到页面上内容不需要居中
                blockData.value.top = (blockData.value.top as number) - offsetHeight / 2
                blockData.value.left = (blockData.value.left as number) - offsetWidth / 2
                blockData.value.alignCenter = false // 让渲染后的结果才能去居中
            }
            blockData.value.width = offsetWidth
            blockData.value.height = offsetHeight
        })
        return () => {
            // 通过block的key属性直接获取对应的组件
            const component = config.componentMap[blockData.value.key as string]
            // 获取render函数
            const RenderComponent = component.render({
                size: props.block.hasResize
                    ? { width: props.block.width, height: props.block.height }
                    : {},
                props: props.block.props,
                model: Object.keys(component.model || {}).reduce((prev, modelName) => {
                    let propName = props.block.model[modelName]
                    prev[modelName] = {
                        'modelValue': formData.value[propName],
                        'onUpdate:modelValue': (v) => (formData.value[propName] = v)
                    }
                    return prev
                }, {})
            })
            const { width, height } = component.resize || {}
            return (
                <div class="editor-block" style={blockStyles.value} ref={blockRef}>
                    {RenderComponent}
                    {blockData.value.focus && (width || height) && (
                        <BlockResize block={blockData.value} component={component}></BlockResize>
                    )}
                </div>
            )
        }
    }
})
