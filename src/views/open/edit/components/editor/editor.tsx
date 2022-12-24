import './editor.scss'
import EditorBlock from '../editorBlock/editorBlock'
import deepcopy from 'deepcopy'
import { useMenuDragger } from '../../hooks/useMenuDragger'
import { useFocus } from '../../hooks/useFocus'
import { useBlockDragger } from '../../hooks/useBlockDragger'
import { useCommand } from '../../hooks/useCommand'
import { $dialog } from '../dialog/dialog'

export default defineComponent({
    props: {
        modelValue: {
            type: Object,
            default: () => {}
        }
    },
    emits: ['update:modelValue'],
    setup(props, ctx) {
        // 预览
        const previewRef = ref(false)
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
        const { blockMousedown, containerMousedown, focusData, lastSelectBlock, clearBlockFocus } =
            useFocus(data, previewRef, (e) => {
                mouseDown(e)
            })

        // 3.实现拖拽多个元素
        const { mouseDown, markLine } = useBlockDragger(focusData, lastSelectBlock, data)

        const { commands } = useCommand(data, focusData)

        const buttons = [
            { label: '撤销', icon: 'iconfont icon-chexiao', handler: () => commands.undo() },
            { label: '重做', icon: 'iconfont icon-fanhui', handler: () => commands.redo() },
            {
                label: '导出',
                icon: 'iconfont icon-xiazai',
                handler: () => {
                    $dialog({
                        title: '导出JSON',
                        content: JSON.stringify(data.value),
                        footer: false
                    })
                }
            },
            {
                label: '导入',
                icon: 'iconfont icon-shangchuan',
                handler: () => {
                    $dialog({
                        title: '导入JSON',
                        content: '',
                        footer: true,
                        onConfirm(text) {
                            commands.updateContainer(JSON.parse(text))
                        }
                    })
                }
            },
            {
                label: '置顶',
                icon: 'iconfont icon-zhiding',
                handler: () => commands.placeTop()
            },
            { label: '置底', icon: 'iconfont icon-zhidi', handler: () => commands.placeBottom() },
            { label: '删除', icon: 'iconfont icon-dustbin', handler: () => commands.delete() },
            {
                label: () => (previewRef.value ? '编辑' : '预览'),
                icon: () => (previewRef.value ? 'iconfont icon-bianji' : 'iconfont icon-chakan'),
                handler: () => {
                    previewRef.value = !previewRef.value
                    clearBlockFocus()
                }
            }
        ]

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
                <div class="editor-top">
                    {buttons.map((btn) => {
                        const label = typeof btn.label === 'function' ? btn.label() : btn.label
                        const icon = typeof btn.icon === 'function' ? btn.icon() : btn.icon
                        return (
                            <div class="editor-top-button" onClick={btn.handler}>
                                <i class={icon}></i>
                                <span>{label}</span>
                            </div>
                        )
                    })}
                </div>
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
                                    class={[
                                        block.focus ? 'editor-block-focus' : '',
                                        previewRef.value ? 'editor-block-preview' : ''
                                    ]}
                                    v-model:block={block}
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
