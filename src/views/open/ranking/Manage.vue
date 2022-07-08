<template>
    <div class="main">
        <el-form
            :inline="true"
            :model="form"
            class="demo-form-inline"
            ref="ruleFormRef"
            :rules="rules"
        >
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="歌曲名称：" prop="song">
                <el-input v-model="form.song" placeholder="请输入歌曲名称" />
            </el-form-item>
            <el-form-item label="得分：" prop="value">
                <el-input-number
                    v-model="form.value"
                    :precision="2"
                    :step="0.1"
                    :min="0"
                    :max="100"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add(ruleFormRef)">
                    添加
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="clear()">
                    清空
                </el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column type="index" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="song" label="歌曲名称" />
            <el-table-column prop="value" label="得分" sortable />
        </el-table>
    </div>
</template>

<script lang="ts" setup>
    import type { FormRules, FormInstance } from 'element-plus'

    const tableData: any = ref([])
    const rules = reactive<FormRules>({
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        value: [
            { required: true, message: '请输入得分', trigger: 'blur' },
            { type: 'number', message: '必须为数字' }
        ],
        song: [{ required: true, message: '请输入歌曲名称', trigger: 'blur' }]
    })

    onMounted(() => {
        const data = localStorage.getItem('list')
        if (data) {
            tableData.value = JSON.parse(data)
        }
    })

    const form = reactive({
        name: '',
        value: 0,
        song: '',
        index: null
    })

    const ruleFormRef = ref<FormInstance>()
    const add = (formEl: FormInstance | undefined) => {
        if (!formEl) {
            return
        }
        formEl.validate((valid) => {
            if (valid) {
                if (form.value === 0) {
                    return ElMessage.error('成绩不能为0！')
                }
                form.index = tableData.value.length + 1
                tableData.value.push(JSON.parse(JSON.stringify(form)))
                localStorage.setItem('newItem', JSON.stringify(form))
                localStorage.setItem('list', JSON.stringify(tableData.value))
                form.name = ''
                form.value = 0
                form.song = ''
            } else {
                console.log('error submit!')
                return false
            }
        })
    }

    const clear = () => {
        tableData.value = []
        localStorage.removeItem('newItem')
        localStorage.removeItem('list')
    }
</script>

<style scoped lang="scss">
    .main {
        padding: 20px;
    }
</style>
