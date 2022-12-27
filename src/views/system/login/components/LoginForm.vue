<template>
    <div ref="loginRef" class="box login">
        <ChangeLanguage class="language" />
        <h1>{{ $t('login.loginTitle') }}</h1>
        <el-form ref="loginFormRef" class="form" action="" :model="loginInfo" :rules="rules">
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
        <el-button class="button" type="primary" @click="loginSubmit()">
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
    import { useI18n } from 'vue-i18n'
    import { UserStore } from '@/store/modules/user'
    import type { FormInstance } from 'element-plus'
    import { User, Lock } from '@element-plus/icons-vue'
    import { loginApi, getUserInfoApi } from '@/api/system/userApi'

    const { t } = useI18n()
    const emit = defineEmits(['changeToRegister'])

    const loginRef = ref()
    const loginFormRef = ref<FormInstance>()

    const loginInfo = reactive({
        username: 'admin',
        password: '1'
    })
    const rules = {
        username: [
            {
                required: true,
                message: t('login.loginUser'),
                trigger: 'blur'
            }
        ],
        password: [
            {
                required: true,
                message: t('login.loginPassword'),
                trigger: 'blur'
            }
        ]
    }

    const changeToLogin = () => {
        loginRef.value.style.transform = 'rotateY(0deg)'
    }

    const changeToRegister = () => {
        if (!loginFormRef.value) {
            return
        }
        emit('changeToRegister')
        loginFormRef.value.resetFields()
        loginRef.value.style.transform = 'rotateY(180deg)'
    }

    const userStore = UserStore()
    const loginSubmit = () => {
        if (!loginFormRef.value) {
            return
        }
        loginFormRef.value.validate(async (valid: boolean) => {
            valid && userStore.login(loginInfo)
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
        width: 18rem;
        height: 25rem;
        border-radius: 10px;
        backface-visibility: hidden;
        transition: all 0.5s;
        user-select: none;
        padding: 30px;

        .language {
            position: absolute;
            top: 1.2rem;
            right: 1.2rem;
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
