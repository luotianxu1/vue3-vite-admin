<template>
    <el-table
        v-loading="tableData.loading"
        style="width: 100%"
        height="100%"
        :data="tableData.data"
        :stripe="stripe"
        :border="border"
        :highlight-current-row="highlightCurrentRow"
        :empty-text="emptyText"
        :size="size"
        @selection-change="handleSelectionChange"
    >
        <template v-if="props.data" #empty>
            <el-empty description="暂无数据"></el-empty>
        </template>
        <el-table-column
            v-if="checkBox"
            type="selection"
            width="50"
            :fixed="true"
            :align="align"
        ></el-table-column>
        <el-table-column
            v-if="index"
            type="index"
            width="60"
            :fixed="true"
            :align="align"
            label="编号"
        ></el-table-column>

        <template v-for="(item, itemIndex) in column" :key="itemIndex">
            <el-table-column
                v-if="item.type === 'slot'"
                :label="item.label"
                :prop="item.prop"
                :width="item.width"
                :fixed="item.fixed"
                :sortable="item.sortable"
                :align="align"
                :show-overflow-tooltip="item.showOverflowTooltip"
            >
                <template #default="scope">
                    <slot :name="item.slot_name" :data="scope.row"></slot>
                </template>
            </el-table-column>
            <el-table-column
                v-else
                :label="item.label"
                :prop="item.prop"
                :width="item.width"
                :fixed="item.fixed"
                :sortable="item.sort"
                :align="align"
                :show-overflow-tooltip="item.showOverflowTooltip"
            ></el-table-column>
        </template>
    </el-table>
</template>

<script lang="ts" setup>
    const props = defineProps({
        column: {
            type: Object,
            required: true,
            default: () => {}
        },
        data: {
            type: Array,
            default: () => []
        },
        // 斑马纹
        stripe: {
            type: Boolean,
            default: true
        },
        // 是否带有纵向边框
        border: {
            type: Boolean,
            default: true
        },
        // 高亮显示选中行
        highlightCurrentRow: {
            type: Boolean,
            default: true
        },
        // 表格尺寸
        size: {
            type: String,
            default: 'default'
        },
        // 对齐方式
        align: {
            type: String,
            default: 'center'
        },
        // 无数据时提示
        emptyText: {
            type: String,
            default: '暂无数据！'
        },
        checkBox: Boolean,
        index: Boolean
    })
    const tableData: any = reactive({
        total: 0,
        loading: false,
        data: []
    })

    watch(
        () => props.data,
        (val) => {
            tableData.data = val
        }
    )

    const handleSelectionChange = (val) => {
        console.log(val)
    }
</script>

<style scoped lang="scss"></style>
