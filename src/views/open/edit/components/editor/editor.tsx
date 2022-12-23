import './editor.scss'
import EditorBlock from '../editorBlock/editorBlock'
import deepcopy from 'deepcopy'
import { useMenuDragger } from '../../hooks/useMenuDragger'
import { useFocus } from '../../hooks/useFocus'
import { useBlockDragger } from '../../hooks/useBlockDragger'

export default defineComponent({
    props: {
        modelValue: {
            type: Object,
            default: () => {}
        }
    },
    emits: ['update:modelValue'],
    setup(props, ctx) {
        const data = computed({
            get() {
                return props.modelValue
            },
            set(newVal) {
                ctx.emit('update:modelValue', deepcopy(newVal))
            }
        })

        const containerStyles = computed(() => ({
            width: data.value.container.width + 'px',
            height: data.value.container.height + 'px'
        }))

        const config: any = inject('config')

        const containerRef: any = ref(null)
        // 1.菜单拖拽功能
        const { dragStart, dragEnd } = useMenuDragger(containerRef, data)

        // 2.实现获取焦点
        const { blockMousedown, containerMousedown, focusData, lastSelectBlock } = useFocus(
            data,
            (e) => {
                mouseDown(e)
            }
        )

        // 3.实现拖拽多个元素
        const { mouseDown, markLine } = useBlockDragger(focusData, lastSelectBlock, data)

        return () => (
            <div class="editor">
                <div class="editor-left">
                    {/* {根据注册列表渲染内容} */}
                    {config.componentList.map((component) => (
                        <div
                            class="editor-left-item"
                            draggable
                            onDragstart={(e) => dragStart(e, component)}
                            onDragend={() => dragEnd()}>
                            <span>{component.label}</span>
                            <div>{component.preview()}</div>
                        </div>
                    ))}
                </div>
                <div class="editor-top">菜单栏</div>
                <div class="editor-right">属性控制栏目</div>
                <div class="editor-container">
                    <div class="editor-container-canvas">
                        <div
                            class="editor-container-canvas__content"
                            style={containerStyles.value}
                            ref={containerRef}
                            onMousedown={containerMousedown}>
                            {data.value.blocks.map((block, index) => (
                                <EditorBlock
                                    class={block.focus ? 'editor-block-focus' : ''}
                                    block={block}
                                    onMousedown={(e) =>
                                        blockMousedown(e, block, index)
                                    }></EditorBlock>
                            ))}
                            {markLine.x !== null && (
                                <div class="line-x" style={{ left: markLine.x + 'px' }}></div>
                            )}
                            {markLine.y !== null && (
                                <div class="line-y" style={{ top: markLine.y + 'px' }}></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
