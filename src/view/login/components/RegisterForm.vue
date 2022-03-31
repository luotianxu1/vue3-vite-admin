<template>
    <div ref="registerRef" class="box register">
        <ChangeLanguage class="language"></ChangeLanguage>
        <h1>{{ $t('login.registerTitle') }}</h1>
        <el-form
            class="form"
            ref="registerFormRef"
            :model="registerInfo"
            :rules="rules"
        >
            <el-form-item class="item" prop="username">
                <el-input
                    class="item"
                    v-model="registerInfo.username"
                    :placeholder="$t('login.loginUser')"
                    :prefix-icon="User"
                    size="default"
                />
            </el-form-item>
            <el-form-item class="item" prop="password">
                <el-input
                    class="item"
                    v-model="registerInfo.password"
                    :placeholder="$t('login.loginPassword')"
                    :prefix-icon="Lock"
                    show-password
                    size="default"
                />
            </el-form-item>
            <el-form-item class="item" prop="password">
                <el-input
                    class="item"
                    v-model="registerInfo.passwordAgain"
                    :placeholder="$t('login.loginPasswordAgain')"
                    :prefix-icon="Lock"
                    show-password
                    size="default"
                />
            </el-form-item>
        </el-form>

        <el-button class="button" type="primary" @click="registerSubmit">
            {{ $t('login.register') }}
        </el-button>
        <p class="sign">
            {{ $t('login.registerPrompt') + '?' }}
            <span @click="changeToLogin">
                {{ $t('login.registerToLogin') }}
            </span>
        </p>
    </div>
</template>

<script lang="ts" setup>
    import ChangeLanguage from '@/components/changeLanguage/ChangeLanguage.vue'
    import { reactive, ref } from 'vue'
    import { User, Lock } from '@element-plus/icons-vue'
    import { registerApi } from '@/api/system/userApi'
    import { ElMessage } from 'element-plus'
    // import { useI18n } from 'vue-i18n'
    // const { t } = useI18n()
    const emit = defineEmits(['changeToLogin'])

    const registerRef = ref()
    const registerFormRef = ref()

    const registerInfo = reactive({
        username: '',
        password: '',
        passwordAgain: ''
    })
    const rules = {
        username: [
            {
                required: true,
                message: '请输入用户名！',
                trigger: 'blur'
            }
        ],
        password: [
            {
                required: true,
                message: '请输入密码！',
                trigger: 'blur'
            }
        ]
    }

    const changeToRegister = () => {
        registerRef.value.style.transform = 'rotateY(0deg)'
    }

    const changeToLogin = () => {
        emit('changeToLogin')
        registerFormRef.value.clearValidate()
        registerRef.value.style.transform = 'rotateY(180deg)'
    }

    const registerSubmit = () => {
        registerFormRef.value.validate(async (valid: boolean) => {
            if (valid) {
                const res = await registerApi(registerInfo)
                if (res.status !== 200) {
                    return ElMessage.warning(res.message)
                }
                ElMessage.success('注册成功！')
                changeToLogin()
            } else {
                return false
            }
        })
    }

    defineExpose({
        changeToRegister
    })
</script>

<style lang="scss" scoped>
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
            margin: 30px 0 10px 0;

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

    .register {
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
