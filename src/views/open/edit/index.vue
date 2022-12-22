<template>
    <div class="app">
        <Editor v-model="state"></Editor>
    </div>
</template>

<script lang="ts">
    import data from './data.json'
    import Editor from './components/editor/editor'
    import { registerConfig as config } from './utils/editorConfig'

    export default {
        components: {
            Editor
        },
        setup() {
            const state = ref(data)
            provide('config', config)
            return {
                state
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
