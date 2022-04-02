<template>
    <LayoutQuery :loading="tableData.loading">
        <template #fl>
            <div class="query-item">
                <el-input
                    v-model="tableData.name"
                    placeholder="请输入菜单名称"
                    clearable
                ></el-input>
            </div>
            <div class="query-item">
                <el-button type="primary" :icon="Search" @click="getMenuList">查询</el-button>
            </div>
        </template>
        <template #fr>
            <div class="query-item">
                <el-button type="success" :icon="CirclePlus">新增</el-button>
            </div>
        </template>
        <template #table>
            <el-table
                ref="table"
                :data="tableData.data"
                row-key="id"
                stripe
                :border="true"
                highlight-current-row
                empty-text="暂无数据"
                height="100%"
            >
                <template #empty>
                    <el-empty description="暂无数据"></el-empty>
                </template>
                <el-table-column prop="id" align="center" label="ID" />
                <el-table-column prop="name" align="center" label="名称" />
                <el-table-column prop="icon" align="center" label="图标">
                    <template #default="scope">
                        <Icon :icon="scope.row.icon"></Icon>
                    </template>
                </el-table-column>
                <el-table-column prop="url" align="center" label="链接" />
                <el-table-column prop="show" align="center" label="隐藏" />
                <el-table-column align="center" label="操作" width="300">
                    <template #default="scope">
                        <el-button
                            v-if="scope.row.children"
                            type="success"
                            :icon="CirclePlus"
                        >
                            新增
                        </el-button>
                        <el-button type="info" :icon="Edit">修改</el-button>
                        <el-button type="danger" :icon="Delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template #footer>
            <div class="query-item">
                <el-pagination
                    v-model:currentPage="tableData.pageIndex"
                    layout="total, prev, pager, next"
                    :page-size="tableData.pageSize"
                    :total="tableData.total"
                ></el-pagination>
            </div>
        </template>
    </LayoutQuery>
</template>

<script lang="ts" setup>
    import { computed, onMounted, reactive } from 'vue'
    import { useStore } from 'vuex'
    import { Key } from '@/store'
    import LayoutQuery from '@/components/layoutQuery/LayoutQuery.vue'
    import Icon from '@/components/icon/Icon.vue'
    import { getUserPageList } from '@/api/system/userApi'
    import { Search, Edit, Delete, CirclePlus } from '@element-plus/icons-vue'
    import { ElMessage } from 'element-plus'

    const store = useStore(Key)
    const userInfo = computed(() => store.state.user?.USER_INFO)

    const tableData = reactive({
        name: '',
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        data: [],
        loading: false
    })

    async function getMenuList() {
        tableData.loading = true
        let res
        if (userInfo.value) {
            res = await getUserPageList({
                id: userInfo.value.id as number
            })
        }
        if (res.data && res.data.total && res.data.list) {
            tableData.data = res.data?.list
            tableData.total = res.data?.total
            tableData.loading = false
        } else {
            ElMessage.warning('暂无数据！')
        }
    }

    onMounted(() => {
        getMenuList()
    })
</script>

<style scoped lang="scss"></style>
