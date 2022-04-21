<template>
    <div id="editor"></div>
</template>

<script setup lang="ts">
    import E from 'wangeditor'

    const props = defineProps({
        modelValue: {
            type: String,
            default: ''
        }
    })

    interface EmitsType {
        (e: 'update: model-value', value: string): void
    }
    const emit = defineEmits<EmitsType>()

    const editor = ref<InstanceType<typeof E> | null>(null)

    const unWatchModelValue = watch(
        () => props.modelValue,
        () => {
            if (editor.value) {
                editor.value.txt.html(props.modelValue)
            }
            unWatchModelValue()
        }
    )

    onMounted(() => {
        initEditor()
    })

    const initEditor = () => {
        editor.value = new E('#editor')
        editor.value.config.onchange = function (newHtml: string) {
            console.log(newHtml)
            emit('update: model-value', newHtml)
        }
        editor.value.create()
        editor.value.txt.html(props.modelValue)
    }
</script>

<style scoped lang="scss"></style>
