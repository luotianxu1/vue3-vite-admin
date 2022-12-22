import './editor.scss'
import EditorBlock from '../editorBlock/editorBlock'

export default defineComponent({
    props: {
        modelValue: {
            type:Object,
            default: () => {}
        }
    },
    setup(props) {
        const data = computed({
            get() {
                return props.modelValue
            },
            set() {

            }
        })

        const containerStyles = computed(() => ({
            width: data.value.container.width + 'px',
            height: data.value.container.height + 'px'
        }))

        const config:any = inject('config')

        return () => <div class="editor">
            <div class="editor-left">
                {/* {根据注册列表渲染内容} */}
                {config.componentList.map(component => (
                    <div class="editor-left-item">
                        <span>{component.label}</span>
                        <div>{component.preview()}</div>
                    </div>
                ))}
            </div>
            <div class="editor-top">菜单栏</div>
            <div class="editor-right">属性控制栏目</div>
            <div class="editor-container">
                <div class="editor-container-canvas">
                    <div class="editor-container-canvas__content" style={containerStyles.value}>
                        {
                            (data.value.blocks.map(block => (
                                <EditorBlock block={block}></EditorBlock>
                            )))
                        }
                    </div>
                </div>
            </div>
        </div>
    }
})