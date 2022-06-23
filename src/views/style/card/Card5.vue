<template>
    <div class="page">
        <div class="container">
            <div
                v-for='(item,index) in list'
                :key='index'
                class="panel"
                :style="{backgroundImage: 'url('+item.url+')'}"
                :class='chooseNum === index ? "active" : ""'
                @click='choose(index)'
            >
                <h3>{{item.name}}</h3>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const list = [
        {
            name: '探索世界',
            url: 'src/assets/img/style/card/card1.jpg'
        },
        {
            name: '原始森林',
            url: 'src/assets/img/style/card/card2.jpg'
        },
        {
            name: '烈日下的沙滩',
            url: 'src/assets/img/style/card/card3.jpg'
        },
        {
            name: '冬天的都市',
            url: 'src/assets/img/style/card/card4.jpg'
        },
        {
            name: '山-云',
            url: 'src/assets/img/style/card/card5.jpg'
        }
    ]

    const chooseNum = ref(0)
    const choose = (key) => {
        chooseNum.value = key
    }
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        .container {
            display: flex;
            width: 90vw;

            .panel {
                height: 80vh;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                border-radius: 50px;
                color: #fff;
                cursor: pointer;
                flex: 0.5;
                margin: 10px;
                position: relative;
                -webkit-transition: all 700ms ease-in;

                h3 {
                    font-size: 24px;
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    margin: 0;
                    opacity: 0;
                }
            }

            .active {
                flex: 5;

                h3 {
                    opacity: 1;
                    transition: opacity 0.3s ease-in 0.4s;
                }
            }
        }
    }
</style>
