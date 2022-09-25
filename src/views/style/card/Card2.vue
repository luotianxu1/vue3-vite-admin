<template>
    <div class="page">
        <div class="card">
            <div class="circle"></div>
            <div class="content">
                <h2>鲜虾鱼板面</h2>
                <p>
                    这几天心里颇不宁静。今晚在院子里坐着乘凉，忽然想起日日走过的荷塘，在这满月的光里，总该另有一番样子吧。月亮渐渐地升高了，墙外马路上孩子们的欢笑，已经听不见了。
                </p>
                <a href="#">立即购买</a>
            </div>
            <img src="../../../assets/img/style/card/card7.png" alt="img" />
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
        line-height: 1.6;

        .card {
            position: relative;
            display: flex;
            align-items: center;
            width: 600px;
            height: 350px;
            border-radius: 20px;

            &:hover {
                .circle {
                    background-color: #0065c3;
                    clip-path: circle(100% at center);
                }

                img {
                    left: 85%;
                    height: 440px;
                    filter: drop-shadow(0 0 4px #fff) drop-shadow(0 0 4px #fff);
                }

                .content {
                    top: 0;
                    left: 0;
                    opacity: 1;
                    visibility: visible;
                }
            }

            .circle {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #e84511;
                clip-path: circle(120px at center);
                transition: 0.3s;
                border-radius: 20px;
                overflow: hidden;
            }

            img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: 260px;
                transition: 0.5s;
            }

            .content {
                position: relative;
                width: 50%;
                left: 20%;
                display: flex;
                flex-direction: column;
                padding: 20px 20px 20px 20px;
                transition: 0.5s;
                opacity: 0;
                visibility: hidden;

                h2 {
                    color: #fff;
                    font-size: 2em;
                }

                p {
                    color: #fff;
                    line-height: 1.8;
                }

                a {
                    display: block;
                    width: 50%;
                    background: #fff;
                    color: #0165c3;
                    padding: 10px 20px;
                    border-radius: 4px;
                    letter-spacing: 1px;
                    font-weight: bold;
                    margin-top: 20px;
                }
            }
        }

        @media (max-width: 991px) {
            .card {
                width: auto;
                height: 600px;
                max-width: 350px;
                align-items: flex-start;
            }

            .card .content {
                width: 100%;
                top: 20%;
                left: 0;
                padding: 40px;
            }

            .card:hover img {
                top: 75%;
                left: 50%;
                height: 300px;
            }
        }
    }
</style>
