import deepcopy from 'deepcopy'
import {
    ElButton,
    ElColorPicker,
    ElForm,
    ElFormItem,
    ElInput,
    ElInputNumber,
    ElOption,
    ElSelect
} from 'element-plus'

export default defineComponent({
    props: {
        block: {
            type: Object,
            default: () => {}
        },
        data: {
            type: Object,
            default: () => {}
        },
        updateContainer: {
            type: Function,
            default: () => {}
        },
        updateBlcok: {
            type: Function,
            default: () => {}
        }
    },
    setup(props) {
        const config: any = inject('config')
        const state = reactive({
            editData: {} as any
        })
        const reset = () => {
            // 说明绑定的是容器宽高
            if (!props.block) {
                state.editData = deepcopy(props.data.container)
            } else {
                state.editData = deepcopy(props.block)
            }
        }
        const apply = () => {
            // 更改组件容器大小
            if (!props.block) {
                props.updateContainer({ ...props.data, container: state.editData })
            } else {
                // 更改组件配置
                props.updateBlcok(state.editData, props.block)
            }
        }
        watch(() => props.block, reset, { immediate: true })
        return () => {
            let content: any = []
            if (!props.block) {
                content.push(
                    <>
                        <ElFormItem label="容器宽度">
                            <ElInputNumber v-model={state.editData.width}></ElInputNumber>
                        </ElFormItem>
                        <ElFormItem label="容器高度">
                            <ElInputNumber v-model={state.editData.height}></ElInputNumber>
                        </ElFormItem>
                    </>
                )
            } else {
                let component = config.componentMap[props.block.key]
                if (component && component.props) {
                    content.push(
                        Object.entries(component.props).map(([propName, propConfig]) => {
                            return (
                                <ElFormItem label={propConfig.label}>
                                    {{
                                        input: () => (
                                            <ElInput v-model={state.editData.props[propName]} />
                                        ),
                                        color: () => (
                                            <ElColorPicker
                                                v-model={state.editData.props[propName]}
                                            />
                                        ),
                                        select: () => (
                                            <ElSelect v-model={state.editData.props[propName]}>
                                                {propConfig.options.map((opt) => {
                                                    return (
                                                        <ElOption
                                                            label={opt.label}
                                                            value={opt.value}
                                                        />
                                                    )
                                                })}
                                            </ElSelect>
                                        )
                                    }[propConfig.type]()}
                                </ElFormItem>
                            )
                        })
                    )
                }
            }
            return (
                <ElForm labelPosition="top" style="padding: 30px">
                    {content}
                    <ElFormItem>
                        <ElButton type="primary" onClick={() => apply()}>
                            应用
                        </ElButton>
                        <ElButton onClick={reset}>重置</ElButton>
                    </ElFormItem>
                </ElForm>
            )
        }
    }
})
