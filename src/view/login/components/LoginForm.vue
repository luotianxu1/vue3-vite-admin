<template>
    <div ref="loginRef" class="box login">
        <ChangeLanguage class="language"></ChangeLanguage>
        <h1>{{ $t('login.loginTitle') }}</h1>
        <el-form
            class="form"
            action=""
            ref="loginFormRef"
            :model="loginInfo"
            :rules="rules"
        >
            <el-form-item prop="username">
                <el-input
                    v-model="loginInfo.username"
                    :placeholder="$t('login.loginUser')"
                    :prefix-icon="User"
                    size="default"
                />
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="loginInfo.password"
                    :placeholder="$t('login.loginPassword')"
                    :prefix-icon="Lock"
                    show-password
                    size="default"
                />
            </el-form-item>
        </el-form>
        <el-button class="button" type="primary" @click="loginSubmit">
            {{ $t('login.login') }}
        </el-button>
        <p class="sign">
            {{ $t('login.loginPrompt') + '?' }}
            <span @click="changeToRegister">
                {{ $t('login.loginToRegister') }}
            </span>
        </p>
    </div>
</template>

<script lang="ts" setup>
    import ChangeLanguage from '@/components/changeLanguage/ChangeLanguage.vue'
    import { reactive, ref } from 'vue'
    import { User, Lock } from '@element-plus/icons-vue'
    import { loginApi } from '@/api/system/userApi'
    import { ElMessage } from 'element-plus'
    import { useStore } from 'vuex'
    import { Key } from '@/store'
    import { useRouter } from 'vue-router'
    // import { useI18n } from 'vue-i18n'
    // const { t } = useI18n()
    const emit = defineEmits(['changeToRegister'])

    const store = useStore(Key)
    const router = useRouter()

    const loginRef = ref()
    const loginFormRef = ref()

    const loginInfo = reactive({
        username: 'admin',
        password: '1'
    })
    const rules = {
        username: [
            {
                required: true,
                message: '123',
                trigger: '请输入用户名！'
            }
        ],
        password: [
            {
                required: true,
                message: '请输入密码',
                trigger: 'blur'
            }
        ]
    }

    const changeToLogin = () => {
        loginRef.value.style.transform = 'rotateY(0deg)'
    }

    const changeToRegister = () => {
        emit('changeToRegister')
        loginFormRef.value.clearValidate()
        loginRef.value.style.transform = 'rotateY(180deg)'
    }

    const loginSubmit = () => {
        loginFormRef.value.validate(async (valid: boolean) => {
            if (valid) {
                const res = await loginApi(loginInfo)
                if (res.status !== 200) {
                    return ElMessage.warning(res.message)
                }
                ElMessage.success('登录成功！')
                store.commit('user/SET_USER_INFO', res.data)
                await router.push('/system/user')
            } else {
                return false
            }
        })
    }

    defineExpose({
        changeToLogin
    })
</script>

<style scoped lang="scss">
    .box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        width: 21rem;
        height: 28rem;
        border-radius: 10px;
        backface-visibility: hidden;
        transition: all 0.5s;
        user-select: none;
        padding: 30px;

        .language {
            position: absolute;
            top: 1rem;
            right: 1rem;
            z-index: 999;
        }

        .form {
            margin: 40px 0 35px 0;

            .item {
                margin: 10px 0;
            }
        }

        .button {
            width: 200px;
            height: 30px;
            margin-bottom: 20px;
        }
    }

    .login {
        background-color: #fff;
    }

    .signup {
        background-color: #fff;
        transform: rotateY(-108deg);
    }

    .sign {
        color: #888;
        font-size: 14px;

        span {
            color: #0066ff;
            cursor: pointer;
            font-weight: 500;
        }
    }
</style>
