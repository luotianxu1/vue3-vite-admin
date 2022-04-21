<template>
    <div class="info">
        <el-popover placement="bottom" :width="400" trigger="click">
            <slot>
                <List></List>
            </slot>
            <template #reference>
                <el-badge :value="12">
                    <i class="iconfont xiaoxi"></i>
                </el-badge>
            </template>
        </el-popover>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
    .info {
        cursor: pointer;
    }
</style>
