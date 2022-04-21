<template>
    <div class="avatar">
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                <span class="user">
                    <el-avatar :size="40" :src="userInfo?.img"></el-avatar>
                    <span class="userInfo">
                        <span>{{ userInfo?.name }}</span>
                        <span>{{ userStatus[userInfo?.type as number] }}</span>
                    </span>
                </span>
                <el-icon class="el-icon--right">
                    <ArrowDown />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu class="down">
                    <el-dropdown-item command="userCenter">
                        个人中心
                    </el-dropdown-item>
                    <el-dropdown-item command="taskCenter">
                        任务中心
                    </el-dropdown-item>
                    <el-dropdown-item command="quit" divided>
                        退出登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts" setup>
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { Key } from '@/store'
    import { ArrowDown } from '@element-plus/icons-vue'

    const userStatus = shallowReadonly({
        0: '超级管理员',
        1: '管理员',
        2: '用户'
    })
    const router = useRouter()
    const store = useStore(Key)
    const userInfo = computed(() => store.state.user?.USER_INFO)

    const logout = () => {
        router.push('/login')
        localStorage.removeItem('vue3-vite-admin')
    }

    const handleCommand = (command) => {
        switch (command) {
            case 'userCenter':
                logout()
                break
            case 'taskCenter':
                logout()
                break
            case 'quit':
                logout()
                break
            default:
                break
        }
    }
</script>

<style scoped lang="scss">
    .avatar {
        cursor: pointer;
    }

    .el-dropdown-link {
        display: flex;
        align-items: center;

        .user {
            display: flex;
            align-items: center;

            .userInfo {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                span:nth-child(1) {
                    font-size: 16px;
                }

                span:nth-child(2) {
                    font-size: 12px;
                    margin-top: 4px;
                }
            }
        }

        .iconfont {
            font-size: 15px;
        }
    }
</style>
