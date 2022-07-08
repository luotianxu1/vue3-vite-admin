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
                <el-input v-model="form.name" placeholder="姓名" />
            </el-form-item>
            <el-form-item label="得分：" prop="value">
                <el-input v-model.number="form.value" placeholder="得分" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add(ruleFormRef)">
                    添加
                </el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column type="index" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="value" label="得分" sortable />
        </el-table>
    </div>
</template>

<script lang="ts" setup>
    import type { FormRules, FormInstance } from 'element-plus'

    const tableData:any = ref([])
    const rules = reactive<FormRules>({
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        value: [
            { required: true, message: '请输入得分', trigger: 'blur' },
            { type: 'number', message: '必须为数字' },
        ]
    })

    const form = reactive({
        name: '',
        value: '',
		    index: null
    })

    const ruleFormRef = ref<FormInstance>()
    const add = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate((valid) => {
            if (valid) {
								form.index = tableData.value.length + 1
		            tableData.value.push(JSON.parse(JSON.stringify(form)))
		            localStorage.setItem('newItem', JSON.stringify(form))
		            form.name = ''
		            form.value = ''
            } else {
                console.log('error submit!')
                return false
            }
        })
    }
</script>

<style scoped lang="scss">
    .main {
        padding: 20px;
    }
</style>
