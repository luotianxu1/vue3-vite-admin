<template>
    <div class="header-search" :class="{ show: isShow }">
        <my-icon icon="icon-search" :font="20" class="icon" @click="showSearch"></my-icon>
        <el-select
            class="header-search-select"
            ref="headerSearchRef"
            v-model="search"
            filterable
            default-first-option
            remote
            :remote-method="querySearch"
            placeholder="搜索"
            @change="onSelectChange"
        >
            <el-option v-for="option in 5" :key="option" :label="option" :value="option">
                {{ option }}
            </el-option>
        </el-select>
    </div>
</template>

<script lang="ts" setup>
    const isShow = ref(false)
    const showSearch = () => {
        isShow.value = !isShow.value
    }
    const search = ref('')
    const querySearch = () => {}
    const onSelectChange = () => {}
</script>
<style lang="scss" scoped>
    .header-search {
        font-size: 0 !important;

        .icon {
            cursor: pointer;
            vertical-align: middle;
        }

        .header-search-select {
            font-size: 18px;
            transition: width 0.2s;
            width: 0;
            overflow: hidden;
            background: transparent;
            border-radius: 0;
            display: inline-block;
            vertical-align: middle;
        }

        ::v-deep(.el-select .el-input .el-input__wrapper),
        ::v-deep(.el-select .el-input.is-focus .el-input__wrapper) {
            border-radius: 0;
            border: 0;
            padding-left: 0;
            padding-right: 0;
            box-shadow: none !important;
            border-bottom: 1px solid #d9d9d9;
            vertical-align: middle;
        }
    }

    .show {
        .header-search-select {
            width: 210px;
            margin-left: 10px;
        }
    }
</style>
