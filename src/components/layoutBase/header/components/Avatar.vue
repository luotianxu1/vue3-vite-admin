<template>
    <div class="avatar">
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                <span class="user">
                    <el-avatar :size="30" :src="USER_INFO?.img"></el-avatar>
                    <span class="userInfo">
                        <span>{{ USER_INFO?.name }}</span>
                    </span>
                </span>
                <el-icon class="el-icon--right">
                    <ArrowDown />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
                    <el-dropdown-item command="taskCenter">任务中心</el-dropdown-item>
                    <el-dropdown-item command="quit" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts" setup>
    import { UserStore } from '@/store/modules/user'
    import { storeToRefs } from 'pinia'
    import { ArrowDown } from '@element-plus/icons-vue'

    const router = useRouter()
    const userStore = UserStore()
    const { USER_INFO } = storeToRefs(userStore)

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
                margin-left: 10px;

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
