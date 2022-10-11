<template>
    <div class="content-box">
        <div class="box-content">
            <el-input
                v-model="data"
                placeholder="请输入内容"
                style="width: 500px"
            >
                <template #append>
                    <el-button v-copy="data">复制</el-button>
                </template>
            </el-input>
        </div>
    </div>
</template>

<script setup lang="ts" name="copyDirect">
    const data = ref<string>('我是被复制的内容')
</script>

<style scoped lang="scss"></style>
