// 列表区显示所有物料
// key对应组件映射关系

import { ElButton, ElInput, ElOption, ElSelect } from 'element-plus'
import Range from '../components/range/rang'

function createEditorConfig() {
    const componentList: any = []
    const componentMap = {}

    return {
        componentList,
        componentMap,
        register: (component) => {
            componentList.push(component)
            componentMap[component.key] = component
        }
    }
}

export let registerConfig = createEditorConfig()

const createInputProp = (label) => ({ type: 'input', label })
const createColorProp = (label) => ({ type: 'color', label })
const createSelectProp = (label, options) => ({ type: 'select', label, options })
const createTableProps = (label, table) => ({ type: 'table', label, table })

// 文本
registerConfig.register({
    label: '文本',
    preview: () => '预览文本',
    render: ({ props }) => (
        <span style={{ color: props.color, fontSize: props.size }}>{props.text || '渲染文本'}</span>
    ),
    key: 'text',
    props: {
        text: createInputProp('文本内容'),
        color: createColorProp('字体颜色'),
        size: createSelectProp('字体大小', [
            { label: '14px', value: '14px' },
            { label: '20px', value: '20px' },
            { label: '24px', value: '24px' }
        ])
    }
})

// 按钮
registerConfig.register({
    label: '按钮',
    preview: () => <ElButton>预览按钮</ElButton>,
    render: ({ props }) => (
        <ElButton type={props.type} size={props.size}>
            {props.text || '渲染按钮'}
        </ElButton>
    ),
    key: 'button',
    props: {
        text: createInputProp('按钮内容'),
        type: createSelectProp('按钮类型', [
            { label: '基础', value: 'primary' },
            { label: '成功', value: 'success' },
            { label: '警告', value: 'warning' },
            { label: '危险', value: 'danger' },
            { label: '文本', value: 'text' }
        ]),
        size: createSelectProp('按钮尺寸', [
            { label: '默认', value: '' },
            { label: '大', value: 'large' },
            { label: '小', value: 'small' }
        ])
    }
})

// 输入框
registerConfig.register({
    label: '输入框',
    preview: () => <ElInput placeholder="预览输入框"></ElInput>,
    render: ({ model }) => (
        <ElInput {...model.default} placeholder="渲染输入框">
            渲染输入框
        </ElInput>
    ),
    key: 'input',
    model: {
        default: '绑定字段'
    }
})

// 范围选择器
registerConfig.register({
    label: '范围选择器',
    preview: () => <Range></Range>,
    render: ({ model }) => (
        <Range
            {...{
                'start': model.start.modelValue, // @update:start
                'end': model.end.modelValue,
                'onUpdate:start': model.start['onUpdate:modelValue'],
                'onUpdate:end': model.end['onUpdate:modelValue']
            }}></Range>
    ),
    key: 'range',
    model: {
        start: '开始',
        end: '结束'
    }
})

registerConfig.register({
    label: '下拉框',
    preview: () => <ElSelect modelValue=""></ElSelect>,
    render: ({ props, model }) => {
        return (
            <ElSelect {...model.default}>
                {(props.options || []).map((opt, index) => {
                    return <ElOption label={opt.label} value={opt.value} key={index}></ElOption>
                })}
            </ElSelect>
        )
    },
    key: 'select',
    props: {
        options: createTableProps('下拉选项', {
            options: [
                { label: '显示值', field: 'label' },
                { label: '绑定值', field: 'value' }
            ],
            key: 'label'
        })
    },
    model: {
        default: '绑定字段'
    }
})
