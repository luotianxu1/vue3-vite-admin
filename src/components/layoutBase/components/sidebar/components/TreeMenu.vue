<template>
    <template v-for="item in treeData" :key="item._id">
        <el-sub-menu
            v-if="item.children && item.children.length > 0"
            :index="item.url"
        >
            <template #title>
                <Icon :padding="5" :icon="item.icon"></Icon>
                <span>{{ item.name }}</span>
            </template>
            <TreeMenu :tree-data="item.children"></TreeMenu>
        </el-sub-menu>
        <el-menu-item v-else :index="item.url">
            <template #title>
                <Icon :padding="5" :icon="item.icon"></Icon>
                <span>{{ item.name }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script lang="ts" setup>
    defineProps({
        treeData: {
            type: Array,
            default: function () {
                return []
            }
        },
        collapse: {
            type: Boolean
        }
    })
</script>

<style scoped lang="scss"></style>
