<template>
    <div class="sidebar">
        <div>{{ props.current.label }}</div>
        <el-form
            v-if="Object.keys(props.current).length"
            label-width="80px"
            :model="styles"
        >
            <el-form-item
                v-for="formItem in form"
                :key="formItem.key"
                :label="formItem.label"
            >
                <component
                    :is="componentsList[formItem.component]"
                    v-model="styles[formItem.key]"
                ></component>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
    import { ElInputNumber, ElColorPicker } from 'element-plus'

    const props = defineProps({
        current: {
            type: Object,
            default: () => {
                return {}
            }
        },
        form: {
            type: Object,
            default: () => {
                return []
            }
        }
    })

    const componentsList = {
        'input-number': ElInputNumber,
        'color-picker': ElColorPicker
    }

    const styles = ref()
    watch(
        () => props.current,
        (val) => {
            styles.value = val.style
        }
    )
</script>

<style scoped lang="scss">
    .sidebar {
        width: 300px;
        background-color: #e9e9e9;
        display: flex;
        flex-direction: column;
    }
</style>
