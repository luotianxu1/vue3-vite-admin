<template>
    <div class="app">
        <Editor v-model="state" :form-data="formData"></Editor>
    </div>
</template>

<script lang="ts">
    import data from './data.json'
    import Editor from './components/editor/editor'
    import { registerConfig as config } from './utils/editorConfig'
    import { TState } from './types/index'

    export default {
        components: {
            Editor
        },
        setup() {
            const state = ref(data as TState)
            provide('config', config)

            const formData = ref({
                username: 'luo',
                password: 123,
                start: 0,
                end: 0
            })
            return {
                state,
                formData
            }
        }
    }
</script>

<style lang="scss" scoped>
    .app {
        position: fixed;
        top: 20px;
        left: 20px;
        bottom: 20px;
        right: 20px;
    }
</style>
