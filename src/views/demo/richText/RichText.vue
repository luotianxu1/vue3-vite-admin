<template>
    <LayoutQuery>
        <template #fl>
            <div class="query-item">
                <el-switch
                    v-model="disable"
                    size="large"
                    active-text="禁用"
                    inactive-text="不禁用"
                />
            </div>
            <div class="query-item">
                {{text}}
            </div>
        </template>
        <TextEditor
            ref="textModel"
            v-model="text"
            :disable="disable"
            auto-focus
            text
        ></TextEditor>
    </LayoutQuery>
</template>

<script setup lang="ts">
    const text = ref('')

    const disable = ref(false)

    setTimeout(() => {
        text.value = '<h1>1234</h1>'
    }, 2000)
</script>

<style scoped lang="scss"></style>
