<template>
    <el-scrollbar height="100%" style="border-right: 1px solid #e4e4e4">
        <div class="logo">
            <div class="top item">
                <el-avatar :size="40" :src="url"></el-avatar>
                <span v-show='!isCollapse' class="title">管理系统模板</span>
            </div>
        </div>
        <el-menu
            :collapse="isCollapse"
            unique-opened
            :collapse-transition="true"
            class="el-menu-vertical-demo"
            :default-active="activeRouter"
            router
        >
            <TreeMenu :tree-data="list" :collapse="isCollapse"></TreeMenu>
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts" setup>
    import { useStore } from 'vuex'
    import { Key } from '@/store'
    import router from '@/router'
    import { getUserPageList } from '@/api/system/userApi'
    import { ElMessage } from 'element-plus'
    import TreeMenu from '@/components/layoutBase/sidebar/components/TreeMenu.vue'

    const store = useStore(Key)

    // 图标
    const url = ref(
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    )

    // 监听路由
    watch(
        () => router.currentRoute.value.path,
        (newValue) => {
            store.commit('system/SET_SYSTEM_ACTIVE_ROUTER', newValue)
        },
        { immediate: true }
    )

    // 是否收缩侧边栏
    const isCollapse = computed(() => store.state.system?.SYSTEM_COLLAPSE)
    // 图标
    const list = ref()
    const user = computed(() => store.state.user?.USER_INFO)

    // 获取菜单列表
    onMounted(() => {
        getList()
    })

    const getList = async () => {
        const res = await getUserPageList({ id: user.value?.id as number })
        if (res.status === 200) {
            list.value = res.data?.list
        } else {
            ElMessage.error('获取菜单失败,请重新登录!')
            await router.push('/login')
        }
    }

    // 当前页面
    const activeRouter = computed(
        () => store.state.system?.SYSTEM_ACTIVE_ROUTER
    )
</script>

<style scoped lang="scss">
    .logo {
        display: flex;
        align-items: center;

        .top {
            display: flex;
            align-items: center;

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
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }

    .aside {
        height: 100%;
        background-color: #fff;
        position: relative;
        z-index: 3;
    }

    .el-menu {
        border-right: 0;
    }
</style>
