<template>
    <div class="app">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
                fill="#0099ff"
                fill-opacity="1"
                d="M0,128L24,154.7C48,181,96,235,144,256C192,277,240,267,288,240C336,213,384,171,432,176C480,181,528,235,576,245.3C624,256,672,224,720,208C768,192,816,192,864,202.7C912,213,960,235,1008,245.3C1056,256,1104,256,1152,218.7C1200,181,1248,107,1296,96C1344,85,1392,139,1416,165.3L1440,192L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
            ></path>
        </svg>
        <div class="container">
            <LoginForm ref="loginRef" @changeToRegister="changeToRegister"></LoginForm>
            <RegisterForm ref="registerRef" @changeToLogin="changeToLogin"></RegisterForm>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import LoginForm from './components/LoginForm.vue'
    import RegisterForm from './components/RegisterForm.vue'

    const loginRef = ref()
    const registerRef = ref()

    const changeToRegister = () => {
        registerRef.value.changeToRegister()
    }

    const changeToLogin = () => {
        loginRef.value.changeToLogin()
    }
</script>

<style scoped lang="scss">
    .app {
        width: 100%;
        height: 100vh;
        background-color: #f0f5f5;

        .container {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 18rem;
            height: 25rem;
            perspective: 1500px;
        }

        svg {
            position: absolute;
            bottom: 0;
        }
    }
</style>
