<template>
    <div class="page">
        <div class="card">
            <div class="imgBox">
                <img src='../../../assets/img/style/card/card7.jpeg' alt="" />
                <img src='../../../assets/img/style/card/card7.jpeg' alt="" />
            </div>
            <div class="details">
                <div class="content">
                    <h2>
                        Someone Famous
                        <br />
                        <span>Graphic Designer</span>
                    </h2>
                    <div class="social-icons">
                        <div class="item">
                            <i class="iconfont facebook"></i>
                        </div>
                        <div class="item">
                            <i class="iconfont twitter"></i>
                        </div>
                        <div class="item">
                            <i class="iconfont linkedin"></i>
                        </div>
                        <div class="item">
                            <i class="iconfont instagram"></i>
                        </div>
                    </div>
                </div>
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
        background: #fbe9e7;

        .card {
            position: relative;
            width: 300px;
            height: 400px;
            background: #fff;
            transform-style: preserve-3d;
            transform: perspective(1000px);
            box-shadow: 10px 20px 40px rgba(0, 0, 0, 0.25);
            transition: 1s;

            &:hover {
                transform: translateX(50%);
                .imgBox {
                    transform: rotateY(-180deg);
                }
            }

            .imgBox {
                position: relative;
                width: 100%;
                height: 100%;
                z-index: 1;
                transform-origin: left;
                transform-style: preserve-3d;
                background: #000;
                transition: 1s;
                box-shadow: 10px 20px 40px rgba(0, 0, 0, 0.25);

                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transform-style: preserve-3d;
                    backface-visibility: hidden;

                    &:nth-child(2) {
                        transform: rotateY(180deg);
                    }
                }
            }

            .details {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: center;

                .content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;

                    h2 {
                        text-align: center;
                        font-weight: 700;
                        line-height: 1em;

                        span {
                            color: #e21212;
                            font-size: 0.8em;
                        }
                    }

                    .social-icons {
                        position: relative;
                        display: flex;
                        margin-top: 10px;

                        .item {
                            width: 35px;
                            height: 35px;
                            background: #333;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 5px;
                            font-size: 18px;
                            color: #fff;
                            transition: 0.2s;

                            &:hover {
                                background: #e21212;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
