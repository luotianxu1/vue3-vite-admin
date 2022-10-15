<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span class="card-title">完成统计</span>
            </div>
        </template>
    </el-card>
</template>
<script lang="ts" setup></script>
<style scoped lang="scss">
    .work {
        width: 100%;
        height: 100%;
        padding: 0 10px;
        overflow: auto;

        .header {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }

        .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

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
    }

    .el-row {
        margin-bottom: 20px;
    }
</style>
