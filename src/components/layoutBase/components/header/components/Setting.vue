<template>
    <div class='systemSetting'>
        <el-tooltip content='系统设置' placement='bottom' effect='light'>
            <Icon icon='setting' :font='25'></Icon>
        </el-tooltip>
    </div>
</template>

<script lang="ts" setup>
    import Icon from '@/components/icon/Icon.vue'
</script>

<style scoped lang='scss'>
    .systemSetting {
        cursor: pointer;
    }
</style>
