<template>
    <Draggable v-model="activities">
        <el-tag
            v-for="(item, index) in activities"
            :key="index"
            :type="item.type"
            effect="dark"
        >
            {{ item.name }}
        </el-tag>
    </Draggable>
		{{activities}}
</template>

<script lang="ts" setup>
    const activities = ref([
        { type: 'info', name: '默认' },
        { type: 'danger', name: '秒杀' },
        { type: 'warning', name: '砍价' },
        { type: 'success', name: '拼团' }
    ])
</script>

<style scoped lang="scss">
.el-tag{
		margin-right: 5px;
}
</style>
