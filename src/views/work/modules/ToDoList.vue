<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span class="card-title">待办事项</span>
                <el-button type="primary" @click="addEvent">添加</el-button>
            </div>
        </template>
        <el-table :data="workStore.TODO_LIST" style="width: 100%">
            <el-table-column prop="time" label="时间" width="180">
                <template #default="scope">
                    {{ transformTime(scope.row.time, 'YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="事件名称" />
            <el-table-column prop="remind" label="提醒" width="70">
                <template #default="scope">
                    <el-switch v-model="scope.row.remind" />
                </template>
            </el-table-column>
            <el-table-column label="操作" width="85">
                <template #default="scope">
                    <el-button type="danger" @click="complete(scope.row)">
                        完成
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="添加事件" width="30%">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            status-icon
        >
            <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="时间" prop="time">
                <el-date-picker
                    v-model="ruleForm.time"
                    type="datetime"
                    placeholder="请选择时间"
                />
            </el-form-item>
            <el-form-item label="是否提醒" prop="remind">
                <el-switch v-model="ruleForm.remind" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirm(ruleFormRef)">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
    <audio ref="audioRef" src="../../../../public/sound/gnzw.mp3"></audio>
</template>
<script lang="ts" setup>
    import {
        FormInstance,
        FormRules,
        ElMessage,
        ElMessageBox
    } from 'element-plus'
    import { WorkStore } from '@/store/modules/work'
    import { GlobalStore } from '@/store'
    import dayjs from 'dayjs'
    import { transformTime } from '@/utils/time'
    import { ToDoItem } from '@/store/interface/work'

    const workStore = WorkStore()
    const globalStore = GlobalStore()
    const audioRef = ref()

    const ruleForm = reactive({
        name: '',
        time: '',
        remind: false
    })
    const rules = reactive<FormRules>({
        name: [
            {
                required: true,
                message: '请输入事件名称',
                trigger: 'blur'
            }
        ],
        time: [
            {
                type: 'date',
                required: true,
                message: '请选择时间',
                trigger: 'change'
            }
        ]
    })

    const ruleFormRef = ref<FormInstance>()
    const dialogVisible = ref(false)

    const addEvent = () => {
        dialogVisible.value = true
        if (ruleFormRef.value) {
            ruleFormRef.value.resetFields()
        }
    }
    const confirm = async (formEl: FormInstance | undefined) => {
        if (!formEl) {
            return
        }
        await formEl.validate((valid) => {
            if (valid) {
                workStore.TODO_LIST.push({
                    name: ruleForm.name,
                    time: dayjs(ruleForm.time).valueOf(),
                    remind: ruleForm.remind,
                    id: workStore.TODO_LIST.length
                })
                ElMessage.success('保存成功')
                dialogVisible.value = false
            }
        })
    }

    // 完成待办
    const complete = (row: ToDoItem) => {
        workStore.TODO_LIST = workStore.TODO_LIST.filter(
            (item) => item.id !== row.id
        )
    }
    let toDoTime: string[] = []
    workStore.$subscribe(
        (mutation, state) => {
            toDoTime = state.TODO_LIST.map((item) =>
                dayjs(item.time - 600000).format('YYYY-MM-DD HH:mm:ss')
            )
        },
        { detached: false }
    )
    globalStore.$subscribe(
        () => {
            if (toDoTime.includes(globalStore.systemTime)) {
                let data = workStore.TODO_LIST.filter(
                    (item) =>
                        globalStore.systemTime ===
                        dayjs(item.time - 600000).format('YYYY-MM-DD HH:mm:ss')
                )
                if (data[0].remind) {
                    audioRef.value.play()
                }
                ElMessageBox.alert(data[0].name, '待办事项', {
                    confirmButtonText: '确认完成',
                    showClose: false,
                    callback: () => {
                        ElMessage.success(`已完成: ${data[0].name}`)
                        if (data[0].remind) {
                            audioRef.value.pause()
                        }
                        complete(data[0])
                    }
                })
            }
        },
        { detached: false }
    )
</script>
<style scoped lang="scss">
    .card-title {
        position: relative;
        &::before {
            content: '';
            width: 5px;
            height: 22px;
            background-color: #0080f9;
            position: absolute;
            left: -10px;
            top: 0;
        }
    }

    .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
