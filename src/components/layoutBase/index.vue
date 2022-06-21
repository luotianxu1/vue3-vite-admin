<template>
    <el-container>
        <el-aside>
            <Sidebar></Sidebar>
        </el-aside>
        <el-container>
            <el-header>
                <Header></Header>
                <Tabs></Tabs>
            </el-header>
            <el-main>
                <Connect></Connect>
            </el-main>
            <!--            <el-footer>-->
            <!--                <Footer></Footer>-->
            <!--            </el-footer>-->
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
    import Header from './header/Header.vue'
    import Sidebar from './sidebar/Sidebar.vue'
    import Connect from './content/Content.vue'
    import Tabs from './tabs/index.vue'
</script>

<style lang="scss" scoped>
    .el-container {
        display: flex;
        width: 100%;
        min-width: 970px;
        height: 100%;
        .el-aside {
            width: auto;
            overflow: inherit;
        }
        .el-header,
        .el-footer {
            height: auto;
            padding: 0;
        }
        .el-main {
            padding: 0;
            box-sizing: border-box;
            background: #f0f2f5;
            overflow: hidden;
        }
    }
</style>
