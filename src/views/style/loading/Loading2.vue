<template>
    <div class="page">
        <div class="heart">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
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
        background: radial-gradient(circle at center, mediumpurple, #000);

        .heart {
            width: 280px;
            height: 220px;
            display: flex;
            justify-content: space-between;

            span {
                background-color: plum;
                width: 20px;
                border-radius: 10px;
                position: relative;
                height: 50%;
                top: 25%;
                animation: beating 2s infinite;

                &:nth-child(1),
                &:nth-child(9) {
                    background-color: lightcoral;
                    height: 60px;
                    top: 44px;
                }

                &:nth-child(2),
                &:nth-child(8) {
                    background-color: lightblue;
                    height: 120px;
                    top: 12px;
                }

                &:nth-child(3),
                &:nth-child(7) {
                    background-color: lightgreen;
                    height: 160px;
                    top: 0;
                }

                &:nth-child(4),
                &:nth-child(6) {
                    background-color: gold;
                    height: 180px;
                    top: 16px;
                }

                &:nth-child(5) {
                    background-color: plum;
                    height: 180px;
                    top: 32px;
                }
            }
        }
    }

    @keyframes beating {
        0%,
        30% {
            height: 50%;
            top: 25%;
            background-color: plum;
            filter: blur(0);
        }
        60%,
        70% {
            height: 50%;
            top: 25%;
            background-color: plum;
            filter: blur(5px);
        }
    }
</style>
