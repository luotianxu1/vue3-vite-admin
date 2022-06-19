<template>
    <el-scrollbar class="scrollbar">
        <div class="logo">
            <div class="top item">
                <el-avatar :size="40" :src="url"></el-avatar>
                <span v-show="!globalStore.SYSTEM_COLLAPSE" class="title">
                    管理系统模板
                </span>
            </div>
        </div>
        <el-menu
            :collapse="globalStore.SYSTEM_COLLAPSE"
            unique-opened
            :collapse-transition="true"
            class="el-menu-vertical-demo"
            :default-active="globalStore.SYSTEM_ACTIVE_ROUTER"
            router
        >
            <TreeMenu :tree-data="list" :collapse="isCollapse"></TreeMenu>
        </el-menu>
        <div class='sidebarBox' @click='changAside'>
            <MyIcon
                :icon="globalStore.SYSTEM_COLLAPSE ? 'xiangyou' : 'xiangzuo'"
                :font='14'
            ></MyIcon>
        </div>
    </el-scrollbar>
</template>

<script lang="ts" setup>
    import router from '@/router'
    import { GlobalStore } from '@/store'
    import { UserStore } from '@/store/modules/user'
    import { getUserPageList } from '@/api/system/userApi'
    import { ElMessage } from 'element-plus'
    import TreeMenu from '@/components/layoutBase/sidebar/components/TreeMenu.vue'

    // 图标
    const url = ref(
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    )

    const globalStore = GlobalStore()
    // 监听路由
    watch(
        () => router.currentRoute.value.path,
        (newValue) => {
            globalStore.SYSTEM_ACTIVE_ROUTER = newValue
        },
        { immediate: true }
    )

    // 是否收缩侧边栏
    const isCollapse = ref(false)
    // 图标
    const list = ref()

    // 获取菜单列表
    onMounted(() => {
        getList()
    })

    const userStore = UserStore()
    const getList = async () => {
        const res = await getUserPageList({
            id: userStore.USER_INFO.id as number
        })
        if (res.status === 200) {
            list.value = res.data?.list
        } else {
            ElMessage.error('获取菜单失败,请重新登录!')
            await router.push('/login')
        }
    }

    const changAside = () => {
        globalStore.SYSTEM_COLLAPSE = !globalStore.SYSTEM_COLLAPSE
    }
</script>

<style scoped lang="scss">
    .scrollbar {
        height: 100%;
        border-right: 1px solid #e4e4e4;

        .logo {
            display: flex;
            align-items: center;

            .top {
                display: flex;
                align-items: center;
                position: relative;
                width: 100%;

                .title {
                    font-weight: 600;
                    margin-left: 10px;
                    letter-spacing: 3px;
                    position: absolute;
                    left: 50px;
                }
            }

            .item {
                padding: 0 10px;
            }
        }

        .sidebarBox {
            width: 10px;
            height: 65px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            cursor: pointer;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            background-color: #dadbe0;
        }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }

    .el-menu {
        border-right: 0;
    }
</style>
