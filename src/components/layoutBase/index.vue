<template>
    <el-container>
        <el-aside>
            <Sidebar></Sidebar>
        </el-aside>
        <el-container>
            <el-header>
                <Header></Header>
                <!--                    <Tabs></Tabs>-->
            </el-header>
            <el-main>
                <Connect></Connect>
            </el-main>
            <el-footer>
                <Footer></Footer>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script lang='ts' setup>
    import Header from './header/Header.vue'
    import Sidebar from './sidebar/Sidebar.vue'
    import Connect from './content/Content.vue'
</script>

<style lang='scss' scoped>
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
            box-sizing: border-box;
            padding: 10px 13px;

            // 防止切换出现横向滚动条
            overflow-x: hidden;
            background: #f0f2f5;
            .main-box {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                padding: 20px;
                overflow: auto;
                overflow-x: hidden !important;
                background-color: #ffffff;
                border-radius: 4px;
                box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
                &::-webkit-scrollbar {
                    background-color: white;
                }
            }
        }
    }

</style>
