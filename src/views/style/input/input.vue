<template>
    <div class="page">
        <div class="wrapper">
            <div class="input-data">
                <input type="text" required />
                <div class="underline"></div>
                <label>您的姓名</label>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(200deg, #0c3483, #a2b6df);

        .wrapper {
            width: 450px;
            background-color: #fff;
            padding: 40px;
            box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
            border-radius: 8px;

            .input-data {
                position: relative;
                width: 100%;
                height: 40px;

                input {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    font-size: 17px;
                    border-bottom: 2px solid #c0c0c0;

                    &:focus ~ label,
                    &:valid ~ label {
                        border: none;
                        transform: translateY(-25px);
                        font-size: 15px;
                        color: #2c6fdb;
                    }

                    &:focus ~ .underline,
                    &:valid ~ .underline {
                        transform: scaleX(1);
                    }
                }

                label {
                    position: absolute;
                    bottom: 10px;
                    left: 0;
                    color: #808080;
                    pointer-events: none;
                    transition: all 0.3s ease;
                }

                .underline {
                    position: absolute;
                    bottom: 0;
                    height: 2px;
                    width: 100%;
                    background-color: #2c6fdb;
                    transform: scaleX(0);
                    transition: all 0.3s ease;
                }
            }
        }
    }
</style>
