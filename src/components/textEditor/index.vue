<template>
    <div style="border: 1px solid #ccc; margin: 20px">
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
        />
    </div>
</template>

<script setup lang="ts">
    import '@wangeditor/editor/dist/css/style.css' // 引入 css
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
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
        placeholder: '请输入内容...'
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
				console.log(editorRef.value.getHtml())
				emit('update:model-value',editorRef.value.getHtml())
		}

    const isDisable = (val) => {
        if (val) {
            editorRef.value.disable()
        } else {
            editorRef.value.enable()
        }
    }
</script>

<style scoped lang="scss"></style>
