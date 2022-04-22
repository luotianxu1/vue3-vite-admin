<template>
    <LayoutQuery ref="loginRef" :loading="tableData.loading">
        <template #fl>
            <div class="query-item">
                <el-input
                    v-model="tableData.name"
                    placeholder="请输入用户姓名"
                    clearable
                ></el-input>
            </div>
            <div class="query-item">
                <el-select
                    v-model="tableData.type"
                    placeholder="请选择用户角色"
                    clearable
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </div>
            <div class="query-item">
                <el-date-picker
                    v-model="tableData.time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    :shortcuts="shortcuts"
                    clearable
                ></el-date-picker>
            </div>
            <div class="query-item">
                <el-button :icon="Search" type="primary" @click="search">
                    查询
                </el-button>
                <el-button :icon="Download" type="primary" @click="exportExcel">
                    导出
                </el-button>
            </div>
        </template>
        <template #fr>
            <div class="query-item">
                <el-button
                    type="success"
                    :icon="CirclePlus"
                    @click="addNewsInfo"
                >
                    新增
                </el-button>
            </div>
            <div class="query-item">
                <el-button type="danger" :icon="Delete">多选删除</el-button>
            </div>
        </template>
        <MyTable
            ref="myTableRef"
            :column="data"
            :data="tableData.data"
            check-box
            api="getUserListApi"
            :params="params"
            :init-request="true"
            :on-load="true"
            :format="formatData"
            :index="true"
            @onLoad="onLoad"
        >
            <template #operation="row">
                <el-button
                    type="info"
                    :icon="Edit"
                    circle
                    @click="deleteInfo(row.data.id)"
                ></el-button>
                <el-button
                    type="danger"
                    :icon="Delete"
                    circle
                    @click="deleteInfo(row.data)"
                ></el-button>
            </template>
            <template #img="row">
                <el-avatar :src="row.data.img"></el-avatar>
            </template>
            <template #sex="row">
                {{ Number(row.data.sex) === 1 ? '男' : '女' }}
            </template>
            <template #type="row">
                <el-tag v-if="row.data.type === 0" type="danger">
                    超级管理员
                </el-tag>
                <el-tag v-if="row.data.type === 1" type="warning">
                    管理员
                </el-tag>
                <el-tag v-if="row.data.type === 2" type="success">用户</el-tag>
            </template>
            <template #status="row">
                <el-switch
                    v-model="row.data.status"
                    :active-value="1"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    inline-prompt
                    active-text="启"
                    inactive-text="禁"
                ></el-switch>
            </template>
        </MyTable>
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
    import { deleteUserApi } from '@/api/system/userApi'
    import {
        Search,
        Edit,
        Delete,
        CirclePlus,
        Download
    } from '@element-plus/icons-vue'
    import { ElMessageBox, ElMessage } from 'element-plus'
    import { jsonToExcel } from '@/utils/excel'

    const options = shallowReadonly([
        {
            value: '0',
            label: '超级管理员'
        },
        {
            value: '1',
            label: '管理员'
        },
        {
            value: '2',
            label: '用户'
        }
    ])
    const shortcuts = ref([
        {
            text: '上周',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                return [start, end]
            }
        },
        {
            text: '上月',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                return [start, end]
            }
        },
        {
            text: '前3周',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                return [start, end]
            }
        }
    ])

    // 查询列表
    const tableData = reactive({
        name: '',
        type: '',
        time: '',
        pageIndex: 1,
        pageSize: 25,
        total: 0,
        data: [],
        loading: false
    })
    const data = ref([
        { label: 'ID', prop: 'id', width: '70' },
        { label: '姓名', prop: 'name', width: '100' },
        {
            label: '头像',
            prop: 'img',
            type: 'slot',
            slot_name: 'img',
            width: '80'
        },
        { label: '年龄', prop: 'age', width: '80', sort: true },
        {
            label: '性别',
            prop: 'sex',
            type: 'slot',
            slot_name: 'sex',
            width: '60'
        },
        {
            label: '角色',
            prop: 'type',
            type: 'slot',
            slot_name: 'type',
            width: '110'
        },
        { label: '手机号', prop: 'phone', width: '150' },
        { label: '邮箱', prop: 'email' },
        { label: '城市', prop: 'city' },
        {
            label: '状态',
            prop: 'status',
            type: 'slot',
            slot_name: 'status',
            width: '70'
        },
        { label: '添加时间', prop: 'addTime', width: '120' },
        { label: '修改时间', prop: 'editTime', width: '120' },
        {
            label: '操作',
            prop: 'operation',
            type: 'slot',
            slot_name: 'operation',
            width: '120'
        }
    ])
    const loginRef = ref()
    const myTableRef = ref()
    const params = reactive({
        id: '123'
    })

    const search = () => {
        console.log(loginRef.value)
        // table.value.getTableList()
    }

    const formatData = (val) => {
        console.log(val, 'val1')
        return val
    }

    const onLoad = (val) => {
        console.log(val, 'val')
    }

    // 删除用户
    const deleteInfo = (val: any) => {
        console.log(val)
        ElMessageBox.confirm(`是否确认删除${val.name}?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
        })
            .then(async () => {
                const res = await deleteUserApi({ id: val.id })
                if (res.status === 200) {
                    ElMessage.success('删除成功!')
                    // await getNewsInfo()
                }
            })
            .catch(() => {
                ElMessage.warning('取消删除!')
            })
    }

    const addNewsInfo = () => {
        console.log(123)
    }

    const exportExcel = async () => {
        jsonToExcel({
            data: [{ id: 1, name: '123456', age: 18 }],
            header: {
                id: '编号',
                name: '姓名',
                age: '年龄'
            },
            fileName: '测试.xlsx',
            bookType: 'xlsx'
        })
    }
</script>

<style scoped lang="scss"></style>
