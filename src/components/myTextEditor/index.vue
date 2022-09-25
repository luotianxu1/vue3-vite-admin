<template>
    <div style="border: 1px solid #ccc">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :default-config="toolbarConfig"
            mode="default"
        />
        <Editor
            v-model="valueHtml"
            style="height: 500px; overflow-y: hidden"
            :default-config="editorConfig"
            mode="default"
            @onCreated="handleCreated"
            @onChange="handleChange"
            @onMaxLength="maxLength"
        />
    </div>
</template>

<script setup lang="ts">
    import '@wangeditor/editor/dist/css/style.css' // 引入 css
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import { ElMessage } from 'element-plus'
    import {
        i18nChangeLanguage,
        IEditorConfig,
        IToolbarConfig
    } from '@wangeditor/editor'

    i18nChangeLanguage('zh-CN')

    const props = defineProps({
        modelValue: {
            type: String,
            default: ''
        },
        disable: {
            type: Boolean,
            default: false
        },
        autoFocus: {
            type: Boolean,
            default: false
        },
        text: {
            type: Boolean,
            default: false
        },
        max: {
            type: Number,
            default: 100
        }
    })
    const emit = defineEmits(['update:model-value'])

    watch(
        () => props.disable,
        (val) => {
            isDisable(val)
        }
    )

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref<string>('')

    const toolbarConfig: Partial<IToolbarConfig> = {
        // toolbarKeys: [
        //     // 菜单 key
        //     'headerSelect',
        //     // 分割线
        //     '|',
        //     // 菜单 key
        //     'bold', 'italic',
        //     // 菜单组，包含多个菜单
        //     {
        // 		    key: 'group-more-style', // 必填，要以 group 开头
        // 		    title: '更多样式', // 必填
        // 		    iconSvg: '<svg>....</svg>', // 可选
        // 		    menuKeys: ["through", "code", "clearStyle"] // 下级菜单 key ，必填
        //     }
        // ]
    }
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
        maxLength: props.max,
        autoFocus: props.autoFocus,
        MENU_CONF: {
            codeSelectLang: {
                codeLangs: [
                    { text: 'CSS', value: 'css' },
                    { text: 'HTML', value: 'html' },
                    { text: 'XML', value: 'xml' }
                ]
            }
        }
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor === null) {
            return
        }
        editor.destroy()
    })

    const handleCreated = (editor) => {
        editorRef.value = editor // 记录 editor 实例，重要！
        if (props.modelValue) {
            valueHtml.value = props.modelValue
        }
        isDisable(props.disable)
    }

    const handleChange = () => {
        if (props.text) {
            emit('update:model-value', editorRef.value.getText())
        } else {
            emit('update:model-value', editorRef.value.getHtml())
        }
    }

    // 是否禁用
    const isDisable = (val) => {
        if (val) {
            editorRef.value.disable()
        } else {
            editorRef.value.enable()
        }
    }

    // 限制字数
    const maxLength = () => {
        ElMessage.warning(`最多输入${props.max}个文字！`)
    }

    // 设置值
    const setValue = (val) => {
        valueHtml.value = val
    }

    defineExpose({
        setValue
    })
</script>

<style scoped lang="scss"></style>
