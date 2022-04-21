<template>
    <div class="header">
        <div class="left">
            <div class="top item">
                <el-avatar :size="40" :src="url"></el-avatar>
                <span class="title">管理系统模板</span>
            </div>
            <BreadCrumb class="item"></BreadCrumb>
        </div>
        <div class="right">
            <Info class="item"></Info>
            <ScreenFull class="item"></ScreenFull>
            <ChangeLanguage class="item"></ChangeLanguage>
            <Setting class="item"></Setting>
            <Avatar class="item"></Avatar>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Avatar from './components/Avatar.vue'
    import Info from './components/Info.vue'
    import Setting from './components/Setting.vue'
    import ScreenFull from './components/Screenfull.vue'
    import BreadCrumb from './components/BreadCrumb.vue'
    import { ref } from 'vue'

    // 图标
    const url = ref(
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    )
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        width: 100%;
        padding: 0 10px;
        border-bottom: 1px solid #e4e4e4;
        flex-shrink: 0;

        .left {
            display: flex;
            align-items: center;

            .top {
                display: flex;
                align-items: center;

                .title {
                    font-weight: 600;
                    margin-left: 10px;
                    letter-spacing: 3px;
                }
            }

            .item {
                padding: 0 10px;
            }
        }

        .right {
            display: flex;
            align-items: center;

            .item {
                padding: 0 10px;
                cursor: pointer;
            }
        }
    }
</style>
